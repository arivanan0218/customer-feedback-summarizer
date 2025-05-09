// function FeedbackSummary({ summary }) {
//   return (
//     <div className="card bg-gradient-to-r from-primary-50 to-white border-l-4 border-primary-500">
//       <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//         </svg>
//         AI-Generated Summary
//       </h3>
//       <div className="prose prose-sm max-w-none">
//         {summary.split('\n\n').map((paragraph, index) => (
//           <p key={index} className="mb-4 text-gray-800 leading-relaxed">{paragraph}</p>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default FeedbackSummary;

function FeedbackSummary({ summary }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 py-3 px-6">
        <div className="flex items-center">
          {/* Light bulb icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <h3 className="ml-2 text-lg font-medium text-white">AI-Generated Insights</h3>
        </div>
      </div>
      
      <div className="p-6 bg-gradient-to-br from-white to-primary-50">
        <div className="space-y-4">
          {summary.split('\n\n').map((paragraph, index) => (
            <div key={index} className="flex">
              {index === 0 && (
                <div className="flex-shrink-0 mr-3 mt-1">
                  <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-primary-700 text-lg font-bold">↑</span>
                  </div>
                </div>
              )}
              <p className={`text-gray-700 leading-relaxed ${index === 0 ? 'text-base font-medium' : 'text-sm'}`}>
                {paragraph}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-gray-50 px-6 py-3 flex justify-between items-center border-t border-gray-100">
        <div className="flex items-center text-xs text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-primary-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          Based on your feedback data
        </div>
        <div className="text-xs font-medium text-primary-600">
          Powered by Gemini AI
        </div>
      </div>
    </div>
  );
}

export default FeedbackSummary;