import React from "react";
import { DashboardSubItems } from "./dashboard_subs";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SingleSubRow from "./single_sub_row";
import { convertISO8601ToCustomFormat } from "../orders/single_order_row";

function hasSubscriptionExpired(
  expiryDate: string | null | undefined
): boolean {
  if (!expiryDate) {
    return true;
  }

  const expiryDateTime = new Date(expiryDate).getTime();
  const currentDateTime = new Date().getTime();

  return currentDateTime > expiryDateTime;
}

interface SubsTableProps {
  data: DashboardSubItems;
}

const SubsTable: React.FC<SubsTableProps> = ({ data }) => {
  return (
    <div>
      <div className="flex gap-3 font-redHat text-white text-lg mb-5 justify-center">
        <p className="font-bold">Subscription Status:</p>
        <p className="text-[#b1b7b5] font-redHat">
          {hasSubscriptionExpired(data.data?.subscriptionExpiry)
            ? `
              ${
                data.data?.subscriptionExpiry === null
                  ? "No subscription"
                  : `Expired on ${convertISO8601ToCustomFormat(
                      data.data?.subscriptionExpiry!
                    )}`
              }
        `
            : `Your subscription expires on ${convertISO8601ToCustomFormat(
                data.data?.subscriptionExpiry!
              )}`}
        </p>
      </div>
      <Table>
        <TableCaption>
          A list of your recent subscription payments.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">TIER NAME</TableHead>
            <TableHead className="">REF</TableHead>
            <TableHead className="">DURATION</TableHead>
            <TableHead className="">AMOUNT PAID</TableHead>
            <TableHead className="">DATE</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.Subscription.map((item) => (
            <SingleSubRow key={item.id} data={item} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SubsTable;
