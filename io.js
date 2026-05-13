import React from "react";

const Payment = () => {
  const handlePayment = async () => {
    const orderData = await fetch(import.meta.env.dbserver, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: 500 }), // Amount in smallest currency unit 
    }).then((res) => res.json());

    const options = {
      key:import.meta.env.VITE_RAZOR_KEY, // Replace with your Razorpay API key
      amount: orderData.amount,
      currency: orderData.currency,
      name: "Ride Sharing App",
      description: "Payment for Ride",
      order_id: orderData.id,
      handler: function (response) {
        alert("Payment successful!");
        console.log(response);
      },
      prefill: {
        name: "John Doe",
        email: "johndoe@example.com",
        contact: "9234576399",
      },
      theme: {
        color: "#4F46E5", // Tailwind Indigo
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Ride Payment</h1>
      <button
        onClick={handlePayment}
        className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300"
      >
        Pay ₹200.00
      </button>
    </div>
  );
};

export default Payment;
