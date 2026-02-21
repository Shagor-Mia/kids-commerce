import Banner from "@/components/Home/Banner";
import Products from "@/components/Home/Products";
import Image from "next/image";

export default function Home() {
  return (
    <div className="space-y-20">
      <section>
        <Banner />
      </section>
      <section>
        <Products />
      </section>
    </div>
  );
}
