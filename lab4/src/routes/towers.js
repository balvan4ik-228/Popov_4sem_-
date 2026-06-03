const express = require('express');
const towersController = require('../controllers/towersController');

const router = express.Router();

router.get('/', towersController.getAllTowers);
router.get('/:id', towersController.getTowerById);
router.post('/', towersController.createTower);
router.patch('/:id', towersController.updateTower);
router.delete('/:id', towersController.deleteTower);

module.exports = router;
