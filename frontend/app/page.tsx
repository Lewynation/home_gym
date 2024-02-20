import HomeLanding from "@/components/pages/home/home_landing";
import SponsorsSection from "@/components/pages/home/sponsors";
import Footer from "@/components/shared/footer/footer";
import Header from "@/components/shared/header/header";
import HeaderAssembly from "@/components/shared/header/header_assembly";

export default function Home() {
  return (
    <>
      <HeaderAssembly />
      <div className="max-w-6xl mx-auto">
        <div className="">
          <HomeLanding />
          <SponsorsSection />
        </div>
        <Footer />
      </div>
    </>
  );
}
