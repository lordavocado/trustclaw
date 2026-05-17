"use client";

import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Search,
  Filter,
  Download,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Receipt,
  Check,
  Clock,
  FileWarning,
  X,
} from "lucide-react";
import type { Transaction, TransactionStatus, TransactionType } from "./types";
import { CATEGORY_LABELS, STATUS_CONFIG } from "./types";
import { DEMO_TRANSACTIONS, calculateTransactionStats } from "./demo-data";

interface TransactionsLedgerProps {
  onTransactionSelect: (transaction: Transaction) => void;
  selectedTransactionId?: string;
}

export function TransactionsLedger({
  onTransactionSelect,
  selectedTransactionId,
}: TransactionsLedgerProps) {
  const [sorting, setSorting] = useState<SortingState>([
    { id: "date", desc: true },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<TransactionStatus | "all">("all");
  const [typeFilter, setTypeFilter] = useState<TransactionType | "all">("all");

  const filteredData = useMemo(() => {
    let data = DEMO_TRANSACTIONS;

    if (statusFilter !== "all") {
      data = data.filter((t) => t.status === statusFilter);
    }

    if (typeFilter !== "all") {
      data = data.filter((t) => t.type === typeFilter);
    }

    return data;
  }, [statusFilter, typeFilter]);

  const stats = useMemo(
    () => calculateTransactionStats(DEMO_TRANSACTIONS),
    []
  );

  const columns: ColumnDef<Transaction>[] = useMemo(
    () => [
      {
        id: "status_indicator",
        header: "",
        size: 40,
        cell: ({ row }) => {
          const status = row.original.status;
          if (status === "needs_review" || status === "needs_receipt") {
            return (
              <div className="flex items-center justify-center">
                <AlertCircle className="h-4 w-4 text-[#a83900]" />
              </div>
            );
          }
          return null;
        },
      },
      {
        accessorKey: "date",
        header: ({ column }) => (
          <button
            className="flex items-center gap-1 font-semibold hover:text-foreground"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date
            {column.getIsSorted() === "asc" ? (
              <ArrowUp className="h-3 w-3" />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown className="h-3 w-3" />
            ) : (
              <ArrowUpDown className="h-3 w-3 opacity-50" />
            )}
          </button>
        ),
        cell: ({ row }) => (
          <span className="font-mono text-xs text-muted-foreground">
            {new Date(row.original.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        ),
        size: 120,
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => (
          <div className="flex flex-col gap-0.5">
            <span className="font-medium text-foreground truncate max-w-[280px]">
              {row.original.description}
            </span>
            {row.original.vendor && (
              <span className="text-xs text-muted-foreground">
                {row.original.vendor}
              </span>
            )}
          </div>
        ),
        size: 300,
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => (
          <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
            {CATEGORY_LABELS[row.original.category]}
          </span>
        ),
        size: 140,
        filterFn: "equals",
      },
      {
        accessorKey: "amount",
        header: ({ column }) => (
          <button
            className="flex items-center gap-1 font-semibold hover:text-foreground ml-auto"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Amount
            {column.getIsSorted() === "asc" ? (
              <ArrowUp className="h-3 w-3" />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown className="h-3 w-3" />
            ) : (
              <ArrowUpDown className="h-3 w-3 opacity-50" />
            )}
          </button>
        ),
        cell: ({ row }) => {
          const amount = row.original.amount;
          const isPositive = amount >= 0;
          return (
            <span
              className={`font-mono text-sm font-medium text-right block ${
                isPositive ? "text-[#44b48b]" : "text-foreground"
              }`}
            >
              {isPositive ? "+" : ""}
              {amount.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </span>
          );
        },
        size: 130,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const config = STATUS_CONFIG[row.original.status];
          return (
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${config.bgColor} ${config.color}`}
            >
              <StatusIcon status={row.original.status} />
              {config.label}
            </span>
          );
        },
        size: 140,
        filterFn: "equals",
      },
      {
        id: "receipt",
        header: "",
        size: 40,
        cell: ({ row }) => {
          if (row.original.receiptUrl) {
            return (
              <Receipt className="h-4 w-4 text-muted-foreground" />
            );
          }
          if (row.original.type === "expense" && !row.original.receiptUrl) {
            return (
              <FileWarning className="h-4 w-4 text-[#a83900]/50" />
            );
          }
          return null;
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "includesString",
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 15,
      },
    },
  });

  return (
    <div className="flex h-full flex-col">
      {/* Summary Stats Bar */}
      <div className="flex items-center gap-6 border-b border-border bg-muted/30 px-6 py-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Total Income</span>
          <span className="font-mono text-sm font-semibold text-[#44b48b]">
            +${stats.totalIncome.toLocaleString()}
          </span>
        </div>
        <div className="h-4 w-px bg-border" />
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Total Expenses</span>
          <span className="font-mono text-sm font-semibold text-foreground">
            -${stats.totalExpenses.toLocaleString()}
          </span>
        </div>
        <div className="h-4 w-px bg-border" />
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Net</span>
          <span
            className={`font-mono text-sm font-semibold ${
              stats.netAmount >= 0 ? "text-[#44b48b]" : "text-[#a83900]"
            }`}
          >
            {stats.netAmount >= 0 ? "+" : ""}$
            {Math.abs(stats.netAmount).toLocaleString()}
          </span>
        </div>
        {stats.needsAttention > 0 && (
          <>
            <div className="ml-auto h-4 w-px bg-border" />
            <div className="flex items-center gap-2 rounded-full bg-[#a83900]/10 px-3 py-1">
              <AlertCircle className="h-3.5 w-3.5 text-[#a83900]" />
              <span className="text-xs font-medium text-[#a83900]">
                {stats.needsAttention} need attention
              </span>
            </div>
          </>
        )}
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3 border-b border-border px-6 py-3">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="h-9 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
          />
          {globalFilter && (
            <button
              onClick={() => setGlobalFilter("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as TransactionStatus | "all")
            }
            className="h-9 rounded-md border border-input bg-background px-3 text-sm focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
          >
            <option value="all">All Status</option>
            <option value="needs_review">Needs Review</option>
            <option value="needs_receipt">Missing Receipt</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="reconciled">Reconciled</option>
          </select>
        </div>

        {/* Type Filter */}
        <select
          value={typeFilter}
          onChange={(e) =>
            setTypeFilter(e.target.value as TransactionType | "all")
          }
          className="h-9 rounded-md border border-input bg-background px-3 text-sm focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expenses</option>
          <option value="transfer">Transfers</option>
        </select>

        {/* Export */}
        <button className="ml-auto flex h-9 items-center gap-2 rounded-md border border-input bg-background px-3 text-sm font-medium hover:bg-muted">
          <Download className="h-4 w-4" />
          Export
        </button>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left">
          <thead className="sticky top-0 border-b border-border bg-card">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                    style={{ width: header.getSize() }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-border">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                onClick={() => onTransactionSelect(row.original)}
                className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                  selectedTransactionId === row.original.id
                    ? "bg-primary/5"
                    : ""
                }`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-3"
                    style={{ width: cell.column.getSize() }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {table.getRowModel().rows.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Search className="h-8 w-8 mb-2 opacity-50" />
            <p className="text-sm">No transactions found</p>
            <p className="text-xs">Try adjusting your filters</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-border px-6 py-3">
        <span className="text-xs text-muted-foreground">
          Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{" "}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) *
              table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )}{" "}
          of {table.getFilteredRowModel().rows.length} transactions
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background hover:bg-muted disabled:opacity-50 disabled:pointer-events-none"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-sm text-muted-foreground">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background hover:bg-muted disabled:opacity-50 disabled:pointer-events-none"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function StatusIcon({ status }: { status: TransactionStatus }) {
  switch (status) {
    case "completed":
      return <Check className="h-3 w-3" />;
    case "pending":
      return <Clock className="h-3 w-3" />;
    case "needs_review":
    case "needs_receipt":
      return <AlertCircle className="h-3 w-3" />;
    case "reconciled":
      return <Check className="h-3 w-3" />;
    default:
      return null;
  }
}
