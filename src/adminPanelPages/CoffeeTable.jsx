import styles from "../styles/CoffeeTable.module.css";

const CoffeeTable = ({ data, onView, onEdit, onDelete }) => {
  if (!data || data.length === 0) return <p>No data available</p>;

  const headers = Object.keys(data[0]);

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            {headers.map((key) => (
              <th key={key}>{key.toUpperCase()}</th>
            ))}
            <th>Action</th>
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
                  className="button viewBtn"
                  onClick={() => onView(coffee)}
                >
                  View
                </button>
                <button
                  className="button editBtn"
                  onClick={() => onEdit(coffee)}
                >
                  Edit
                </button>
                <button
                  className="button deleteBtn"
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

export default CoffeeTable;
