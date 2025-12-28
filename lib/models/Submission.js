import mongoose from 'mongoose';

const SubmissionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    submitterName: {
        type: String,
        required: true,
        trim: true
    },
    submitterEmail: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    submitterPhone: {
        type: String,
        trim: true
    },
    submitterPosition: {
        type: String,
        trim: true
    },
    churchBranch: {
        type: String,
        trim: true
    },
    churchRegion: {
        type: String,
        trim: true
    },
    urgencyLevel: {
        type: String,
        enum: ['low', 'normal', 'high', 'critical'],
        default: 'normal'
    },
    submissionType: {
        type: String,
        required: true,
        enum: ['Monthly Report', 'Financial Statement', 'Event Proposal', 'Ministry Update', 'Building/Property Documents', 'Membership Records', 'Pastoral Credentials', 'Other Documents']
    },
    files: [{
        originalName: String,
        driveFileId: String,
        driveFileUrl: String,
        mimeType: String,
        size: Number,
        folderId: String,
        submissionType: String
    }],
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    reviewNotes: {
        type: String,
        default: ''
    },
    submittedAt: {
        type: Date,
        default: Date.now
    },
    reviewedAt: {
        type: Date
    },
    reviewedBy: {
        type: String
    }
}, {
    timestamps: true
});

export default mongoose.models.Submission || mongoose.model('Submission', SubmissionSchema);