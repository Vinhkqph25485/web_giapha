// scripts/create-zip.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createWriteStream } from 'fs';
import archiver from 'archiver';

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Build paths
const rootDir = path.resolve(__dirname, '..');
const buildDir = path.resolve(rootDir, 'dist');
const zipPath = path.resolve(rootDir, 'web_giapha_build.zip');

// Create a file to stream archive data to
const output = createWriteStream(zipPath);
const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level
});

// Listen for all archive data to be written
output.on('close', function() {
  console.log(`📦 Archive created: ${zipPath}`);
  console.log(`📊 Total size: ${archive.pointer()} bytes`);
});

// Handle warnings during archiving
archive.on('warning', function(err) {
  if (err.code === 'ENOENT') {
    console.warn('Warning:', err);
  } else {
    throw err;
  }
});

// Handle errors during archiving
archive.on('error', function(err) {
  throw err;
});

// Pipe archive data to the file
archive.pipe(output);

// Add the dist folder
archive.directory(buildDir, false);

// Finalize the archive
archive.finalize().catch(err => {
  console.error('Failed to create archive:', err);
  process.exit(1);
});
