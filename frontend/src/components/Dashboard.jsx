// import { useState } from 'react';
// import { toast } from 'react-toastify';
// import FileUpload from './FileUpload';
// import FeedbackSummary from './FeedbackSummary';
// import SentimentChart from './SentimentChart';
// import ThemeChart from './ThemeChart';
// import TimelineChart from './TimelineChart';
// import DashboardStats from './DashboardStats';
// import KeyIssuesTable from './KeyIssuesTable';
// import CategoryBreakdown from './CategoryBreakdown';
// import WordCloud from './WordCloud';
// import ComparisonChart from './ComparisonChart';
// import RatingChart from './RatingChart';

// function Dashboard({ 
//   analysisData, 
//   setAnalysisData, 
//   isLoading, 
//   setIsLoading, 
//   dataSample, 
//   setDataSample 
// }) {
//   const [activeTab, setActiveTab] = useState('overview');

//   const downloadTemplate = () => {
//     setIsLoading(true);
//     fetch('http://localhost:5000/api/template')
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Failed to download template');
//         }
//         return response.blob();
//       })
//       .then(blob => {
//         const url = window.URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = 'feedback_template.csv';
//         document.body.appendChild(a);
//         a.click();
//         a.remove();
//         toast.success('Template downloaded successfully!');
//       })
//       .catch(error => {
//         console.error('Error:', error);
//         toast.error('Failed to download template');
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Customer Feedback Analysis</h1>
//           <p className="text-gray-600">Upload customer feedback data to generate AI-powered insights and summaries</p>
//         </div>
//         <div className="flex gap-2">
//           <button
//             onClick={downloadTemplate}
//             disabled={isLoading}
//             className="btn-secondary flex items-center"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
//             </svg>
//             Download Template
//           </button>
//         </div>
//       </div>

//       <FileUpload 
//         setAnalysisData={setAnalysisData} 
//         setDataSample={setDataSample}
//         isLoading={isLoading}
//         setIsLoading={setIsLoading}
//       />

//       {analysisData && (
//         <>
//           <div className="bg-white shadow rounded-lg overflow-hidden">
//             <div className="border-b border-gray-200">
//               <nav className="-mb-px flex overflow-x-auto" aria-label="Tabs">
//                 <button
//                   onClick={() => setActiveTab('overview')}
//                   className={`py-4 px-6 text-center border-b-2 font-medium text-sm whitespace-nowrap ${
//                     activeTab === 'overview'
//                       ? 'border-primary-500 text-primary-600'
//                       : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                   }`}
//                 >
//                   Overview
//                 </button>
//                 <button
//                   onClick={() => setActiveTab('sentiment')}
//                   className={`py-4 px-6 text-center border-b-2 font-medium text-sm whitespace-nowrap ${
//                     activeTab === 'sentiment'
//                       ? 'border-primary-500 text-primary-600'
//                       : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                   }`}
//                 >
//                   Sentiment Analysis
//                 </button>
//                 <button
//                   onClick={() => setActiveTab('themes')}
//                   className={`py-4 px-6 text-center border-b-2 font-medium text-sm whitespace-nowrap ${
//                     activeTab === 'themes'
//                       ? 'border-primary-500 text-primary-600'
//                       : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                   }`}
//                 >
//                   Themes & Topics
//                 </button>
//                 <button
//                   onClick={() => setActiveTab('products')}
//                   className={`py-4 px-6 text-center border-b-2 font-medium text-sm whitespace-nowrap ${
//                     activeTab === 'products'
//                       ? 'border-primary-500 text-primary-600'
//                       : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                   }`}
//                 >
//                   Product Analysis
//                 </button>
//                 <button
//                   onClick={() => setActiveTab('timeline')}
//                   className={`py-4 px-6 text-center border-b-2 font-medium text-sm whitespace-nowrap ${
//                     activeTab === 'timeline'
//                       ? 'border-primary-500 text-primary-600'
//                       : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                   }`}
//                 >
//                   Timeline
//                 </button>
//                 <button
//                   onClick={() => setActiveTab('issues')}
//                   className={`py-4 px-6 text-center border-b-2 font-medium text-sm whitespace-nowrap ${
//                     activeTab === 'issues'
//                       ? 'border-primary-500 text-primary-600'
//                       : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                   }`}
//                 >
//                   Key Issues
//                 </button>
//                 <button
//                   onClick={() => setActiveTab('data')}
//                   className={`py-4 px-6 text-center border-b-2 font-medium text-sm whitespace-nowrap ${
//                     activeTab === 'data'
//                       ? 'border-primary-500 text-primary-600'
//                       : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                   }`}
//                 >
//                   Data Sample
//                 </button>
//               </nav>
//             </div>
            
//             <div className="p-6">
//               {activeTab === 'overview' && (
//                 <div className="space-y-6">
//                   <FeedbackSummary summary={analysisData.summary} />
                  
//                   <DashboardStats analysis={analysisData.analysis} />
                  
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="card">
//                       <h3 className="text-lg font-medium text-gray-900 mb-4">Sentiment Distribution</h3>
//                       <SentimentChart data={analysisData.analysis.sentiment_distribution} />
//                     </div>
                    
//                     <div className="card">
//                       <h3 className="text-lg font-medium text-gray-900 mb-4">Product Distribution</h3>
//                       <div className="h-64">
//                         <ThemeChart 
//                           data={Object.entries(analysisData.analysis.product_distribution.counts).map(([name, value]) => ({ name, value }))} 
//                           colors={['#60a5fa', '#93c5fd', '#bfdbfe', '#dbeafe', '#eff6ff']}
//                         />
//                       </div>
//                     </div>
//                   </div>
                  
//                   {analysisData.analysis.comparison_data && (
//                     <div className="card">
//                       <h3 className="text-lg font-medium text-gray-900 mb-4">Period Comparison</h3>
//                       <ComparisonChart data={analysisData.analysis.comparison_data} />
//                     </div>
//                   )}
//                 </div>
//               )}
              
//               {activeTab === 'sentiment' && (
//                 <div className="space-y-6">
//                   <div className="card">
//                     <h3 className="text-lg font-medium text-gray-900 mb-4">Sentiment Analysis</h3>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//                       <div className="bg-green-50 rounded-lg p-4 border border-green-200">
//                         <div className="text-green-800 text-sm font-medium mb-1">Positive Feedback</div>
//                         <div className="text-3xl font-bold text-green-700">
//                           {analysisData.analysis.sentiment_distribution.percentages.positive}%
//                         </div>
//                       </div>
//                       <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
//                         <div className="text-blue-800 text-sm font-medium mb-1">Neutral Feedback</div>
//                         <div className="text-3xl font-bold text-blue-700">
//                           {analysisData.analysis.sentiment_distribution.percentages.neutral}%
//                         </div>
//                       </div>
//                       <div className="bg-red-50 rounded-lg p-4 border border-red-200">
//                         <div className="text-red-800 text-sm font-medium mb-1">Negative Feedback</div>
//                         <div className="text-3xl font-bold text-red-700">
//                           {analysisData.analysis.sentiment_distribution.percentages.negative}%
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className="h-64">
//                       <SentimentChart data={analysisData.analysis.sentiment_distribution} />
//                     </div>
//                   </div>
                  
//                   {analysisData.analysis.word_frequencies && (
//                     <div className="card">
//                       <h3 className="text-lg font-medium text-gray-900 mb-4">Word Frequency Analysis</h3>
//                       <div className="h-80">
//                         <WordCloud 
//                           words={analysisData.analysis.word_frequencies.map(item => ({ 
//                             text: item.word, 
//                             value: item.count 
//                           }))}
//                         />
//                       </div>
//                     </div>
//                   )}
                  
//                   {analysisData.analysis.ratings_distribution && (
//                     <div className="card">
//                       <h3 className="text-lg font-medium text-gray-900 mb-4">Rating Distribution</h3>
//                       <div className="flex items-center mb-4">
//                         <div className="text-3xl font-bold text-primary-600">
//                           {analysisData.analysis.ratings_distribution.average}
//                         </div>
//                         <div className="text-gray-500 ml-2">Average Rating</div>
//                       </div>
//                       <div className="h-64">
//                         <RatingChart data={analysisData.analysis.ratings_distribution} />
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )}
              
//               {activeTab === 'themes' && (
//                 <div className="space-y-6">
//                   <div className="card">
//                     <h3 className="text-lg font-medium text-gray-900 mb-4">Common Themes</h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                       {analysisData.analysis.common_themes.map((theme, index) => (
//                         <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
//                           <div className="text-primary-700 text-sm font-medium mb-2">Theme {theme.id + 1}</div>
//                           <div className="flex flex-wrap gap-2">
//                             {theme.keywords.map((keyword, kIndex) => (
//                               <span 
//                                 key={kIndex} 
//                                 className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
//                               >
//                                 {keyword}
//                               </span>
//                             ))}
//                           </div>
//                           {theme.weight && (
//                             <div className="mt-2 text-xs text-gray-500">
//                               Relevance: {Math.round(theme.weight * 100)}%
//                             </div>
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
                  
//                   {analysisData.analysis.key_phrases && (
//                     <div className="card">
//                       <h3 className="text-lg font-medium text-gray-900 mb-4">Key Phrases</h3>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         {analysisData.analysis.key_phrases.map((phrase, index) => (
//                           <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
//                             <div className="flex-grow">
//                               <span className="text-gray-800">{phrase.phrase}</span>
//                             </div>
//                             <div className="ml-2">
//                               <span className="text-xs font-medium text-gray-500">
//                                 Score: {phrase.score.toFixed(2)}
//                               </span>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )}
              
//               {activeTab === 'products' && (
//                 <div className="space-y-6">
//                   <div className="card">
//                     <h3 className="text-lg font-medium text-gray-900 mb-4">Product/Service Breakdown</h3>
//                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                       <div className="h-64">
//                         <ThemeChart 
//                           data={Object.entries(analysisData.analysis.product_distribution.counts).map(([name, value]) => ({ name, value }))} 
//                           colors={['#60a5fa', '#93c5fd', '#bfdbfe', '#dbeafe', '#eff6ff']}
//                         />
//                       </div>
//                       <div>
//                         <table className="min-w-full divide-y divide-gray-200">
//                           <thead className="bg-gray-50">
//                             <tr>
//                               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product/Service</th>
//                               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Count</th>
//                               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
//                               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sentiment</th>
//                             </tr>
//                           </thead>
//                           <tbody className="bg-white divide-y divide-gray-200">
//                             {Object.entries(analysisData.analysis.product_distribution.counts).map(([product, count], index) => {
//                               const percentage = ((count / analysisData.analysis.sample_size) * 100).toFixed(1);
//                               const sentiment = analysisData.analysis.product_distribution.product_sentiment[product].average_sentiment;
//                               return (
//                                 <tr key={index}>
//                                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product}</td>
//                                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{count}</td>
//                                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{percentage}%</td>
//                                   <td className="px-6 py-4 whitespace-nowrap text-sm">
//                                     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                                       sentiment > 0.2 ? 'bg-green-100 text-green-800' : 
//                                       sentiment < -0.2 ? 'bg-red-100 text-red-800' : 
//                                       'bg-blue-100 text-blue-800'
//                                     }`}>
//                                       {sentiment.toFixed(2)}
//                                     </span>
//                                   </td>
//                                 </tr>
//                               );
//                             })}
//                           </tbody>
//                         </table>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <CategoryBreakdown 
//                     products={analysisData.analysis.product_distribution} 
//                   />
//                 </div>
//               )}
              
//               {activeTab === 'timeline' && (
//                 <div className="space-y-6">
//                   <div className="card">
//                     <h3 className="text-lg font-medium text-gray-900 mb-4">Feedback Over Time</h3>
//                     <div className="h-80">
//                       <TimelineChart data={analysisData.analysis.time_series} />
//                     </div>
//                   </div>
                  
//                   {analysisData.analysis.ratings_distribution?.trends && (
//                     <div className="card">
//                       <h3 className="text-lg font-medium text-gray-900 mb-4">Rating Trends</h3>
//                       <div className="h-64">
//                         <RatingChart 
//                           data={analysisData.analysis.ratings_distribution} 
//                           showTrends={true}
//                         />
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )}
              
//               {activeTab === 'issues' && (
//                 <div className="space-y-6">
//                   <div className="card">
//                     <h3 className="text-lg font-medium text-gray-900 mb-4">Key Issues Identified</h3>
//                     <KeyIssuesTable issues={analysisData.analysis.key_issues || []} />
//                   </div>
                  
//                   {analysisData.analysis.category_correlations && (
//                     <div className="card">
//                       <h3 className="text-lg font-medium text-gray-900 mb-4">Category Correlations</h3>
//                       <div className="overflow-x-auto">
//                         <table className="min-w-full divide-y divide-gray-200">
//                           <thead className="bg-gray-50">
//                             <tr>
//                               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
//                               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Correlation with Sentiment</th>
//                               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interpretation</th>
//                             </tr>
//                           </thead>
//                           <tbody className="bg-white divide-y divide-gray-200">
//                             {analysisData.analysis.category_correlations.map((item, index) => {
//                               let interpretation;
//                               let colorClass;
                              
//                               if (item.correlation > 0.5) {
//                                 interpretation = "Strong positive correlation";
//                                 colorClass = "text-green-600";
//                               } else if (item.correlation > 0.2) {
//                                 interpretation = "Moderate positive correlation";
//                                 colorClass = "text-green-500";
//                               } else if (item.correlation > 0) {
//                                 interpretation = "Weak positive correlation";
//                                 colorClass = "text-green-400";
//                               } else if (item.correlation > -0.2) {
//                                 interpretation = "Weak negative correlation";
//                                 colorClass = "text-red-400";
//                               } else if (item.correlation > -0.5) {
//                                 interpretation = "Moderate negative correlation";
//                                 colorClass = "text-red-500";
//                               } else {
//                                 interpretation = "Strong negative correlation";
//                                 colorClass = "text-red-600";
//                               }
                              
//                               return (
//                                 <tr key={index}>
//                                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.category}</td>
//                                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.correlation.toFixed(2)}</td>
//                                   <td className={`px-6 py-4 whitespace-nowrap text-sm ${colorClass}`}>{interpretation}</td>
//                                 </tr>
//                               );
//                             })}
//                           </tbody>
//                         </table>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )}
              
//               {activeTab === 'data' && dataSample && (
//                 <div className="card">
//                   <h3 className="text-lg font-medium text-gray-900 mb-4">Data Sample</h3>
//                   <div className="overflow-x-auto">
//                     <table className="min-w-full divide-y divide-gray-200">
//                       <thead className="bg-gray-50">
//                         <tr>
//                           {Object.keys(dataSample[0]).map((header, index) => (
//                             <th 
//                               key={index}
//                               scope="col" 
//                               className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                             >
//                               {header}
//                             </th>
//                           ))}
//                         </tr>
//                       </thead>
//                       <tbody className="bg-white divide-y divide-gray-200">
//                         {dataSample.map((row, rowIndex) => (
//                           <tr key={rowIndex}>
//                             {Object.values(row).map((cell, cellIndex) => {
//                               // Format date cells
//                               const key = Object.keys(row)[cellIndex];
//                               let formattedCell = cell;
                              
//                               if (key === 'date' && cell) {
//                                 try {
//                                   formattedCell = new Date(cell).toLocaleDateString();
//                                 } catch (e) {}
//                               }
                              
//                               // Truncate long text
//                               if (typeof formattedCell === 'string' && formattedCell.length > 100) {
//                                 formattedCell = formattedCell.substring(0, 100) + '...';
//                               }
                              
//                               return (
//                                 <td 
//                                   key={cellIndex}
//                                   className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
//                                 >
//                                   {formattedCell}
//                                 </td>
//                               );
//                             })}
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                   <div className="mt-4 text-sm text-gray-500">
//                     Showing {dataSample.length} of {analysisData.analysis.sample_size} entries
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default Dashboard;


import { useState } from 'react';
import { toast } from 'react-toastify';
import FileUpload from './FileUpload';
import FeedbackSummary from './FeedbackSummary';
import SentimentChart from './SentimentChart';
import ThemeChart from './ThemeChart';
import TimelineChart from './TimelineChart';
import DashboardStats from './DashboardStats';
import KeyIssuesTable from './KeyIssuesTable';
import CategoryBreakdown from './CategoryBreakdown';
import WordCloud from './WordCloud';
import ComparisonChart from './ComparisonChart';
import RatingChart from './RatingChart';

function Dashboard({ 
  analysisData, 
  setAnalysisData, 
  isLoading, 
  setIsLoading, 
  dataSample, 
  setDataSample 
}) {
  const [activeTab, setActiveTab] = useState('overview');

  const downloadTemplate = () => {
    setIsLoading(true);
    fetch('http://localhost:5000/api/template')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to download template');
        }
        return response.blob();
      })
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'feedback_template.csv';
        document.body.appendChild(a);
        a.click();
        a.remove();
        toast.success('Template downloaded successfully!');
      })
      .catch(error => {
        console.error('Error:', error);
        toast.error('Failed to download template');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customer Feedback Analysis</h1>
          <p className="text-gray-600">Upload customer feedback data to generate AI-powered insights and summaries</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={downloadTemplate}
            disabled={isLoading}
            className="btn-secondary flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Download Template
          </button>
        </div>
      </div>

      <FileUpload 
        setAnalysisData={setAnalysisData} 
        setDataSample={setDataSample}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />

      {analysisData && (
        <>
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex overflow-x-auto" aria-label="Tabs">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === 'overview'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('sentiment')}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === 'sentiment'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Sentiment Analysis
                </button>
                <button
                  onClick={() => setActiveTab('themes')}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === 'themes'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Themes & Topics
                </button>
                <button
                  onClick={() => setActiveTab('products')}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === 'products'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Product Analysis
                </button>
                <button
                  onClick={() => setActiveTab('timeline')}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === 'timeline'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Timeline
                </button>
                <button
                  onClick={() => setActiveTab('issues')}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === 'issues'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Key Issues
                </button>
                <button
                  onClick={() => setActiveTab('data')}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === 'data'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Data Sample
                </button>
              </nav>
            </div>
            
            <div className="p-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <FeedbackSummary summary={analysisData.summary} />
                  
                  <DashboardStats analysis={analysisData.analysis} />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="card">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Sentiment Distribution</h3>
                      <SentimentChart data={analysisData.analysis.sentiment_distribution} />
                    </div>
                    
                    <div className="card">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Product Distribution</h3>
                      <div className="h-64">
                        <ThemeChart 
                          data={Object.entries(analysisData.analysis.product_distribution.counts).map(([name, value]) => ({ name, value }))} 
                          colors={['#60a5fa', '#93c5fd', '#bfdbfe', '#dbeafe', '#eff6ff']}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {analysisData.analysis.comparison_data && (
                    <div className="card">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Period Comparison</h3>
                      <ComparisonChart data={analysisData.analysis.comparison_data} />
                    </div>
                  )}
                </div>
              )}
              
              {activeTab === 'sentiment' && (
                <div className="space-y-6">
                  <div className="card">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Sentiment Analysis</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                        <div className="text-green-800 text-sm font-medium mb-1">Positive Feedback</div>
                        <div className="text-3xl font-bold text-green-700">
                          {analysisData.analysis.sentiment_distribution.percentages.positive}%
                        </div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <div className="text-blue-800 text-sm font-medium mb-1">Neutral Feedback</div>
                        <div className="text-3xl font-bold text-blue-700">
                          {analysisData.analysis.sentiment_distribution.percentages.neutral}%
                        </div>
                      </div>
                      <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                        <div className="text-red-800 text-sm font-medium mb-1">Negative Feedback</div>
                        <div className="text-3xl font-bold text-red-700">
                          {analysisData.analysis.sentiment_distribution.percentages.negative}%
                        </div>
                      </div>
                    </div>
                    
                    <div className="h-64">
                      <SentimentChart data={analysisData.analysis.sentiment_distribution} />
                    </div>
                  </div>
                  
                  {analysisData.analysis.word_frequencies && (
                    <div className="card">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Word Frequency Analysis</h3>
                      <div className="h-80">
                        <WordCloud 
                          words={analysisData.analysis.word_frequencies.map(item => ({ 
                            text: item.word, 
                            value: item.count 
                          }))}
                        />
                      </div>
                    </div>
                  )}
                  
                  {analysisData.analysis.ratings_distribution && (
                    <div className="card">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Rating Distribution</h3>
                      <div className="flex items-center mb-4">
                        <div className="text-3xl font-bold text-primary-600">
                          {analysisData.analysis.ratings_distribution.average}
                        </div>
                        <div className="text-gray-500 ml-2">Average Rating</div>
                      </div>
                      <div className="h-64">
                        <RatingChart data={analysisData.analysis.ratings_distribution} />
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {activeTab === 'themes' && (
                <div className="space-y-6">
                  <div className="card">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Common Themes</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {analysisData.analysis.common_themes.map((theme, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <div className="text-primary-700 text-sm font-medium mb-2">Theme {theme.id + 1}</div>
                          <div className="flex flex-wrap gap-2">
                            {theme.keywords.map((keyword, kIndex) => (
                              <span 
                                key={kIndex} 
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                              >
                                {keyword}
                              </span>
                            ))}
                          </div>
                          {theme.weight && (
                            <div className="mt-2 text-xs text-gray-500">
                              Relevance: {Math.round(theme.weight * 100)}%
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {analysisData.analysis.key_phrases && (
                    <div className="card">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Key Phrases</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {analysisData.analysis.key_phrases.map((phrase, index) => (
                          <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="flex-grow">
                              <span className="text-gray-800">{phrase.phrase}</span>
                            </div>
                            <div className="ml-2">
                              <span className="text-xs font-medium text-gray-500">
                                Score: {phrase.score.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {activeTab === 'products' && (
                <div className="space-y-6">
                  <div className="card">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Product/Service Breakdown</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="h-64">
                        <ThemeChart 
                          data={Object.entries(analysisData.analysis.product_distribution.counts).map(([name, value]) => ({ name, value }))} 
                          colors={['#60a5fa', '#93c5fd', '#bfdbfe', '#dbeafe', '#eff6ff']}
                        />
                      </div>
                      <div>
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product/Service</th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Count</th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sentiment</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {Object.entries(analysisData.analysis.product_distribution.counts).map(([product, count], index) => {
                              const percentage = ((count / analysisData.analysis.sample_size) * 100).toFixed(1);
                              const sentiment = analysisData.analysis.product_distribution.product_sentiment[product].average_sentiment;
                              return (
                                <tr key={index}>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{count}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{percentage}%</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                      sentiment > 0.2 ? 'bg-green-100 text-green-800' : 
                                      sentiment < -0.2 ? 'bg-red-100 text-red-800' : 
                                      'bg-blue-100 text-blue-800'
                                    }`}>
                                      {sentiment.toFixed(2)}
                                    </span>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  
                  <CategoryBreakdown 
                    products={analysisData.analysis.product_distribution} 
                  />
                </div>
              )}
              
              {activeTab === 'timeline' && (
                <div className="space-y-6">
                  <div className="card">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Feedback Over Time</h3>
                    <div className="h-80">
                      <TimelineChart data={analysisData.analysis.time_series} />
                    </div>
                  </div>
                  
                  {analysisData.analysis.ratings_distribution?.trends && (
                    <div className="card">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Rating Trends</h3>
                      <div className="h-64">
                        <RatingChart 
                          data={analysisData.analysis.ratings_distribution} 
                          showTrends={true}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {activeTab === 'issues' && (
                <div className="space-y-6">
                  <div className="card">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Key Issues Identified</h3>
                    <KeyIssuesTable issues={analysisData.analysis.key_issues || []} />
                  </div>
                  
                  {analysisData.analysis.category_correlations && (
                    <div className="card">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Category Correlations</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Correlation with Sentiment</th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interpretation</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {analysisData.analysis.category_correlations.map((item, index) => {
                              let interpretation;
                              let colorClass;
                              
                              if (item.correlation > 0.5) {
                                interpretation = "Strong positive correlation";
                                colorClass = "text-green-600";
                              } else if (item.correlation > 0.2) {
                                interpretation = "Moderate positive correlation";
                                colorClass = "text-green-500";
                              } else if (item.correlation > 0) {
                                interpretation = "Weak positive correlation";
                                colorClass = "text-green-400";
                              } else if (item.correlation > -0.2) {
                                interpretation = "Weak negative correlation";
                                colorClass = "text-red-400";
                              } else if (item.correlation > -0.5) {
                                interpretation = "Moderate negative correlation";
                                colorClass = "text-red-500";
                              } else {
                                interpretation = "Strong negative correlation";
                                colorClass = "text-red-600";
                              }
                              
                              return (
                                <tr key={index}>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.category}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.correlation.toFixed(2)}</td>
                                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${colorClass}`}>{interpretation}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {activeTab === 'data' && dataSample && (
                <div className="card">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Data Sample</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          {Object.keys(dataSample[0]).map((header, index) => (
                            <th 
                              key={index}
                              scope="col" 
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {dataSample.map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            {Object.values(row).map((cell, cellIndex) => {
                              // Format date cells
                              const key = Object.keys(row)[cellIndex];
                              let formattedCell = cell;
                              
                              if (key === 'date' && cell) {
                                try {
                                  formattedCell = new Date(cell).toLocaleDateString();
                                } catch (e) {}
                              }
                              
                              // Truncate long text
                              if (typeof formattedCell === 'string' && formattedCell.length > 100) {
                                formattedCell = formattedCell.substring(0, 100) + '...';
                              }
                              
                              return (
                                <td 
                                  key={cellIndex}
                                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                >
                                  {formattedCell}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 text-sm text-gray-500">
                    Showing {dataSample.length} of {analysisData.analysis.sample_size} entries
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;