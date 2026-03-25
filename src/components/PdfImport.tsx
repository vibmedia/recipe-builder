import React, { useState } from 'react';
import { useStore } from '../store';
import { FileUp, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { GoogleGenAI, Type } from '@google/genai';

export function PdfImport() {
  const { addMasterMenuItem } = useStore();
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResults(null);
      setError(null);
    }
  };

  const processPdf = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError(null);

    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = async () => {
        try {
          const base64Data = (reader.result as string).split(',')[1];
          
          const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
          
          const response = await ai.models.generateContent({
            model: 'gemini-3.1-flash-preview',
            contents: [
              {
                inlineData: {
                  data: base64Data,
                  mimeType: 'application/pdf'
                }
              },
              "You are a culinary data extraction assistant. Extract all menu items from this PDF menu. Categorize them smartly. For each item, generate a unique code (e.g., if it's a Burger, maybe BRG-001). Return a JSON array of objects with keys: unique_code, name, category, description."
            ],
            config: {
              responseMimeType: "application/json",
              responseSchema: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    unique_code: { type: Type.STRING, description: "A generated unique short code for the item" },
                    name: { type: Type.STRING, description: "The name of the menu item" },
                    category: { type: Type.STRING, description: "The category of the item (e.g., Starters, Mains, Desserts, Beverages)" },
                    description: { type: Type.STRING, description: "The description of the item, if available" }
                  },
                  required: ["unique_code", "name", "category"]
                }
              }
            }
          });

          if (response.text) {
            const parsed = JSON.parse(response.text);
            setResults(parsed);
          } else {
            throw new Error("No text returned from AI");
          }
        } catch (err: any) {
          console.error(err);
          setError(err.message || "Failed to process PDF");
        } finally {
          setIsProcessing(false);
        }
      };
      
      reader.onerror = () => {
        setError("Failed to read file");
        setIsProcessing(false);
      };
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to process PDF");
      setIsProcessing(false);
    }
  };

  const importItems = async () => {
    if (!results) return;
    setIsProcessing(true);
    try {
      for (const item of results) {
        await addMasterMenuItem(item.unique_code, item.name, item.category, item.description);
      }
      setResults(null);
      setFile(null);
      alert("Successfully imported items to Master Menu!");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to import items to database");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">PDF Menu Ingestion</h2>
        <p className="text-sm text-gray-500">Upload a PDF menu to automatically extract and categorize items using AI.</p>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
        <FileUp size={48} className="mx-auto text-blue-500 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Menu PDF</h3>
        <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
          Our AI will read the PDF, identify menu items, categorize them, and prepare them for your Master Menu.
        </p>
        
        <div className="flex flex-col items-center gap-4">
          <input 
            type="file" 
            accept="application/pdf"
            onChange={handleFileChange}
            className="block w-full max-w-sm text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100 cursor-pointer"
          />
          
          {file && !results && (
            <button
              onClick={processPdf}
              disabled={isProcessing}
              className="px-6 py-2 bg-blue-600 text-white rounded-full font-medium shadow-sm hover:bg-blue-700 disabled:opacity-70 flex items-center gap-2"
            >
              {isProcessing ? <Loader2 className="animate-spin" size={18} /> : <FileUp size={18} />}
              <span>{isProcessing ? 'Analyzing PDF...' : 'Process PDF'}</span>
            </button>
          )}
        </div>

        {error && (
          <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-center gap-2 max-w-lg mx-auto text-left">
            <AlertCircle size={20} className="shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
        )}
      </div>

      {results && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <CheckCircle2 className="text-green-500" size={20} />
              Extracted {results.length} Items
            </h3>
            <button
              onClick={importItems}
              disabled={isProcessing}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg font-medium text-sm hover:bg-gray-800 disabled:opacity-70 flex items-center gap-2"
            >
              {isProcessing ? <Loader2 className="animate-spin" size={16} /> : null}
              Import to Master Menu
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {results.map((item, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono font-medium text-gray-900">{item.unique_code}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">{item.category}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate" title={item.description}>
                      {item.description || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
