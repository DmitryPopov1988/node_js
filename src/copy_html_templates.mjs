import fs from 'fs';
import path from 'path';

function copyFolderSync(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest);
    }
    const files = fs.readdirSync(src);
    files.forEach(file => {
        const srcPath = path.join(src, file);
        const destPath = path.join(dest, file);

        if (fs.statSync(srcPath).isDirectory()) {
            copyFolderSync(srcPath, destPath);
        } else {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest);
    }
    const files = fs.readdirSync(src);
    files.forEach(file => {
        const srcPath = path.join(src, file);
        const destPath = path.join(dest, file);
        if (fs.statSync(srcPath).isDirectory()) {
            copyFolderSync(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    });
}

const srcFolder = './src/template';
const destFolder = './dist/template';

copyFolderSync(srcFolder, destFolder);