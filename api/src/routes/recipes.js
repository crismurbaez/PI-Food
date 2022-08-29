require('dotenv').config(); //para poder acceder a la variable .env
const { Router } = require('express');
const axios = require("axios");
const { API_KEY } = process.env;

const router = Router();

let alldata = [];
let dataId = [];

router.get('/', (req, res, next) => {
    axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&instructionsRequired=true&number=100`)
        .then((r) => {
            const recipes = r.data.results?.map((e) => {
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
            return recipes;
        })
        .then((r) => {
            alldata = r;
            console.log(alldata)
            res.json(r);
        })
        .catch((e) => {
            console.log(e);
        })

})


// router.get('/:id', (req, res, next) => {
//     const id = req.params.id;

//     dataId = alldata ?.filter((e) => {

//     })

// })
module.exports = router;