import React, { useEffect, useState } from "react";
import LatestHitsChart from "./charts/LatestHitsChart";
import PerformanceChart from "./charts/PerformanceChart";
import StorageInfo from "./charts/StorageInfo";
import NotificationList from "./charts/NotificationList";
import OrderList from "./charts/OrderList";

function Dashboard() {
  const [data, setData] = useState(JSON.parse(localStorage.getItem("data")));
  useEffect(() => {
    // setData(JSON.parse(localStorage.getItem("data")));
  }, []);

  // console.log(data);
  return (
    <div className="main">
      <div className="dashboard">
        <div className="div-para">
          <p>
            Welcome back, <b>Admin</b>
          </p>
        </div>
        <div className="content-div">
          <div className="content-wrapper">
            <div className="display-section">
              <div className="dashboard-flex-div">
                <div className="latest-hits display-items">
                  <LatestHitsChart latestHits={data.dasbhoardPage.latestHits} />
                </div>
                <div className="performance display-items">
                  <PerformanceChart
                    performanceData={data.dasbhoardPage.performance}
                  />
                </div>
              </div>
              <div className="dashboard-flex-div">
                <div className="storage-info display-items">
                  <StorageInfo storage={data.dasbhoardPage.storage} />
                </div>
                <div className="notification-list display-items">
                  <NotificationList
                    notifications={data.dasbhoardPage.notifications}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="orders-section">
            <OrderList orders={data.dasbhoardPage.orders} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
