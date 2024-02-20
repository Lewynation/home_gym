import React from "react";
import { SingleSubscription } from "./dashboard_subs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";

function convertISO8601ToCustomFormat(isoDateString: string): string {
  const isoDate = new Date(isoDateString);

  // Check if the date is valid
  if (isNaN(isoDate.getTime())) {
    return "Invalid Date";
  }

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    isoDate
  );
  return formattedDate;
}

interface SingleSubRowProps {
  data: SingleSubscription;
}

const SingleSubRow: React.FC<SingleSubRowProps> = ({ data: item }) => {
  return (
    <TableRow>
      <TableCell className="font-redHat text-white">{`${item.tier.name}`}</TableCell>
      <TableCell className="font-redHat text-white">{`${item.ref}`}</TableCell>
      <TableCell className="font-redHat text-white">{`${item.tier.duration} DAYS`}</TableCell>
      <TableCell className="font-redHat text-white">{`KES ${
        item.amountPaid ?? 0
      }`}</TableCell>
      <TableCell className="font-redHat text-white">
        <p className="font-redHat text-white">
          {convertISO8601ToCustomFormat(item.createdAt)}
        </p>
      </TableCell>
    </TableRow>
  );
};

export default SingleSubRow;
