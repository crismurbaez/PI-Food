const axios = require("axios");
const { Router } = require("express");
const { Recipe, Diets } = require("../db");
const { getDb, getAllData } = require('./functions.js');

const router = Router();

router.post("/", async (req, res) => {
    try {
        const {
            name,
            image,
            diets,
            healthScore,
            summary,
            stepByStep,
            createdByUser,
        } = req.body;
        console.log('back post', name, image, diets)
        const newRecipe = await Recipe.create({
            name,
            image:
                image ||
                "https://www.lavanguardia.com/files/article_main_microformat/uploads/2016/12/27/5e9980625f53c.jpeg",
            healthScore,
            summary,
            stepByStep,
            createdByUser,
        });
        const diet = await Diets.findAll({
            where: { name: diets },
        });

        newRecipe.addDiets(diet);
        console.log(newRecipe)
        // return res.status(200).send("Recipe created succesfully!");
        return res.send(newRecipe);
    } catch (error) {
        console.log(error);
    }

});

module.exports = router;