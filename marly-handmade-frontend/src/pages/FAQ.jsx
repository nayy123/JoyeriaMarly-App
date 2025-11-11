import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function FAQ() {
  const faqs = [
    {
      question: "How can I track my order?",
      answer:
        "Once your order is shipped, we will send you a tracking number via email. You can use it to track your package online.",
    },
    {
      question: "What is the return and exchange policy?",
      answer:
        "MARLY Jewelry allows exchanges and repairs within 7 days of delivery for items with defects. Personalized or used items cannot be exchanged.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Yes! We ship worldwide. Shipping times and fees vary depending on the destination country.",
    },
    {
      question: "How do I care for my jewelry?",
      answer:
        "Avoid contact with perfumes, water, detergents, and direct sunlight. Store your pieces in a soft pouch when not in use.",
    },
    {
      question: "Can I cancel my order?",
      answer:
        "Orders can be canceled within 24 hours of purchase. After that, please contact us for assistance.",
    },
  ];

  return (
    <>
      <Header />
      <h2 className="text-2xl xs:text-3xl font-bold mb-8 whitespace-nowrap text-center mt-15">
        FREQUENTLY ASKED QUESTIONS
      </h2>
      <div className="my-20 mx-auto w-[60%] font-serif space-y-4">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
      <Footer />
    </>
  );
}

// Componente de acordeón
function AccordionItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-300 rounded-md overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-4 py-3 bg-gray-100 hover:bg-gray-200 focus:outline-none"
      >
        <span className="font-semibold">{question}</span>
        <span
          className={`transform transition-transform duration-300 ${
            isOpen ? "rotate-90" : "rotate-0"
          }`}
        >
          ▶
        </span>
      </button>
      {isOpen && (
        <div className="px-4 py-3 bg-white text-gray-700">
          {answer}
        </div>
      )}
    </div>
  );
}

export default FAQ;

