import { NextResponse } from 'next/server';
import GoogleDriveService from '@/lib/googleDrive';

export async function GET() {
    try {
        const driveService = new GoogleDriveService();

        // Get folder configuration based on submission types
        const folderConfig = {
            default: {
                id: process.env.GOOGLE_DRIVE_DEFAULT_FOLDER_ID,
                name: 'Default Submissions',
                submissionType: 'default'
            },
            'Monthly Report': {
                id: process.env.GOOGLE_DRIVE_MONTHLY_REPORT_FOLDER_ID,
                name: 'Monthly Reports',
                submissionType: 'Monthly Report'
            },
            'Financial Statement': {
                id: process.env.GOOGLE_DRIVE_FINANCIAL_STATEMENT_FOLDER_ID,
                name: 'Financial Statements',
                submissionType: 'Financial Statement'
            },
            'Event Proposal': {
                id: process.env.GOOGLE_DRIVE_EVENT_PROPOSAL_FOLDER_ID,
                name: 'Event Proposals',
                submissionType: 'Event Proposal'
            },
            'Ministry Update': {
                id: process.env.GOOGLE_DRIVE_MINISTRY_UPDATE_FOLDER_ID,
                name: 'Ministry Updates',
                submissionType: 'Ministry Update'
            },
            'Building/Property Documents': {
                id: process.env.GOOGLE_DRIVE_BUILDING_PROPERTY_DOCUMENTS_FOLDER_ID,
                name: 'Building/Property Documents',
                submissionType: 'Building/Property Documents'
            },
            'Membership Records': {
                id: process.env.GOOGLE_DRIVE_MEMBERSHIP_RECORDS_FOLDER_ID,
                name: 'Membership Records',
                submissionType: 'Membership Records'
            },
            'Pastoral Credentials': {
                id: process.env.GOOGLE_DRIVE_PASTORAL_CREDENTIALS_FOLDER_ID,
                name: 'Pastoral Credentials',
                submissionType: 'Pastoral Credentials'
            },
            'Other Documents': {
                id: process.env.GOOGLE_DRIVE_OTHER_DOCUMENTS_FOLDER_ID,
                name: 'Other Documents',
                submissionType: 'Other Documents'
            }
        };

        // Validate folder existence and get additional info
        const folderDetails = {};

        for (const [submissionType, config] of Object.entries(folderConfig)) {
            if (config.id) {
                try {
                    const folderInfo = await driveService.getFolderInfo(config.id);
                    folderDetails[submissionType] = {
                        ...config,
                        exists: true,
                        driveInfo: {
                            name: folderInfo.name,
                            createdTime: folderInfo.createdTime,
                            modifiedTime: folderInfo.modifiedTime
                        }
                    };
                } catch (error) {
                    folderDetails[submissionType] = {
                        ...config,
                        exists: false,
                        error: error.message
                    };
                }
            } else {
                folderDetails[submissionType] = {
                    ...config,
                    exists: false,
                    error: 'Folder ID not configured'
                };
            }
        }

        return NextResponse.json({
            success: true,
            data: {
                folders: folderDetails,
                summary: {
                    total: Object.keys(folderConfig).length,
                    configured: Object.values(folderDetails).filter(f => f.exists).length,
                    missing: Object.values(folderDetails).filter(f => !f.exists).length
                }
            }
        });
    } catch (error) {
        console.error('Error fetching folder information:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch folder information' },
            { status: 500 }
        );
    }
}

// POST - Create missing folders
export async function POST(request) {
    try {
        const { submissionTypes, parentFolderId } = await request.json();

        if (!submissionTypes || !Array.isArray(submissionTypes)) {
            return NextResponse.json(
                { success: false, error: 'Submission types array is required' },
                { status: 400 }
            );
        }

        const driveService = new GoogleDriveService();
        const results = [];

        const folderNames = {
            default: 'NTCOGK Submissions - Default',
            'Monthly Report': 'NTCOGK Submissions - Monthly Reports',
            'Financial Statement': 'NTCOGK Submissions - Financial Statements',
            'Event Proposal': 'NTCOGK Submissions - Event Proposals',
            'Ministry Update': 'NTCOGK Submissions - Ministry Updates',
            'Building/Property Documents': 'NTCOGK Submissions - Building Property Documents',
            'Membership Records': 'NTCOGK Submissions - Membership Records',
            'Pastoral Credentials': 'NTCOGK Submissions - Pastoral Credentials',
            'Other Documents': 'NTCOGK Submissions - Other Documents'
        };

        for (const submissionType of submissionTypes) {
            try {
                const folderName = folderNames[submissionType] || `NTCOGK Submissions - ${submissionType}`;
                const result = await driveService.createFolder(folderName, parentFolderId);

                results.push({
                    submissionType,
                    success: true,
                    folderId: result.id,
                    folderName: result.name,
                    message: `Folder created successfully`
                });
            } catch (error) {
                results.push({
                    submissionType,
                    success: false,
                    error: error.message
                });
            }
        }

        return NextResponse.json({
            success: true,
            data: {
                results,
                message: 'Folder creation completed',
                note: 'Please update your .env.local file with the new folder IDs'
            }
        });
    } catch (error) {
        console.error('Error creating folders:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create folders' },
            { status: 500 }
        );
    }
}