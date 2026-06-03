const fileService = require('./fileService');

async function getAllTowers(filters = {}) {
    const towers = await fileService.readTowersFile();

    let filteredTowers = [...towers];

    if (filters.name) {
        filteredTowers = filteredTowers.filter(tower =>
            tower.name.toLowerCase().includes(filters.name.toLowerCase())
        );
    }

    if (filters.location) {
        filteredTowers = filteredTowers.filter(tower =>
            tower.location.toLowerCase() === filters.location.toLowerCase()
        );
    }

    if (filters.status) {
        filteredTowers = filteredTowers.filter(tower =>
            tower.status.toLowerCase() === filters.status.toLowerCase()
        );
    }

    return filteredTowers;
}

async function getTowerById(id) {
    const towers = await fileService.readTowersFile();
    return towers.find(tower => tower.id === id);
}

async function createTower(towerData) {
    const towers = await fileService.readTowersFile();

    const newId = towers.length > 0
        ? Math.max(...towers.map(tower => tower.id)) + 1
        : 1;

    const newTower = {
        id: newId,
        ...towerData
    };

    towers.push(newTower);
    await fileService.writeTowersFile(towers);

    return newTower;
}

async function updateTower(id, updateData) {
    const towers = await fileService.readTowersFile();
    const towerIndex = towers.findIndex(tower => tower.id === id);

    if (towerIndex === -1) {
        return null;
    }

    towers[towerIndex] = {
        ...towers[towerIndex],
        ...updateData,
        id
    };

    await fileService.writeTowersFile(towers);

    return towers[towerIndex];
}

async function deleteTower(id) {
    const towers = await fileService.readTowersFile();
    const towerIndex = towers.findIndex(tower => tower.id === id);

    if (towerIndex === -1) {
        return false;
    }

    towers.splice(towerIndex, 1);
    await fileService.writeTowersFile(towers);

    return true;
}

module.exports = {
    getAllTowers,
    getTowerById,
    createTower,
    updateTower,
    deleteTower
};
