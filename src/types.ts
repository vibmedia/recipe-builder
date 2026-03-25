export type Unit = 'g' | 'kg' | 'ml' | 'L' | 'pcs' | 'tbsp' | 'tsp' | 'cup' | 'oz' | 'lb';

export interface ItemVariation {
  id: string;
  name: string;
  price: number;
  portion_percentage: number;
  petpooja_id?: string;
}

export interface MasterMenuItem {
  id: string;
  petpooja_id?: string;
  category: string;
  name: string;
  variation?: string;
  online_display_name?: string;
  item_type: 'item' | 'variation';
  price: number;
  description?: string;
  dietary?: string;
  short_code?: string;
  
  variations?: ItemVariation[];
  
  // PDF Extracted Fields
  short_code_2?: string;
  container_charges?: number;
  weight_portion?: string;
  profit_margin?: number;
  order_type?: { delivery: boolean; pick_up: boolean; dine_in: boolean };
  allow_decimal_qty?: boolean;
  
  portion_percentage?: number; // Percentage of food compared to full plate (e.g., 50 for Half)
  
  exposure?: { online_orders: boolean; captain_app: boolean; kiosk: boolean; other: boolean };
  gst_type?: 'services' | 'goods';
  
  cuisine_tags?: string[];
  spice_level?: string;
  sweet_level?: string;
  gravy_property?: string;
  general_tags?: { chef_special: boolean; new: boolean; vegan: boolean; extra_spicy: boolean; egg: boolean; jain: boolean };
  operational_tags?: { set_as_favorite: boolean; ignore_discount: boolean; ignore_addon: boolean; ignore_packing_charge: boolean };
  
  swiggy_tags?: { recommended: boolean; seasonal: boolean };
  zomato_tags?: { treat: boolean; holi_special: boolean; chef_table: boolean; beverage: boolean; spicy: boolean; seasonal: boolean; chef_special: boolean; meal: boolean; cake: boolean; south_indian: boolean; party_order: boolean; restaurant_recommended: boolean; new: boolean; vegan: boolean; home_style: boolean; ham: boolean; bacon: boolean; gluten_free: boolean; dairy_free: boolean; custom_photo_cake: boolean };
  
  hsn_code?: string;
  sap_code?: string;
  fsn_code?: string;
  stock_status?: string;
  nutrition?: string;
  
  metadata?: Record<string, any>;
  created_at?: string;
}

export interface Ingredient {
  id: string;
  name: string;
  default_unit: Unit;
  description?: string;
  metadata?: Record<string, any>;
  created_at?: string;
}

export interface Recipe {
  id: string;
  master_item_id: string;
  notes?: string;
  created_at?: string;
}

export interface RecipeIngredient {
  id: string;
  recipe_id: string;
  ingredient_id: string;
  quantity: number;
  unit: Unit;
  created_at?: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  created_at?: string;
}

export interface AppState {
  categories: Category[];
  masterMenuItems: MasterMenuItem[];
  ingredients: Ingredient[];
  recipes: Recipe[];
  recipeIngredients: RecipeIngredient[];
  isLoading: boolean;
  error: string | null;
}

