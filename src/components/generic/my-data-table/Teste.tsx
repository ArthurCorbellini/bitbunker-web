"use client";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

// Definição do tipo de usuário
type User = {
  id: number;
  name: string;
  email: string;
};

// Simula uma API do backend que retorna dados paginados
const fetchUsers = async (page: number, limit: number): Promise<{ data: User[]; total: number }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const total = 50; // Total de registros no banco de dados
      const users: User[] = Array.from({ length: total }, (_, i) => ({
        id: i + 1,
        name: `Usuário ${i + 1}`,
        email: `usuario${i + 1}@email.com`,
      }));
      const paginatedData = users.slice((page - 1) * limit, page * limit); // Simulando paginação
      resolve({ data: paginatedData, total });
    }, 1000); // Simulando atraso de 1 segundo
  });
};

// Definição das colunas da tabela
const columns: ColumnDef<User>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Nome" },
  { accessorKey: "email", header: "Email" },
];

export default function PaginatedTable() {
  const [data, setData] = useState<User[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [pageSize, setPageSize] = useState(5); // Número de itens por página
  const [pageIndex, setPageIndex] = useState(0); // Índice da página
  const [loading, setLoading] = useState(false);

  // Função para buscar usuários simulando um backend
  const loadUsers = async (page: number, limit: number) => {
    setLoading(true);
    const response = await fetchUsers(page, limit);
    setData(response.data);
    setTotalRows(response.total);
    setLoading(false);
  };

  // Efeito para carregar os dados ao mudar de página
  useEffect(() => {
    loadUsers(pageIndex + 1, pageSize);
  }, [pageIndex, pageSize]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: { pagination: { pageIndex, pageSize } },
    onPaginationChange: (updater) => {
      const newPagination = typeof updater === "function" ? updater({ pageIndex, pageSize }) : updater;
      setPageIndex(newPagination.pageIndex);
      setPageSize(newPagination.pageSize);
    },
    manualPagination: true, // Indica que a paginação é controlada pelo backend
    pageCount: Math.ceil(totalRows / pageSize),
  });

  return (
    <div className="p-4">
      {/* Tabela */}
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>{header.column.columnDef.header}</TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                Carregando...
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{cell.getValue()}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                Nenhum dado encontrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Controles de Paginação */}
      <div className="flex justify-between items-center mt-4">
        <Button onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))} disabled={pageIndex === 0}>
          Anterior
        </Button>
        <span>
          Página {pageIndex + 1} de {table.getPageCount()}
        </span>
        <Button
          onClick={() => setPageIndex((prev) => (prev + 1 < table.getPageCount() ? prev + 1 : prev))}
          disabled={pageIndex + 1 >= table.getPageCount()}
        >
          Próxima
        </Button>
      </div>
    </div>
  );
}
