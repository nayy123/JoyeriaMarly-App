import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ConditionsComponet from "../components/ConditionsComponet";

function PrivacyPolicy() {
  let conditions = [
    [
      "At MARLY Jewelry, we value the trust of our clients and are committed to protecting their personal data.",
      "All information collected through our website or social media channels is used exclusively for order processing, customer service, and promotional purposes.",
      "We comply with Law No. 29733 (Peru) on the Protection of Personal Data, ensuring transparency and security in every transaction.",
    ],
    [
      "Personal information may include your name, contact details, purchase history, and payment information.",
      "We use this data solely for internal purposes, to improve our products and shopping experience.",
      "Sensitive payment data is processed through secure platforms and is never stored directly on our servers.",
    ],
    [
      "Users have the right to access, correct, update, or delete their personal data by contacting us at contactmarly@gmail.com.",
      "Upon request, MARLY Jewelry will delete user information, except in cases required by law (e.g., invoices or tax documentation).",
    ],
    [
      "We may send you newsletters or updates only if you have voluntarily subscribed to them.",
      "You can unsubscribe at any time by clicking the link at the bottom of our emails.",
    ],
    [
      "MARLY Jewelry guarantees that no personal data will be shared with third parties without explicit customer consent, unless legally required.",
      "In cases of collaboration with logistics or marketing partners, only essential data is shared under confidentiality agreements.",
    ],
  ];

  return (
    <>
      <Header />
      <h2 className="text-2xl xs:text-3xl font-bold mb-8 whitespace-nowrap text-center mt-15">
        PRIVACY POLICY
      </h2>
      <div className="my-20 mx-auto w-[60%]">
        <p>
          MARLY Jewelry is committed to safeguarding the privacy of all customers.
          This policy explains how we collect, use, and protect personal data during your
          shopping experience with us.
        </p>
        <ConditionsComponet titulo="A. Data Protection Commitment" subtitulos={conditions[0]} />
        <ConditionsComponet titulo="B. Information Collected" subtitulos={conditions[1]} />
        <ConditionsComponet titulo="C. User Rights" subtitulos={conditions[2]} />
        <ConditionsComponet titulo="D. Communication and Newsletters" subtitulos={conditions[3]} />
        <ConditionsComponet titulo="E. Data Sharing and Security" subtitulos={conditions[4]} />
      </div>
      <Footer />
    </>
  );
}

export default PrivacyPolicy;