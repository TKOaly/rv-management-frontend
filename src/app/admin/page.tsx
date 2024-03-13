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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getAllPurchases } from "@/server/requests/historyRequests";
import { getAllProducts } from "@/server/requests/productRequests";
import { getAllUsers } from "@/server/requests/userRequests";
import {
  BadgeEuro,
  ChevronDown,
  ChevronsDown,
  Recycle,
  ShoppingBasket,
  Skull,
} from "lucide-react";
import { Fragment } from "react";

const currencyFormatter = Intl.NumberFormat("fi-FI", {
  style: "currency",
  currency: "EUR",
});
const numberFormatter = Intl.NumberFormat("fi-FI");

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
      Math.max(product.stock, 0) *
      Math.min(product.buyPrice, product.sellPrice);
    return acc + stockValue;
  }, 0);

  /**
   * Find lowest 10 stock counts, excluding products with stock less than 0
   */
  const lowestStockProducts = products
    .filter((product) => product.stock > 0)
    .sort((a, b) => a.stock - b.stock)
    .slice(0, 20);

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

    if (purchase.price <= 0) {
      return acc;
    }

    acc.set(
      user.userId,
      (acc.get(user.userId) ?? user.moneyBalance) + purchase.price,
    );
    return acc;
  }, new Map<number, number>());

  // Top 10 users by total purchase euros
  const topUsers = Array.from(userSpending)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([userId, cents]) => ({
      user: users.find((u) => u.userId === userId)!,
      spent: cents / 100,
    }));

  // Top 10 users by amount of can/bottle returns
  const canHeroes = purchases.reduce((acc, purchase) => {
    const user = purchase.user;

    if (![80, 81].includes(purchase.product.category.categoryId)) {
      return acc;
    }
    const isCanReturn = purchase.product.category.categoryId === 81;

    if (acc.has(user.userId)) {
      const current = acc.get(user.userId)!;
      acc.set(user.userId, {
        cans: current.cans + (isCanReturn ? 1 : 0),
        bottles: current.bottles + (isCanReturn ? 0 : 1),
      });
    } else {
      acc.set(user.userId, {
        cans: isCanReturn ? 1 : 0,
        bottles: isCanReturn ? 0 : 1,
      });
    }

    return acc;
  }, new Map<number, { cans: number; bottles: number }>());
  const topCanHeroes = Array.from(canHeroes)
    .sort((a, b) => b[1].cans + b[1].bottles - (a[1].cans + a[1].bottles))
    .slice(0, 10)
    .map(([userId, { cans, bottles }]) => ({
      user: users.find((u) => u.userId === userId)!,
      cans,
      bottles,
      total: cans + bottles,
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
        <div className="grid auto-rows-max grid-cols-subgrid gap-4">
          <Card className="h-max">
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
                Bottom 20 items by stock value &gt; 0
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-[max-content_max-content] items-center gap-x-2">
              {lowestStockProducts.map((product) => (
                <Fragment key={product.barcode}>
                  <span className="text-right text-sm text-stone-500 dark:text-stone-400">
                    {numberFormatter.format(product.stock)}
                  </span>
                  <span>{product.name}</span>
                </Fragment>
              ))}
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
            <CardContent className="grid grid-cols-[max-content_max-content] items-center gap-x-2">
              {mostSoldProducts.map(([barcode, count]) => {
                const product = products.find((p) => p.barcode === barcode);
                return (
                  <Fragment key={barcode}>
                    <span className="text-right text-sm text-stone-500 dark:text-stone-400">
                      {numberFormatter.format(count)}
                    </span>
                    <span>{product?.name}</span>
                  </Fragment>
                );
              })}
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
            <CardContent className="grid grid-cols-[max-content_max-content] items-center gap-x-2">
              {leastSoldProducts.map(([barcode, count]) => {
                const product = products.find((p) => p.barcode === barcode);
                return (
                  <Fragment key={barcode}>
                    <span className="text-right text-sm text-stone-500 dark:text-stone-400">
                      {numberFormatter.format(count)}
                    </span>
                    <span>{product?.name}</span>
                  </Fragment>
                );
              })}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-subgrid gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Skull /> Big spenders
              </CardTitle>
              <CardDescription>
                Top 10 users by total spent (all time) (spent + balance)
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-[max-content_max-content] items-center gap-x-2">
              {topUsers.map(({ user, spent }) => {
                return (
                  <Fragment key={user.userId}>
                    <span className="text-right text-sm text-stone-500 dark:text-stone-400">
                      {currencyFormatter.format(spent)}
                    </span>
                    <span>{user.fullName}</span>
                  </Fragment>
                );
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Recycle /> Palpa pros
              </CardTitle>
              <CardDescription>
                Top 10 users by can/bottle returns (all time)
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-[max-content_max-content_1fr_1fr] items-center gap-x-2">
              <span className="font-semibold text-stone-500 dark:text-stone-400">
                Total
              </span>
              <span className="font-semibold text-stone-500 dark:text-stone-400">
                User
              </span>
              <span className="text-right font-semibold text-stone-500 dark:text-stone-400">
                Cans
              </span>
              <span className="text-right font-semibold text-stone-500 dark:text-stone-400">
                Bottles
              </span>
              {topCanHeroes.map(({ user, cans, bottles, total }) => {
                return (
                  <Fragment key={user.userId}>
                    <span className="text-right text-sm text-stone-500 dark:text-stone-400">
                      {total}
                    </span>
                    <span>{user.fullName}</span>
                    <span className="text-right text-sm text-stone-500 dark:text-stone-400">
                      {cans}
                    </span>
                    <span className="text-right text-sm text-stone-500 dark:text-stone-400">
                      {bottles}
                    </span>
                  </Fragment>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
