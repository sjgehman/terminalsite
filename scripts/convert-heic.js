const fs = require('fs');
const path = require('path');
const convert = require('heic-convert');

async function convertHEICFiles() {
  const catsDirectory = path.join(__dirname, '..', 'public', 'cats');

  console.log('Converting HEIC files in:', catsDirectory);

  const files = fs.readdirSync(catsDirectory);

  const heicFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ext === '.heic';
  });

  if (heicFiles.length === 0) {
    console.log('No HEIC files found to convert.');
    return;
  }

  console.log(`Found ${heicFiles.length} HEIC files to convert...`);

  for (const heicFile of heicFiles) {
    const heicPath = path.join(catsDirectory, heicFile);
    const baseName = path.basename(heicFile, '.heic');
    const jpgPath = path.join(catsDirectory, `${baseName}.jpg`);

    // Skip if JPG already exists
    if (fs.existsSync(jpgPath)) {
      console.log(`  ⏭️  ${heicFile} - JPG already exists, skipping`);
      continue;
    }

    try {
      console.log(`  🔄 Converting ${heicFile}...`);
      const heicBuffer = fs.readFileSync(heicPath);
      const outputBuffer = await convert({
        buffer: heicBuffer,
        format: 'JPEG',
        quality: 0.9,
      });
      fs.writeFileSync(jpgPath, outputBuffer);
      console.log(`  ✅ Created ${baseName}.jpg`);
    } catch (error) {
      console.error(`  ❌ Failed to convert ${heicFile}:`, error.message);
    }
  }

  console.log('\nConversion complete!');
  console.log('\n📝 Note: You can delete the original .heic/.HEIC files if you want.');
}

convertHEICFiles().catch(console.error);
