import type { CyberEvent } from "@/model/CyberEvent"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function TableAttack({ data }: { data: CyberEvent[] }) {
    const last_ten = data.slice(-30);
    return (
    <Table className="table-auto divide-y divide-muted rounded-lg overflow-hidden">
      <TableCaption>A list of recent attacks</TableCaption>

      <TableHeader>
        <TableRow className="bg-muted/50">
          <TableHead className="min-w-30 px-4 py-2 text-center">ID</TableHead>
          <TableHead className="min-w-30 px-4 py-2 text-center">Impact</TableHead>
          <TableHead className="min-w-30 px-4 py-2 text-center">Sector</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {last_ten.map((event, index) => (
          <TableRow
            key={index}
            className="hover:bg-muted/20 transition-colors"
          >
            <TableCell >{event.id}</TableCell>
            <TableCell >{event.attack?.type}</TableCell>
            <TableCell >{event.attack?.impact?.type}</TableCell>
          </TableRow>
        ))}
      </TableBody>

      <TableFooter>
        <TableRow className="bg-muted/50 font-semibold">
          <TableCell colSpan={4}>Total attacks</TableCell>
          <TableCell className="text-center">{last_ten.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
