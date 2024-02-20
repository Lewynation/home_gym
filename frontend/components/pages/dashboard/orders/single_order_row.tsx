import { TableCell, TableRow } from "@/components/ui/table";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Dot, XCircle } from "lucide-react";
import React from "react";
import { SingleOrder } from "./dashboard_orders";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { formatNumberWithCommas } from "@/lib/utils";

export function convertISO8601ToCustomFormat(isoDateString: string): string {
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

interface SingleOrderRowProps {
  data: SingleOrder;
}

const SingleOrderRow: React.FC<SingleOrderRowProps> = ({ data: item }) => {
  return (
    <TableRow>
      <TableCell className="font-medium">
        <div className="flex gap-3 items-center">
          <p className="font-redHat text-white"># {item.serialNo}</p>
        </div>
      </TableCell>
      <TableCell className="font-redHat text-white">{`${item.ref}`}</TableCell>
      <TableCell className="font-redHat text-white">{`KES ${
        item.amount ?? 0
      }`}</TableCell>
      <TableCell className="font-redHat text-white">
        <p className="font-redHat text-white">
          {convertISO8601ToCustomFormat(item.createdAt)}
        </p>
      </TableCell>
      <TableCell className="font-redHat text-white">
        <div className=" flex gap-1">
          <div>
            <Dot className="text-green-800" />
          </div>
          <div>
            <p className="font-redHat text-white">Awaiting delivery</p>
          </div>
        </div>
      </TableCell>
      <TableCell className="font-redHat text-white">
        <Dialog>
          <DialogTrigger>
            <button className="cursor-pointer font-redHat hover:text-primaryColor transition-all duration-200">
              View Order
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{`Order #${item.serialNo}`}</DialogTitle>
              <DialogDescription>Your order products:</DialogDescription>
              <div className="overflow-y-scroll max-h-[50vh]">
                {item.product.map((product) => (
                  <div key={product.product.id} className="my-3 gap-x-4 flex">
                    <div className="w-24 h-24">
                      <Image
                        src={`/images/${product.product.image}`}
                        alt={product.product.name}
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="">
                      <p className="font-redHat">{product.product.name}</p>
                      <p className="text-sm font-redHat text-[#b1b7b5]">
                        {product.product.shortDesc}
                      </p>
                      <div className="flex gap-2 font-redHat text-[#b1b7b5] text-sm">
                        <p className="">
                          {`KES ${formatNumberWithCommas(
                            product.product.price
                          )}`}{" "}
                          x
                        </p>
                        <p>{product.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </TableCell>
    </TableRow>
  );
};

export default SingleOrderRow;
