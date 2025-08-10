import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from "@tanstack/react-table";
import { Stock } from "./types";

export function DataTable({ data }: { data: Stock[] }) {
    const table = useReactTable({
        data,
        columns: [
            { header: "Symbol", accessorKey: "symbol" },
            { header: "Price", accessorKey: "price" },
        ],
        getCoreRowModel: getCoreRowModel(),
    });
    return (
        <table>
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
    );
}