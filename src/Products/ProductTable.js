function ProductTable({ products, deleteProduct }) {
  return (
    <div className="product-table">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">&nbsp;</th>
            <th scope="col">PRODUCT NAME</th>
            <th scope="col">UNIT SOLD</th>
            <th scope="col">IN STOCK</th>
            <th scope="col">EXPIRE DATE</th>
            <th scope="col">&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            return (
              <tr className="t-row">
                <th scope="row">
                  <input type="checkbox" value={product.name} />
                </th>
                <td class="tm-product-name">{product.name}</td>
                <td>{product.unitSold}</td>
                <td>{product.stock}</td>
                <td>{product.expireDate}</td>
                <td>
                  <div
                    class="tm-product-delete-link"
                    onClick={() => {
                      deleteProduct(index);
                    }}
                  >
                    <i class="far fa-trash-alt tm-product-delete-icon"></i>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default ProductTable;
