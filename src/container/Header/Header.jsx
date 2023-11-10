import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { AppWrap } from '../../wrapper';
import { images } from '../../constants';
import './Header.scss';

const scaleVariants = {
  whileInView: {
    scale: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 1, ease: 'easeInOut',
    },
  },
};

const bubbleVariants = {
  animate: {
    scale: [1, 1.05, 1], // Slight scaling up and down
    transition: {
      duration: 2, // Duration of one cycle
      repeat: Infinity, // Repeat indefinitely
      ease: 'easeInOut', // Smooth easing
    },
  },
};

const Header = ({ wave, triggerWave }) => {
  const para1 = "Welcome to my digital realm! I'm a passionate software developer with 3 of experience, specializing in 'Full-Stack Java'. At the crossroads of technology and innovation 🚀, I paved my path with code 💻 at Accenture. Now, I'm charting new territories 🗺️ in the vast ocean of academia.";
  const para2 = "Coding for me isn't just about algorithms and apps; it's about weaving enchantment 🪄 into every digital thread. Away from the keyboard, I embrace the art of transformation 🏋️‍♂️, crafting resilience and strength in the gym. My mantra? Never stop evolving 🌀.";
  const para3 = "Explore my journey through pixels 🖥️ and perseverance 💪. Let's unfold how I turn the ordinary into the extraordinary 🌟!";
  const fullText = [para1, para2, para3];

  const typingSpeed = 50; // milliseconds per character
  const [displayText, setDisplayText] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [typingCompleted, setTypingCompleted] = useState(false);

  const typeText = (text, paragraphIndex) => {
    let index = 0;
    const typingInterval = setInterval(() => {
      setDisplayText((prev) => {
        const newText = [...prev];
        if (newText[paragraphIndex]) {
          newText[paragraphIndex] += text.charAt(index);
        } else {
          newText[paragraphIndex] = text.charAt(index);
        }
        return newText;
      });

      index += 1;
      if (index === text.length) {
        clearInterval(typingInterval);
        setIsTyping(false);
        if (paragraphIndex === fullText.length - 1) {
          setTypingCompleted(true); // Set typingCompleted to true when last paragraph is typed
        }
      }
    }, typingSpeed);
    return null; // Added to satisfy the consistent-return rule
  };

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (typingCompleted) {
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [typingCompleted]);

  const handleVideoClick = () => {
    setShowMessage(true);
    setDisplayText([]);
    setTypingCompleted(false); // Reset typingCompleted state on video click
  };

  useEffect(() => {
    if (!isTyping && showMessage && displayText.length < fullText.length) {
      setIsTyping(true);
      typeText(fullText[displayText.length], displayText.length);
    }
  }, [displayText, isTyping, showMessage, fullText]);

  return (
    <div className="app__header app__flex">
      <motion.div
        whileInView={{ x: [-100, 0], opacity: [0, 1] }}
        transition={{ duration: 0.5 }}
        className="app__header-info"
      >
        <div className="app__header-badge" id="header">
          <div className="badge-cmp app__flex">
            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
            <span
              className={`wave-emoji ${wave ? 'wave-animation' : ''}`}
              role="img"
              aria-label="waving hand"
              onClick={triggerWave}
            >👋
            </span>
            <div style={{ marginLeft: 20 }}>
              <p className="p-text">Hi there! I&apos;m</p>
              <h1 className="head-text">Digvijay</h1>
              <p>your <strong>Digital Alchemist.</strong></p>
            </div>
          </div>

          <div className="intro-card">
            <div className="card">
              <div className="card-front">
                {!showMessage && (
                <motion.video
                  className="subject-video rhythm-beat custom-video-size"
                  onClick={handleVideoClick}
                  style={{
                    borderRadius: '50%',
                    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
                  }}
                  variants={bubbleVariants}
                  initial="animate"
                  animate="animate"
                  loop
                  autoPlay
                  muted
                >
                  <source
                    src="https://cdn.dribbble.com/uploads/48292/original/30fd1f7b63806eff4db0d4276eb1ac45.mp4?1689187515"
                    type="video/mp4"
                  />
                </motion.video>
                )}
                {showMessage && displayText.map((paragraph, index) => (
                  <React.Fragment key={index}>
                    {paragraph}
                    <br />
                    <br />
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        whileInView={{ opacity: [0, 1] }}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__header-img"
      >
        <img src={images.profile} alt="profile_bg" />
        <motion.img
          whileInView={{ scale: [0, 1] }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          src={images.circle}
          alt="profile_circle"
          className="overlay_circle"
        />
      </motion.div>

      <motion.div
        variants={scaleVariants}
        whileInView={scaleVariants.whileInView}
        className="app__header-circles"
      >
        {[images.flutter, images.redux, images.sass].map((circle, index) => (
          <div className="circle-cmp app__flex" key={`circle-${index}`}>
            <img src={circle} alt="profile_bg" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default AppWrap(Header, 'home');
