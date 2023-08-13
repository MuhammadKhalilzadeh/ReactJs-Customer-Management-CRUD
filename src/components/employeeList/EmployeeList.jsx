import React, { useState, useEffect } from "react";
import "./employeeList.css";
import axios from "axios";

function EmployeeList() {
  const url = "http://localhost:8080/employees";

  const [data, setData] = useState([]);

  const [updateId, setUpdateId] = useState("");
  const [updateFname, setUpdateFname] = useState("");
  const [updateLname, setUpdateLname] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [updatePhone, setUpdatePhone] = useState("");
  const [updateAddress, setUpdateAddress] = useState("");

  useEffect(() => {
    getList();
  }, []);

  function readyUpdates(id, fname, lname, email, phone, address) {
    setUpdateId(id);
    setUpdateFname(fname);
    setUpdateLname(lname);
    setUpdateEmail(email);
    setUpdatePhone(phone);
    setUpdateAddress(address);
  }

  function clearIt() {
    setUpdateId("");
    setUpdateFname("");
    setUpdateLname("");
    setUpdateEmail("");
    setUpdatePhone("");
    setUpdateAddress("");
  }

  async function submitUpdate(event) {
    event.preventDefault();

    try {
      await axios
        .put(url + "/" + updateId, {
          fname: updateFname,
          lname: updateLname,
          email: updateEmail,
          phone: updatePhone,
          address: updateAddress,
        })
        .then((res) => {
          console.log(res);
          //clear the form after submission of data to backend database
          setUpdateId("");
          setUpdateFname("");
          setUpdateLname("");
          setUpdateEmail("");
          setUpdatePhone("");
          setUpdateAddress("");
          getList();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      alert("Error");
    }
  }

  async function getList() {
    axios
      .get(url)
      .then((res) => {
        const d = res.data;
        setData(d);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function deleteCustomer(id) {
    console.log(url + "/" + id);
    axios
      .delete(url + "/" + id)
      .then((res) => {
        setData(data.filter((item) => item.id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="list-holder">
      <div className="update-form">
        <input
          type="text"
          placeholder="First Name"
          value={updateFname}
          onChange={(e) => {
            setUpdateFname(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={updateLname}
          onChange={(e) => {
            setUpdateLname(e.target.value);
          }}
        />
        <input
          type="email"
          placeholder="Email"
          value={updateEmail}
          onChange={(e) => {
            setUpdateEmail(e.target.value);
          }}
        />
        <input
          type="tel"
          placeholder="Mobile"
          value={updatePhone}
          onChange={(e) => {
            setUpdatePhone(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Address"
          value={updateAddress}
          onChange={(e) => {
            setUpdateAddress(e.target.value);
          }}
        />
        <button className="btn-update" onClick={submitUpdate}>
          Apply
        </button>
        <button className="btn-delete" onClick={clearIt}>
          Clear
        </button>
      </div>
      <table className="list-table">
        <thead>
          <tr className="table-tr">
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Update</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item) => (
              <tr key={item.id} className="table-tr">
                <td>{item.fname}</td>
                <td>{item.lname}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.address}</td>
                <td>
                  <button
                    className="btn-update"
                    onClick={() => {
                      readyUpdates(
                        item.id,
                        item.fname,
                        item.lname,
                        item.email,
                        item.phone,
                        item.address
                      );
                    }}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn-delete"
                    onClick={() => deleteCustomer(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;
