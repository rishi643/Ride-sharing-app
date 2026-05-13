import React from "react";

const Contact = () => {
  const contactDetails = [
    {
      icon: "📞",
      label: "Phone",
      value: ["9234576399", "6624536600"],
    },
    {
      icon: "✉️",
      label: "Email",
      value: ["ridety@gmail.com", "taxio@gmail.com"],
    },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Contact Us</h1>
        <div className="space-y-6">
          {contactDetails.map((detail, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 border-b pb-4 last:border-b-0"
            >
              <div className="text-2xl">{detail.icon}</div>
              <div>
                <h2 className="text-lg font-semibold text-gray-700">{detail.label}</h2>
                {detail.value.map((item, idx) => (
                  <p
                    key={idx}
                    className="text-gray-600 text-sm hover:text-blue-500 cursor-pointer"
                  >
                    {detail.label === "Email" ? (
                      <a href={`mailto:${item}`}>{item}</a>
                    ) : (
                      <a href={`tel:${item}`}>{item}</a>
                    )}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;


