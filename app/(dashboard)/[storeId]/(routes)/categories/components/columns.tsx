"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action"

export type CategoryColumns = {
  id: string;
  name: string;
  createdAt: string;
  billboardLabel: string
}

export const columns: ColumnDef<CategoryColumns>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    accessorKey: "billboard",
    header: "Billboard",
    cell: ({row}) => row.original.billboardLabel
  },
  {
    id: 'actions',
    cell: ({ row  }) => {
      return <CellAction data={row.original}/>
    }
  }
]
