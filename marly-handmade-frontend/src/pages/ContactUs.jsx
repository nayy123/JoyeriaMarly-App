import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Mail, Phone } from "lucide-react";

function ContactUs() {
  return (
    <>
      <Header />
      <div className="my-20 mx-auto w-[60%] text-center font-serif">
        <h2 className="text-3xl font-bold mb-8 text-[#040F2E]">CONTACT US</h2>
        <p className="text-xl mb-6 font-semibold">MARLY Handmade Jewelry</p>

        <div className="flex items-center justify-center space-x-3 mb-4">
          <Phone className="w-6 h-6 text-[#2C3E5E]" />
          <span className="text-lg text-[#2C3E5E]">+51 987 654 321</span>
        </div>

        <div className="flex items-center justify-center space-x-3 mb-4">
          <Mail className="w-6 h-6 text-[#2C3E5E]" />
          <span className="text-lg text-[#2C3E5E]">contactmarly@gmail.com</span>
        </div>

        <p className="mt-6 text-gray-500 text-sm">
          Our customer service team is available Mon – Fri, 10 AM – 6 PM.
        </p>
      </div>
      <Footer />
    </>
  );
}

export default ContactUs;
