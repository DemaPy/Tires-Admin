"use client";

import Heading from "@/components/Heading";
import { Separator } from "@/components/ui/separator";
import { OrderColumns, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface IOrderClient {
  data: OrderColumns[];
}

export const OrderClient = ({ data }: IOrderClient) => {

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Orders ${data.length}`}
          label="Manage orders for your store"
        />
      </div>
      <Separator />
      <DataTable searchKey="products" columns={columns} data={data} />
    </>
  );
};
