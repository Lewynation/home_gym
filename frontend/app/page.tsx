import HomeLanding from "@/components/pages/home/home_landing";
import SponsorsSection from "@/components/pages/home/sponsors";
import Footer from "@/components/shared/footer/footer";
import Header from "@/components/shared/header/header";

export default function Home() {
  return (
    <main className="">
      <Header />
      <div className="max-w-6xl mx-auto">
        <div className="">
          <HomeLanding />
          <SponsorsSection />
        </div>
        <Footer />
      </div>
    </main>
  );
}
