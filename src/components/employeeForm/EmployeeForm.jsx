import React, { useState } from "react";
import "./employeeForm.css";
import axios from "axios";

const url = "http://localhost:8080/employees";

function EmployeeForm() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [error, setError] = useState(false);

  async function save(event) {
    event.preventDefault();

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setError(true);
    }
    if (
      fname.length === 0 ||
      lname.length === 0 ||
      email.length === 0 ||
      phone.length === 0 ||
      address.length === 0
    ) {
      setError(true);
    } else {
      try {
        await axios
          .post(url, {
            fname: fname,
            lname: lname,
            email: email,
            phone: phone,
            address: address,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
        window.location.reload();
        alert("Customer Registation Successfully");
        setFname("");
        setLname("");
        setEmail("");
        setPhone("");
        setAddress("");
      } catch (err) {
        alert("Customer Registation Failed");
      }
    }
  }

  return (
    <div className="input-holder">
      <div className="input-form">
        <input
          type="text"
          name="fname"
          id="customerFirstName"
          placeholder="First Name"
          onChange={(e) => {
            setFname(e.target.value);
          }}
        />
        <input
          type="text"
          name="lname"
          id="customerLastName"
          placeholder="Last Name"
          onChange={(e) => {
            setLname(e.target.value);
          }}
        />
        <input
          type="email"
          name="email"
          id="customerEmail"
          placeholder="Email Address"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="tel"
          name="phone"
          id="customerMobile"
          placeholder="Mobile, like: 0912XXX..."
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
        <input
          type="text"
          name="address"
          id="customerAddress"
          placeholder="Address"
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
        <div className="btns-group">
          <button className="insert-btn" onClick={save}>
            INSERT
          </button>
          {/* <button className="update-btn" onClick={update}>
            UPDATE
          </button> */}
        </div>
        <div className="errors">
          {error && fname.length === 0 ? (
            <label>
              First Name must not be empty <br />{" "}
            </label>
          ) : (
            ""
          )}
          {error && lname.length === 0 ? (
            <label>
              Last Name must not be empty <br />{" "}
            </label>
          ) : (
            ""
          )}
          {error && email.length === 0 ? (
            <label>
              Email must not be empty <br />{" "}
            </label>
          ) : (
            ""
          )}
          {error && phone.length === 0 ? (
            <label>
              Phone Number must not be empty <br />{" "}
            </label>
          ) : (
            ""
          )}
          {error && address.length === 0 ? (
            <label>
              Address must not be empty <br />{" "}
            </label>
          ) : (
            ""
          )}

          {error && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email) ? (
            <label>
              Invalid email formate <br />{" "}
            </label>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default EmployeeForm;
