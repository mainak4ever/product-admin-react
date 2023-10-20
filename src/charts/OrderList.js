function OrderList({ orders }) {
  return (
    <div className="order-list">
      <h2>Order List</h2>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">ORDER NO.</th>
            <th scope="col">STATUS</th>
            <th scope="col">OPERATORS</th>
            <th scope="col">LOCATION</th>
            <th scope="col">DISTANCE</th>
            <th scope="col">START DATE</th>
            <th scope="col">EST DELIVERY DUE</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            return <TableRow order={order} />;
          })}
        </tbody>
      </table>
    </div>
  );
}
export default OrderList;

function TableRow({ order }) {
  return (
    <tr>
      <th scope="row">
        <b>{order.orderNo}</b>
      </th>
      <td>
        <div class={"tm-status-circle " + order.status.toLowerCase()}></div>
        {order.status}
      </td>
      <td>
        <b>{order.operators}</b>
      </td>
      <td>
        <b>{order.location}</b>
      </td>
      <td>
        <b>{order.distance}</b>
      </td>
      <td>{order.startDate}</td>
      <td>{order.deliveryDate}</td>
    </tr>
  );
}
