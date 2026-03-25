import React, { useState, useMemo } from 'react';
import { useStore } from '../store';
import { Check, Plus, Search, Trash2, X, PlusCircle, ArrowLeft, Save } from 'lucide-react';
import { RecipeIngredient, Unit } from '../types';

const UNITS: Unit[] = ['g', 'kg', 'ml', 'L', 'pcs', 'tbsp', 'tsp', 'cup', 'oz', 'lb'];

export function RecipeBuilder({ masterItemId }: { masterItemId: string }) {
  const { masterMenuItems, recipes, recipeIngredients, ingredients, updateRecipe } = useStore();
  
  const masterItem = masterMenuItems.find(m => m.id === masterItemId);
  const existingRecipe = recipes.find(r => r.master_item_id === masterItemId);
  const existingIngredients = existingRecipe 
    ? recipeIngredients.filter(ri => ri.recipe_id === existingRecipe.id)
    : [];
  
  const [localIngredients, setLocalIngredients] = useState<Omit<RecipeIngredient, 'id' | 'recipe_id' | 'created_at'>[]>(
    existingIngredients.map(ei => ({
      ingredient_id: ei.ingredient_id,
      quantity: ei.quantity,
      unit: ei.unit
    }))
  );
  
  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateRecipe(masterItemId, localIngredients);
      alert('Recipe saved successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to save recipe');
    } finally {
      setIsSaving(false);
    }
  };

  const handleRemoveIngredient = (ingredientId: string) => {
    setLocalIngredients(prev => prev.filter(ri => ri.ingredient_id !== ingredientId));
  };

  const handleUpdateQuantity = (ingredientId: string, quantity: number) => {
    setLocalIngredients(prev => prev.map(ri => 
      ri.ingredient_id === ingredientId ? { ...ri, quantity } : ri
    ));
  };

  const handleUpdateUnit = (ingredientId: string, unit: Unit) => {
    setLocalIngredients(prev => prev.map(ri => 
      ri.ingredient_id === ingredientId ? { ...ri, unit } : ri
    ));
  };

  const handleAddIngredient = (ingredientId: string, defaultUnit: Unit) => {
    if (!localIngredients.find(ri => ri.ingredient_id === ingredientId)) {
      setLocalIngredients(prev => [...prev, { ingredient_id: ingredientId, quantity: 0, unit: defaultUnit }]);
    }
    setIsAdding(false);
    setSearchQuery('');
  };

  const availableIngredients = useMemo(() => {
    return ingredients.filter(i => 
      !localIngredients.find(ri => ri.ingredient_id === i.id) &&
      i.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [ingredients, localIngredients, searchQuery]);

  if (!masterItem) return <div>Master item not found</div>;

  return (
    <div className="space-y-4 pb-24 md:pb-0">
      {/* Mobile-friendly Header Card */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {masterItem.short_code && (
            <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-mono font-medium">
              {masterItem.short_code}
            </span>
          )}
          <span className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-md text-xs font-medium">
            {masterItem.category}
          </span>
          {masterItem.item_type === 'variation' && (
            <span className="px-2.5 py-1 bg-purple-50 text-purple-600 rounded-md text-xs font-medium">
              {masterItem.variation}
            </span>
          )}
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">{masterItem.name}</h2>
        {masterItem.description && (
          <p className="text-sm text-gray-500 mt-2 line-clamp-2">{masterItem.description}</p>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Ingredients</h3>
          <button 
            onClick={() => setIsAdding(true)}
            className="text-blue-600 flex items-center gap-1 text-sm font-medium bg-blue-50 px-4 py-2 rounded-full hover:bg-blue-100 transition-colors active:scale-95"
          >
            <Plus size={16} />
            <span>Add</span>
          </button>
        </div>

        {localIngredients.length === 0 ? (
          <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[200px]">
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
              <Plus className="text-gray-400" size={24} />
            </div>
            <p className="text-gray-500 mb-2">No ingredients added yet.</p>
            <button 
              onClick={() => setIsAdding(true)}
              className="text-blue-600 font-medium active:text-blue-800 p-2"
            >
              Tap to add ingredients
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {localIngredients.map(ri => {
              const ingredient = ingredients.find(i => i.id === ri.ingredient_id);
              if (!ingredient) return null;

              return (
                <div key={ri.ingredient_id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-medium text-gray-900 text-base block">{ingredient.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleRemoveIngredient(ri.ingredient_id)}
                        className="text-red-400 hover:text-red-600 p-2 -m-2 rounded-full hover:bg-red-50 active:bg-red-100 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="relative flex-1">
                      <input 
                        type="number" 
                        value={ri.quantity || ''}
                        onChange={(e) => handleUpdateQuantity(ri.ingredient_id, parseFloat(e.target.value) || 0)}
                        className="w-full pl-4 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg font-medium"
                        placeholder="0"
                        step="any"
                        inputMode="decimal"
                      />
                    </div>
                    <div className="relative w-28 shrink-0">
                      <select
                        value={ri.unit}
                        onChange={(e) => handleUpdateUnit(ri.ingredient_id, e.target.value as Unit)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-gray-700 appearance-none"
                      >
                        {UNITS.map(u => (
                          <option key={u} value={u}>{u}</option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Floating Action Button for Mobile / Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 md:static md:bg-transparent md:border-t-0 md:p-0 mt-6 z-40">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="w-full py-4 bg-gray-900 text-white rounded-xl font-semibold text-lg shadow-lg hover:bg-gray-800 active:scale-[0.98] transition-all disabled:opacity-70 flex items-center justify-center gap-2"
        >
          {isSaving ? (
            'Saving...'
          ) : (
            <>
              <Save size={20} />
              Save Recipe
            </>
          )}
        </button>
      </div>

      {/* Add Ingredient Full-Screen Mobile Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white md:bg-gray-900/40 md:backdrop-blur-sm md:p-4 md:items-center md:justify-center">
          <div className="hidden md:block absolute inset-0" onClick={() => setIsAdding(false)} />
          
          <div className="bg-white w-full h-full md:h-auto md:max-h-[80vh] md:max-w-md md:rounded-3xl flex flex-col shadow-2xl relative z-10">
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b border-gray-100 shrink-0">
              <button 
                onClick={() => setIsAdding(false)} 
                className="p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-full active:bg-gray-200"
              >
                <ArrowLeft size={24} />
              </button>
              <h3 className="text-lg font-bold text-gray-900 flex-1">Add Ingredient</h3>
            </div>
            
            {/* Search */}
            <div className="p-4 shrink-0 border-b border-gray-100">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="text"
                  placeholder="Search ingredients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                  autoFocus
                />
              </div>
            </div>

            {/* List */}
            <div className="overflow-y-auto flex-1 p-2">
              {availableIngredients.length > 0 ? (
                <ul className="space-y-1">
                  {availableIngredients.map(ingredient => (
                    <li key={ingredient.id}>
                      <button
                        onClick={() => handleAddIngredient(ingredient.id, ingredient.default_unit)}
                        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 active:bg-gray-100 rounded-xl text-left transition-colors"
                      >
                        <div>
                          <span className="font-medium text-gray-900 block text-base">{ingredient.name}</span>
                          <span className="text-sm text-gray-500">Default: {ingredient.default_unit}</span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                          <Plus size={20} />
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="py-12 text-center px-4">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="text-gray-300" size={32} />
                  </div>
                  <p className="text-gray-900 font-medium mb-1">No ingredients found</p>
                  <p className="text-gray-500 text-sm">Try searching for something else or add it to your database first.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
