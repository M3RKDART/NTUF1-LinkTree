import React, { useState, useEffect } from 'react';
import { FaInstagram, FaTiktok, FaUser, FaCalendarAlt } from 'react-icons/fa';


const F1Button = ({ children, onClick, icon: Icon }) => {
  const [isHover, setHover] = useState(false);

  const wrapperStyle = {
    position: 'relative',
    display: 'inline-block',
    margin: '20px auto',
    width: '80%',
    maxWidth: '400px',
  };

  const shadowStyle = {
    position: 'absolute',
    top: '8px',
    left: '8px',
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    clipPath: 'polygon(5% 0%, 100% 0%, 100% 85%, 97% 100%, 0% 100%)',
    borderBottomRightRadius: 30,
    zIndex: 0,
  };

  const buttonStyle = {
    background: isHover
      ? 'linear-gradient(90deg, #ec1c64, #a60032)'
      : 'linear-gradient(90deg, #a60032, #ec1c64)',
    color: '#fff',
    fontWeight: 900,
    fontSize: 20,
    padding: '14px 28px',
    textAlign: 'center',
    textTransform: 'uppercase',
    border: 'none',
    cursor: 'pointer',
    position: 'relative',
    width: '100%',
    transition: 'all 0.3s ease',
    clipPath: 'polygon(5% 0%, 100% 0%, 100% 85%, 97% 100%, 0% 100%)',
    borderBottomRightRadius: 30,
    //boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
    transform: isHover ? 'translateY(-2px)' : 'translateY(0)',
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
  };

  return (
    <div style={wrapperStyle}>
      <div style={shadowStyle}></div>
      <button
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={buttonStyle}
      >
        {Icon && <Icon size={22} color="white" />}
        {children}
      </button>
    </div>
  );
};


const App = () => {
  const [showLights, setShowLights] = useState(false);
  const [lightsOn, setLightsOn] = useState(0);
  const [destination, setDestination] = useState('');

  const handleLaunch = (url) => {
    setDestination(url);
    setShowLights(true);
    setLightsOn(0);
  };

  useEffect(() => {
    if (showLights && lightsOn < 5) {
      const interval = setTimeout(() => {
        setLightsOn((prev) => prev + 1);
      }, 300); // Time between each light
      return () => clearTimeout(interval);
    }

    if (lightsOn === 5) {
      // Wait briefly before redirecting
      const launch = setTimeout(() => {
        window.location.href = destination;
      }, 300);
      return () => clearTimeout(launch);
    }
  }, [showLights, lightsOn, destination]);

  return (
    <>
        <style>
        {`
            @keyframes fadeInOverlay {
            from { opacity: 0; }
            to { opacity: 1; }
            }
        `}
        </style>

      {/* F1 Light Start Animation */}
    {showLights && (
    <div
        style={{
        position: 'fixed',
        inset: 0,
        backdropFilter: 'blur(8px)',
        backgroundColor: 'rgba(0,0,0,0.4)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        opacity: 1,
        animation: 'fadeInOverlay 0.3s ease forwards',
        }}
    >

          <div style={{ display: 'flex', gap: '20px' }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: i < lightsOn ? 'red' : '#222',
                  boxShadow: i < lightsOn ? '0 0 12px red' : 'inset 0 0 4px #111',
                  transition: 'background-color 0.2s ease',
                }}
              ></div>
            ))}
          </div>
        </div>
      )}

      {/* Main Page */}
      <div
        style={{
          position: 'absolute',
          top: 'env(safe-area-inset-top, 0)',
          left: 0,
          right: 0,
          bottom: 'env(safe-area-inset-bottom, 0)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          backgroundImage: 'url("/ntu_f1_car_image.png")',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundColor: '#000',
          overflow: 'hidden',
          textAlign: 'center',
        }}
      >
        <img
          src="/image_1.png"
          alt="NTU F1 Logo"
          style={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            objectFit: 'cover',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            marginBottom: 20,
          }}
        />
        <F1Button icon={FaCalendarAlt} onClick={() => handleLaunch('https://www.trentstudents.org/events?event_type=&search=NTUF1')}>Events</F1Button>
        <F1Button icon={FaInstagram} onClick={() => handleLaunch('https://www.instagram.com/ntuf1society/')}>Instagram</F1Button>
        <F1Button icon={FaUser} onClick={() => handleLaunch('https://www.trentstudents.org/groups/formula-one/join')}>Become a Member</F1Button>
        <F1Button icon={FaTiktok} onClick={() => handleLaunch('https://www.tiktok.com/@trentf1soc?_t=ZN-8y6EsRpVM5m&_r=1')}>TikTok</F1Button>
      </div>
    </>
  );
};

export default App;
