import { getCart } from "@/actions/server/cart";
import CartItems from "@/components/Cards/CartItems";
import ClientCart from "@/components/Home/ClientCart";

const CartPage = async () => {
  const cartItems = await getCart();
  // console.log(cartItems[0]);
  const formattedItems = cartItems.map((item) => ({
    ...item,
    _id: item._id.toString(),
  }));

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-8 flex items-center justify-between">
        🛒 Your Cart
      </h1>

      <ClientCart cartItem={formattedItems} />
    </div>
  );
};

export default CartPage;
