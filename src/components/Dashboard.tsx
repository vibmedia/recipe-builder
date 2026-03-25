import React, { useState } from 'react';
import { useStore } from '../store';
import { MasterMenu } from './MasterMenu';
import { Ingredients } from './Ingredients';
import { Categories } from './Categories';
import { PdfImport } from './PdfImport';
import { LayoutDashboard, BookOpen, Carrot, FileUp, List } from 'lucide-react';

type Tab = 'dashboard' | 'master-menu' | 'ingredients' | 'categories' | 'import';

export function Dashboard() {
  const { isLoading } = useStore();
  const [activeTab, setActiveTab] = useState<Tab>('master-menu');

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading...</div>;
  }

  const tabs = [
    { id: 'master-menu', label: 'Master Menu', icon: BookOpen },
    { id: 'ingredients', label: 'Ingredients', icon: Carrot },
    { id: 'categories', label: 'Categories', icon: List },
    { id: 'import', label: 'Import PDF', icon: FileUp },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar / Bottom Nav */}
      <nav className="bg-white border-b md:border-b-0 md:border-r border-gray-200 md:w-64 flex-shrink-0 z-10 sticky top-0 md:h-screen">
        <div className="p-4 md:p-6">
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <LayoutDashboard className="text-blue-600" />
            <span className="hidden md:inline">Menu Manager</span>
          </h1>
        </div>
        <div className="flex md:flex-col overflow-x-auto md:overflow-visible px-2 md:px-4 pb-2 md:pb-0 gap-1 scrollbar-hide">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${
                  isActive 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon size={20} className={isActive ? 'text-blue-600' : 'text-gray-400'} />
                <span className="text-sm">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full max-w-5xl mx-auto">
        <div className={activeTab === 'master-menu' ? 'block' : 'hidden'}>
          <MasterMenu />
        </div>
        <div className={activeTab === 'ingredients' ? 'block' : 'hidden'}>
          <Ingredients />
        </div>
        <div className={activeTab === 'categories' ? 'block' : 'hidden'}>
          <Categories />
        </div>
        <div className={activeTab === 'import' ? 'block' : 'hidden'}>
          <PdfImport />
        </div>
      </main>
    </div>
  );
}
