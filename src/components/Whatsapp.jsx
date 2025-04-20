// src/components/FloatingWhatsApp.js
import React from 'react';


const Whatsapp = () => {
  return (
    <a
      href="https://wa.me/9811686905" // Replace with your number in international format e.g. 919876543210
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="Chat with us on WhatsApp"
        className="whatsapp-icon"
      />
    </a>
  );
};

export default Whatsapp;
