"use client";

import { LoadingBanner } from "@/components/shared/loading_banner/loading_bar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { formatNumberWithCommas } from "@/lib/utils";
import { Minus, Plus, X, XCircle } from "lucide-react";
import Image from "next/image";
import React, { useOptimistic } from "react";
import { useSWRConfig } from "swr";
import SingleCartRow from "./single_cart_row";

export interface SingleCartRowProps {
  //productToCart
  id: string;
  quantity: number;
  product: {
    //product
    id: string;
    name: string;
    image: string | null;
    shortDesc: string | null;
    price: number;
  };
}

export interface CartTableProps {
  data: {
    //cart
    id: string;
    userId: string;
    products: SingleCartRowProps[];
  } | null;
}

const CartTable: React.FC<CartTableProps> = ({ data }) => {
  return (
    <div>
      <Table>
        <TableCaption>A list of your cart items.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>PRODUCT</TableHead>
            <TableHead className="">PRICE</TableHead>
            <TableHead className="w-[100px]">QUANTITY</TableHead>
            <TableHead className="">TOTAL</TableHead>
            <TableHead className=""></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.products.map((item) => (
            <SingleCartRow
              key={item.id}
              id={item.id}
              product={item.product}
              quantity={item.quantity}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CartTable;
