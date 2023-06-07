import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postRecipe, getAllRecipes, getAllDiets } from '../redux/actions';
import { validate, validateOnSubmit } from '../validation';
import { Header } from '../componentes/Header';
import { useNavigate } from 'react-router-dom';
import '../css/font.css';
import '../css/form.css';

const RecipeForm = () => {
  const [errors , setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [areDietCheckboxesChecked, setAreDietCheckboxesChecked] = useState(false);
  const recipe = useSelector((state) => state) || [];
  const diet = recipe.diets;

  useEffect(() => {
    dispatch(getAllRecipes());
    dispatch(getAllDiets());
  }, []);

  
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    healthScore: '',
    instructions: '',
    image: '',
    diet: [],
    ingredients: '',
    pricePerServing: '',
    readyInMinutes: '',
  });

  useEffect(() => {
      setAreDietCheckboxesChecked(!formData.diet.length > 0);
  }, [formData.diet]);

  useEffect(() => {
      setAreDietCheckboxesChecked(false);
  }, []);
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setErrors(validate(name, value))
  };
  
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        diet: [...prevFormData.diet, value],
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        diet: prevFormData.diet.filter((diet) => diet !== value),
      }));
    }
    setErrors([])
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { instructions, ingredients, ...restData } = formData;
  
    const healthScore = parseInt(restData.healthScore);
    const pricePerServing = parseInt(restData.pricePerServing);
    const readyInMinutes = parseInt(restData.readyInMinutes);
  
    const parsedIngredients = ingredients.split('\n').map((ingredient) => ({
      name: ingredient.trim(),
    }));
    const parsedInstructions = instructions.split('\n').map((step, index) => ({
      step: step.trim(),
      ingredients: [parsedIngredients[index]] || [],
    }));
  
    const analyzedInstructions = parsedInstructions.map((instruction) => ({
      step: instruction.step,
      ingredients: instruction.ingredients,
    }));
    
    const combinedFormData = {
      ...restData,
      healthScore,
      pricePerServing,
      readyInMinutes,
      analyzedInstructions,
    };

    const validateSubmit = validateOnSubmit(formData);
    setErrors(validateSubmit)

    if (validateSubmit.length === 0) {
      dispatch(postRecipe(combinedFormData));
      setSuccessMessage(true);
    }
    
  };
  
  const handleClickRecipe = () => {
    const lastId = recipe.allRecipes.length - 101 ;
    navigate(`/home/${lastId}`);
  };

  const handleClickForm = () => {
    setFormData({
      title: '',
      summary: '',
      healthScore: '',
      instructions: '',
      image: '',
      diet: [],
      ingredients: '',
      pricePerServing: '',
      readyInMinutes: '',
    })
    setSuccessMessage(false);
  };
  
  return (
    <>
      <Header />
    
        {successMessage ? (
          <div className='succes'>
            <div className='succes-container'>
              <h2>Recipe successfully created!</h2>
              <div className='succes-buttons'>
                <button onClick={handleClickRecipe}>Go to your recipe</button>
                <button onClick={handleClickForm}>Create another Recipe</button>
              </div>
            </div>
          </div>
        ) : (
          <div className='form-container'>
            <div className='form'>
            <h2>Recipe Form</h2>
            <form onSubmit={handleSubmit} >
              <label>
                Name:
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
                <div className='errors'>
                  {errors[0]=== 'title' && errors[1]}
                  {errors.some((obj)=> obj.key === 'title') && errors.find(obj => obj.key === 'title').error}
                </div>
              </label>
              <label>
                Time:
                <input type="number" name="readyInMinutes" value={formData.readyInMinutes} onChange={handleInputChange} />
                <div className='errors'>
                  {errors[0]=== 'readyInMinutes' && errors[1]}
                  {errors.some((obj)=> obj.key === 'readyInMinutes') && errors.find(obj => obj.key === 'readyInMinutes').error}
                </div>
              </label>
              <label>
                health score:
                <input type="number" name="healthScore" value={formData.healthScore} onChange={handleInputChange} />
                <div className='errors'>
                  {errors[0]=== 'healthScore' && errors[1]}
                  {errors.some((obj)=> obj.key === 'healthScore') && errors.find(obj => obj.key === 'healthScore').error}
                </div>
              </label>
              <label>
                Price:
                <input type="number" name="pricePerServing" value={formData.pricePerServing} onChange={handleInputChange} />
                <div className='errors'>
                  {errors[0]=== 'pricePerServing' && errors[1]}
                  {errors.some((obj)=> obj.key === 'pricePerServing') && errors.find(obj => obj.key === 'pricePerServing').error}
                </div>
              </label>
              <label>
                Image:
                <input type="url" name="image" value={formData.image} onChange={handleInputChange} />
                <div className='errors'>
                  {errors[0]=== 'image' && errors[1]}
                  {errors.some((obj)=> obj.key === 'image') && errors.find(obj => obj.key === 'image').error}
                </div>
              </label>
              <label>
                Summary:
                <textarea name="summary" value={formData.summary} onChange={handleInputChange}></textarea>
                <div className='errors'>
                  {errors[0]=== 'summary' && errors[1]}
                  {errors.some((obj)=> obj.key === 'summary') && errors.find(obj => obj.key === 'summary').error}
                </div>
              </label>
              <label>
                Step by Step:
                <textarea name="instructions" value={formData.instructions} onChange={handleInputChange}></textarea>
                <div className='errors'>
                  {errors[0]=== 'instructions' && errors[1]}
                  {errors.some((obj)=> obj.key === 'instructions') && errors.find(obj => obj.key === 'instructions').error}
                </div>
              </label>
              <label>
                Ingredients:
                <textarea name="ingredients" value={formData.ingredients} onChange={handleInputChange}></textarea>
                <div className='errors'>
                  {errors[0]=== 'ingredients' && errors[1]}
                  {errors.some((obj)=> obj.key === 'ingredients') && errors.find(obj => obj.key === 'ingredients').error}
                </div>
              </label>  
              <span>
                Diet Type:
              </span>
              
                {diet.map((dietType) => (
                  <div className='diet-checkbox'>
                    {dietType}
                    <input type="checkbox" name="diet" value={dietType} checked={formData.diet.includes(dietType)} onChange={handleCheckboxChange} />
                  </div>
                ))}
                <div className='errors'>
                  {areDietCheckboxesChecked && <span className='error'>you have to select atleast one Diet</span>}
                  {errors.some((obj)=> obj.key === 'diet') && errors.find(obj => obj.key === 'diet').error}
                </div>
              <button type="submit" 
              className='form-button'
              disabled=
              {errors.length > 0 || areDietCheckboxesChecked}
              >Create Recipe
              </button>
            </form>
            </div>
          </div>
        )}
    </>
    );
};

export default RecipeForm;
