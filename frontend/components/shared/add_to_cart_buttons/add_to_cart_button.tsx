import { useToast } from "@/components/ui/use-toast";
import { Plus } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import React from "react";
import { useSWRConfig } from "swr";

interface AddToCartButtonProps {
  productId: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  productId,
  setLoading,
}) => {
  const [loading, setLocalLoading] = React.useState(false);
  const session = useSession();
  const { mutate } = useSWRConfig();
  const { toast } = useToast();

  const onAddToCart = async () => {
    if (!session.data?.user) {
      signIn();
    } else {
      if (loading) {
        return;
      }
      setLoading(true);
      setLocalLoading(true);
      try {
        const res = await fetch("/api/cart", {
          body: JSON.stringify({ productId }),
          method: "POST",
        });
        toast({
          title: "Sucessfull",
          description: "Item added sucessfully to cart",
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
        setLocalLoading(false);
      }
    }
  };

  return (
    <div
      onClick={onAddToCart}
      className="flex px-3 py-2 items-center gap-x-1 rounded-full bg-primaryColor cursor-pointer"
    >
      <p className="text-white font-redHat font-bold">Cart</p>
      <Plus className="text-white" />
    </div>
  );
};

export default AddToCartButton;
