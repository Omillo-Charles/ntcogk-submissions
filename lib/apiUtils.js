export const apiResponse = {
    success: (data, status = 200) => {
        return new Response(JSON.stringify({
            success: true,
            data
        }), {
            status,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    },

    error: (message, status = 500, details = null) => {
        return new Response(JSON.stringify({
            success: false,
            error: message,
            ...(details && { details })
        }), {
            status,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
};

export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validateFileType = (mimeType, allowedTypes = []) => {
    if (allowedTypes.length === 0) return true;
    return allowedTypes.includes(mimeType);
};

export const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};