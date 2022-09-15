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
const { getAllData } = require('./functions.js');
const { returnDbData, returnDataId, getDb, returnDataApi } = require('./functions.js');

const router = Router();

router.get('/', (req, res, next) => {
    const name = req.query.name;
    let resultName = [];
    let dataName = [];
    let allData = [];
    resetAllData()
    getDb()
        .then((r) => {
            getAllData();
        })
        .then((r) => {
            allData = returnAllData
        })
        .then((r) => {
            let dbData = returnDbData();
            let dataApi = returnDataApi();
            // let alldataMemory = returnAllDataMemory();

            //en resultName[0] guardo el texto que muestra el front del resultado de la búsqueda
            // en resultName[1] guardo el éxito (e) o fracaso (f) de la búsqueda
            resultName = returnResultName();

            if (name) {
                console.log(name);
                dataName = getDataName(name.trim());
                resultName = returnResultName();
                if (resultName[1] === 'f') {
                    console.log(resultName)
                    resetAllData()
                } else {
                    // console.log(resultName)
                    res.json(dataName)
                }
            } else {
                resetResultName()
                if (dataApi.length) {
                    console.log('no pido a la API-------')
                    resetAllData();
                    getAllData();
                    allData = returnAllData()
                    res.json([allData])
                } else {
                    try {
                        getApi()
                            .then((r) => {
                                console.log('SIII pido a la API-------')
                                resetAllData();
                                getAllData();
                                allData = returnAllData()
                                res.json([allData]);
                            })
                    } catch (e) {
                        console.log(e)
                    }
                }
            }

        })
        .catch((e) => {
            console.log(e)
        })

});


router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    let allData = [];
    let dataId = [];

    resetAllData()
    getDb()
        .then((r) => {
            getAllData();
        })
        .then((r) => {
            allData = returnAllData()
            console.log('getId', allData[0], allData[1])
        })
        .then((r) => {
            dataId = getDataId(id);
            console.log('dataId back', dataId)
            res.json(dataId);
        })
        .catch((e) => {
            console.log(e)
        })

})


module.exports = router;