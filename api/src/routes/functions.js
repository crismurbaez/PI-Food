'use strict'

require('dotenv').config(); //para poder acceder a la variable .env
const { API_KEY } = process.env;
const axios = require("axios");

let alldata = [];
let dataId = [];

module.exports = {

    returnAllData: () => {
        return alldata;
    },

    getApi: async () => {//se puede agregar también &instructionsRequired=true // pero me parece que no me trae nada nuevo
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
        alldata = recipes;
        return alldata;
    },

    getDataId: (id) => {
        dataId = alldata.filter((e) => {
            return e.id === parseInt(id)
        })
        return dataId;
    }

}