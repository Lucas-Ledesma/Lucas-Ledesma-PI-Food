const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const Recipes = require('./Recipe.js');
const Diets = require('./Diet.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/recipe', Recipes);
router.use('/diet', Diets);

module.exports = router;
