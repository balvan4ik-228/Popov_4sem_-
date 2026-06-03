const fs = require('fs/promises');
const path = require('path');

const DATA_FILE_PATH = path.join(__dirname, '../data/towers.json');

async function readTowersFile() {
    const fileContent = await fs.readFile(DATA_FILE_PATH, 'utf-8');
    return JSON.parse(fileContent);
}

async function writeTowersFile(data) {
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

module.exports = {
    readTowersFile,
    writeTowersFile
};
