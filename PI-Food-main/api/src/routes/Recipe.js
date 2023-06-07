const { Router } = require('express');
const {
    recipeGet,
    recipeGetbyId,
    recipesPost,
    recipesDelete,
} = require('../controllers/recipe');

const router = Router();

router.get('/', recipeGet);
router.get('/:id', recipeGetbyId);

router.delete('/:id', recipesDelete);
router.post('/', recipesPost);
module.exports = router;