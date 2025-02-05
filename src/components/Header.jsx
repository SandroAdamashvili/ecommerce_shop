import { useNavigate } from "react-router-dom";
import CartIcon from "../assets/icon-cart.svg";
import { useState } from "react";

export default function Header() {
  const [cartOpen, setCartOpen] = useState(false);
  let navigate = useNavigate();

  return (
    <>
      <nav className="flex flex-row justify-center my-8">
        <div className="flex flex-row gap-24 items-center text-xl text-yellow-600 font-[FiraGo]">
          <p
            className="font-bold hover:cursor-pointer"
            onClick={() => navigate("/")}
          >
            Home
          </p>
          <p className="font-bold hover:cursor-pointer">Cart</p>
        </div>
        <div className="flex flex-col items-end absolute right-20 gap-16">
          <img
            src={CartIcon}
            alt="cart icon"
            className="h-6 w-7 mr-20 hover:cursor-pointer"
            onClick={() => setCartOpen(!cartOpen)}
          />
          {cartOpen && (
            <div className="w-72 border shadow-xl shadow-gray-300 p-3 rounded-2xl border-transparent flex flex-col gap-2 z-10 bg-white min-h-60">
              <h3 className="text-lg font-bold">Cart</h3>
              <hr className="text-gray-200" />
              <h4 className="text-center mt-14 text-lg">Cart Is Empty!</h4>
            </div>
          )}
        </div>
      </nav>

      <hr className="text-gray-200" />
    </>
  );
}
