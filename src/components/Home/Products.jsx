import React from "react";
import products from "@/data/toys.json";
import ProductCard from "../Cards/ProductsCard";
import { getProducts } from "@/server/product";

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
