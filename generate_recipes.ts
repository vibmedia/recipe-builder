import fs from 'fs';

const items = JSON.parse(fs.readFileSync('merged_items.json', 'utf8'));

const INGREDIENTS_DATA = [
  { name: 'Cabbage', unit: 'g' },
  { name: 'Carrot', unit: 'g' },
  { name: 'Capsicum', unit: 'g' },
  { name: 'Onion', unit: 'g' },
  { name: 'Garlic', unit: 'g' },
  { name: 'Ginger', unit: 'g' },
  { name: 'Green Chilli', unit: 'g' },
  { name: 'Paneer', unit: 'g' },
  { name: 'Chicken', unit: 'g' },
  { name: 'Egg', unit: 'pcs' },
  { name: 'Mushroom', unit: 'g' },
  { name: 'Soya Chaap', unit: 'g' },
  { name: 'Soy Sauce', unit: 'ml' },
  { name: 'Vinegar', unit: 'ml' },
  { name: 'Chilli Sauce', unit: 'ml' },
  { name: 'Tomato Ketchup', unit: 'ml' },
  { name: 'Schezwan Sauce', unit: 'ml' },
  { name: 'White Sauce', unit: 'ml' },
  { name: 'Red Sauce', unit: 'ml' },
  { name: 'Corn Flour', unit: 'g' },
  { name: 'Refined Oil', unit: 'ml' },
  { name: 'Spring Roll Sheet', unit: 'pcs' },
  { name: 'Momo Wrapper', unit: 'pcs' },
  { name: 'Noodles (Raw)', unit: 'g' },
  { name: 'Rice (Basmati)', unit: 'g' },
  { name: 'Pasta (Penne)', unit: 'g' },
  { name: 'Potato', unit: 'g' },
  { name: 'Honey', unit: 'ml' },
  { name: 'Peri Peri Masala', unit: 'g' },
  { name: 'Cheese', unit: 'g' },
  { name: 'Veg Balls', unit: 'pcs' },
];

const ingredients = INGREDIENTS_DATA.map((ing, index) => ({
  id: `ing_${index}`,
  name: ing.name,
  default_unit: ing.unit,
  created_at: new Date().toISOString()
}));

const recipes: any[] = [];
const recipeIngredients: any[] = [];

let recipeCounter = 1;
let riCounter = 1;

items.forEach((item: any) => {
  const recipeId = `rec_${recipeCounter++}`;
  recipes.push({
    id: recipeId,
    master_item_id: item.id,
    created_at: new Date().toISOString()
  });

  const name = item.name.toLowerCase();
  const cat = item.category.toLowerCase();
  
  // The base recipe is for the 100% portion (Full)
  const multiplier = (item.portion_percentage || 100) / 100;

  const addRi = (ingName: string, baseQty: number) => {
    const ing = ingredients.find(i => i.name === ingName);
    if (!ing) return;
    recipeIngredients.push({
      id: `ri_${riCounter++}`,
      recipe_id: recipeId,
      ingredient_id: ing.id,
      quantity: Number((baseQty * multiplier).toFixed(2)),
      unit: ing.default_unit,
      created_at: new Date().toISOString()
    });
  };

  // Logic to guess ingredients
  if (name.includes('momo')) {
    addRi('Momo Wrapper', 8);
    if (name.includes('chicken')) addRi('Chicken', 80);
    else if (name.includes('paneer')) addRi('Paneer', 80);
    else addRi('Cabbage', 60), addRi('Carrot', 20);
    
    if (name.includes('fried') || name.includes('kurkure')) addRi('Refined Oil', 50);
    if (name.includes('chilli')) addRi('Chilli Sauce', 20), addRi('Capsicum', 20);
    if (name.includes('tandoori') || name.includes('afghani')) addRi('Refined Oil', 20);
  } 
  else if (name.includes('spring roll')) {
    addRi('Spring Roll Sheet', 4);
    addRi('Cabbage', 50);
    addRi('Carrot', 30);
    addRi('Refined Oil', 50);
    if (name.includes('kurkure')) addRi('Corn Flour', 20);
  }
  else if (name.includes('noodle')) {
    addRi('Noodles (Raw)', 150);
    addRi('Onion', 30);
    addRi('Cabbage', 30);
    addRi('Soy Sauce', 15);
    addRi('Refined Oil', 20);
    if (name.includes('chicken')) addRi('Chicken', 80);
    if (name.includes('paneer')) addRi('Paneer', 60);
    if (name.includes('egg')) addRi('Egg', 2);
    if (name.includes('chilly') || name.includes('garlic')) addRi('Garlic', 15), addRi('Chilli Sauce', 20);
    if (name.includes('singapore')) addRi('Paneer', 20);
  }
  else if (name.includes('rice')) {
    addRi('Rice (Basmati)', 150);
    addRi('Onion', 30);
    addRi('Carrot', 30);
    addRi('Soy Sauce', 10);
    addRi('Refined Oil', 20);
    if (name.includes('chicken')) addRi('Chicken', 80);
    if (name.includes('paneer')) addRi('Paneer', 60);
    if (name.includes('egg')) addRi('Egg', 2);
    if (name.includes('schezwan')) addRi('Schezwan Sauce', 25);
  }
  else if (name.includes('pasta')) {
    addRi('Pasta (Penne)', 120);
    addRi('Capsicum', 30);
    addRi('Onion', 30);
    addRi('Cheese', 20);
    if (name.includes('white sauce')) addRi('White Sauce', 100);
    else if (name.includes('red sause') || name.includes('red sauce')) addRi('Red Sauce', 100);
    else if (name.includes('mix sauce')) addRi('White Sauce', 50), addRi('Red Sauce', 50);
    else addRi('White Sauce', 80); // default

    if (name.includes('chicken')) addRi('Chicken', 80);
    if (name.includes('mushroom')) addRi('Mushroom', 60);
  }
  else if (name.includes('chaap')) {
    addRi('Soya Chaap', 150);
    addRi('Onion', 40);
    addRi('Refined Oil', 30);
    if (name.includes('malai')) addRi('Cheese', 20);
    if (name.includes('kurkure')) addRi('Corn Flour', 30), addRi('Refined Oil', 50);
  }
  else if (name.includes('soup') || name.includes('thukpa')) {
    addRi('Corn Flour', 15);
    addRi('Cabbage', 20);
    addRi('Carrot', 20);
    if (name.includes('manchow') || name.includes('hot & sour')) addRi('Soy Sauce', 10), addRi('Chilli Sauce', 10);
    if (name.includes('sweetcorn')) addRi('Cheese', 10);
    if (name.includes('noodle') || name.includes('thukpa')) addRi('Noodles (Raw)', 50);
    if (name.includes('chicken')) addRi('Chicken', 50);
    if (name.includes('paneer')) addRi('Paneer', 40);
  }
  else if (cat.includes('starter')) {
    addRi('Onion', 40);
    addRi('Capsicum', 30);
    addRi('Soy Sauce', 15);
    addRi('Refined Oil', 40);
    
    if (name.includes('paneer')) addRi('Paneer', 150);
    else if (name.includes('chicken')) addRi('Chicken', 150);
    else if (name.includes('mushroom')) addRi('Mushroom', 120);
    else if (name.includes('manchurian')) addRi('Veg Balls', 6);
    else if (name.includes('potato') || name.includes('fries')) {
      addRi('Potato', 200);
      if (name.includes('honey')) addRi('Honey', 20);
      if (name.includes('peri peri')) addRi('Peri Peri Masala', 10);
    }
    else if (name.includes('corn')) addRi('Corn Flour', 30);
  }
  else {
    addRi('Onion', 20);
    addRi('Refined Oil', 20);
  }
});

let storeContent = fs.readFileSync('src/store.tsx', 'utf8');

const itemsStart = storeContent.search(/\s*masterMenuItems:\s*\[/);
const ingStart = storeContent.search(/\s*ingredients:\s*\[/);
const recStart = storeContent.search(/\s*recipes:\s*\[/);
const riStart = storeContent.search(/\s*recipeIngredients:\s*\[/);
const endOfInitialState = storeContent.indexOf('  isLoading: true,');

if (itemsStart !== -1 && ingStart !== -1 && recStart !== -1 && riStart !== -1 && endOfInitialState !== -1) {
  const newItemsStr = '  masterMenuItems: ' + JSON.stringify(items, null, 4).replace(/\n/g, '\n  ') + ',';
  const newIngStr = '  ingredients: ' + JSON.stringify(ingredients, null, 4).replace(/\n/g, '\n  ') + ',';
  const newRecStr = '  recipes: ' + JSON.stringify(recipes, null, 4).replace(/\n/g, '\n  ') + ',';
  const newRiStr = '  recipeIngredients: ' + JSON.stringify(recipeIngredients, null, 4).replace(/\n/g, '\n  ') + ',';

  const newContent = storeContent.substring(0, itemsStart) + 
                     '\n' + newItemsStr + '\n' + 
                     newIngStr + '\n' + 
                     newRecStr + '\n' + 
                     newRiStr + '\n' + 
                     storeContent.substring(endOfInitialState);
                     
  fs.writeFileSync('src/store.tsx', newContent);
  console.log('Updated store.tsx with merged items, ingredients and recipes!');
} else {
  console.log('Could not find markers in store.tsx');
}
