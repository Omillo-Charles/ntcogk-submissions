import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Submission from '@/lib/models/Submission';
import GoogleDriveService from '@/lib/googleDrive';

export const config = {
    api: {
        bodyParser: false,
    },
};

// GET - Fetch all submissions
export async function GET(request) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const submissionType = searchParams.get('submissionType');
        const page = parseInt(searchParams.get('page')) || 1;
        const limit = parseInt(searchParams.get('limit')) || 10;

        const query = {};
        if (status) query.status = status;
        if (submissionType) query.submissionType = submissionType;

        const submissions = await Submission.find(query)
            .sort({ submittedAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const total = await Submission.countDocuments(query);

        return NextResponse.json({
            success: true,
            data: submissions,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Error fetching submissions:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch submissions' },
            { status: 500 }
        );
    }
}

// POST - Create new submission
export async function POST(request) {
    try {
        await dbConnect();

        const formData = await request.formData();
        const title = formData.get('title');
        const description = formData.get('description');
        const submitterName = formData.get('submitterName');
        const submitterEmail = formData.get('submitterEmail');
        const submissionType = formData.get('submissionType');
        const files = formData.getAll('files');

        // Validate required fields
        if (!title || !description || !submitterName || !submitterEmail || !submissionType) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const driveService = new GoogleDriveService();
        const uploadedFiles = [];

        // Upload files to Google Drive
        for (const file of files) {
            if (file.size > 0) {
                const buffer = Buffer.from(await file.arrayBuffer());
                const uploadResult = await driveService.uploadFile(
                    buffer,
                    file.name,
                    file.type,
                    submissionType  // Pass submission type to determine folder
                );

                uploadedFiles.push({
                    originalName: file.name,
                    driveFileId: uploadResult.id,
                    driveFileUrl: uploadResult.webViewLink,
                    mimeType: file.type,
                    size: file.size,
                    folderId: uploadResult.folderId,
                    submissionType: uploadResult.submissionType
                });
            }
        }

        // Create submission record
        const submission = new Submission({
            title,
            description,
            submitterName,
            submitterEmail,
            submissionType,
            files: uploadedFiles
        });

        await submission.save();

        return NextResponse.json({
            success: true,
            data: submission
        }, { status: 201 });

    } catch (error) {
        console.error('Error creating submission:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create submission' },
            { status: 500 }
        );
    }
}