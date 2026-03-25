import React, { useState } from 'react';
import { useStore } from '../store';
import { Plus, Search, Carrot, Edit3, Trash2 } from 'lucide-react';
import { Unit } from '../types';

const UNITS: Unit[] = ['g', 'kg', 'ml', 'L', 'pcs', 'tbsp', 'tsp', 'cup', 'oz', 'lb'];

export function Ingredients() {
  const { ingredients, addIngredient, updateIngredient, deleteIngredient } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newIngredient, setNewIngredient] = useState({ name: '', default_unit: 'g' as Unit, description: '' });

  const filteredIngredients = ingredients.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await updateIngredient(editingId, newIngredient);
      setEditingId(null);
    } else {
      await addIngredient(newIngredient.name, newIngredient.default_unit, newIngredient.description);
    }
    setIsAdding(false);
    setNewIngredient({ name: '', default_unit: 'g', description: '' });
  };

  const handleEdit = (item: any) => {
    setNewIngredient({ name: item.name, default_unit: item.default_unit, description: item.description || '' });
    setEditingId(item.id);
    setIsAdding(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this ingredient? It will be removed from all recipes.')) {
      await deleteIngredient(id);
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setNewIngredient({ name: '', default_unit: 'g', description: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Ingredients Database</h2>
          <p className="text-sm text-gray-500">Manage your global ingredient list and standard units.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium shadow-sm hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={18} />
          <span>New Ingredient</span>
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-4">
          <h3 className="font-semibold text-gray-900">{editingId ? 'Edit Ingredient' : 'Add Ingredient'}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input 
                required
                value={newIngredient.name}
                onChange={e => setNewIngredient({...newIngredient, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Himalayan Pink Salt"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Default Unit</label>
              <select 
                required
                value={newIngredient.default_unit}
                onChange={e => setNewIngredient({...newIngredient, default_unit: e.target.value as Unit})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
              </select>
            </div>
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
              <input 
                value={newIngredient.description}
                onChange={e => setNewIngredient({...newIngredient, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Supplier info, brand, or notes"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={handleCancel} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-gray-900 text-white rounded-lg">{editingId ? 'Update' : 'Save'} Ingredient</button>
          </div>
        </form>
      )}

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input 
          type="text"
          placeholder="Search ingredients..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-3 sm:px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ingredient</th>
              <th className="px-3 py-3 sm:px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Default Unit</th>
              <th className="px-3 py-3 sm:px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-3 py-3 sm:px-6 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredIngredients.map(item => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center gap-2">
                  <Carrot size={16} className="text-orange-500" />
                  {item.name}
                </td>
                <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className="px-2 py-1 bg-gray-100 rounded-md font-mono text-xs">{item.default_unit}</span>
                </td>
                <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.description || '-'}
                </td>
                <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
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
            ))}
            {filteredIngredients.length === 0 && (
              <tr>
                <td colSpan={4} className="px-3 py-6 sm:px-6 sm:py-8 text-center text-gray-500">
                  No ingredients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
