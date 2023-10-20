function ProductCategories({ categories, deleteCategory }) {
  return (
    <div className="category-table">
      <table class="table">
        <tbody>
          {categories.map((category, index) => {
            return (
              <tr className="t-row">
                <td class="tm-product-name">{category}</td>
                <td>
                  <div
                    class="tm-product-delete-link"
                    onClick={() => {
                      deleteCategory(index);
                    }}
                  >
                    <i class="far fa-trash-alt tm-category-delete-icon"></i>
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
export default ProductCategories;
