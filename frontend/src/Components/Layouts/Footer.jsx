import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <div className="container text-center">
        <p>&copy; {new Date().getFullYear()} ARRoCART. All Rights Reserved.</p>
        <div>
          <a href="/facebook" className="text-light me-3">
            <FaFacebook size={24} />
          </a>
          <a href="/twitter" className="text-light me-3">
            <FaTwitter size={24} />
          </a>
          <a href="/instagram" className="text-light">
            <FaInstagram size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
