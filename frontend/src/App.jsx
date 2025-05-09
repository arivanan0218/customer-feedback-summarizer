import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';

function App() {
  const [analysisData, setAnalysisData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dataSample, setDataSample] = useState(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Dashboard 
          analysisData={analysisData} 
          setAnalysisData={setAnalysisData}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          dataSample={dataSample}
          setDataSample={setDataSample}
        />
      </main>
      <footer className="bg-gray-800 text-white text-center py-4">
        <div className="container mx-auto px-4">
          <p>© 2025 Customer Feedback Summarizer for ERP Systems</p>
          <p className="text-gray-400 text-sm mt-1">Powered by Flask, React, and Google Gemini</p>
        </div>
      </footer>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}

export default App;