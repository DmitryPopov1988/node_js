import fs from 'fs';
import path from 'path';

function copyFolderSync(src, dest) {
    // Create destination directory if it doesn't exist
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest);
    }

    // Read the contents of the source directory
    const files = fs.readdirSync(src);

    // Iterate through the files and copy them
    files.forEach(file => {
        const srcPath = path.join(src, file);
        const destPath = path.join(dest, file);

        // Check if the current item is a file or directory
        if (fs.statSync(srcPath).isDirectory()) {
            // Recursively copy subdirectories
            copyFolderSync(srcPath, destPath);
        } else {
            // Copy files
            fs.copyFileSync(srcPath, destPath);
        }
    });
}

// Usage example:
const srcFolder = './src'; // Source directory
const destFolder = './dist'; // Destination directory

// Copy the entire folder from src to dist
copyFolderSync(srcFolder, destFolder);