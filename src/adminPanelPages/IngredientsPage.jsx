import React, { useState } from "react";
import styles from "../styles/CoffeeTable.module.css";

const availableIngredients = [
  {
    id: 1,
    name: "Milk",
    price: 0.5,
    description: "Fresh cow milk",
    isInStock: true,
  },
  {
    id: 2,
    name: "Brown Milk",
    price: 1.0,
    description: "Strong coffee shot",
    isInStock: true,
  },
  {
    id: 3,
    name: "Sugar",
    price: 0.2,
    description: "Sweetener",
    isInStock: true,
  },
  {
    id: 4,
    name: "Whipped Cream",
    price: 0.7,
    description: "Light whipped cream topping",
    isInStock: false,
  },
  {
    id: 5,
    name: "Caramel Syrup",
    price: 0.6,
    description: "Rich caramel flavoring",
    isInStock: true,
  },
  {
    id: 6,
    name: "Chocolate Syrup",
    price: 0.6,
    description: "Dark chocolate flavoring",
    isInStock: true,
  },
  {
    id: 7,
    name: "Vanilla Syrup",
    price: 0.5,
    description: "Smooth vanilla taste",
    isInStock: true,
  },
  {
    id: 8,
    name: "Cinnamon",
    price: 0.3,
    description: "Ground cinnamon spice",
    isInStock: false,
  },
  {
    id: 9,
    name: "Ice",
    price: 0.1,
    description: "Crushed ice",
    isInStock: true,
  },
  {
    id: 10,
    name: "Oat Milk",
    price: 0.6,
    description: "Vegan milk alternative",
    isInStock: true,
  },
];

const IngredientsPage = () => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [addedIngredients, setAddedIngredients] = useState([]);

  const handleCheckboxChange = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleAddSelected = () => {
    const selectedIngredients = availableIngredients.filter((ingredient) =>
      selectedIds.includes(ingredient.id)
    );

    const newIngredients = selectedIngredients.filter(
      (newIng) => !addedIngredients.find((i) => i.id === newIng.id)
    );

    setAddedIngredients([...addedIngredients, ...newIngredients]);
    setSelectedIds([]);
  };

  const handleDelete = (idToRemove) => {
    const updated = addedIngredients.filter((ing) => ing.id !== idToRemove);
    setAddedIngredients(updated);
  };

  return (
    <div className={styles.mainDiv}>
      <h2 className={styles.h2Text}>Add Ingredients</h2>

      <div className={styles.coffeeTable}>
        <table className={styles.ingredientTable}>
          <thead>
            <tr>
              <th>Select</th>
              <th>ID</th>
              <th>Name</th>
              <th>Price ($)</th>
              <th>Description</th>
              <th>In Stock</th>
            </tr>
          </thead>
          <tbody>
            {availableIngredients.map((ingredient) => (
              <tr key={ingredient.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(ingredient.id)}
                    onChange={() => handleCheckboxChange(ingredient.id)}
                  />
                </td>
                <td>{ingredient.id}</td>
                <td>{ingredient.name}</td>
                <td>{ingredient.price}</td>
                <td>{ingredient.description}</td>
                <td>{ingredient.isInStock ? "✅" : "❌"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={handleAddSelected} className={styles.addBtn}>
        ➕ Add Selected
      </button>

      <h3 className={styles.h2Text}>Added Ingredients</h3>
      <div className={styles.coffeeTable}>
        <table className={styles.addedDescription}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price ($)</th>
              <th>Description</th>
              <th>In Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {addedIngredients.map((ingredient) => (
              <tr key={ingredient.id}>
                <td>{ingredient.id}</td>
                <td>{ingredient.name}</td>
                <td>{ingredient.price}</td>
                <td>{ingredient.description}</td>
                <td>{ingredient.isInStock ? "✅" : "❌"}</td>
                <td>
                  <button
                    onClick={() => handleDelete(ingredient.id)}
                    className={styles.deleteBtn}
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IngredientsPage;
