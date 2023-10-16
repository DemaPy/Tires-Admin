import { getGraph } from "@/app/actions/getGraphRevenue";
import { getSalesCount } from "@/app/actions/getSalesCount";
import { getStockProducts } from "@/app/actions/getStockProducts";
import { getTotalRevenue } from "@/app/actions/getTotalRevenue";
import Heading from "@/components/Heading";
import Overview from "@/components/Overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatter } from "@/lib/utils";
import { CreditCardIcon, DollarSign, Package } from "lucide-react";
import React from "react";

const DashboardPage = async ({
  params,
}: {
  params: {
    storeId: string;
  };
}) => {
  const totalRevenue = await getTotalRevenue(params.storeId);

  const salesCount = await getSalesCount(params.storeId);

  const stockCount = await getStockProducts(params.storeId);

  const graph = await getGraph(params.storeId);
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" label="Overview of your store" />
        <Separator />
        <div className="grid gap-4 grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">
                Total revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {formatter.format(totalRevenue)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <CreditCardIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">+{salesCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">
                Products in stock
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stockCount}</div>
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardContent className="pl-2">
              <Overview data={graph} />
            </CardContent>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
