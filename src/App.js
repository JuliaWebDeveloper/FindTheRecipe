import { useState, useEffect } from 'react';
import video from './food.mp4';
import './App.css';
import MyRecipesComponent from './MyRecipesComponent';


function App() {
  const MY_ID ='e5ad2e50';
  const MY_KEY ='57d7233dc301f2587108aee32cfdfb2d';

  const [mySearch, setMySearch] = useState('');
  const [myRecipes, setMyRecipes] = useState([]);
  const [wordSubmitted, setWordSubmitted] = useState('lemon');

  useEffect(() => {
    const getRecipe = async () => {
      const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${wordSubmitted}&app_id=${MY_ID}&app_key=${MY_KEY}`);
      const data = await response.json();
      // console.log(data.hits);
      setMyRecipes(data.hits);
    }
    getRecipe()
  }, [wordSubmitted])
const myRecipeSearch = (e) => {
  // console.log(e.target.value)
  setMySearch(e.target.value)
}

const finalSearch = (e) => {
  e.preventDefault();
  setWordSubmitted(mySearch)
}

  return (
      <div className="App">
         <div className="container">
           <video autoPlay muted loop>
              <source src={video} type="video/mp4" />
           </video>
           <h1>Find a Recipe</h1>
         </div>
         <div className='container'>
            <form onSubmit={finalSearch}>
              <input className='search' placeholder='Search...' onChange={myRecipeSearch} value={mySearch}></input>
            </form>
         </div>
         <div className='container'>
           <button onClick={finalSearch}> 
             <img src="https://img.icons8.com/fluency/48/000000/fry.png" alt="icon"/>
           </button>
         </div>
         
         {myRecipes.map((element, index) => (
          <MyRecipesComponent key={index}
           label={element.recipe.label}
           image={element.recipe.image} 
           ingredients={element.recipe.ingredientLines}
           calories={element.recipe.calories}
           protein={element.recipe.totalNutrients.PROCNT.quantity}
           fat={element.recipe.totalNutrients.FAT.quantity}
           carb={element.recipe.totalNutrients.CHOCDF.quantity}
           weight={element.recipe.totalWeight}
          />
         ))}
      </div>
     
    
  );
}

export default App;
