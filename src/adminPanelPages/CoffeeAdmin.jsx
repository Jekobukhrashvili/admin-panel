import { useEffect, useState } from "react";
import styles from "../styles/CoffeeAdmin.module.css";

const CoffeeAdmin = () => {
  const [coffees, setCoffees] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [isInStock, setIsInStock] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5173/coffee")
      .then((res) => res.json())
      .then(setCoffees)
      .catch((err) => console.error("Coffee fetch error:", err));

    fetch("http://localhost:5173/ingredients")
      .then((res) => res.json())
      .then(setIngredients)
      .catch((err) => console.error("Ingredient fetch error:", err));
  }, []);

  const getIngredientNames = (ids) => {
    return ids
      .map((id) => ingredients.find((i) => i.id === id)?.name)
      .filter(Boolean)
      .join(", ");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCoffee = {
      title,
      description,
      ingredients: selectedIngredients.map(Number),
      isInStock,
    };

    const res = await fetch("http://localhost:5173/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCoffee),
    });

    if (res.ok) {
      const created = await res.json();
      setCoffees((prev) => [...prev, created]);
      setTitle("");
      setDescription("");
      setSelectedIngredients([]);
      setIsInStock(false);
    } else {
      alert("Failed to add coffee");
    }
  };

  const handleIngredientChange = (e) => {
    const id = parseInt(e.target.value);
    if (e.target.checked) {
      setSelectedIngredients((prev) => [...prev, id]);
    } else {
      setSelectedIngredients((prev) => prev.filter((i) => i !== id));
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Admin: Coffee Management</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Ingredients</th>
            <th>Description</th>
            <th>In Stock</th>
          </tr>
        </thead>
        <tbody>
          {coffees.map((coffee) => (
            <tr key={coffee.id}>
              <td>{coffee.title}</td>
              <td>{getIngredientNames(coffee.ingredients)}</td>
              <td>{coffee.description}</td>
              <td>{coffee.isInStock ? "✅" : "❌"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className={styles.subtitle}>Add New Coffee</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <fieldset className={styles.ingredientBox}>
          <legend>Select Ingredients:</legend>
          {ingredients.map((ing) => (
            <label key={ing.id}>
              <input
                type="checkbox"
                value={ing.id}
                checked={selectedIngredients.includes(ing.id)}
                onChange={handleIngredientChange}
              />
              {ing.name}
            </label>
          ))}
        </fieldset>

        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={isInStock}
            onChange={(e) => setIsInStock(e.target.checked)}
          />
          In Stock
        </label>

        <button type="submit">Add Coffee</button>
      </form>
    </div>
  );
};

export default CoffeeAdmin;
