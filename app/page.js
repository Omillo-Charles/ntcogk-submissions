import Submit from "../components/submit";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 pt-12 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Submit />
      </div>

      {/* Help Section */}
      <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24">
        <div className="bg-white border border-gray-100 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Background accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 opacity-50"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="flex-shrink-0 w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">Need assistance?</h3>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed font-light">
                Our support team is available to help you with any technical difficulties or questions regarding the submission process.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 sm:gap-6">
                <a
                  href="mailto:info@ntcogk.org"
                  className="inline-flex items-center px-6 py-3 bg-gray-50 text-[#1E4E9A] hover:bg-blue-600 hover:text-white rounded-xl font-semibold transition-all duration-300 border border-blue-100 shadow-sm"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  info@ntcogk.org
                </a>
                <a
                  href="tel:+254759120222"
                  className="inline-flex items-center px-6 py-3 bg-gray-50 text-[#1E4E9A] hover:bg-blue-600 hover:text-white rounded-xl font-semibold transition-all duration-300 border border-blue-100 shadow-sm"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
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
