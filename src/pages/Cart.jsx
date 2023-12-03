import { Button, Spinner } from "@nextui-org/react";
import { addToCart, getData } from "../helpers/Axios";
import { useContext } from "react";
import { AuthContext } from "../hooks/AuthContextProvider";
import { useQuery } from "@tanstack/react-query";
import CartCard from "../components/cart/CartCard";
import { Link } from "react-router-dom";

const Cart = () => {
  const { user } = useContext(AuthContext);

  const {
    data: cart,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["cart", user.uid],

    queryFn: () => getData("/cart/" + user.uid),
  });

  const handleAddToCartClick = async (id, quantity) => {
    const data = {
      uid: user.uid,
      products: [
        {
          product: id,
          quantity: quantity,
        },
      ],
    };
    try {
      await addToCart(data);
      refetch();
      console.log("Product added to cart successfully!");
    } catch (error) {
      refetch();
      console.error("Error adding product to cart:", error);
    }
  };

  const handleCart = async (action, id) => {
    if (action === "plus") {
      handleAddToCartClick(id, 1);
    }
    if (action === "minus") {
      handleAddToCartClick(id, -1);
    }
    if (action === "delete") {
      try {
        await addToCart(
          {
            uid: user.uid,
            productId: id,
          },
          "/cart/remove"
        );
        refetch();
        console.log("Product added to cart successfully!");
      } catch (error) {
        refetch();
        console.error("Error adding product to cart:", error);
      }
    }
  };

  if (isLoading) return <Spinner />;
  const totalPrice = cart?.data?.products
    .reduce((total, product) => {
      return total + product?.product?.price * product?.quantity;
    }, 0)
    .toFixed(2);

  // Calculate total quantity
  const totalQuantity = cart?.data?.products?.reduce((total, product) => {
    return total + product?.quantity;
  }, 0);

  return (
    <div className="py-10 md:py-16 w-[93%] max-w-5xl mx-auto">
      <h1 className="text-3xl font-inter my-10">Your cart</h1>
      {cart?.data?.products?.length > 0 && (
        <div className="w-full grid grid-cols-1 md:grid-cols-5 gap-10">
          <div className="md:col-span-3">
            <div className="w-full my-5 h-10 bg-primary/5 text-center flex justify-center items-center">
              <h1>PRODUCT</h1>
            </div>
            <div className="flex flex-col gap-4">
              {cart.data.products.map((product, index) => {
                if (!product.product) {
                  return null;
                }

                return (
                  <CartCard
                    key={index}
                    quantity={product?.quantity}
                    item={product?.product}
                    handleCart={handleCart}
                  />
                );
              })}
            </div>
          </div>
          <div className="md:col-span-2 ">
            <div className="w-full my-5 h-10 bg-primary/5 text-center flex justify-center items-center">
              <div className="">ORDER SUMMARY</div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="text-3xl flex justify-between w-full">
                <span>Sub-Total</span>
                <span>{totalPrice}</span>
              </div>
              <div className="text-xl  flex justify-between w-full">
                <span className=" text-[#C3073F]"> Number of items</span>
                <span>{totalQuantity}</span>
              </div>
              <span className="text-muted-foreground/50 text-sm">
                This price is exclusive of taxes. GST will be added during
                checkout.
              </span>
              <Button
                radius="full"
                size="md"
                color="primary"
                as={Link}
                to={"/checkout/"}
                className="    font-bold   "
              >
                Proceed To Checkout
              </Button>
            </div>
          </div>
        </div>
      )}
      {cart?.data?.products?.length < 1 && (
        <div className="flex flex-col justify-center items-center">
          <img src="https://lynethhealthcare.in/images/no-product.png" alt="" />
          <p className="text-2xl font-inter"> Your Cart is empty</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
