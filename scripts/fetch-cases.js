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

function getGoogleDriveDownloadUrl(url) {
  if (!url) return null;
  if (url.includes('drive.google.com') || url.includes('drive.usercontent.google.com') || url.includes('lh3.googleusercontent.com')) {
    try {
      // Handle /d/ID/ format
      const dMatch = url.match(/\/d\/([^/?]+)/);
      if (dMatch && dMatch[1]) {
        return `https://drive.google.com/uc?export=download&id=${dMatch[1]}`;
      }
      // Handle ?id=ID format
      const idMatch = url.match(/[?&]id=([^&]+)/);
      if (idMatch && idMatch[1]) {
        return `https://drive.google.com/uc?export=download&id=${idMatch[1]}`;
      }
      // Handle lh3.googleusercontent.com/d/ID
      if (url.includes('lh3.googleusercontent.com/d/')) {
        const id = url.split('/d/')[1];
        if (id) return `https://drive.google.com/uc?export=download&id=${id}`;
      }
    } catch (e) {
      console.warn('Failed to parse Google Drive URL:', url);
    }
  }
  return url;
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return resolve(downloadFile(response.headers.location, dest));
      }

      if (response.statusCode !== 200) {
        return reject(new Error(`Failed to download file: ${response.statusCode} for ${url}`));
      }

      const file = fs.createWriteStream(dest);
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (error) => {
      fs.unlink(dest, () => reject(error));
    });
  });
}

async function fetchAndSaveCases() {
  try {
    console.log('Downloading CSV data from Google Sheets...');
    const csvContent = await downloadCsv(CSV_URL);
    
    console.log('Converting CSV to JSON...');
    const rawData = convertCsvToJson(csvContent);
    
    const imagesDir = path.join(__dirname, '../public/images/cases');
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }

    const casesData = [];

    for (let i = 0; i < rawData.length; i++) {
      const row = rawData[i];
      const rawTitle = row['Автомобиль'] || row['title'] || '';
      if (!rawTitle) continue;

      const carInfo = rawTitle.split(',');
      const title = carInfo[0] ? carInfo[0].trim() : '';
      const id = i + 1;

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
      const numericPrice = price.replace(/\D/g, '');
      if (numericPrice) {
        price = parseInt(numericPrice).toLocaleString('ru-RU').replace(/\s/g, ' ');
      }

      // Handle image download
      const rawImageUrl = row['Фото'] || row['image'];
      const downloadUrl = getGoogleDriveDownloadUrl(rawImageUrl);
      let localImagePath = '/placeholder.svg';

      if (downloadUrl) {
        const fileName = `case-${id}.jpg`;
        const destPath = path.join(imagesDir, fileName);
        console.log(`Downloading image for case ${id}: ${downloadUrl} -> ${destPath}`);
        try {
          await downloadFile(downloadUrl, destPath);
          localImagePath = `/bgauto/images/cases/${fileName}`;
        } catch (err) {
          console.error(`Failed to download image for case ${id}:`, err.message);
        }
      }

      casesData.push({
        id: id,
        image: localImagePath,
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
      });
    }
    
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
