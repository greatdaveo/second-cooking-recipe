import { useState, useRef, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useHistory } from "react-router-dom";

import "./Create.css";

export default function Create() {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const ingredientInput = useRef(null);
  const history = useHistory();

  const { postData, data, error } = useFetch(
    "http://localhost:3000/recipes",
    "POST"
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    postData({
      title,
      ingredients,
      method,
      cookingTime: cookingTime + " minutes",
    });
    console.log(title, method, cookingTime, ingredients);

    // To redirect the user when json server gets the "ingredients" data response.
    history.push("/");
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const eachIng = newIngredient.trim();

    if (eachIng && !ingredients.includes(eachIng)) {
      // This could also be setIngredients((prevIngredients) => [...prevIngredients, newIngredients]);
      setIngredients((prevIngredients) => [...prevIngredients, eachIng]);
    }
    setNewIngredient("");
    ingredientInput.current.focus();
  };

  // To redirect the user when json server gets the "ingredients" data response
  // useEffect(() => {
  //   if (data) {
  //     history.push("/")
  //   }
  // }, []);

  return (
    <div className="create">
      <h2 className="page-title">Add a New Recipe</h2>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe title:</span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>

        <label>
          <span>Recipe ingredients</span>
          <div className="ingredients">
            <input
              type="text"
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientInput}
            />
            <button className="btn" onClick={handleAdd}>
              Add
            </button>
          </div>
        </label>

        {/* To output the inputed ingredients */}
        <p>
          Current Ingredients:{" "}
          {ingredients.map((inputedIng) => (
            <em key={inputedIng}>{inputedIng},</em>
          ))}
        </p>

        <label>
          <span>Recipe method:</span>
          <textarea
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>

        <label>
          <span>Cooking time (minutes)</span>
          <input
            type="number"
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>

        <button className="button">Submit</button>
      </form>
    </div>
  );
}
