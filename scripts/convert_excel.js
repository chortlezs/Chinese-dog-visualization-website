const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const excelPath = path.join(__dirname, '../public/poetry/poetrytable.xlsx');
const jsonPath = path.join(__dirname, '../public/poetry/data.json');

try {
  console.log(`Reading Excel file from: ${excelPath}`);
  const workbook = XLSX.readFile(excelPath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  
  // Convert to JSON
  const jsonData = XLSX.utils.sheet_to_json(worksheet);
  
  console.log(`Converted ${jsonData.length} rows.`);
  
  // Write to JSON file
  fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2));
  console.log(`JSON data saved to: ${jsonPath}`);
  
  // Log first item to see structure
  if (jsonData.length > 0) {
    console.log('First item structure:', jsonData[0]);
  }
} catch (error) {
  console.error('Error converting Excel to JSON:', error);
}
