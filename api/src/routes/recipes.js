'use strict'

const { Router } = require('express');
const { getApi } = require('./functions.js');
const { getDataId } = require('./functions.js');
const { returnAllData } = require('./functions.js');
const { getDataName } = require('./functions.js');
const { resetAllData } = require('./functions.js');
const { memoryAllData } = require('./functions.js');
const { returnAllDataMemory } = require('./functions.js');
const { returnResultName } = require('./functions.js');
const { resetResultName } = require('./functions.js');

const router = Router();

router.get('/', (req, res, next) => {
    const name = req.query.name;
    let resultName = [];
    let dataName = [];
    let alldata = returnAllData();
    let alldataMemory = returnAllDataMemory();

    //en resultName[0] guardo el texto que muestra el front del resultado de la búsqueda
    // en resultName[1] guardo el éxito (e) o fracaso (f) de la búsqueda
    resultName = returnResultName();

    if (name) {
        // console.log(name);
        if (resultName[1] === 'f') {
            console.log(resultName)
            resetAllData()
        } else {
            dataName = getDataName(name.trim());
            resultName = returnResultName();
            // console.log(resultName)
            res.json(dataName)
        }
    } else {
        resetResultName()
        if (alldataMemory.length) {
            console.log('no pido a la API-------')
            resetAllData();
            memoryAllData();
            alldata = returnAllData()

            res.json([alldata])
        } else {
            try {
                getApi().then((r) => {
                    console.log('SIII pido a la API-------')

                    res.json([r]);
                })
            } catch (e) {
                console.log(e)
            }
        }
    }





});


router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    const dataId = getDataId(id);
    res.json(dataId);

})



module.exports = router;