import React, { useState } from "react";
import "./Razorpay.css";
const Razorpay = ({ btnText, name, email, phno, ticket, quantity, total }) => {
  {
    console.log("razorpay");
  }

  const price = total;
  const [paymentid, setpaymentid] = useState();
  console.log(price);
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

  const displayRazorpay = async (amount) => {
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
      amount: amount * 100,
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

  return (
    <div>
      <button className="razorpaycss" onClick={() => displayRazorpay(price)}>
        {btnText}
      </button>
    </div>
  );
};

export default Razorpay;
