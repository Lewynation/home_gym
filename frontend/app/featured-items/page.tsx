import FeaturedItemsPage from "@/components/pages/featured_items/featured_items_view";
import Footer from "@/components/shared/footer/footer";
import Header from "@/components/shared/header/header";
import HeaderAssembly from "@/components/shared/header/header_assembly";
import React from "react";

const Page = () => {
  return (
    <>
      <HeaderAssembly />
      <div className="max-w-6xl mx-auto">
        <div className="mt-[130px] mb-28">
          <FeaturedItemsPage />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Page;
