'use strict'

const { Router } = require('express');
const { returnDiets } = require('./functions.js');
const { getDiets } = require('./functions.js');


const router = Router();

router.get('/', (req, res, next) => {
    let diets = returnDiets();

    try {
        if (diets.length === 0) {
            diets = getDiets()
        }
        // console.log('pido diets------------------')
        // console.log(diets)
        res.json(diets);
    } catch (e) {
        console.log(e);
    }

})

module.exports = router;