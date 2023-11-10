import React from 'react';
import { BsLinkedin, BsInstagram, BsGithub } from 'react-icons/bs';
import { FaWhatsapp } from 'react-icons/fa';

const SocialMedia = () => (
  <div className="app__social">
    <div>
      <a href="https://www.linkedin.com/in/digvijay-h-j/" target="_blank" rel="noopener noreferrer">
        <BsLinkedin />
      </a>
    </div>
    <div>
      <a href="https://github.com/Digvijayhj/" target="_blank" rel="noopener noreferrer">
        <BsGithub />
      </a>
    </div>
    <div>
      <a href="https://wa.link/vl2zx0" target="_blank" rel="noopener noreferrer">
        <FaWhatsapp />
      </a>
    </div>
    <div>
      <a href="https://www.instagram.com/digvijayhj/" target="_blank" rel="noopener noreferrer">
        <BsInstagram />
      </a>
    </div>
  </div>
);

export default SocialMedia;
