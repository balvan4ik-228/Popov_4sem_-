const towersService = require('../services/towersService');

async function getAllTowers(req, res, next) {
    try {
        const { name, location, status } = req.query;

        const towers = await towersService.getAllTowers({
            name,
            location,
            status
        });

        res.status(200).json(towers);
    } catch (error) {
        next(error);
    }
}

async function getTowerById(req, res, next) {
    try {
        const id = Number(req.params.id);
        const tower = await towersService.getTowerById(id);

        if (!tower) {
            return res.status(404).json({
                message: 'Вышка не найдена'
            });
        }

        res.status(200).json(tower);
    } catch (error) {
        next(error);
    }
}

async function createTower(req, res, next) {
    try {
        const { name, location, status, coverage, maintenanceDate, description } = req.body;

        if (!name || !location || !status || !coverage || !maintenanceDate || !description) {
            return res.status(400).json({
                message: 'Не заполнены обязательные поля'
            });
        }

        const newTower = await towersService.createTower({
            name,
            location,
            status,
            coverage,
            maintenanceDate,
            description
        });

        res.status(201).json(newTower);
    } catch (error) {
        next(error);
    }
}

async function updateTower(req, res, next) {
    try {
        const id = Number(req.params.id);
        const updatedTower = await towersService.updateTower(id, req.body);

        if (!updatedTower) {
            return res.status(404).json({
                message: 'Вышка не найдена'
            });
        }

        res.status(200).json(updatedTower);
    } catch (error) {
        next(error);
    }
}

async function deleteTower(req, res, next) {
    try {
        const id = Number(req.params.id);
        const isDeleted = await towersService.deleteTower(id);

        if (!isDeleted) {
            return res.status(404).json({
                message: 'Вышка не найдена'
            });
        }

        res.status(204).send();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllTowers,
    getTowerById,
    createTower,
    updateTower,
    deleteTower
};
