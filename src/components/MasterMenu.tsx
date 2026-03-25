import React, { useState } from 'react';
import { useStore } from '../store';
import { Plus, Search, ChevronRight, Edit3, Trash2 } from 'lucide-react';
import { RecipeBuilder } from './RecipeBuilder';
import { MasterMenuItem } from '../types';

export function MasterMenu() {
  const { masterMenuItems, recipes, recipeIngredients, ingredients, categories, addMasterMenuItem, updateMasterMenuItem, deleteMasterMenuItem } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [newItem, setNewItem] = useState<Omit<MasterMenuItem, 'id' | 'created_at'>>({
    petpooja_id: '',
    name: '',
    category: '',
    variation: '',
    online_display_name: '',
    item_type: 'item',
    price: 0,
    description: '',
    dietary: 'veg',
    short_code: '',
    portion_percentage: 100
  });

  const filteredItems = masterMenuItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.short_code && item.short_code.toLowerCase().includes(searchQuery.toLowerCase())) ||
    item.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await updateMasterMenuItem(editingId, newItem);
      setEditingId(null);
    } else {
      await addMasterMenuItem(newItem);
    }
    setIsAdding(false);
    setNewItem({
      petpooja_id: '',
      name: '',
      category: '',
      variation: '',
      online_display_name: '',
      item_type: 'item',
      price: 0,
      description: '',
      dietary: 'veg',
      short_code: '',
      portion_percentage: 100
    });
  };

  const handleEdit = (item: MasterMenuItem) => {
    setNewItem({
      petpooja_id: item.petpooja_id || '',
      name: item.name,
      category: item.category || '',
      variation: item.variation || '',
      online_display_name: item.online_display_name || '',
      item_type: item.item_type || 'item',
      price: item.price || 0,
      description: item.description || '',
      dietary: item.dietary || 'veg',
      short_code: item.short_code || '',
      portion_percentage: item.portion_percentage || 100
    });
    setEditingId(item.id);
    setIsAdding(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this item? Its recipe will also be removed.')) {
      await deleteMasterMenuItem(id);
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setNewItem({
      petpooja_id: '',
      name: '',
      category: '',
      variation: '',
      online_display_name: '',
      item_type: 'item',
      price: 0,
      description: '',
      dietary: 'veg',
      short_code: '',
      portion_percentage: 100
    });
  };

  if (selectedItem) {
    return (
      <div className="space-y-6">
        <button 
          onClick={() => setSelectedItem(null)}
          className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1"
        >
          &larr; Back to Master Menu
        </button>
        <RecipeBuilder masterItemId={selectedItem} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Master Menu</h2>
          <p className="text-sm text-gray-500">Manage your core items and their recipes.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium shadow-sm hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={18} />
          <span>New Item</span>
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-4">
          <h3 className="font-semibold text-gray-900">{editingId ? 'Edit Master Item' : 'Add Master Item'}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input 
                required
                value={newItem.name}
                onChange={e => setNewItem({...newItem, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Classic Burger"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select 
                required
                value={newItem.category}
                onChange={e => setNewItem({...newItem, category: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Item Type</label>
              <select 
                value={newItem.item_type}
                onChange={e => setNewItem({...newItem, item_type: e.target.value as 'item' | 'variation'})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="item">Item</option>
                <option value="variation">Variation</option>
              </select>
            </div>
            {newItem.item_type === 'variation' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Variation Name</label>
                  <input 
                    required
                    value={newItem.variation}
                    onChange={e => setNewItem({...newItem, variation: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Half, Full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Portion % (vs Full)</label>
                  <input 
                    type="number"
                    min="1"
                    max="100"
                    value={newItem.portion_percentage || ''}
                    onChange={e => setNewItem({...newItem, portion_percentage: parseInt(e.target.value) || 100})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 50"
                  />
                </div>
              </>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <input 
                type="number"
                required
                value={newItem.price || ''}
                onChange={e => setNewItem({...newItem, price: parseFloat(e.target.value) || 0})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dietary</label>
              <select 
                value={newItem.dietary}
                onChange={e => setNewItem({...newItem, dietary: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="veg">Veg</option>
                <option value="non-veg">Non-Veg</option>
                <option value="egg">Egg</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Short Code</label>
              <input 
                value={newItem.short_code}
                onChange={e => setNewItem({...newItem, short_code: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 1[O]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Petpooja ID</label>
              <input 
                value={newItem.petpooja_id}
                onChange={e => setNewItem({...newItem, petpooja_id: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 1302334492"
              />
            </div>
            <div className="sm:col-span-2 lg:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
              <input 
                value={newItem.description}
                onChange={e => setNewItem({...newItem, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Brief description"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={handleCancel} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-gray-900 text-white rounded-lg">{editingId ? 'Update' : 'Save'} Item</button>
          </div>
        </form>
      )}

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input 
          type="text"
          placeholder="Search master menu by name, code, or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name / Variation</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dietary</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredItems.map(item => {
              
              return (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900">{item.name}</span>
                    {item.item_type === 'variation' && (
                      <span className="text-xs text-gray-500">
                        Var: {item.variation} {item.portion_percentage ? `(${item.portion_percentage}%)` : ''}
                      </span>
                    )}
                    {item.short_code && (
                      <span className="text-xs text-gray-400 font-mono">{item.short_code}</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">{item.category}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-700">₹{item.price}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    item.dietary === 'veg' ? 'bg-green-100 text-green-800' : 
                    item.dietary === 'non-veg' ? 'bg-red-100 text-red-800' : 
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.dietary}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => setSelectedItem(item.id)}
                      className="text-blue-600 hover:text-blue-900 p-1 rounded-md hover:bg-blue-50"
                      title="Recipe"
                    >
                      <ChevronRight size={16} />
                    </button>
                    <button 
                      onClick={() => handleEdit(item)}
                      className="text-blue-600 hover:text-blue-900 p-1 rounded-md hover:bg-blue-50"
                      title="Edit"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            )})}
            {filteredItems.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  No items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
