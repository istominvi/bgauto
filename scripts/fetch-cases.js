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
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        console.log(`Following redirect to ${response.headers.location}`);
        return resolve(downloadCsv(response.headers.location));
      }
      
      if (response.statusCode !== 200) {
        return reject(new Error(`Failed to download CSV: ${response.statusCode}`));
      }

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

function getGoogleDriveDirectLink(url) {
  if (!url) return '/placeholder.svg';
  if (url.includes('drive.google.com') || url.includes('drive.usercontent.google.com')) {
    try {
      // Handle /d/ID/ format
      const dMatch = url.match(/\/d\/([^/?]+)/);
      if (dMatch && dMatch[1]) {
        return `https://drive.google.com/uc?id=${dMatch[1]}`;
      }
      // Handle ?id=ID format
      const idMatch = url.match(/[?&]id=([^&]+)/);
      if (idMatch && idMatch[1]) {
        return `https://drive.google.com/uc?id=${idMatch[1]}`;
      }
    } catch (e) {
      console.warn('Failed to parse Google Drive URL:', url);
    }
  }
  return url;
}

async function fetchAndSaveCases() {
  try {
    console.log('Downloading CSV data from Google Sheets...');
    const csvContent = await downloadCsv(CSV_URL);
    
    console.log('Converting CSV to JSON...');
    const rawData = convertCsvToJson(csvContent);
    
    const casesData = rawData.map((row, idx) => {
      // Mapping from Russian or English headers
      const rawTitle = row['Автомобиль'] || row['title'] || '';
      const carInfo = rawTitle.split(',');
      const title = carInfo[0] ? carInfo[0].trim() : '';

      let year = 0;
      if (carInfo[1]) {
        year = parseInt(carInfo[1].trim()) || 0;
      } else {
        year = parseInt(row['year']) || 0;
      }

      let client = row['Кому'] || row['client'] || '';
      if (client.startsWith('Выдали ')) {
        client = client.replace('Выдали ', '');
      }

      let price = row['Стоимость'] || row['Цена'] || row['price'] || '';
      // Remove all non-digit characters to normalize
      const numericPrice = price.replace(/\D/g, '');
      if (numericPrice) {
        // Format with spaces for Russian standard: 2320000 -> 2 320 000
        price = parseInt(numericPrice).toLocaleString('ru-RU').replace(/\s/g, ' ');
      }

      return {
        id: idx + 1,
        image: getGoogleDriveDirectLink(row['Фото'] || row['image']),
        title: title,
        year: year,
        client: client,
        engine: row['Двигатель'] || row['engine'] || '',
        mileage: row['Пробег'] || row['mileage'] || '',
        condition: row['Состояние'] || row['condition'] || '',
        price: price,
        priceNote: row['priceNote'] || '',
        country: row['Страна'] || row['country'] || '',
        date: row['Дата'] || row['date'] || '',
      };
    }).filter(item => item.title !== '');
    
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
