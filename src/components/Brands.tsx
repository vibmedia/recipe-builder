import React, { useState } from 'react';
import { useStore } from '../store';
import { Plus, Store, Link } from 'lucide-react';

export function Brands() {
  const { brands, masterMenuItems, brandMenuItems, addBrand, assignToBrand } = useStore();
  const [isAddingBrand, setIsAddingBrand] = useState(false);
  const [newBrand, setNewBrand] = useState({ name: '', description: '' });
  
  const [isAssigning, setIsAssigning] = useState(false);
  const [assignData, setAssignData] = useState({ brand_id: '', master_item_id: '', custom_name: '', custom_price: '' });

  const handleAddBrand = async (e: React.FormEvent) => {
    e.preventDefault();
    await addBrand(newBrand.name, newBrand.description);
    setIsAddingBrand(false);
    setNewBrand({ name: '', description: '' });
  };

  const handleAssign = async (e: React.FormEvent) => {
    e.preventDefault();
    await assignToBrand(assignData.master_item_id, assignData.brand_id, assignData.custom_name, assignData.custom_price ? parseFloat(assignData.custom_price) : undefined);
    setIsAssigning(false);
    setAssignData({ brand_id: '', master_item_id: '', custom_name: '', custom_price: '' });
  };

  return (
    <div className="space-y-8">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Brands</h2>
            <p className="text-sm text-gray-500">Manage your restaurant brands and their specific menus.</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setIsAssigning(true)}
              className="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-lg font-medium shadow-sm hover:bg-gray-50 flex items-center gap-2"
            >
              <Link size={18} />
              <span>Assign Item</span>
            </button>
            <button 
              onClick={() => setIsAddingBrand(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium shadow-sm hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus size={18} />
              <span>New Brand</span>
            </button>
          </div>
        </div>

        {isAddingBrand && (
          <form onSubmit={handleAddBrand} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6 space-y-4">
            <h3 className="font-semibold text-gray-900">Add New Brand</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Brand Name</label>
                <input 
                  required
                  value={newBrand.name}
                  onChange={e => setNewBrand({...newBrand, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Burger Express"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input 
                  value={newBrand.description}
                  onChange={e => setNewBrand({...newBrand, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Optional description"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setIsAddingBrand(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-gray-900 text-white rounded-lg">Save Brand</button>
            </div>
          </form>
        )}

        {isAssigning && (
          <form onSubmit={handleAssign} className="bg-blue-50 p-6 rounded-xl shadow-sm border border-blue-100 mb-6 space-y-4">
            <h3 className="font-semibold text-blue-900">Assign Master Item to Brand</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                <select 
                  required
                  value={assignData.brand_id}
                  onChange={e => setAssignData({...assignData, brand_id: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="" disabled>Select Brand</option>
                  {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Master Item</label>
                <select 
                  required
                  value={assignData.master_item_id}
                  onChange={e => setAssignData({...assignData, master_item_id: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="" disabled>Select Item</option>
                  {masterMenuItems.map(m => <option key={m.id} value={m.id}>{m.short_code} - {m.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Custom Name (Optional)</label>
                <input 
                  value={assignData.custom_name}
                  onChange={e => setAssignData({...assignData, custom_name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                  placeholder="Override master name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Custom Price (Optional)</label>
                <input 
                  type="number"
                  value={assignData.custom_price}
                  onChange={e => setAssignData({...assignData, custom_price: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                  placeholder="Override master price"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setIsAssigning(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Assign</button>
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brands.map(brand => {
            const brandItems = brandMenuItems.filter(bmi => bmi.brand_id === brand.id);
            return (
              <div key={brand.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                <div className="p-5 border-b border-gray-100 bg-gray-50 flex items-start gap-3">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                    <Store size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{brand.name}</h3>
                    {brand.description && <p className="text-sm text-gray-500">{brand.description}</p>}
                  </div>
                </div>
                <div className="p-5 flex-1">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Menu Items ({brandItems.length})</h4>
                  {brandItems.length > 0 ? (
                    <ul className="space-y-2">
                      {brandItems.map(bmi => {
                        const masterItem = masterMenuItems.find(m => m.id === bmi.master_item_id);
                        return (
                          <li key={bmi.id} className="text-sm flex justify-between items-center p-2 hover:bg-gray-50 rounded-md">
                            <div className="flex flex-col">
                              <span className="font-medium text-gray-800">{bmi.custom_name || masterItem?.name || 'Unknown'}</span>
                              <span className="text-xs text-gray-500">₹{bmi.custom_price || masterItem?.price || 0}</span>
                            </div>
                            <span className="text-xs text-gray-400 font-mono">{masterItem?.short_code}</span>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-400 italic">No items assigned yet.</p>
                  )}
                </div>
              </div>
            );
          })}
          {brands.length === 0 && (
            <div className="col-span-full p-12 text-center text-gray-500 bg-white rounded-xl border border-gray-200 border-dashed">
              <Store size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-lg font-medium text-gray-900">No brands created</p>
              <p className="mt-1">Add your first brand to start assigning menu items.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
