import { Unit } from '../types';

const conversionRates: Record<string, number> = {
  'kg_g': 1000,
  'g_kg': 0.001,
  'L_ml': 1000,
  'ml_L': 0.001,
  'lb_oz': 16,
  'oz_lb': 0.0625,
  'tbsp_ml': 15,
  'tsp_ml': 5,
  'cup_ml': 240,
  'ml_tbsp': 1/15,
  'ml_tsp': 1/5,
  'ml_cup': 1/240,
};

export const convertQuantity = (quantity: number, fromUnit: Unit, toUnit: Unit): number => {
  if (fromUnit === toUnit) return quantity;
  
  const key = `${fromUnit}_${toUnit}`;
  if (conversionRates[key]) {
    return quantity * conversionRates[key];
  }
  
  // Try multi-step conversion (e.g., tbsp -> ml -> L)
  if (fromUnit === 'tbsp' && toUnit === 'L') return quantity * 15 * 0.001;
  if (fromUnit === 'tsp' && toUnit === 'L') return quantity * 5 * 0.001;
  if (fromUnit === 'cup' && toUnit === 'L') return quantity * 240 * 0.001;
  
  // If no conversion is known, return the original (this might lead to inaccurate costs if units mismatch wildly, 
  // but prevents NaN errors. In a real app, we'd prompt the user to define the conversion).
  return quantity; 
};
