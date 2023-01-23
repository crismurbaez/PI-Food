const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipes = require('./recipes.js')
const diets = require('./diets.js')
const recipe = require('./recipe.js')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipes', recipes)
router.use('/diets', diets)
router.use('/recipe', recipe)


module.exports = router;

//ESTE TIENE EL EJEMPLO DE COMO GUARDO EN LA BASE DE DATOS, INCLUIRLO EN FUNCTIONS.JS
// const server = require('express').Router();
// const { Product } = require('../db.js');

// server.get('/', (req, res, next) => {
// 	Product.findAll()
// 		.then(products => {
// 			res.send(products);
// 		})
// 		.catch(next);
// });
// server.post("/", (req, res, next) => {     <------------------PARA AGREGAR EN LA BASE???
//   Product.create(req.body)
//     .then((product) => {
//       res.send(product);
//     })
//     .catch(next);
// });
// server.put("/:id", (req, res, next) => {     <------------------PARA ACTUALIZAR EN LA BASE
//   Product.findById(req.params.id)
//     .then((product) => {
//       return product.update(req.body);
//     })
//     .then((product) => {
//       res.send(product);
//     })
//     .catch(next);
// });
// server.delete("/:id", (req, res, next) => {    <-----------------ESTE ES UN EJEMPLO DE COMO BORRAR
//   Product.findById(req.params.id)
//     .then((product) => {
//       return product.destroy();
//     })
//     .then((product) => {
//       res.send(product);
//     })
//     .catch(next);
// });

// module.exports = server;