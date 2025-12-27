import React, { useState } from "react";
import { AiOutlineProduct } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function AdminAddProductPage() {
  const [productID, setProductID] = useState("");
  const [name, setName] = useState("");
  const [altNames, setAltNames] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [labelledPrice, setLabelledPrice] = useState(0);
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [stock, setStock] = useState(0);
  const [isAvailable, setIsAvailable] = useState(false);
  const navigate = useNavigate();

  async function addProduct() {
    const token = localStorage.getItem("token");
    if (token == null) {
      toast.error("You must be logged in to add a product.");
      navigate("/login");
      return;
    }
    if (
      productID == "" ||
      name == "" ||
      description == "" ||
      category == "" ||
      brand == "" ||
      model == ""
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const altNamesInArray = altNames.trim()
        ? altNames.split(",").map((n) => n.trim())
        : [];
      const imagesInArray = images.trim()
        ? images.split(",").map((i) => i.trim())
        : [];
      const baseUrl = import.meta.env.VITE_BACKEND_URL || "/api";
      const response = await axios.post(
        baseUrl + "/products/",
        {
          productID: productID,
          name: name,
          altNames: altNamesInArray,
          description: description,
          price: parseFloat(price),
          labelledPrice: parseFloat(labelledPrice),
          images: imagesInArray,
          category: category,
          brand: brand,
          model: model,
          stock: parseInt(stock),
          isAvailable: isAvailable,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log("Product added:", response.data);
      toast.success("Product added successfully!");
      navigate("/admin/products");
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to add product. Please try again.";
      toast.error(errorMsg);
      console.error("Error creating product - Status:", error.response?.status);
      console.error(
        "Error details:",
        JSON.stringify(error.response?.data, null, 2)
      );
      console.error("Request payload:", {
        productID,
        name,
        description,
        category,
        brand,
        model,
        price: parseFloat(price),
        stock: parseInt(stock),
      });
      console.error("Full error:", error);
      return;
    }
  }

  return (
    <div className="w-full h-full flex justify-center p-[50px] items-start overflow-y-scroll">
      <div className="w-[600px] bg-accent/80 rounded-2xl p-10 w-800px shadow-2xl overflow-y-visible">
        <h1 className="w-full text-xl text-primary mb-5 flex items-center gap-[5px]">
          <AiOutlineProduct />
          Add New Product
        </h1>
        <div className="w-full bg-white p-5 flex flex-row flex-wrap justify-between rounded-xl">
          <div className="my-2.5 w-[40%]">
            <label>Product ID</label>
            <input
              type="text"
              value={productID}
              onChange={(e) => {
                setProductID(e.target.value);
              }}
              className="w-full h-10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl px-5"
            />
            <p className="text-sm text-gray-500 w-full text-right">
              Provide a unique ID
            </p>
          </div>

          <div className="my-2.5 w-[40%]">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="w-full h-10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl px-5"
            />
          </div>

          <div className="my-2.5 w-full">
            <label>Alternative Names</label>
            <input
              type="text"
              value={altNames}
              onChange={(e) => {
                setAltNames(e.target.value);
              }}
              className="w-full h-10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl px-5"
            />
            <p className="text-sm text-gray-500 w-full text-right">
              Seperate multiple names with commas
            </p>
          </div>

          <div className="my-2.5 w-full">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              className="w-full h-[100px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl px-5 py-2.5"
            />
          </div>

          <div className="my-2.5 w-[40%]">
            <label>Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              className="w-full h-10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl px-5"
            />
          </div>

          <div className="my-2.5 w-[40%]">
            <label>Labelled Price</label>
            <input
              type="number"
              value={labelledPrice}
              onChange={(e) => {
                setLabelledPrice(e.target.value);
              }}
              className="w-full h-10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl px-5"
            />
          </div>

          <div className="my-2.5 w-full">
            <label>Images</label>
            <input
              type="text"
              value={images}
              onChange={(e) => {
                setImages(e.target.value);
              }}
              className="w-full h-10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl px-5"
            />
          </div>

          <div className="my-2.5 flex flex-col w-[30%]">
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl px-5"
            >
              <option value="CPU">CPU</option>
              <option value="GPU">GPU</option>
              <option value="Motherboard">Motherboard</option>
              <option value="RAM">RAM</option>
              <option value="Storage">Storage</option>
              <option value="Power Supply">Power Supply</option>
              <option value="Case">Case</option>
              <option value="Cooling">Cooling</option>
              <option value="Peripherals">Peripherals</option>
              <option value="Cables">Cables</option>
              <option value="Computers">Computers</option>
              <option value="Laptops">Laptops</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div className="my-2.5 w-[30%]">
            <label>Brand</label>
            <input
              type="text"
              value={brand}
              onChange={(e) => {
                setBrand(e.target.value);
              }}
              className="w-full h-10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl px-5"
            />
          </div>

          <div className="my-2.5 w-[30%]">
            <label>Model</label>
            <input
              type="text"
              value={model}
              onChange={(e) => {
                setModel(e.target.value);
              }}
              className="w-full h-10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl px-5"
            />
          </div>

          <div className="my-2.5 w-[40%]">
            <label>Stock</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => {
                setStock(e.target.value);
              }}
              className="w-full h-10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl px-5"
            />
          </div>

          <div className="my-2.5 flex flex-col items-center gap-2.5 w-[40%]">
            <label>Availability</label>
            <select
              value={isAvailable}
              onChange={(e) => setIsAvailable(e.target.value === "true")}
              className="w-full h-10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl px-5"
            >
              <option value={true}>Available</option>
              <option value={false}>Not Available</option>
            </select>
          </div>
          <Link
            to="/admin/products"
            className="w-[49%] h-10 rounded-2xl bg-red-500 text-black font-bold flex justify-center items-center hover:bg-red-700 mt-5"
          >
            Cancel
          </Link>
          <button
            type="button"
            onClick={addProduct}
            className="w-[49%] h-10 rounded-2xl bg-accent text-white font-bold hover:bg-transparent hover:text-accent border-accent mt-5"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}
