import React from "react";
import { OrderItems } from "./dashboard_orders";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SingleOrderRow from "./single_order_row";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface OrdersTableProps {
  data: OrderItems;
}

const OrdersTable: React.FC<OrdersTableProps> = ({ data }) => {
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent orders.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>SERIAL</TableHead>
            <TableHead className="">REF</TableHead>
            <TableHead className="">AMOUNT</TableHead>
            <TableHead className="">DATE</TableHead>
            <TableHead className="">STATUS</TableHead>
            <TableHead className=""></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.Order.map((item) => (
            <SingleOrderRow key={item.id} data={item} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrdersTable;
