import { assets } from "@/assets/assets";
import Image from "next/image";
import React, { useState } from "react";
import Swal from "sweetalert2";

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();

    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to send this message?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, send it!",
      cancelButtonText: "Cancel",
    });

    if (!confirmResult.isConfirmed) {
      return; // Cancel submission
    }

    setLoading(true);

    Swal.fire({
      title: "Sending...",
      text: "Please wait while we submit your message.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const formData = new FormData(event.target);
    formData.append("access_key", "3e2b10cc-94ef-4ce2-b2eb-e28636d3d2ca");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setLoading(false);
      Swal.close();

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Message Sent!",
          text: "Thank you for reaching out. I'll get back to you soon.",
          confirmButtonColor: "#000",
        });
        event.target.reset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: data.message || "Something went wrong. Please try again later.",
          confirmButtonColor: "#000",
        });
      }
    } catch (error) {
      setLoading(false);
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Network error. Please try again later.",
        confirmButtonColor: "#000",
      });
    }
  };

  return (
    <div
      id="contact"
      className='w-full px-[12%] py-10 scroll-mt-20 bg-[url("/footer-bg-color.png")] bg-no-repeat bg-center bg-[length:90%_auto]'
    >
      <h4 className="text-center mb-2 text-lg font-Ovo">Connect With Me</h4>
      <h2 className="text-center text-5xl font-Ovo">Get in Touch</h2>
      <p className="text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo">
        I'd Love to hear from you! If you have any questions, comments or
        feedback, please use the form below.
      </p>

      <form onSubmit={onSubmit} className="max-w-2xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 mb-8">
          <input
            type="text"
            placeholder="Enter Your Name"
            required
            className="flex-1 p-3 outline-none border-[0.5px] border-gray-400 rounded-md bg-white"
            name="name"
          />
          <input
            type="email"
            placeholder="Enter Your Email"
            required
            className="flex-1 p-3 outline-none border-[0.5px] border-gray-400 rounded-md bg-white"
            name="email"
          />
        </div>
        <textarea
          rows="6"
          placeholder="Enter Your Message"
          required
          className="w-full p-4 outline-none border-[0.5px] border-gray-400 rounded-md bg-white mb-6"
          name="message"
        ></textarea>

        <button
          type="submit"
          disabled={loading}
          className={`py-3 px-8 w-max flex items-center justify-between gap-2 ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-black/70 hover:bg-black"
          } text-white rounded-full mx-auto duration-500`}
        >
          {loading ? "Sending..." : "Submit Now"}{" "}
          {!loading && (
            <Image
              src={assets.right_arrow_white}
              alt="submit"
              className="w-4"
            />
          )}
        </button>
      </form>
    </div>
  );
};

export default Contact;
