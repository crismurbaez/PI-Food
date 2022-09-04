'use strict'

const { Router } = require('express');
const { getApi } = require('./functions.js');
const { getDataId } = require('./functions.js');
const { returnAllData } = require('./functions.js');
const router = Router();


router.get('/', (req, res, next) => {
    let alldata = returnAllData();
    if (alldata.length) {
        console.log('no pido a la API-------')
        res.json(alldata)
    } else {
        try {
            getApi().then((r) => {
                console.log('SIII pido a la API-------')
                res.json(r);
            })
        } catch (e) {
            console.log(e)
        }
    }

});


router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    const dataId = getDataId(id);
    res.json(dataId);

})
module.exports = router;