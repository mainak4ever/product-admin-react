import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function AddProduct() {
  const [data, setData] = useState(JSON.parse(localStorage.getItem("data")));
  const [productInfo, setProductInfo] = useState({
    productName: "",
    description: "",
    category: "",
    expireDate: "",
    unitStock: "",
    image: null,
  });

  const navigate = useNavigate();

  function handleInputChange(event) {
    const { name, value } = event.target;
    setProductInfo({ ...productInfo, [name]: value });
  }

  function handleImageChange(event) {
    const file = event.target.files[0];
    setProductInfo({ ...productInfo, image: file });
    console.log(productInfo);
  }

  function addProduct() {
    // Validate the form fields before proceeding
    if (
      !productInfo.productName ||
      !productInfo.description ||
      !productInfo.category ||
      !productInfo.image
    ) {
      alert("Please fill out all the required fields.");
      return;
    }

    // Create a new product object
    const newProduct = {
      name: productInfo.productName,
      description: productInfo.description,
      category: productInfo.category,
      expireDate: productInfo.expireDate,
      stock: productInfo.unitStock,
      image: productInfo.image,
      unitSold: 0,
    };

    // Update the data state with the new product
    const updatedData = { ...data };
    updatedData.productsPage.products.push(newProduct);

    setData(updatedData);
    localStorage.setItem("data", JSON.stringify(updatedData));

    // Reset the form fields and productInfo state for the next entry
    setProductInfo({
      productName: "",
      description: "",
      category: "",
      expireDate: "",
      unitStock: "",
      image: null,
    });

    // Redirect the user to a product page.
    navigate("/products");
  }

  return (
    <div className="main">
      <div className="add-product">
        <h2>Add Product</h2>
        <div className="add-product-wrapper flex-div">
          <div className="product-wrapper-left">
            <form className="add-product-form">
              <label>
                Product Name
                <input
                  type="text"
                  name="productName"
                  className="productName input-text"
                  value={productInfo.productName}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Description
                <textarea
                  type="text"
                  name="description"
                  className="description input-text"
                  value={productInfo.description}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Category
                <select
                  name="category"
                  className="category-options"
                  value={productInfo.category}
                  onChange={handleInputChange}
                >
                  <option value="">Select category</option>
                  {data.productsPage.categories.map((category, index) => {
                    return (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    );
                  })}
                </select>
              </label>
              <div className="flex-div">
                <label className="add-product-l-div">
                  Expire Date
                  <input
                    type="text"
                    name="expireDate"
                    className="expireDate input-text"
                    value={productInfo.expireDate}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Units In Stock
                  <input
                    type="text"
                    name="unitStock"
                    className="unitStock input-text"
                    value={productInfo.unitStock}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
            </form>
          </div>
          <div className="product-wrapper-right">
            <div className="product-img-wrapper">
              <div className="img-holder">
                {productInfo.image && (
                  <img
                    src={URL.createObjectURL(productInfo.image)}
                    alt="Product"
                  />
                )}
                <i
                  className={`fas fa-cloud-upload-alt tm-upload-icon cloud-icon ${
                    productInfo.image ? "hide-cloud-icon" : ""
                  }`}
                  onClick={() => document.getElementById("fileInput").click()}
                ></i>
              </div>
            </div>
            <input
              id="fileInput"
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            ></input>
            <input
              type="button"
              className="pdt-image-btn pdt-btn"
              value="UPLOAD PRODUCT IMAGE"
              onClick={() => document.getElementById("fileInput").click()}
            />
          </div>
        </div>
        <button
          className="add-product-btn pdt-btn"
          onClick={() => {
            addProduct();
          }}
        >
          ADD PRODUCT NOW
        </button>
      </div>
    </div>
  );
}

export default AddProduct;
