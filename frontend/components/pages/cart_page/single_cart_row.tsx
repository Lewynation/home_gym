import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import Image from "next/image";
import { Minus, Plus, XCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useSWRConfig } from "swr";
import { SingleCartRowProps } from "./cart_table";
import { formatNumberWithCommas } from "@/lib/utils";
import { LoadingBanner } from "@/components/shared/loading_banner/loading_bar";

const SingleCartRow: React.FC<SingleCartRowProps> = (item) => {
  const { toast } = useToast();

  const [loading, setLoading] = React.useState(false);

  const { mutate } = useSWRConfig();

  const deleteCartItem = async (productId: string) => {
    if (loading) return;
    setLoading(true);
    try {
      await fetch("/api/cart", {
        method: "DELETE",
        body: JSON.stringify({ productToCartId: productId }),
      });

      await mutate("/checkout");
      toast({
        title: "Sucessfull",
        description: "Item deleted sucessfully from cart",
        className: "z-2000000",
      });
      mutate("/cart-count");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong",
        className: "z-2000000",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateServerQuantity = async (quantity: number) => {
    try {
      setLoading(true);
      await fetch("/api/cart", {
        method: "PATCH",
        body: JSON.stringify({ productToCartId: item.id, quantity }),
      });
      await mutate("/checkout");
      mutate("/cart-count");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateItemQuantity = async (quantity: number) => {
    if (item.quantity < 1 || item.quantity > 10) return;
    await updateServerQuantity(quantity);
  };

  return (
    <TableRow>
      <TableCell className="font-medium">
        {loading && <LoadingBanner loading={loading} />}
        <div className="flex gap-3 items-center">
          <div className="w-[100px] h-[100px]">
            <Image
              className="object-cover w-full h-full"
              src={`/images/${item.product.image}`}
              alt={item.product.name}
              width={80}
              height={100}
            />
          </div>
          <div className="flex flex-col">
            <p className="font-redHat text-white">{item.product.name}</p>
            <p className="text-[#b1b7b5] font-redHat">
              {item.product.shortDesc}
            </p>
          </div>
        </div>
      </TableCell>
      <TableCell className="font-redHat text-white">{`KES ${formatNumberWithCommas(
        item.product.price
      )}`}</TableCell>
      <TableCell className="font-redHat text-white">
        <div className="flex gap-3 rounded-full bg-[#1d2120] py-2 px-3">
          <button>
            <div>
              <Minus className="" onClick={() => updateItemQuantity(-1)} />
            </div>
          </button>
          <div>{item.quantity}</div>
          <button>
            <div>
              <Plus className="" onClick={() => updateItemQuantity(1)} />
            </div>
          </button>
        </div>
      </TableCell>
      <TableCell className="font-redHat text-white">{`KES ${formatNumberWithCommas(
        item.product.price * item.quantity
      )}`}</TableCell>
      <TableCell className="font-redHat text-white">
        <div>
          <XCircle
            className="cursor-pointer"
            onClick={() => deleteCartItem(item.id)}
          />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default SingleCartRow;
