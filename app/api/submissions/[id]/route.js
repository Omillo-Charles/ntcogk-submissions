import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Submission from '@/lib/models/Submission';
import GoogleDriveService from '@/lib/googleDrive';
import mongoose from 'mongoose';

// GET - Fetch single submission
export async function GET(request, { params }) {
    try {
        await dbConnect();

        const { id } = params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { success: false, error: 'Invalid submission ID' },
                { status: 400 }
            );
        }

        const submission = await Submission.findById(id);

        if (!submission) {
            return NextResponse.json(
                { success: false, error: 'Submission not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: submission
        });
    } catch (error) {
        console.error('Error fetching submission:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch submission' },
            { status: 500 }
        );
    }
}

// PUT - Update submission (for review/approval)
export async function PUT(request, { params }) {
    try {
        await dbConnect();

        const { id } = params;
        const body = await request.json();

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { success: false, error: 'Invalid submission ID' },
                { status: 400 }
            );
        }

        const { status, reviewNotes, reviewedBy } = body;

        const updateData = {};
        if (status) updateData.status = status;
        if (reviewNotes !== undefined) updateData.reviewNotes = reviewNotes;
        if (reviewedBy) updateData.reviewedBy = reviewedBy;

        if (status === 'approved' || status === 'rejected') {
            updateData.reviewedAt = new Date();
        }

        const submission = await Submission.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!submission) {
            return NextResponse.json(
                { success: false, error: 'Submission not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: submission
        });
    } catch (error) {
        console.error('Error updating submission:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update submission' },
            { status: 500 }
        );
    }
}

// DELETE - Delete submission and associated files
export async function DELETE(request, { params }) {
    try {
        await dbConnect();

        const { id } = params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { success: false, error: 'Invalid submission ID' },
                { status: 400 }
            );
        }

        const submission = await Submission.findById(id);

        if (!submission) {
            return NextResponse.json(
                { success: false, error: 'Submission not found' },
                { status: 404 }
            );
        }

        // Delete files from Google Drive
        const driveService = new GoogleDriveService();
        for (const file of submission.files) {
            try {
                await driveService.deleteFile(file.driveFileId);
            } catch (error) {
                console.error(`Failed to delete file ${file.driveFileId}:`, error);
            }
        }

        // Delete submission from database
        await Submission.findByIdAndDelete(id);

        return NextResponse.json({
            success: true,
            message: 'Submission deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting submission:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete submission' },
            { status: 500 }
        );
    }
}