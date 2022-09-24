import React, { useState, useEffect } from "react";
import "./Home.css";
import { fs } from "../config/config";
import Razorpay from "./Razorpay";

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

  let total = ticket * quantity;
  const cart = fs.collection("contacts");

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("Phone",phno)
    localStorage.setItem("Email",email)
    cart
      .doc(`${name} ${phno}`)
      .set({
        name: name,
        email: email,
        phone_number: phno,
        ticket: ticket,
      })
      .then(() => {
        alert("Your message has been submitted👍");
        {
          console.log("here");
        }
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
      <button>
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
      </button>
    </>
  );
};

export default Home;
