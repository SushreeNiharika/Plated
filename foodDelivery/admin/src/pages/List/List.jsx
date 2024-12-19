import React, { useEffect, useState } from "react";
import "./List.css";
import axios, { Axios } from "axios";
import { toast } from "react-toastify";

const List = () => {
  const url = "https://platted-backend-up.onrender.com";

  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      console.log("Response data:", response.data); // Debugging line
      if (response.data.success && Array.isArray(response.data.data)) {
        setList(response.data.data); // Set list only if data is an array
      } else {
        toast.error("Error: Data format is incorrect or not an array");
      }
    } catch (error) {
      toast.error("Failed to fetch data");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Failed to remove");
    }
  };

  return (
    <div className="list add flex-col">
      <h2>All Food List</h2>

      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>Rs {item.price}</p>
              <p onClick={() => removeFood(item._id)} className="cursor">
                {" "}
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
