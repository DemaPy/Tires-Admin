"use client";

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ColorColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";

interface IColorClient {
  data: ColorColumn[];
}

export const ColorClient = ({ data }: IColorClient) => {
  const router = useRouter();
  const params = useParams();

  return ( 
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Colors ${data.length}`}
          label="Manage colors for your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/colors/new`)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data}  />
      <Heading title="API" label="API calls for Colors" />
      <Separator />
      <ApiList name="colors" idName="colorId" />
    </>
  );
};
