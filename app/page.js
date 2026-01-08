import Submit from "../components/submit";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-[#1E4E9A] text-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
              Document Submission Portal
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-blue-100 mb-6 font-medium">
              New Testament Church of God Kenya
            </p>
            <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              Submit your documents securely and efficiently. Follow our simple 3-step process to complete your submission in minutes.
            </p>
          </div>
        </div>
      </div>

      {/* Info Cards - Visible on all screens now but optimized */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 mb-8 sm:mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-white rounded-xl shadow-md p-5 sm:p-6 text-center transform transition hover:-translate-y-1">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-100">
              <svg className="w-6 h-6 text-[#1E4E9A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Easy Process</h3>
            <p className="text-sm text-gray-600 leading-relaxed">Simple 3-step submission process designed for everyone.</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-5 sm:p-6 text-center transform transition hover:-translate-y-1">
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-100">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Secure</h3>
            <p className="text-sm text-gray-600 leading-relaxed">Your documents are encrypted and stored in secure collections.</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-5 sm:p-6 text-center transform transition hover:-translate-y-1 sm:col-span-2 md:col-span-1">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-100">
              <svg className="w-6 h-6 text-[#E02020]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Fast</h3>
            <p className="text-sm text-gray-600 leading-relaxed">Quick processing and immediate digital confirmation.</p>
          </div>
        </div>
      </div>

      {/* Submit Component */}
      <Submit />

      {/* Help Section */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-[#1E4E9A]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help?</h3>
              <p className="text-gray-700 mb-3">
                If you encounter any issues or have questions about the submission process, please contact our support team.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="mailto:info@ntcogk.org"
                  className="inline-flex items-center text-[#1E4E9A] hover:text-[#163E7A] font-medium"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  info@ntcogk.org
                </a>
                <a
                  href="tel:+254759120222"
                  className="inline-flex items-center text-[#1E4E9A] hover:text-[#163E7A] font-medium"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  +254 759 120 222
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
