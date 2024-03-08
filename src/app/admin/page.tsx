import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getAllPurchases } from "@/server/requests/historyRequests";
import { getAllProducts } from "@/server/requests/productRequests";
import { getAllUsers } from "@/server/requests/userRequests";
import {
  BadgeEuro,
  ChevronDown,
  ChevronsDown,
  ShoppingBasket,
  Skull,
} from "lucide-react";

const currencyFormatter = Intl.NumberFormat("fi-FI", {
  style: "currency",
  currency: "EUR",
});

export default async function AdminDashboard() {
  const products = await getAllProducts();
  const purchases = await getAllPurchases();
  const users = await getAllUsers();

  /**
   * Calculate total stock value, which is the sum of
   * - a product's stock multiplied by min(buyPrice, sellPrice)
   */
  const totalStockValue = products.reduce((acc, product) => {
    const stockValue =
      product.stock * Math.min(product.buyPrice, product.sellPrice);
    return acc + stockValue;
  }, 0);

  /**
   * Find lowest 10 stock counts, excluding products with stock less than 0
   */
  const lowestStockProducts = products
    .filter((product) => product.stock > 0)
    .sort((a, b) => a.stock - b.stock)
    .slice(0, 10);

  const groupedProductSales = purchases.reduce((acc, purchase) => {
    const product = purchase.product;
    if (acc.has(product.barcode)) {
      acc.set(product.barcode, (acc.get(product.barcode) ?? 0) + 1);
    } else {
      acc.set(product.barcode, 1);
    }
    return acc;
  }, new Map<string, number>());

  const mostSoldProducts = Array.from(groupedProductSales)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  const leastSoldProducts = Array.from(groupedProductSales)
    .sort((a, b) => a[1] - b[1])
    .slice(0, 10);

  // Sort users by total purchase euros
  const userSpending = purchases.reduce((acc, purchase) => {
    const user = purchase.user;
    if (acc.has(user.userId)) {
      acc.set(user.userId, acc.get(user.userId)! + purchase.price);
    } else {
      acc.set(user.userId, purchase.price + user.moneyBalance);
    }
    return acc;
  }, new Map<number, number>());
  // Top 10 users by total purchase euros
  const topUsers = Array.from(userSpending)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([userId, euros]) => ({
      user: users.find((u) => u.userId === userId)!,
      spent: euros,
    }));

  return (
    <div className="flex h-full w-full flex-col gap-y-4 py-12">
      <h1 className="flex items-end gap-4 text-3xl font-semibold">
        Dashboard
        <DropdownMenu>
          <DropdownMenuTrigger className="flex h-max items-center gap-2 text-xl text-stone-600">
            <ChevronDown />
            All time
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="cursor-pointer">
              Last week
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Last month
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Last year
            </DropdownMenuItem>
            <DropdownMenuItem className="bg-stone-100 font-semibold">
              All time
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="grid grid-cols-subgrid gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BadgeEuro /> Stock value
              </CardTitle>
              <CardDescription>
                Σ <code>stock * min(sellPrice, buyPrice)</code>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <span className="text-3xl">
                {currencyFormatter.format(totalStockValue)}
              </span>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChevronsDown /> Low stock
              </CardTitle>
              <CardDescription>
                Bottom 10 items by stock value &gt; 0
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {lowestStockProducts.map((product) => (
                  <li key={product.barcode}>
                    <span className="text-stone-500 dark:text-stone-400">
                      {product.stock}x
                    </span>
                    <span>{product.name}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-subgrid gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBasket /> Most sold products
              </CardTitle>
              <CardDescription>
                Top 10 products by sales (all time)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {mostSoldProducts.map(([barcode, count]) => {
                  const product = products.find((p) => p.barcode === barcode);
                  return (
                    <li key={barcode}>
                      <span className="text-stone-500 dark:text-stone-400">
                        {count}x
                      </span>
                      <span>{product?.name}</span>
                    </li>
                  );
                })}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBasket /> Least sold products
              </CardTitle>
              <CardDescription>
                Bottom 10 products by sales (all time)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {leastSoldProducts.map(([barcode, count]) => {
                  const product = products.find((p) => p.barcode === barcode);
                  return (
                    <li key={barcode}>
                      <span className="text-stone-500 dark:text-stone-400">
                        {count}x
                      </span>
                      <span>{product?.name}</span>
                    </li>
                  );
                })}
              </ul>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Skull /> Big spenders
              </CardTitle>
              <CardDescription>
                Top 10 users by total spent (all time) (spent + balance)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {topUsers.map(({ user, spent }) => {
                return (
                  <div key={user.userId} className="flex gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>
                        {user.fullName
                          .split(" ")
                          .map((name) => name[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span>{user.fullName}</span>
                      <span className="text-stone-500 dark:text-stone-400">
                        {currencyFormatter.format(spent)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
