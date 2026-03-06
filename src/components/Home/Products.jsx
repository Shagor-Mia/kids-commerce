import React from "react";
import ProductCard from "../Cards/ProductsCard";
import { getProducts, getSingleProduct } from "@/server/product";

export async function generateMetadata({ params }) {
  const { id } = params;
  const product = await getSingleProduct(id);

  return {
    title: product.name,
    description: product.description,

    alternates: {
      canonical: `https://kids-commerce-three.vercel.app/products/${id}`,
    },

    openGraph: {
      title: product.name,
      description: product.description,
      url: `https://kids-commerce-three.vercel.app/products/${id}`,
      siteName: "Hero Kidz",
      images: [
        {
          url: product.image,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
      locale: "en_US",
      type: "product",
    },

    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  };
}

const Products = async () => {
  const products = (await getProducts()) || [];

  return (
    <div>
      <h2 className="text-center text-5xl font-bold mb-10">Our Products</h2>

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5">
        {products.map((product) => (
          <ProductCard key={product.title} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
