import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import GoogleDriveService from '@/lib/googleDrive';

export async function GET() {
    try {
        const health = {
            status: 'ok',
            timestamp: new Date().toISOString(),
            services: {}
        };

        // Test MongoDB connection
        try {
            await dbConnect();
            health.services.mongodb = 'connected';
        } catch (error) {
            health.services.mongodb = 'error';
            health.services.mongodbError = error.message;
        }

        // Test Google Drive connection
        try {
            const driveService = new GoogleDriveService();
            // Simple test - this will fail if credentials are invalid
            health.services.googleDrive = 'configured';
        } catch (error) {
            health.services.googleDrive = 'error';
            health.services.googleDriveError = error.message;
        }

        // Check environment variables
        const requiredEnvVars = [
            'MONGODB_URI',
            'GOOGLE_DRIVE_CLIENT_ID',
            'GOOGLE_DRIVE_CLIENT_SECRET',
            'GOOGLE_DRIVE_REFRESH_TOKEN',
            'GOOGLE_DRIVE_DEFAULT_FOLDER_ID',
            'GOOGLE_DRIVE_MONTHLY_REPORT_FOLDER_ID',
            'GOOGLE_DRIVE_FINANCIAL_STATEMENT_FOLDER_ID',
            'GOOGLE_DRIVE_EVENT_PROPOSAL_FOLDER_ID',
            'GOOGLE_DRIVE_MINISTRY_UPDATE_FOLDER_ID',
            'GOOGLE_DRIVE_BUILDING_PROPERTY_DOCUMENTS_FOLDER_ID',
            'GOOGLE_DRIVE_MEMBERSHIP_RECORDS_FOLDER_ID',
            'GOOGLE_DRIVE_PASTORAL_CREDENTIALS_FOLDER_ID',
            'GOOGLE_DRIVE_OTHER_DOCUMENTS_FOLDER_ID'
        ];

        const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

        if (missingEnvVars.length > 0) {
            health.services.environment = 'incomplete';
            health.services.missingEnvVars = missingEnvVars;
        } else {
            health.services.environment = 'complete';
        }

        return NextResponse.json(health);
    } catch (error) {
        return NextResponse.json({
            status: 'error',
            timestamp: new Date().toISOString(),
            error: error.message
        }, { status: 500 });
    }
}