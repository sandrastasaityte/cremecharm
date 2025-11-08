import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = () => {
  const url = "http://localhost:4000";
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const onChangeHandler = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    try {
      const res = await axios.post(`${url}/api/food/add`, formData);
      if (res.data.success) {
        toast.success(res.data.message);
        setData({ name: "", description: "", price: "", category: "Salad" });
        setImage(null);
      } else toast.error(res.data.message);
    } catch (err) {
      toast.error("Server error");
      console.error(err);
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-image-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            type="file"
            id="image"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        <input
          type="text"
          name="name"
          value={data.name}
          onChange={onChangeHandler}
          placeholder="Cake Name"
          required
        />
        <textarea
          name="description"
          value={data.description}
          onChange={onChangeHandler}
          placeholder="Description"
          rows="4"
          required
        />
        <select
          name="category"
          value={data.category}
          onChange={onChangeHandler}
        >
          <option value="Classic Cakes">Classic Cakes</option>
          <option value="Specialty Cakes">Specialty Cakes</option>
          <option value="Wedding & Celebration Cakes">
            Wedding & Celebration Cakes
          </option>
          <option value="Custom Cakes">Custom Cakes</option>
          <option value="Healthy & Vegan Cakes">Healthy & Vegan Cakes</option>
          <option value="Cupcakes & Mini Cakes">Cupcakes & Mini Cakes</option>
          <option value="Regional / International Cakes">
            Regional / International Cakes
          </option>
          <option value="Special Ingredients / Flavors">
            Special Ingredients / Flavors
          </option>
        </select>

        <input
          type="number"
          name="price"
          value={data.price}
          onChange={onChangeHandler}
          placeholder="Price"
          required
        />
        <button type="submit">Add Cake</button>
      </form>
    </div>
  );
};

export default Add;
