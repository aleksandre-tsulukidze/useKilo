import React, { FC, useEffect, useMemo, useState } from 'react';

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from '@tanstack/react-table';
import './table.css';
import { AwardsTidy } from '../../reactQuery/interfaces';
import { Pagination } from '../../services/interfaces/fetchData.interface';
import { useLocation, useNavigate } from 'react-router';

interface TableInterface {
  data: AwardsTidy[];
  dataPagination: Pagination;
}

const Table: FC<TableInterface> = ({ data, dataPagination }) => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const currentParams = new URLSearchParams(search);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: Number(currentParams.get('page')) || 0,
    pageSize: Number(currentParams.get('limit')) || 20,
  });

  useEffect(() => {
    currentParams.set('page', pagination.pageIndex.toString());
    currentParams.set('limit', pagination.pageSize.toString());

    navigate({
      pathname: window.location.pathname,
      search: currentParams.toString(),
    });
  }, [pagination, search, navigate]);

  const columns = useMemo(
    () => [
      { header: 'Application ID', accessorKey: 'application_id' },
      { header: 'Award ID', accessorKey: 'award_id' },
      { header: 'Entry', accessorKey: 'entry' },
      { header: 'Zone ID', accessorKey: 'zone_id' },
    ],
    []
  );

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
    manualPagination: true,
    pageCount: dataPagination.total_pages,
  });

  return (
    <div className="tableWrapper">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
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
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center gap-2">
        <button
          className="border rounded p-1"
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className="flex items-center gap-1 white-text">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount().toLocaleString()}
          </strong>
        </span>
        <span className="flex items-center gap-1 white-text">
          | Go to page:
          <input
            type="number"
            min="1"
            max={table.getPageCount()}
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16"
          />
        </span>
      </div>
    </div>
  );
};

export default Table;
