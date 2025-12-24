# NTCOGK Submissions Backend

A Next.js backend system for handling file submissions with MongoDB metadata storage and Google Drive file storage.

## Features

- **File Upload**: Upload files to Google Drive with metadata stored in MongoDB
- **Submission Management**: Create, read, update, and delete submissions
- **Review System**: Approve/reject submissions with review notes
- **Statistics Dashboard**: Get submission statistics and analytics
- **Category Support**: Organize submissions by categories (document, image, video, audio, other)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env.local` file with the following variables:

```env
# MongoDB Configuration
MONGODB_URI=your_mongodb_connection_string_here

# Google Drive API Configuration
GOOGLE_DRIVE_CLIENT_ID=your_google_drive_client_id
GOOGLE_DRIVE_CLIENT_SECRET=your_google_drive_client_secret
GOOGLE_DRIVE_REDIRECT_URI=your_redirect_uri
GOOGLE_DRIVE_REFRESH_TOKEN=your_refresh_token
GOOGLE_DRIVE_FOLDER_ID=your_drive_folder_id

# Next.js Configuration
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
```

### 3. Google Drive API Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google Drive API
4. Create credentials (OAuth 2.0 Client ID)
5. Set up OAuth consent screen
6. Generate refresh token using OAuth playground or your application

### 4. MongoDB Setup

1. Create a MongoDB database (local or cloud)
2. Get your connection string
3. Add it to the `MONGODB_URI` environment variable

### 5. Run the Application

```bash
npm run dev
```

## API Endpoints

### Submissions

- `GET /api/submissions` - Get all submissions with pagination and filtering
- `POST /api/submissions` - Create new submission with file uploads
- `GET /api/submissions/[id]` - Get single submission
- `PUT /api/submissions/[id]` - Update submission (review/approval)
- `DELETE /api/submissions/[id]` - Delete submission and associated files

### Statistics

- `GET /api/stats` - Get submission statistics and analytics

## Usage Examples

### Create Submission

```javascript
const formData = new FormData();
formData.append("title", "My Submission");
formData.append("description", "Description here");
formData.append("submitterName", "John Doe");
formData.append("submitterEmail", "john@example.com");
formData.append("category", "document");
formData.append("files", fileInput.files[0]);

const response = await fetch("/api/submissions", {
  method: "POST",
  body: formData,
});
```

### Get Submissions

```javascript
const response = await fetch("/api/submissions?status=pending&page=1&limit=10");
const data = await response.json();
```

### Update Submission Status

```javascript
const response = await fetch(`/api/submissions/${submissionId}`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    status: "approved",
    reviewNotes: "Looks good!",
    reviewedBy: "Admin User",
  }),
});
```

## Database Schema

### Submission Model

```javascript
{
  title: String (required),
  description: String (required),
  submitterName: String (required),
  submitterEmail: String (required),
  category: String (enum: ['document', 'image', 'video', 'audio', 'other']),
  files: [{
    originalName: String,
    driveFileId: String,
    driveFileUrl: String,
    mimeType: String,
    size: Number
  }],
  status: String (enum: ['pending', 'approved', 'rejected'], default: 'pending'),
  reviewNotes: String,
  submittedAt: Date,
  reviewedAt: Date,
  reviewedBy: String
}
```

## File Storage

Files are stored in Google Drive with the following structure:

- Main folder (specified by `GOOGLE_DRIVE_FOLDER_ID`)
- Files are uploaded with original names
- Public read access is granted automatically
- File metadata is stored in MongoDB for quick access

## Security Considerations

- Validate file types and sizes before upload
- Sanitize user inputs
- Implement rate limiting for API endpoints
- Use proper authentication for admin operations
- Regularly backup MongoDB data
- Monitor Google Drive storage usage

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```
