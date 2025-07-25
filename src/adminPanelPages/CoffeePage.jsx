import { useEffect, useState } from "react";
import styles from "../styles/CoffeeTable.module.css";

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
    const saved = localStorage.getItem("coffees");
    if (saved) {
      setCoffees(JSON.parse(saved));
    } else {
      setCoffees([
        {
          id: 1,
          title: "Espresso",
          ingredients: "Coffee Beans, Water",
          description: "Strong black coffee",
          isInStock: true,
        },
        {
          id: 2,
          title: "Latte",
          ingredients: "Espresso, Steamed Milk",
          description: "Creamy and smooth",
          isInStock: false,
        },
        {
          id: 3,
          title: "Cappuccino",
          ingredients: "Espresso, Steamed Milk, Foam",
          description: "Foamy and rich",
          isInStock: true,
        },
      ]);
    }
  }, []);


  useEffect(() => {
    localStorage.setItem("coffees", JSON.stringify(coffees));
  }, [coffees]);

  const handleAddCoffee = () => {
    if (newCoffee.title && newCoffee.ingredients && newCoffee.description) {
      const lastId =
        coffees.length > 0 ? Math.max(...coffees.map((c) => c.id)) : 0;
      const coffeeToAdd = {
        id: lastId + 1,
        ...newCoffee,
      };
      setCoffees([...coffees, coffeeToAdd]);
      setNewCoffee({
        title: "",
        ingredients: "",
        description: "",
        isInStock: false,
      });
      setShowAddModal(false);
    }
  };

  const handleUpdateCoffee = () => {
    setCoffees((prev) =>
      prev.map((c) => (c.id === editCoffee.id ? editCoffee : c))
    );
    setEditCoffee(null);
  };

  const handleView = (coffee) => {
    alert(
      `Title: ${coffee.title}\nIngredients: ${
        coffee.ingredients
      }\nDescription: ${coffee.description}\nIn Stock: ${
        coffee.isInStock ? "Yes" : "No"
      }`
    );
  };

  const handleEdit = (coffee) => {
    setEditCoffee({ ...coffee });
  };

  const handleDelete = (id) => {
    setCoffees((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className={styles.mainDiv}>
      <h2 className={styles.h2Text}>☕ Coffee List</h2>
      <button
        className={`${styles.button} ${styles.addBtn}`}
        onClick={() => setShowAddModal(true)}
      >
        ➕ Add Coffee
      </button>
      <CoffeeTable
        data={coffees}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showAddModal && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <h3>New Coffee</h3>
            <input
              placeholder="Coffee Title"
              value={newCoffee.title}
              onChange={(e) =>
                setNewCoffee({ ...newCoffee, title: e.target.value })
              }
            />
            <input
              placeholder="Ingredients"
              value={newCoffee.ingredients}
              onChange={(e) =>
                setNewCoffee({ ...newCoffee, ingredients: e.target.value })
              }
            />
            <textarea
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
                  setNewCoffee({
                    ...newCoffee,
                    isInStock: e.target.checked,
                  })
                }
              />
              isInStock?
            </label>
            <div style={{ marginTop: "10px" }}>
              <button onClick={handleAddCoffee}>Add</button>
              <button onClick={() => setShowAddModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {editCoffee && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <h3>Edit Coffee</h3>
            <input
              placeholder="Coffee Title"
              value={editCoffee.title}
              onChange={(e) =>
                setEditCoffee({ ...editCoffee, title: e.target.value })
              }
            />
            <input
              placeholder="Ingredients"
              value={editCoffee.ingredients}
              onChange={(e) =>
                setEditCoffee({
                  ...editCoffee,
                  ingredients: e.target.value,
                })
              }
            />
            <textarea
              placeholder="Description"
              value={editCoffee.description}
              onChange={(e) =>
                setEditCoffee({
                  ...editCoffee,
                  description: e.target.value,
                })
              }
            />
            <label>
              <input
                type="checkbox"
                checked={editCoffee.isInStock}
                onChange={(e) =>
                  setEditCoffee({
                    ...editCoffee,
                    isInStock: e.target.checked,
                  })
                }
              />
              isInStock?
            </label>
            <div style={{ marginTop: "10px" }}>
              <button onClick={handleUpdateCoffee}>Update</button>
              <button onClick={() => setEditCoffee(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const CoffeeTable = ({ data, onView, onEdit, onDelete }) => {
  if (!data || data.length === 0) return <p>No data available</p>;
  const headers = ["id", "title", "ingredients", "description", "isInStock"];

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            {headers.map((key) => (
              <th key={key}>{key.toUpperCase()}</th>
            ))}
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {data.map((coffee) => (
            <tr key={coffee.id}>
              {headers.map((key) => (
                <td key={key}>{String(coffee[key])}</td>
              ))}
              <td>
                <button
                  className={`${styles.button} ${styles.viewBtn}`}
                  onClick={() => onView(coffee)}
                >
                  View
                </button>
                <button
                  className={`${styles.button} ${styles.editBtn}`}
                  onClick={() => onEdit(coffee)}
                >
                  Edit
                </button>
                <button
                  className={`${styles.button} ${styles.deleteBtn}`}
                  onClick={() => onDelete(coffee.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const modalStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999,
};

const modalContentStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  minWidth: "300px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

export default CoffeePage;
