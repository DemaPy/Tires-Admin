import prismadb from "@/lib/prisma.db";
import React from "react";
import BillboardForm from "./components/billboard-form";

const page = async ({ params }: { params: { billboardId: string } }) => {
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });

  return <div className="flex-col">
    <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm store={billboard} />
    </div>
  </div>;
};

export default page;
