const axios = require("axios");
const { Router } = require("express");
const { Recipe, Diets } = require("../db");

const router = Router();

router.post("/", async (req, res) => {
    try {
        const {
            name,
            image,
            summary,
            // score,
            healthScore,
            stepByStep,
            diets,
            createdByUser,
        } = req.body;
        const newRecipe = await Recipe.create({
            name,
            image:
                image ||
                "https://www.clara.es/medio/2022/04/17/recetas-salmon-al-horno-con-brocoli_b302ff6e_900x900.jpg",
            summary,
            // score,
            healthScore,
            stepByStep,
            createdByUser,
        });
        const diet = await Diets.findAll({
            where: { name: diets },
        });

        newRecipe.addDiet(diet);

        // return res.status(200).send("Recipe created succesfully!");
        return res.send(newRecipe);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;