import axios from "axios";
import Header from "./Header";
import { useEffect, useState } from "react";
import PlusIcon from "../assets/icon-plus.svg";
import MinusIcon from "../assets/icon-minus.svg";

export default function Cart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const keys = Object.keys(localStorage);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        setData(response.data.products);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    }

    fetchData();
  }, []);

  function handleQuantity(operator, itemId) {
    let qty = localStorage.getItem(itemId);
    operator == "+" ? qty++ : qty--;
    qty == 0
      ? localStorage.removeItem(itemId)
      : localStorage.setItem(itemId, qty);
  }

  if (loading) {
    return (
      <div>
        <Header cart={false} />
        <p>Loading cart items...</p>
      </div>
    );
  }

  return (
    <>
      <Header cart={false} />
      <div className="flex flex-col gap-5 justify-center items-center my-10">
        {keys.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          keys.map((item) => (
            <div
              className="flex flex-row justify-between items-center gap-8 w-1/2 p-5 border border-gray-200 rounded-2xl shadow-xl shadow-yellow-50"
              key={item}
            >
              <div className="flex flex-row gap-8 justify-center items-center">
                <img
                  src={data[item - 1]?.thumbnail} // Use optional chaining to avoid accessing undefined
                  alt="item image"
                  className="w-30"
                />
                <div>
                  <h3 className="text-lg text-yellow-700">
                    {data[item - 1]?.title}{" "}
                    {/* Use optional chaining here as well */}
                  </h3>
                  <p className="font-semibold text-md">
                    {data[item - 1]?.price}$ x {localStorage.getItem(item)}
                  </p>
                </div>
              </div>

              <div className="w-32 h-14 flex flex-row justify-center items-center gap-3 rounded-4xl border border-gray-300 mt-5">
                <img
                  src={MinusIcon}
                  alt="minus icon"
                  onClick={() => handleQuantity("-", item)}
                  className="mr-4 hover:cursor-pointer"
                />
                <h1 className="text-xl font-bold">
                  {localStorage.getItem(item)}
                </h1>
                <img
                  src={PlusIcon}
                  alt="plus icon"
                  onClick={() => handleQuantity("+", item)}
                  className="ml-4 hover:cursor-pointer"
                />
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
