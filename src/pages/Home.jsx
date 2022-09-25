import React, { useState } from "react";
import "./Home.css";
import { fs } from "../config/config";

const Home = () => {
  function handleTicketChange(event) {
    setTicket(event.target.value);
  }
  function handleQuantityChange(event) {
    setQuantity(event.target.value);
  }

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phno, setphno] = useState("");
  const [ticket, setTicket] = useState("");
  const [quantity, setQuantity] = useState("");
  const [paymentid, setpaymentid] = useState();

  let total = ticket * quantity;
  const cart = fs.collection("contacts");

  const sendData = () => {
    localStorage.setItem("Phone", phno);
    localStorage.setItem("Email", email);
    cart
      .doc(`${name} ${phno}`)
      .set({
        name: name,
        email: email,
        phone_number: phno,
        ticket: ticket,
        quantity: quantity,
        paymentid: paymentid,
      })
      .then(() => {
        alert("Your message has been submitted👍");
        console.log("heXre");
      })
      .catch((error) => {
        alert(error.message);
      });

    setName("");
    setEmail("");
    setTicket("");
    setQuantity("");
    setphno("");
  };

  const loadScript = (src) => {
    return new Promise((resovle) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resovle(true);
      };

      script.onerror = () => {
        resovle(false);
      };

      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async (price) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("You are offline... Failed to load Razorpay SDK");
      return;
    }

    const options = {
      key: "rzp_live_G32ZAvGvUcvt5J",
      currency: "INR",
      price: price * 100,
      name: "Enactus IITM",
      description: "Fall Fest",
      handler: function (response) {
        setpaymentid(response.razorpay_payment_id);
        console.log(response);
        alert("Payment Successfully");
        localStorage.setItem("paymentdone", true);
        if (total) {
          localStorage.setItem("paymentdone", false);
          console.log(localStorage.getItem("paymentdone"));
        } else {
          console.log(localStorage.getItem("paymentdone"), ": payment done");
          console.log(price);
          localStorage.getItem("paymentdone") === "true"
            ? sendData()
            : console.log("paymentnotdone");
          localStorage.setItem("paymentdone", false);
          console.log(localStorage.getItem("paymentdone"));
        }
      },
      prefill: {
        contact: localStorage.getItem("Phone"),
        email: localStorage.getItem("Email"),
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const price = total;
    console.log(price);
    displayRazorpay();
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <h1>GET YOUR TICKETS 🤳</h1>

        <label>Name</label>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Email</label>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Phone number</label>
        <input
          placeholder="Phone number"
          value={phno}
          onChange={(e) => setphno(e.target.value)}
        ></input>

        <label>Choose Ticket</label>
        <select name="ticket" onChange={handleTicketChange}>
          <option value="1">ticket 1</option>
          <option value="2">ticket 2</option>
          <option value="3">ticket 3</option>
          <option value="4">ticket 4</option>
        </select>

        <label>Choose Quantity</label>
        <input
          type="number"
          min="0"
          placeholder="0"
          id=""
          onChange={handleQuantityChange}
        />
        <h1>Total : {`${total}`} </h1>
        <button type="submit">Submit</button>
      </form>
      {/* <button>
        <Razorpay
          btnText="Buy your tickets"
          name={name}
          email={email}
          phno={phno}
          ticket={ticket}
          quantity={quantity}
          total={total}
          style={{ width: "20px" }}
        />
      </button> */}
    </>
  );
};

export default Home;
