import { Route, Routes } from "react-router-dom";
import CoffeePage from "./adminPanelPages/CoffeePage";
import IngredientsPage from "./adminPanelPages/IngredientsPage";
import LayoutAdmin from "./layout/LayoutAdmin";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<LayoutAdmin />}>
        <Route path="/coffee" element={<CoffeePage />} />
        <Route path="/ingredients" element={<IngredientsPage />} />
      </Route>
    </Routes>
  );
};

export default Router;
