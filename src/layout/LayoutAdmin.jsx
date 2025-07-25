import { useNavigate, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import styles from "../styles/Admin.module.css";

const LayoutAdmin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const buttons = [
    { label: "Dashboard", path: "/", style: styles.dashBtn },
    { label: "Coffee", path: "/coffee", style: styles.btn },
    { label: "Ingredients", path: "/ingredients", style: styles.btn },
  ];

  return (
    <main className={styles.mainDiv}>
      <div className={styles.dashboard}>
        <div className={styles.buttonContainer}>
          {buttons.map(({ label, path, style }) => (
            <button key={path} onClick={() => navigate(path)} className={style}>
              {label}
            </button>
          ))}
        </div>

        {location.pathname !== "/ingredients" &&
          location.pathname !== "/coffee" && (
            <div className={styles.welcome}>
              <h1 className={styles.welcomeText}>Welcome To Admins Page</h1>
            </div>
          )}
      </div>

      <Outlet />
    </main>
  );
};

export default LayoutAdmin;
