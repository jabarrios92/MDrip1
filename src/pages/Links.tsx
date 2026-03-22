import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const Links = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.imageContainer}>
            <img 
              src="/Logohero.webp" 
              alt="MDrip Profile" 
              style={styles.profileImage}
              onError={(e) => {
                e.currentTarget.src = 'https://picsum.photos/seed/medical/100/100';
              }}
            />
          </div>
          <h1 style={styles.title}>MDrip</h1>
          <p style={styles.subtitle}>Premium IV Therapy in Medellín 💧</p>
        </div>

        {/* Links */}
        <div style={styles.linksContainer}>
          <motion.a 
            href="https://wa.me/573218210894" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ ...styles.linkButton, backgroundColor: '#25D366' }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg style={styles.icon} viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span style={styles.linkText}>Chat with our Medical Team</span>
          </motion.a>

          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            style={{ width: '100%' }}
          >
            <Link 
              to="/" 
              style={{ ...styles.linkButton, backgroundColor: '#004792' }}
            >
              <svg style={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
              <span style={styles.linkText}>Visit our Website</span>
            </Link>
          </motion.div>

          <motion.a 
            href="https://www.instagram.com/mdrip.med/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ ...styles.linkButton, background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)' }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg style={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            <span style={styles.linkText}>Follow us on Instagram</span>
          </motion.a>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#000000',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px 20px',
    fontFamily: '"Inter", system-ui, sans-serif',
  },
  content: {
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
  },
  header: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    marginBottom: '40px',
    textAlign: 'center' as const,
  },
  imageContainer: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    padding: '4px',
    background: 'linear-gradient(135deg, #004792, #00ffff)',
    marginBottom: '20px',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    objectFit: 'cover' as const,
    backgroundColor: '#0a0a0a',
  },
  title: {
    color: '#ffffff',
    fontSize: '28px',
    fontWeight: '700',
    margin: '0 0 8px 0',
    letterSpacing: '-0.5px',
  },
  subtitle: {
    color: '#a0a0a0',
    fontSize: '15px',
    margin: 0,
    fontWeight: '500',
  },
  linksContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
    alignItems: 'center',
  },
  linkButton: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    maxWidth: '350px',
    padding: '16px 24px',
    borderRadius: '12px',
    textDecoration: 'none',
    color: '#ffffff',
    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.4)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    position: 'relative' as const,
  },
  icon: {
    width: '24px',
    height: '24px',
    marginRight: '16px',
    flexShrink: 0,
  },
  linkText: {
    fontSize: '16px',
    fontWeight: '700',
    flex: 1,
    textAlign: 'center' as const,
    paddingRight: '40px', // Balance the icon width to center text
  }
};

export default Links;
