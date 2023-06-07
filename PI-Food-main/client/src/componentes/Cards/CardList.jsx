import Card from './Card';

const CardList = ({ recipes }) => {
  return (
  <div className="cards" >
  {recipes.length > 0 ? (
  recipes.map((recipe) => <Card key={recipe.id} recipe={recipe} /> )
  ) : (
  <p>No se encontraron recetas filtradas</p>
  )}
  </div>
  );
  };

  export default CardList;