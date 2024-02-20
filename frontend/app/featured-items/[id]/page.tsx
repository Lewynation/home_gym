import SingleProduct from "@/components/pages/featured_items/product/single_product";
import Footer from "@/components/shared/footer/footer";
import HeaderAssembly from "@/components/shared/header/header_assembly";
import React from "react";

interface Props {
  params: {
    id: string;
  };
}

const Page: React.FC<Props> = ({ params }) => {
  const productId = params.id;

  return (
    <>
      <HeaderAssembly />
      <div className="max-w-6xl mx-auto">
        <div className="mt-[130px] mb-28">
          <SingleProduct productId={productId} />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Page;
