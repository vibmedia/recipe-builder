import fs from 'fs';

const items = JSON.parse(fs.readFileSync('parsed_items.json', 'utf8'));

const mergedItems: any[] = [];
let currentItem: any = null;

for (const item of items) {
  if (item.item_type === 'item') {
    currentItem = { ...item, variations: [] };
    mergedItems.push(currentItem);
  } else if (item.item_type === 'variation') {
    if (currentItem) {
      currentItem.variations.push({
        id: item.id,
        name: item.variation,
        price: item.price,
        portion_percentage: item.portion_percentage,
        petpooja_id: item.petpooja_id
      });
    } else {
      // Standalone variation? Shouldn't happen based on CSV structure
      mergedItems.push(item);
    }
  }
}

// Some items might not have variations, but have a price.
// For items with variations, their price is usually 0, and variations have prices.

fs.writeFileSync('merged_items.json', JSON.stringify(mergedItems, null, 2));
console.log(`Merged ${items.length} rows into ${mergedItems.length} items.`);
