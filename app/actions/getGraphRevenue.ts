import prismadb from "@/lib/prisma.db";

interface GraphData {
  name: string;
  total: number;
}

export const getGraph = async (storeId: string) => {
  const paidOrders = await prismadb.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const monthlyRevenue: { [key: number]: number } = {};

  for (const order of paidOrders) {
    const month = order.createdAt.getMonth();

    let revenueForOrder = 0;

    for (const item of order.orderItems) {
      revenueForOrder += item.product.price.toNumber();
    }

    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
  }

  const graphData: GraphData[] = [
    {
      name: "Jan",
      total: 0,
    },
    {
      name: "Feb",
      total: 1,
    },
    {
      name: "Mar",
      total: 2,
    },
    {
      name: "Apr",
      total: 3,
    },
    {
      name: "May",
      total: 4,
    },
    {
      name: "Jun",
      total: 5,
    },
    {
      name: "Jul",
      total: 6,
    },
    {
      name: "Aug",
      total: 7,
    },
    {
      name: "Sep",
      total: 8,
    },
    {
      name: "Oct",
      total: 9,
    },
    {
      name: "Nov",
      total: 10,
    },
    {
      name: "Dec",
      total: 11,
    },
  ];

  for (const month in monthlyRevenue) {
    graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)];
  }

  return graphData;
};
