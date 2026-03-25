import fs from 'fs';

const items = JSON.parse(fs.readFileSync('parsed_items.json', 'utf8'));
let storeContent = fs.readFileSync('src/store.tsx', 'utf8');

const startMarker = 'masterMenuItems: [';
const endMarker = '  ingredients: [';

const startIndex = storeContent.indexOf(startMarker);
const endIndex = storeContent.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
  const newItemsStr = items.map(item => {
    return "    { id: '" + item.id + "', petpooja_id: '" + item.petpooja_id + "', name: '" + item.name.replace(/'/g, "\\'") + "', category: '" + item.category + "', item_type: '" + item.item_type + "' as 'item' | 'variation', price: " + item.price + ", dietary: '" + item.dietary + "', short_code: '" + item.short_code + "', description: '" + item.description.replace(/'/g, "\\'") + "', variation: '" + item.variation + "', online_display_name: '" + item.online_display_name.replace(/'/g, "\\'") + "', portion_percentage: " + item.portion_percentage + ", created_at: new Date().toISOString() },";
  }).join('\n');

  const newContent = storeContent.substring(0, startIndex + startMarker.length) + '\n' + newItemsStr + '\n  ],\n  ingredients: [\n' + storeContent.substring(endIndex + endMarker.length);
  fs.writeFileSync('src/store.tsx', newContent);
  console.log('Updated store.tsx');
} else {
  console.log('Markers not found');
}
