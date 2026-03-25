import React, { useRef, useState } from 'react';
import { useStore } from '../store';
import * as XLSX from 'xlsx';
import { Download, Upload, FileSpreadsheet, AlertCircle, CheckCircle2 } from 'lucide-react';

export function DataSync() {
  const store = useStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });

  const handleExport = () => {
    try {
      const wb = XLSX.utils.book_new();
      
      const addSheet = (data: any[], name: string) => {
        // If data is empty, add a dummy row so the sheet has headers
        const sheetData = data.length > 0 ? data : [{}];
        const ws = XLSX.utils.json_to_sheet(sheetData);
        XLSX.utils.book_append_sheet(wb, ws, name);
      };

      addSheet(store.brands, "Brands");
      addSheet(store.masterMenuItems, "Master Menu");
      addSheet(store.brandMenuItems, "Brand Menu Items");
      addSheet(store.ingredients, "Ingredients");
      addSheet(store.recipes, "Recipes");
      addSheet(store.recipeIngredients, "Recipe Ingredients");

      XLSX.writeFile(wb, "Menu_Management_Data.xlsx");
      setStatus({ type: 'success', message: 'Data exported successfully!' });
    } catch (error: any) {
      console.error(error);
      setStatus({ type: 'error', message: 'Failed to export data: ' + error.message });
    }
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const ab = evt.target?.result;
        const wb = XLSX.read(ab, { type: 'array' });

        const getSheetData = (name: string) => {
          const ws = wb.Sheets[name];
          if (!ws) return [];
          const data = XLSX.utils.sheet_to_json(ws);
          // Filter out empty placeholder objects if any
          return data.filter(row => Object.keys(row as object).length > 0);
        };

        const importedData = {
          brands: getSheetData("Brands"),
          masterMenuItems: getSheetData("Master Menu"),
          brandMenuItems: getSheetData("Brand Menu Items"),
          ingredients: getSheetData("Ingredients"),
          recipes: getSheetData("Recipes"),
          recipeIngredients: getSheetData("Recipe Ingredients"),
        };

        store.importData(importedData as any);
        setStatus({ type: 'success', message: 'Data imported successfully! Your dashboard is now updated.' });
      } catch (error: any) {
        console.error(error);
        setStatus({ type: 'error', message: 'Error importing data. Please ensure the Excel file matches the required format.' });
      }
    };
    reader.readAsArrayBuffer(file);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Data Management (Excel/CSV)</h2>
        <p className="text-sm text-gray-500">Export your entire restaurant system to Excel, or import a backup.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Export Card */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
            <Download size={32} className="text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Export to Excel</h3>
          <p className="text-sm text-gray-500 mb-6 max-w-xs">
            Download all brands, menus, ingredients, and recipes into a single Excel file with multiple sheets.
          </p>
          <button
            onClick={handleExport}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium shadow-sm hover:bg-blue-700 flex items-center gap-2 w-full justify-center"
          >
            <FileSpreadsheet size={20} />
            <span>Download .xlsx</span>
          </button>
        </div>

        {/* Import Card */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
            <Upload size={32} className="text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Import from Excel</h3>
          <p className="text-sm text-gray-500 mb-6 max-w-xs">
            Upload a previously exported Excel file to restore or overwrite your current database.
          </p>
          <input 
            type="file" 
            accept=".xlsx, .xls, .csv"
            onChange={handleImport}
            ref={fileInputRef}
            className="hidden"
            id="excel-upload"
          />
          <label
            htmlFor="excel-upload"
            className="px-6 py-3 bg-green-600 text-white rounded-xl font-medium shadow-sm hover:bg-green-700 flex items-center gap-2 w-full justify-center cursor-pointer"
          >
            <FileSpreadsheet size={20} />
            <span>Upload .xlsx</span>
          </label>
        </div>
      </div>

      {status.type && (
        <div className={`p-4 rounded-xl flex items-start gap-3 ${status.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
          {status.type === 'success' ? <CheckCircle2 className="shrink-0 mt-0.5" /> : <AlertCircle className="shrink-0 mt-0.5" />}
          <div>
            <h4 className="font-semibold">{status.type === 'success' ? 'Success' : 'Error'}</h4>
            <p className="text-sm opacity-90">{status.message}</p>
          </div>
        </div>
      )}

      <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
        <h3 className="font-semibold text-blue-900 mb-2">How it works</h3>
        <ul className="list-disc pl-5 space-y-2 text-sm text-blue-800">
          <li><strong>Relational Structure:</strong> The system uses unique IDs to link items. When you update a recipe in the Master Menu, it automatically updates for all Brands assigned to that item.</li>
          <li><strong>Excel Sheets:</strong> The exported file contains separate sheets for Brands, Master Menu, Brand Menu Items, Ingredients, Recipes, and Recipe Ingredients.</li>
          <li><strong>Local Storage:</strong> All your data is saved locally in your browser. You don't need a database, but you should export your data regularly to back it up.</li>
        </ul>
      </div>
    </div>
  );
}
