import { google } from 'googleapis';
import { Readable } from 'stream';

class GoogleDriveService {
    constructor() {
        this.auth = new google.auth.OAuth2(
            process.env.GOOGLE_DRIVE_CLIENT_ID,
            process.env.GOOGLE_DRIVE_CLIENT_SECRET,
            process.env.GOOGLE_DRIVE_REDIRECT_URI
        );

        this.auth.setCredentials({
            refresh_token: process.env.GOOGLE_DRIVE_REFRESH_TOKEN
        });

        this.drive = google.drive({ version: 'v3', auth: this.auth });

        // Folder mapping based on submission type
        this.folderMapping = {
            'Monthly Report': process.env.GOOGLE_DRIVE_MONTHLY_REPORT_FOLDER_ID,
            'Financial Statement': process.env.GOOGLE_DRIVE_FINANCIAL_STATEMENT_FOLDER_ID,
            'Event Proposal': process.env.GOOGLE_DRIVE_EVENT_PROPOSAL_FOLDER_ID,
            'Ministry Update': process.env.GOOGLE_DRIVE_MINISTRY_UPDATE_FOLDER_ID,
            'Building/Property Documents': process.env.GOOGLE_DRIVE_BUILDING_PROPERTY_DOCUMENTS_FOLDER_ID,
            'Membership Records': process.env.GOOGLE_DRIVE_MEMBERSHIP_RECORDS_FOLDER_ID,
            'Pastoral Credentials': process.env.GOOGLE_DRIVE_PASTORAL_CREDENTIALS_FOLDER_ID,
            'Other Documents': process.env.GOOGLE_DRIVE_OTHER_DOCUMENTS_FOLDER_ID,
            'default': process.env.GOOGLE_DRIVE_DEFAULT_FOLDER_ID
        };
    }

    getFolderIdBySubmissionType(submissionType) {
        return this.folderMapping[submissionType] || this.folderMapping['default'];
    }

    async uploadFile(fileBuffer, fileName, mimeType, submissionType = 'default', customFolderId = null) {
        try {
            // Determine which folder to use
            const folderId = customFolderId || this.getFolderIdBySubmissionType(submissionType);

            if (!folderId) {
                throw new Error(`No folder configured for submission type: ${submissionType}`);
            }

            const fileMetadata = {
                name: fileName,
                parents: [folderId]
            };

            const media = {
                mimeType: mimeType,
                body: Readable.from(fileBuffer)
            };

            // Upload file and set permissions in parallel
            const [uploadResponse] = await Promise.all([
                this.drive.files.create({
                    resource: fileMetadata,
                    media: media,
                    fields: 'id, name, webViewLink, webContentLink, parents'
                })
            ]);

            // Set permissions asynchronously (don't wait for it)
            this.drive.permissions.create({
                fileId: uploadResponse.data.id,
                resource: {
                    role: 'reader',
                    type: 'anyone'
                }
            }).catch(error => {
                console.warn('Warning: Could not set file permissions:', error.message);
            });

            return {
                id: uploadResponse.data.id,
                name: uploadResponse.data.name,
                webViewLink: uploadResponse.data.webViewLink,
                webContentLink: uploadResponse.data.webContentLink,
                folderId: folderId,
                submissionType: submissionType
            };
        } catch (error) {
            console.error('Error uploading file to Google Drive:', error);
            throw new Error(`Failed to upload file to Google Drive: ${error.message}`);
        }
    }

    async deleteFile(fileId) {
        try {
            await this.drive.files.delete({
                fileId: fileId
            });
            return true;
        } catch (error) {
            console.error('Error deleting file from Google Drive:', error);
            throw new Error('Failed to delete file from Google Drive');
        }
    }

    async createFolder(folderName, parentFolderId = null, submissionType = 'default') {
        try {
            const parentId = parentFolderId || this.getFolderIdBySubmissionType(submissionType);

            const fileMetadata = {
                name: folderName,
                mimeType: 'application/vnd.google-apps.folder',
                parents: parentId ? [parentId] : undefined
            };

            const response = await this.drive.files.create({
                resource: fileMetadata,
                fields: 'id, name, parents'
            });

            return {
                id: response.data.id,
                name: response.data.name,
                parentId: parentId
            };
        } catch (error) {
            console.error('Error creating folder in Google Drive:', error);
            throw new Error('Failed to create folder in Google Drive');
        }
    }

    async moveFile(fileId, newFolderId) {
        try {
            // Get current file metadata to find current parents
            const file = await this.drive.files.get({
                fileId: fileId,
                fields: 'parents'
            });

            const previousParents = file.data.parents.join(',');

            // Move the file to new folder
            const response = await this.drive.files.update({
                fileId: fileId,
                addParents: newFolderId,
                removeParents: previousParents,
                fields: 'id, parents'
            });

            return {
                id: response.data.id,
                newParents: response.data.parents
            };
        } catch (error) {
            console.error('Error moving file in Google Drive:', error);
            throw new Error('Failed to move file in Google Drive');
        }
    }

    async listFolders() {
        try {
            const response = await this.drive.files.list({
                q: "mimeType='application/vnd.google-apps.folder'",
                fields: 'files(id, name, parents)',
                pageSize: 100
            });

            return response.data.files;
        } catch (error) {
            console.error('Error listing folders from Google Drive:', error);
            throw new Error('Failed to list folders from Google Drive');
        }
    }

    // Get folder info by ID
    async getFolderInfo(folderId) {
        try {
            const response = await this.drive.files.get({
                fileId: folderId,
                fields: 'id, name, parents, createdTime, modifiedTime'
            });

            return response.data;
        } catch (error) {
            console.error('Error getting folder info from Google Drive:', error);
            throw new Error('Failed to get folder info from Google Drive');
        }
    }
}

export default GoogleDriveService;