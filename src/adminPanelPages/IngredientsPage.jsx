import React, { useState, useEffect } from "react";
import styles from "../styles/CoffeeTable.module.css";

const IngredientsPage = () => {
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState({
    name: "",
    price: "",
    description: "",
    isInStock: true,
  });

  const [editingId, setEditingId] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchIngredients = async () => {
    try {
      const res = await fetch(`${API_URL}/ingredients`);
      const data = await res.json();
      setIngredients(data);
    } catch (err) {
      console.error("Failed to fetch ingredients", err);
    }
  };

  const handleAdd = async () => {
    if (!newIngredient.name || !newIngredient.price) return;

    try {
      const res = await fetch(`${API_URL}/ingredients`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newIngredient, price: parseFloat(newIngredient.price) }),
      });
      const created = await res.json();
      setIngredients([...ingredients, created]);
      setNewIngredient({ name: "", price: "", description: "", isInStock: true });
    } catch (err) {
      console.error("Failed to add ingredient", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/ingredients/${id}`, { method: "DELETE" });
      setIngredients(ingredients.filter((i) => i.id !== id));
    } catch (err) {
      console.error("Failed to delete ingredient", err);
    }
  };

  const startEditing = (ingredient) => {
    setEditingId(ingredient.id);
    setNewIngredient({
      name: ingredient.name,
      price: ingredient.price,
      description: ingredient.description,
      isInStock: ingredient.isInStock,
    });
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`${API_URL}/ingredients/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newIngredient, price: parseFloat(newIngredient.price) }),
      });
      const updated = await res.json();

      setIngredients(
        ingredients.map((ing) => (ing.id === editingId ? updated : ing))
      );
      setEditingId(null);
      setNewIngredient({ name: "", price: "", description: "", isInStock: true });
    } catch (err) {
      console.error("Failed to update ingredient", err);
    }
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  return (
    <div className={styles.container}>
      <h2>Ingredients</h2>

      <div className={styles.form}>
        <input
          type="text"
          placeholder="Name"
          value={newIngredient.name}
          onChange={(e) => setNewIngredient({ ...newIngredient, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price (₾)"
          value={newIngredient.price}
          onChange={(e) => setNewIngredient({ ...newIngredient, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newIngredient.description}
          onChange={(e) => setNewIngredient({ ...newIngredient, description: e.target.value })}
        />
        {editingId ? (
          <button onClick={handleUpdate}>Update</button>
        ) : (
          <button onClick={handleAdd}>Add</button>
        )}
      </div>

      <ul className={styles.list}>
        {ingredients.map((ing) => (
          <li key={ing.id} className={styles.listItem}>
            <strong>{ing.name}</strong> – ₾{ing.price} – {ing.description}
            <div className={styles.buttons}>
              <button onClick={() => startEditing(ing)}>Edit</button>
              <button onClick={() => handleDelete(ing.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IngredientsPage;