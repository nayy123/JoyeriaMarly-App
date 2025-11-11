import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ConditionsComponet from "../components/ConditionsComponet";

function ShippingPolicy() {
  let conditions = [
    [
      "MARLY Jewelry ensures that all orders are shipped with care and arrive safely to our clients.",
      "Shipping times may vary depending on your location and the availability of the selected products.",
      "We are not responsible for delays caused by courier services, customs, or natural events beyond our control.",
    ],
    [
      "Domestic shipments are usually delivered within 3-7 business days.",
      "International shipments may take 10-20 business days depending on customs procedures and destination country.",
      "Tracking numbers will be provided once the order is dispatched.",
    ],
    [
      "All packages are securely packaged to prevent damage during transport.",
      "MARLY Jewelry takes care to ensure fragile items, such as pearls or delicate pendants, are properly protected.",
      "In the unlikely event of damage during shipping, contact us immediately at contactmarly@gmail.com.",
    ],
    [
      "Additional shipping fees may apply for remote locations or oversized orders.",
      "Free shipping promotions are subject to terms and conditions stated at checkout.",
    ],
    [
      "Customers must provide accurate delivery information to avoid delays.",
      "MARLY Jewelry is not responsible for shipments lost or delayed due to incorrect addresses provided by the client.",
    ],
  ];

  return (
    <>
      <Header />
      <h2 className="text-2xl xs:text-3xl font-bold mb-8 whitespace-nowrap text-center mt-15">
        SHIPPING POLICY
      </h2>
      <div className="my-20 mx-auto w-[60%]">
        <p>
          MARLY Jewelry is committed to delivering your jewelry safely and on time. 
          This policy outlines how we handle shipments, delivery times, and customer responsibilities to ensure a smooth experience.
        </p>
        <ConditionsComponet titulo="A. Order Handling and Dispatch" subtitulos={conditions[0]} />
        <ConditionsComponet titulo="B. Delivery Times" subtitulos={conditions[1]} />
        <ConditionsComponet titulo="C. Packaging and Fragile Items" subtitulos={conditions[2]} />
        <ConditionsComponet titulo="D. Shipping Fees and Promotions" subtitulos={conditions[3]} />
        <ConditionsComponet titulo="E. Customer Responsibilities" subtitulos={conditions[4]} />
      </div>
      <Footer />
    </>
  );
}

export default ShippingPolicy;
