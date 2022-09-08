'use strict'

require('dotenv').config(); //para poder acceder a la variable .env
const { API_KEY } = process.env;
const axios = require("axios");

let alldataMemory = [];
let alldata = [];
let dataId = [];
let filterNames = [];
let resultName = [];
let diets = [];

module.exports = {

    returnAllData: () => {
        return alldata;
    },
    returnAllDataMemory: () => {
        return alldataMemory;
    },
    resetAllData: () => {
        alldata = [];
    },

    memoryAllData: () => {
        alldata = alldataMemory;
    },

    returnResultName: () => {
        return resultName;
    },
    resetResultName: () => {
        resultName = [];
    },
    returnDiets: () => {
        return diets;
    },
    getApi: async () => {//se puede agregar también &instructionsRequired=true // pero me parece que no me trae nada nuevo
        try {
            let api = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)

            const recipes = await api.data.results?.map((e) => {
                return {
                    id: e.id,
                    name: e.title,
                    image: e.image,
                    diets: e.diets,
                    healthScore: e.healthScore,
                    summary: e.summary,
                    stepByStep: e.analyzedInstructions,
                }
            })
            alldataMemory = recipes;
            alldata = recipes;
            return alldata;
        } catch (e) {
            console.log(e)
        }

    },

    getDiets: () => {
        alldata?.map((e) => {
            diets = [...diets, ...e.diets]
        })
        const unicos = [... new Set(diets)];
        diets = unicos;
        return diets;
    },

    getDataId: (id) => {
        dataId = alldata.filter((e) => {
            return e.id === parseInt(id)
        })
        return dataId;
    },
    getDataName: (name) => {
        //filtro que funciona en el back y devuelvo el resultado al front
        if (name !== '') {

            filterNames = alldata.filter((e) => {
                return (e.name.toUpperCase().includes(name.toUpperCase()))
            });
            //En result[0] guardo el array filtrado por name, 
            //en result[1] guardo el texto que muestra el front del resultado de la búsqueda
            //en result[2] guardo el éxito (e) o fracaso (f) de la búsqueda
            const result = (filterNames.length) ? [filterNames, `${filterNames.length} result by: ${name}`, 'e'] : [alldata, `No results found for ${name}`, 'f'];

            //guardo el name de búsqueda en name. 
            //en resultName[0] guardo el texto que muestra el front del resultado de la búsqueda
            // en resultName[1] guardo el éxito (e) o fracaso (f) de la búsqueda
            // en recipes guardo el array filtrado por name
            alldata = result[0];
            resultName = [result[1], result[2]];

            return ([{
                name: name,
                resultName: resultName,
                recipes: alldata,
            }])
        }
    },
}