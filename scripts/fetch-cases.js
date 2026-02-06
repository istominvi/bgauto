const https = require('https');
const fs = require('fs');
const path = require('path');

const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRLMI4GeevGP-r_mrPLntMsbXJ0mFUGfDtMKCjFuOSUhNhy-UatGDpSsMDebHeBMwyTnRG5K_d-POIB/pub?gid=217344138&single=true&output=csv';

function parseCsvLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  
  return result;
}

function convertCsvToJson(csvText) {
  const rows = csvText.trim().split('\n');
  const headerRow = parseCsvLine(rows[0]);
  
  const jsonData = [];
  
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (!row.trim()) continue;
    
    const cells = parseCsvLine(row);
    const rowObject = {};
    
    for (let j = 0; j < headerRow.length; j++) {
      rowObject[headerRow[j]] = cells[j] || '';
    }
    
    jsonData.push(rowObject);
  }
  
  return jsonData;
}

function downloadCsv(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      let content = '';
      
      response.on('data', (chunk) => {
        content += chunk;
      });
      
      response.on('end', () => {
        resolve(content);
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

async function fetchAndSaveCases() {
  try {
    console.log('Downloading CSV data from Google Sheets...');
    const csvContent = await downloadCsv(CSV_URL);
    
    console.log('Converting CSV to JSON...');
    const rawData = convertCsvToJson(csvContent);
    
    const casesData = rawData.map((row, idx) => ({
      id: idx + 1,
      image: row.image || '/placeholder.svg',
      title: row.title || '',
      year: parseInt(row.year) || 0,
      client: row.client || '',
      engine: row.engine || '',
      mileage: row.mileage || '',
      condition: row.condition || '',
      price: row.price || '',
      priceNote: row.priceNote || '',
      country: row.country || '',
      date: row.date || '',
    }));
    
    const outputDir = path.join(__dirname, '../data');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const tsContent = `// Auto-generated from Google Sheets - Do not edit manually\nexport const cases = ${JSON.stringify(casesData, null, 2)};\n`;
    const outputPath = path.join(outputDir, 'cases.ts');
    fs.writeFileSync(outputPath, tsContent);
    
    console.log(`Successfully saved ${casesData.length} cases to ${outputPath}`);
  } catch (err) {
    console.error('Failed to fetch cases:', err);
    process.exit(1);
  }
}

fetchAndSaveCases();
