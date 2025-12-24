# NTCOGK Submissions Backend Setup Guide

This guide will walk you through obtaining all the required credentials and setting up the backend system.

## 1. MongoDB Setup

### Option A: MongoDB Atlas (Cloud - Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account or sign in
3. Create a new cluster (free tier available)
4. Click "Connect" on your cluster
5. Choose "Connect your application"
6. Copy the connection string, it looks like:
   ```
   mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
7. Replace `<password>` with your actual password
8. Add your database name at the end: `/ntcogk_submissions`
9. Final format: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ntcogk_submissions`

### Option B: Local MongoDB

1. Install MongoDB locally
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/ntcogk_submissions`

## 2. Google Drive API Setup

### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter project name: "NTCOGK Submissions"
4. Click "Create"

### Step 2: Enable Google Drive API

1. In your project, go to "APIs & Services" → "Library"
2. Search for "Google Drive API"
3. Click on it and press "Enable"

### Step 3: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth 2.0 Client ID"
3. If prompted, configure OAuth consent screen:
   - Choose "External" user type
   - Fill in app name: "NTCOGK Submissions"
   - Add your email as developer contact
   - Save and continue through all steps
4. Back to credentials, choose "Web application"
5. Name: "NTCOGK Submissions Backend"
6. Add authorized redirect URIs:
   - `http://localhost:3000/auth/callback`
   - `https://developers.google.com/oauthplayground`
7. Click "Create"
8. Copy the **Client ID** and **Client Secret**

### Step 4: Get Refresh Token

#### Method 1: Using OAuth 2.0 Playground (Easier)

1. Go to [OAuth 2.0 Playground](https://developers.google.com/oauthplayground/)
2. Click the gear icon (⚙️) in top right
3. Check "Use your own OAuth credentials"
4. Enter your Client ID and Client Secret
5. In the left panel, find "Drive API v3"
6. Select these scopes:
   - `https://www.googleapis.com/auth/drive.file`
   - `https://www.googleapis.com/auth/drive`
7. Click "Authorize APIs"
8. Sign in with your Google account
9. Click "Exchange authorization code for tokens"
10. Copy the **Refresh Token**

#### Method 2: Using Your Application (Advanced)

Create a simple Node.js script to get the refresh token through your app's OAuth flow.

### Step 5: Create Google Drive Folders

You need to create separate folders for different submission types:

1. Go to [Google Drive](https://drive.google.com/)
2. Create a main folder: "NTCOGK Submissions"
3. Inside the main folder, create these subfolders:

   - "Default" (for uncategorized submissions)
   - "Monthly Reports" (for monthly church reports)
   - "Financial Statements" (for financial documents)
   - "Event Proposals" (for event planning documents)
   - "Ministry Updates" (for ministry-related updates)
   - "Building Property Documents" (for property and building documents)
   - "Membership Records" (for membership-related documents)
   - "Pastoral Credentials" (for pastoral certification documents)
   - "Other Documents" (for any other document types)

4. For each folder, copy the folder ID from the URL:
   ```
   https://drive.google.com/drive/folders/1abcdefghijklmnopqrstuvwxyz123456789
                                          ↑ This is your FOLDER_ID
   ```

**Alternative: Use the API to create folders automatically**

After setting up your credentials, you can use the `/api/folders` endpoint to create folders:

```bash
curl -X POST http://localhost:3000/api/folders \
  -H "Content-Type: application/json" \
  -d '{"submissionTypes": ["default", "Monthly Report", "Financial Statement", "Event Proposal", "Ministry Update", "Building/Property Documents", "Membership Records", "Pastoral Credentials", "Other Documents"]}'
```

This will create all the folders and return their IDs for you to add to your `.env.local` file.

## 3. Environment Variables Setup

Update your `.env.local` file with the obtained values:

```env
# MongoDB - From Step 1
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ntcogk_submissions

# Google Drive API - From Step 3
GOOGLE_DRIVE_CLIENT_ID=123456789012-abcdefghijklmnopqrstuvwxyz123456.apps.googleusercontent.com
GOOGLE_DRIVE_CLIENT_SECRET=GOCSPX-abcdefghijklmnopqrstuvwxyz123456
GOOGLE_DRIVE_REDIRECT_URI=http://localhost:3000/auth/callback

# Google Drive - From Step 4
GOOGLE_DRIVE_REFRESH_TOKEN=1//0abcdefghijklmnopqrstuvwxyz123456789

# Google Drive Folders - From Step 5
GOOGLE_DRIVE_DEFAULT_FOLDER_ID=1abcdefghijklmnopqrstuvwxyz123456789
GOOGLE_DRIVE_DOCUMENTS_FOLDER_ID=1abcdefghijklmnopqrstuvwxyz123456789
GOOGLE_DRIVE_IMAGES_FOLDER_ID=1abcdefghijklmnopqrstuvwxyz123456789
GOOGLE_DRIVE_VIDEOS_FOLDER_ID=1abcdefghijklmnopqrstuvwxyz123456789
GOOGLE_DRIVE_AUDIO_FOLDER_ID=1abcdefghijklmnopqrstuvwxyz123456789
GOOGLE_DRIVE_OTHER_FOLDER_ID=1abcdefghijklmnopqrstuvwxyz123456789

# Generate random secret (run: openssl rand -base64 32)
NEXTAUTH_SECRET=your_32_character_random_secret_key_here
NEXTAUTH_URL=http://localhost:3000
```

## 4. Generate NextAuth Secret

Run this command in your terminal to generate a secure secret:

```bash
openssl rand -base64 32
```

Or use an online generator: [Generate Random String](https://www.random.org/strings/)

## 5. Install Dependencies and Test

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Test the setup
curl http://localhost:3000/api/health
```

The health endpoint should return something like:

```json
{
  "status": "ok",
  "timestamp": "2024-12-24T...",
  "services": {
    "mongodb": "connected",
    "googleDrive": "configured",
    "environment": "complete"
  }
}
```

## 6. Troubleshooting

### MongoDB Connection Issues

- Check if your IP is whitelisted in MongoDB Atlas
- Verify username/password are correct
- Ensure database name is included in connection string

### Google Drive API Issues

- Verify OAuth consent screen is configured
- Check if refresh token is still valid
- Ensure all required scopes are granted
- Verify folder ID is correct and accessible

### Environment Variable Issues

- Restart your development server after changing `.env.local`
- Check for typos in variable names
- Ensure no extra spaces or quotes around values

## 7. Security Notes

- Never commit `.env.local` to version control
- Use different credentials for production
- Regularly rotate your secrets
- Monitor Google Drive API usage quotas
- Set up proper backup for MongoDB data

## 8. Production Deployment

For production deployment:

1. Use environment variables in your hosting platform
2. Set up proper domain for OAuth redirect URIs
3. Use production MongoDB cluster
4. Create separate Google Drive folder for production
5. Generate new production secrets
