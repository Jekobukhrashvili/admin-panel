import { useEffect, useState } from "react";
import styles from "../styles/CoffeeTable.module.css";

const API_URL = "http://localhost:5173/coffee";

const CoffeePage = () => {
  const [coffees, setCoffees] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCoffee, setNewCoffee] = useState({
    title: "",
    ingredients: "",
    description: "",
    isInStock: false,
  });
  const [editCoffee, setEditCoffee] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setCoffees(data))
      .catch((err) => console.error("Failed to load coffees", err));
  }, []);

  const handleAddCoffee = () => {
    if (newCoffee.title && newCoffee.ingredients && newCoffee.description) {
      fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCoffee),
      })
        .then((res) => res.json())
        .then((createdCoffee) => {
          setCoffees((prev) => [...prev, createdCoffee]);
          setNewCoffee({
            title: "",
            ingredients: "",
            description: "",
            isInStock: false,
          });
          setShowAddModal(false);
        })
        .catch((err) => console.error("Failed to add coffee", err));
    }
  };

  const handleUpdateCoffee = () => {
    fetch(`${API_URL}/${editCoffee.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editCoffee),
    })
      .then((res) => res.json())
      .then((updatedCoffee) => {
        setCoffees((prev) =>
          prev.map((c) => (c.id === updatedCoffee.id ? updatedCoffee : c))
        );
        setEditCoffee(null);
      })
      .catch((err) => console.error("Failed to update coffee", err));
  };

  const handleDelete = (id) => {
    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setCoffees((prev) => prev.filter((c) => c.id !== id));
      })
      .catch((err) => console.error("Failed to delete coffee", err));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Coffee Manager</h1>
      <button
        onClick={() => setShowAddModal(true)}
        className={styles.addButton}
      >
        Add New Coffee
      </button>

      {showAddModal && (
        <div className={styles.modal}>
          <input
            type="text"
            placeholder="Title"
            value={newCoffee.title}
            onChange={(e) =>
              setNewCoffee({ ...newCoffee, title: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Ingredients"
            value={newCoffee.ingredients}
            onChange={(e) =>
              setNewCoffee({ ...newCoffee, ingredients: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Description"
            value={newCoffee.description}
            onChange={(e) =>
              setNewCoffee({ ...newCoffee, description: e.target.value })
            }
          />
          <label>
            <input
              type="checkbox"
              checked={newCoffee.isInStock}
              onChange={(e) =>
                setNewCoffee({ ...newCoffee, isInStock: e.target.checked })
              }
            />
            In Stock
          </label>
          <button onClick={handleAddCoffee}>Submit</button>
          <button onClick={() => setShowAddModal(false)}>Cancel</button>
        </div>
      )}

      {editCoffee && (
        <div className={styles.modal}>
          <input
            type="text"
            value={editCoffee.title}
            onChange={(e) =>
              setEditCoffee({ ...editCoffee, title: e.target.value })
            }
          />
          <input
            type="text"
            value={editCoffee.ingredients}
            onChange={(e) =>
              setEditCoffee({ ...editCoffee, ingredients: e.target.value })
            }
          />
          <input
            type="text"
            value={editCoffee.description}
            onChange={(e) =>
              setEditCoffee({ ...editCoffee, description: e.target.value })
            }
          />
          <label>
            <input
              type="checkbox"
              checked={editCoffee.isInStock}
              onChange={(e) =>
                setEditCoffee({ ...editCoffee, isInStock: e.target.checked })
              }
            />
            In Stock
          </label>
          <button onClick={handleUpdateCoffee}>Update</button>
          <button onClick={() => setEditCoffee(null)}>Cancel</button>
        </div>
      )}

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Ingredients</th>
            <th>Description</th>
            <th>In Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {coffees.map((coffee) => (
            <tr key={coffee.id}>
              <td>{coffee.title}</td>
              <td>{coffee.ingredients}</td>
              <td>{coffee.description}</td>
              <td>{coffee.isInStock ? "Yes" : "No"}</td>
              <td>
                <button onClick={() => setEditCoffee(coffee)}>Edit</button>
                <button onClick={() => handleDelete(coffee.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoffeePage;
