import AdminHeader from "./Components/AdminHeader";
import CreateProduct from "./CreateProduct";
import Products from "./Products";

const Dashboard = () => {
  return (
    <>
      <AdminHeader />
      <CreateProduct />
      <Products />
    </>
  );
};

export default Dashboard;
