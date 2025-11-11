import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ConditionsComponet from "../components/ConditionsComponet";

function Returns() {
  const sections = [
    [
      "MARLY Handmade Jewelry allows returns and exchanges within 7 days of delivery for defective items or shipping errors.",
      "Products that have been used, damaged, or personalized cannot be returned or exchanged.",
      "To request a return, contact us at contactmarly@gmail.com with your order number and details of the issue.",
    ],
    [
      "For exchanges, you can select another product of equal value, subject to availability.",
      "If the replacement item is more expensive, the difference must be paid. If it is cheaper, no refund is provided for the difference.",
    ],
    [
      "MARLY Jewelry offers repair services for damaged or defective pieces.",
      "Repairs may take 7-14 business days depending on the complexity of the work.",
      "Return shipping costs for defective items are covered by MARLY; for non-defective items, the client is responsible for shipping.",
    ],
    [
      "All requests for returns, exchanges, or repairs must be accompanied by the original receipt or invoice.",
      "Items should be returned in their original packaging whenever possible to avoid further damage.",
    ],
  ];

  return (
    <>
      <Header />
      <h2 className="text-2xl xs:text-3xl font-bold mb-8 whitespace-nowrap text-center mt-15">
        RETURNS, EXCHANGES & REPAIRS
      </h2>
      <div className="my-20 mx-auto w-[60%] font-serif">
        <p className="mb-8">
          At MARLY Handmade Jewelry, we aim to ensure every customer is satisfied with their purchase. 
          This policy explains how to return, exchange, or repair your jewelry safely and efficiently.
        </p>
        <ConditionsComponet titulo="Returns" subtitulos={sections[0]} />
        <ConditionsComponet titulo="Exchanges" subtitulos={sections[1]} />
        <ConditionsComponet titulo="Repairs" subtitulos={sections[2]} />
        <ConditionsComponet titulo="Requirements" subtitulos={sections[3]} />
      </div>
      <Footer />
    </>
  );
}

export default Returns;
