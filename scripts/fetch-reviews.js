const https = require('https');
const fs = require('fs');
const path = require('path');

const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRLMI4GeevGP-r_mrPLntMsbXJ0mFUGfDtMKCjFuOSUhNhy-UatGDpSsMDebHeBMwyTnRG5K_d-POIB/pub?gid=0&single=true&output=csv';

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

async function fetchAndSaveReviews() {
  try {
    console.log('Downloading CSV data for reviews...');
    const csvContent = await downloadCsv(CSV_URL);

    console.log('Converting CSV to JSON...');
    const rawData = convertCsvToJson(csvContent);

    const reviewsData = rawData.map((row, index) => {
      return {
        id: index + 1,
        text: row['Отзыв'] || row['text'] || '',
        name: row['Имя'] || row['name'] || '',
        country: row['Страна'] || row['country'] || '',
        car: row['Автомобиль'] || row['car'] || '',
        savings: row['Экономия'] || row['savings'] || '',
      };
    }).filter(review => review.text); // Only include reviews with text

    const outputDir = path.join(__dirname, '../data');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const tsContent = `// Auto-generated from Google Sheets - Do not edit manually\nexport const reviews = ${JSON.stringify(reviewsData, null, 2)};\n`;
    const outputPath = path.join(outputDir, 'reviews.ts');
    fs.writeFileSync(outputPath, tsContent);

    console.log(`Successfully saved ${reviewsData.length} reviews to ${outputPath}`);
  } catch (err) {
    console.error('Failed to fetch reviews:', err);
    process.exit(1);
  }
}

fetchAndSaveReviews();
