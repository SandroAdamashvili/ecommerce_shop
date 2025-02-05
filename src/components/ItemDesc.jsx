import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CartIcon from "../assets/icon-cart.svg";

export default function ItemDesc({ productImg, productTitle, productDesc }) {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  let navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        setProduct(response.data.products[Number(id) - 1]);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }

    fetchData();
    console.log(product);
  }, []);

  return (
    <>
      <div className="flex flex-row justify-center items-center gap-48 mx-16 my-24">
        <img
          src={product.thumbnail}
          alt="product image"
          className=" w-lg border rounded-2xl border-gray-300 shadow-sm shadow-gray-500"
        />
        <div className="flex flex-col gap-5 justify-start text-left text-wrap w-1/3">
          <div>
            <h6 className="text-sm font-bold tracking-widest">
              {product.brand}
            </h6>
            <h1 className="text-2xl font-bold">{product.title}</h1>
          </div>

          <h1 className="text-2xl font-bold">${product.price}</h1>
          <p>{product.description}</p>
          <div className="w-64 h-14 flex flex-row justify-center items-center gap-6 rounded-4xl bg-yellow-400 mt-5">
            <img src={CartIcon} alt="cart icon" />
            <h1>Add to cart</h1>
          </div>
        </div>
      </div>
    </>
  );
}
