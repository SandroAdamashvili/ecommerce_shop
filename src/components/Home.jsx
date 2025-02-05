import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [data, setData] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        setData(response.data.products);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }

    fetchData();
    console.log(data);
  }, []);

  return (
    <div className="flex justify-center">
      <div className="flex flex-row gap-10 w-3/4 flex-wrap justify-center mt-20">
        {data.map((item) => (
          <div
            className=" w-[300px] text-wrap text-center p-5 border rounded-2xl flex items-center flex-col "
            key={item.id}
            onClick={() => {
              navigate(`/product/${item.id}`);
            }}
          >
            <img src={item.images[0]} alt="image" className="h-[300px]" />
            <h2 className="h-20 mt-2">{item.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
