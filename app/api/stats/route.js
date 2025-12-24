import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Submission from '@/lib/models/Submission';

export async function GET() {
    try {
        await dbConnect();

        const [
            totalSubmissions,
            pendingSubmissions,
            approvedSubmissions,
            rejectedSubmissions,
            recentSubmissions
        ] = await Promise.all([
            Submission.countDocuments(),
            Submission.countDocuments({ status: 'pending' }),
            Submission.countDocuments({ status: 'approved' }),
            Submission.countDocuments({ status: 'rejected' }),
            Submission.find()
                .sort({ submittedAt: -1 })
                .limit(5)
                .select('title submitterName submittedAt status submissionType')
        ]);

        // Get submissions by submission type
        const submissionTypeStats = await Submission.aggregate([
            {
                $group: {
                    _id: '$submissionType',
                    count: { $sum: 1 }
                }
            }
        ]);

        // Get submissions by month for the last 6 months
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        const monthlyStats = await Submission.aggregate([
            {
                $match: {
                    submittedAt: { $gte: sixMonthsAgo }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: '$submittedAt' },
                        month: { $month: '$submittedAt' }
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { '_id.year': 1, '_id.month': 1 }
            }
        ]);

        return NextResponse.json({
            success: true,
            data: {
                overview: {
                    total: totalSubmissions,
                    pending: pendingSubmissions,
                    approved: approvedSubmissions,
                    rejected: rejectedSubmissions
                },
                submissionTypeStats,
                monthlyStats,
                recentSubmissions
            }
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch statistics' },
            { status: 500 }
        );
    }
}