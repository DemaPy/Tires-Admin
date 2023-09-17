import prismadb from "@/lib/prisma.db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React, { PropsWithChildren, ReactNode } from "react";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      userId,
    },
  });

  if (store) {
    redirect(`/${store.id}`);
  }

  return <>{children}</>;
};

export default RootLayout;
