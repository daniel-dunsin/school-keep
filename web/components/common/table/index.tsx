'use client';
import type {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  SortingFn,
} from '@tanstack/react-table';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  sortingFns,
  useReactTable,
} from '@tanstack/react-table';
import React from 'react';

import Button from '@/components/common/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table-tags';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import CircleLoader from '../loader';

import {
  RankingInfo,
  rankItem,
  compareItems,
} from '@tanstack/match-sorter-utils';
import TextField from '../input/text-field';

declare module '@tanstack/react-table' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

type TableProps<TData, TValue> = {
  columns: Array<ColumnDef<TData, TValue>>;
  data: Array<TData>;
  options?: any;
  loading?: boolean;
  heading?: {
    title: string;
    description?: string;
    link?: {
      path: string;
      text: string;
    };
  };
  showSearch?: boolean;
};

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

export const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  let dir = 0;

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]?.itemRank!,
      rowB.columnFiltersMeta[columnId]?.itemRank!
    );
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};

const EmptyState = () => (
  <div className="text-gray-400 flex h-full w-full items-center justify-center p-4">
    No data available.
  </div>
);

export default function TableComponent<TData, TValue>({
  data,
  columns,
  loading = false,
  options,

  heading: head,
  showSearch = true,
}: TableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      rowSelection,
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: 'fuzzy',
    enableRowSelection: true,
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
    defaultColumn: {
      size: 300,
      minSize: 50,
      maxSize: 500,
      ...options?.defaultColumn,
    },
  });

  return (
    <div className="border-gray-500/20 bg-white relative border p-5 h-full w-full min-h-[15rem] rounded-[1rem] space-y-6 ">
      {head && (
        <div>
          <div className="flex items-center justify-between">
            <div className="text-start">
              <h6 className="font-bold">{head.title}</h6>
              <p className="text-gray-400 text-sm">{head.description}</p>
            </div>

            <div className="flex items-center gap-2">
              {head.link && (
                <div>
                  <Link
                    href={`${head.link?.path}`}
                    className="border-b text-sm border-blue-500 text-blue-500 flex items-center gap-1"
                  >
                    <span>{head.link?.text}</span>
                    <ArrowRight size={20} />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <Table className="pb-10">
          <TableHeader className="w-full">
            {table.getHeaderGroups()?.map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:!bg-transparent">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{
                      width: `${header.getSize()}px`,
                      textAlign: 'left',
                      color: '#08382C',
                      fontWeight: 'bold',
                    }}
                    className="hover:!bg-transparent"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          {/* add space here */}
          {loading && (
            <div className="w-full h-full grid place-content-center">
              <CircleLoader />
            </div>
          )}
          <TableBody>
            {table.getRowModel().rows.length === 0 ? (
              <TableRow className="hover:!bg-transparent">
                <TableCell colSpan={columns.length}>
                  <EmptyState />
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row, idx) => (
                <TableRow
                  key={row.id}
                  className="duration-300 group border-gray-200 hover:!bg-black/10"
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell style={{ textAlign: 'left' }} key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <div className="h-6" />
        {/* pagination */}
        <div className="flex items-center flex-wrap justify-between gap-2">
          <div className="flex items-center gap-1 text-sm">
            <span className="flex items-center gap-1">
              <div>Page</div>
              <strong>
                {table.getState().pagination.pageIndex + 1} of{' '}
                {table.getPageCount()}
              </strong>
            </span>
            {data.length > 10 && (
              <select
                value={table.getState().pagination.pageSize}
                className="border border-gray-200 rounded-lg p-1"
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
                }}
              >
                {[10, 20, 30, 40, 50]
                  .filter((pageSize) => pageSize <= data.length)
                  .map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      Show {pageSize}
                    </option>
                  ))}
              </select>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              {'<<'}
            </Button>
            <Button
              variant="outline"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {'<'}
            </Button>
            <Button
              variant="outline"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {'>'}
            </Button>
            <Button
              variant="outline"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              {'>>'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) => {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <TextField
      InputProps={{
        ...props,
        value,
        onChange(e) {
          setValue(e.target.value);
        },
        className:
          'p-2 font-lg border border-block shadow-none rounded-md placeholder:text-sm',
      }}
    />
  );
};
