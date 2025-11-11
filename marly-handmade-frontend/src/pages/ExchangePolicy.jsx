import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ConditionsComponet from "../components/ConditionsComponet";

function ExchangePolicy() {
  let conditions = [
    [
      "MARLY Jewelry offers exchanges and repairs to ensure customer satisfaction with our handcrafted jewelry.",
      "Requests for exchanges or repairs must be made within 7 days of receiving the product.",
      "Items that have been used, damaged, or personalized cannot be exchanged or repaired.",
    ],
    [
      "To initiate an exchange or repair, contact our customer service at contactmarly@gmail.com with your order number and a brief description of the issue.",
      "Our team will provide instructions for returning the item safely and for receiving your replacement or repaired jewelry.",
    ],
    [
      "Shipping costs for exchanges or repairs may be covered by MARLY Jewelry if the item is defective or damaged.",
      "For non-defective exchanges, the client is responsible for return shipping.",
    ],
  ];

  return (
    <>
      <Header />
      <h2 className="text-2xl xs:text-3xl font-bold mb-8 whitespace-nowrap text-center mt-15">
        EXCHANGE & REPAIR POLICY
      </h2>
      <div className="my-20 mx-auto w-[60%]">
        <p>
          MARLY Jewelry strives to ensure every piece reaches you in perfect condition. 
          Our Exchange & Repair Policy allows you to request replacements or repairs 
          if your order does not meet your expectations or has manufacturing defects.
        </p>
        <ConditionsComponet titulo="Exchanges and Repairs" subtitulos={conditions[0]} />
        <ConditionsComponet titulo="How to Request" subtitulos={conditions[1]} />
        <ConditionsComponet titulo="Shipping and Costs" subtitulos={conditions[2]} />
      </div>
      <Footer />
    </>
  );
}

export default ExchangePolicy;
