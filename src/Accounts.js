import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Accounts() {
  const [data, setData] = useState(JSON.parse(localStorage.getItem("data")));
  const [selectedAccount, setSelectedAccount] = useState(
    Object.keys(data.accountsPage)[0]
  );

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      accountsPage: {
        ...prevData.accountsPage,
        [selectedAccount]: {
          ...prevData.accountsPage[selectedAccount],
          [name]: value,
        },
      },
    }));
  };

  const updateProfile = () => {
    localStorage.setItem("data", JSON.stringify(data));
    alert("Profile Updated Successfully");
    // Additional logic if needed
  };

  const deleteAccount = () => {
    const updatedData = { ...data };
    delete updatedData.accountsPage[selectedAccount];
    setData(updatedData);
    localStorage.setItem("data", JSON.stringify(updatedData));
    setSelectedAccount(Object.keys(data.accountsPage)[0]);
  };

  const deleteImage = () => {
    const updatedData = { ...data };
    updatedData.accountsPage[selectedAccount].profilePic = "";
    setData(updatedData);
    localStorage.setItem("data", JSON.stringify(updatedData));
    document.getElementById("fileInput").value = "";
  };

  const uploadNewPhoto = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedData = {
          ...data,
          accountsPage: {
            ...data.accountsPage,
            [selectedAccount]: {
              ...data.accountsPage[selectedAccount],
              profilePic: reader.result,
            },
          },
        };
        setData(updatedData);
        localStorage.setItem("data", JSON.stringify(updatedData));
      };
      reader.readAsDataURL(file);
    }
  };

  const accountOptions = Object.keys(data.accountsPage).map((account) => (
    <option key={account} value={account}>
      {account}
    </option>
  ));

  return (
    <div className="main">
      <div className="accounts">
        <div className="list-of-accounts">
          <h3>List of Accounts</h3>
          <label>
            Accounts
            <select
              name="category"
              className="category-options"
              value={selectedAccount}
              onChange={(e) => setSelectedAccount(e.target.value)}
            >
              <option value="" className="disabled-option" disabled>
                Select Account
              </option>
              {accountOptions}
            </select>
          </label>
        </div>
        <div className="acc-details-wrapper flex-div">
          {/* Account Details Left Section */}
          <div className="acc-details-left">
            <div className="account-img-wrapper">
              <h3>Change Avatar</h3>
              <div className="img-holder">
                <img
                  src={data.accountsPage[selectedAccount].profilePic}
                  alt="Profile"
                />
                <i
                  className={`far fa-trash-alt tm-category delete-icon`}
                  onClick={() => {
                    deleteImage();
                  }}
                ></i>
              </div>
            </div>
            <input
              id="fileInput"
              type="file"
              name="image"
              accept="image/*"
              onChange={uploadNewPhoto}
              style={{ display: "none" }}
            ></input>
            <input
              type="button"
              className="pdt-image-btn pdt-btn"
              value="UPLOAD NEW PHOTO"
              onClick={() => document.getElementById("fileInput").click()}
            />
          </div>
          {/* Account Details Right Section */}
          <div className="acc-details-right">
            <h3>Account Settings</h3>
            <div className="acc-settings-wrapper flex-div">
              <div className="acc-settings-left">
                <label>
                  Account Name
                  <input
                    type="text"
                    name="name"
                    placeholder=""
                    value={data.accountsPage[selectedAccount].name}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Password
                  <input
                    type="password"
                    name="password"
                    placeholder=""
                    value={data.accountsPage[selectedAccount].password}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Phone
                  <input
                    type="tel"
                    name="phone"
                    placeholder=""
                    value={data.accountsPage[selectedAccount].phone}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div className="acc-settings-right">
                <label>
                  Account Email
                  <input
                    type="email"
                    name="email"
                    placeholder=""
                    value={data.accountsPage[selectedAccount].email}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Re-enter Password
                  <input
                    type="password"
                    name="reEnterPassword"
                    placeholder=""
                    value={data.accountsPage[selectedAccount].password}
                    onChange={handleInputChange}
                  />
                </label>

                <button
                  className="updateProfile pdt-btn"
                  onClick={() => updateProfile()}
                >
                  UPDATE YOUR PROFILE
                </button>
              </div>
            </div>
            <button
              className="del-account pdt-btn"
              onClick={() => {
                deleteAccount();
              }}
            >
              Delete Your Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accounts;
