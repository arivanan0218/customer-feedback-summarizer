function KeyIssuesTable({ issues }) {
  if (!issues || issues.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No significant issues identified in the feedback data.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product/Service</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue Count</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Common Keywords</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Example Feedback</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {issues.map((issue, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{issue.product}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{issue.count}</td>
              <td className="px-6 py-4 text-sm text-gray-500">
                <div className="flex flex-wrap gap-1">
                  {issue.keywords.slice(0, 5).map((keyword, kIndex) => (
                    <span 
                      key={kIndex} 
                      className="tag tag-red"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {issue.examples && issue.examples.length > 0 && (
                  <div className="max-h-20 overflow-y-auto text-xs">
                    "{issue.examples[0].substring(0, 100)}{issue.examples[0].length > 100 ? '...' : ''}"
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default KeyIssuesTable;