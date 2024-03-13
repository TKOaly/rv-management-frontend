import { getAllPurchases } from "@/server/requests/historyRequests";
import { getAllProducts } from "@/server/requests/productRequests";
import { getAllUsers } from "@/server/requests/userRequests";
import Dashboard from "./Dashboard";

export default async function AdminDashboard() {
  const products = await getAllProducts();
  const purchases = await getAllPurchases();
  const users = await getAllUsers();

  return <Dashboard products={products} purchases={purchases} users={users} />;
}
