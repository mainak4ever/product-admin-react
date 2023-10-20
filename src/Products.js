import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductTable from "./Products/ProductTable";
import ProductCategories from "./Products/ProductCategories";

function Products() {
  const [data, setData] = useState(JSON.parse(localStorage.getItem("data")));

  useEffect(() => {
    // setData(JSON.parse(localStorage.getItem("data")));
  }, []);

  function deleteProduct(index) {
    let newData = { ...data };
    newData.productsPage.products.splice(index, 1);
    setData(newData);
    localStorage.setItem("data", JSON.stringify(newData));
    alert("Product has been deleted successfully.");
  }

  function deleteCategory(index) {
    let newData = { ...data };
    newData.productsPage.categories.splice(index, 1);
    setData(newData);
    localStorage.setItem("data", JSON.stringify(newData));
    alert("Category has been deleted successfully.");
  }

  function addNewCategory() {
    const category = prompt("Enter New Category :");
    if (category) {
      let newData = { ...data };
      newData.productsPage.categories.push(category);
      setData(newData);
      localStorage.setItem("data", JSON.stringify(newData));
      alert(`${category} has been added to the categories`);
    } else {
      alert("Invalid category name. Please enter a valid category.");
    }
  }

  function deleteSelectedProducts() {
    const selectedProducts = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    );
    if (selectedProducts.length === 0) {
      alert("No products selected.");
      return;
    }

    const newData = { ...data };
    selectedProducts.forEach((checkbox) => {
      const productName = checkbox.value;
      const productIndex = newData.productsPage.products.findIndex(
        (product) => product.name === productName
      );
      if (productIndex !== -1) {
        newData.productsPage.products.splice(productIndex, 1);
      }
    });

    setData(newData);
    localStorage.setItem("data", JSON.stringify(newData));

    selectedProducts.forEach((checkbox) => {
      checkbox.checked = false;
    });
    alert("Selected products have been deleted successfully.");
  }

  return (
    <div className="main">
      <div className="products">
        <div className="left-div">
          <ProductTable
            products={data.productsPage.products}
            deleteProduct={deleteProduct}
          />
          <Link to="./addproduct">
            <button className="add-new-product pdt-btn">ADD NEW PRODUCT</button>
          </Link>
          <button
            className="delete-selected pdt-btn"
            onClick={() => {
              deleteSelectedProducts();
            }}
          >
            DELETE SELECTED PRODUCTS
          </button>
        </div>
        <div className="right-div">
          <h2>Product Categories</h2>
          <div className="product-categories scroll">
            <ProductCategories
              categories={data.productsPage.categories}
              deleteCategory={deleteCategory}
            />
          </div>
          <button className="add-new-category pdt-btn" onClick={addNewCategory}>
            ADD NEW CATEGORY
          </button>
        </div>
      </div>
    </div>
  );
}
export default Products;
