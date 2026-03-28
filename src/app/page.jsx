import Banner from "@/components/Home/Banner";
import Products from "@/components/Home/Products";
import Test from "@/components/Test";
import { authOptions } from "@/lib/authOption";
import { getServerSession } from "next-auth";
import Image from "next/image";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div className="space-y-20">
      <Test />
      <p>{JSON.stringify(session)}</p>
      <section>
        <Banner />
      </section>
      <section>
        <Products />
      </section>
    </div>
  );
}
