import { CaretSortIcon } from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StreamData } from "@/lib/types";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";

// defining columns with sorting and filtering
const columns: ColumnDef<StreamData>[] = [
  {
    accessorKey: "artist",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Artist
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("artist")}</div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "song",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Song
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("song")}</div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("date")}</div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "streamCount",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Stream Count
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const streamCount = row.getValue("streamCount");
      return <div className="text-center">{streamCount as string}</div>;
    },
    enableSorting: true,
  },
];

export default function RecentStreams({ className }: { className?: string }) {
  const [data, setData] = useState<StreamData[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  useEffect(() => {
    fetch("/api/recent-streams")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  if (!data.length) {
    return (
      <div className={className}>
        <div className="flex items-center py-4 space-x-4">
          <Skeleton className="w-1/4 h-[50px]" />
          <Skeleton className="w-1/4 h-[50px]" />
        </div>
        <div className="rounded-md border">
          <Skeleton className="w-full h-[350px]" />
        </div>
        <div className="flex items-center md:justify-end space-x-2 py-4">
          <Skeleton className="w-1/6 h-[30px]" />
          <Skeleton className="w-1/6 h-[30px]" />
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* search fields */}
      <div className="flex items-center py-4 space-x-4">
        <Input
          placeholder="Filter by artist..."
          value={(table.getColumn("artist")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("artist")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Input
          placeholder="Filter by song..."
          value={(table.getColumn("song")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("song")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      {/* table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="w-[100px] text-center">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* pagination controls */}
      <div className="flex items-center md:justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
