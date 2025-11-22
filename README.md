# NTCG Kenya - Submissions Handler

Secure document submission portal for NTCG Kenya churches and members.

## Features

- 3-step submission process (User Details → Church Details → Submission)
- File upload with drag & drop support
- Multiple file handling (PDF, DOC, DOCX, XLS, XLSX, JPG, PNG)
- Church selection by region
- Urgency level selection
- Real-time form validation
- Responsive design for mobile and desktop

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUBMISSIONS_API_URL=http://localhost:5501/api/submissions
```

For production:
```env
NEXT_PUBLIC_SUBMISSIONS_API_URL=https://api.ntcogk.org/api/submissions
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3002`

### 4. Start Backend API

Make sure the submissions backend is running:

```bash
cd ../New-Testament-Backend/submissions
npm start
```

The API will be available at `http://localhost:5501`

## Project Structure

```
submissions-handler/
├── app/
│   ├── globals.css          # Global styles with NTCG branding
│   ├── layout.js            # Root layout with SEO and metadata
│   └── page.js              # Home page with hero and submit component
├── components/
│   ├── churches.jsx         # Church data by region
│   ├── footer.jsx           # Footer component
│   ├── navbar.jsx           # Navigation bar
│   └── submit.jsx           # Main submission form component
└── public/
    ├── fonts/               # Custom fonts
    ├── icons/               # Favicon and icons
    └── mainLogo.png         # NTCG Kenya logo
```

## API Integration

The submission form connects to the backend API at:
- **Endpoint**: `POST /api/submissions`
- **Content-Type**: `multipart/form-data`

### Request Format

```javascript
FormData {
  fullName: string,
  email: string,
  phone: string,
  position: string,
  branch: string,
  region: string,
  submissionType: string,
  urgency: string,
  description: string,
  subject: string,
  files: File[]
}
```

### Response Format

```json
{
  "success": true,
  "message": "Submission created successfully",
  "data": {
    "submissionId": "SUB-20241122-XXXX",
    "submission": { ... }
  }
}
```

## Deployment

### Vercel Deployment

1. Push code to GitHub
2. Import project in Vercel
3. Set environment variables:
   - `NEXT_PUBLIC_SUBMISSIONS_API_URL`
4. Deploy

### Custom Domain Setup

Configure DNS records for `submissions.ntcogk.org`:
- Type: CNAME
- Name: submissions
- Value: cname.vercel-dns.com

## Support

For issues or questions, contact:
- Email: info@ntcogk.org
- Phone: +254 759 120 222
