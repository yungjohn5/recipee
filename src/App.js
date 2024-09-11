import Nav from "./Recipe_Componets/Nav"
import Banner from "./Recipe_Componets/Banner"
import List from "./Recipe_Componets/List"
import Footer from "./Recipe_Componets/Footer"
import Copy from "./Recipe_Componets/Copy"
import { useEffect, useState } from "react"
import axios from 'axios';
const RecipeApp = () => {

  const [loading,setLoading] = useState(true);

  const [error,setError] = useState(false);

  const [recipes,setRecipes]  = useState([]);
  const [frecipe,setFrecipe] = useState([])
  const [keyword,setKeyword] = useState('')


  useEffect(()=> {
    makeApiCall()
  },[])

  //this function would do the filltering 
  const handleFilter = () => {
    const filtered_recipes = recipes.filter((recipe)=>{
      return recipe.name.toLowerCase().includes(keyword.toLowerCase())
    })

    setFrecipe(filtered_recipes)
  }
  //make the call and get the data for us
  function makeApiCall(){
    axios.get("https://dummyjson.com/recipes")
    .then(function(resp){
      console.log(resp.data.recipes)
      setLoading(false)
      setRecipes(resp.data.recipes)
    })
    .catch(function(err){
      console.log(err)
      setLoading(false)
      setError(true)
    })
  }
    return (
        <div className="container-fluid">
            <Nav/>
            <Banner setKeyWord={setKeyword} keyword={keyword} handleFilter={handleFilter}/>
            <List loading={loading} error={error} recipes={recipes} frecipe={frecipe} keyword={keyword}/>
            <Footer/>
            <Copy/>
        </div>
    )
}

export default RecipeApp