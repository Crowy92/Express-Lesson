//controller
// model view controllor setup

const Cat = require('../models/cat');
const express = require('express');
const router = express.Router();
// const cats = require('../data')

router.get('/', (req, res) => {
    const cats = Cat.all;
    res.send(cats)
})
router.get('/:id', (req, res) => {
    const catId = parseInt(req.params.id);
    const selectedCat = Cat.findById(catId);
    res.send(selectedCat)
})

router.post('/', (req, res) => {
    const data = req.body;
    const newCat = Cat.create(data);
    res.status(201).send(newCat);
});

router.delete('/:id', (req, res) => {
    const catId = parseInt(req.params.id);
    const catToDestroy = Cat.findById(catId);
    catToDestroy.destroy();
    res.status(204).send();
});

module.exports = router;