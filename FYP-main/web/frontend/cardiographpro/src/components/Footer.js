// src/components/Footer.js
'use client'; // This marks the component as a Client Component
import styles from './Footer.module.css'; // Import the CSS for the footer
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebook,
    faTwitter,
    faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import {
    faMapMarkerAlt,
    faPhone,
    faEnvelope,
} from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerTop}>
                <div className={`${styles.footerItem} ${styles.footerLarge}`}>
                    <h4>Cardiograph Pro</h4>
                    <p>
                        Monitor your heart data in real-time with our advanced
                        cardiograph tools. Our technology ensures the most
                        accurate results for effective heart monitoring.
                    </p>
                    <div className={styles.socialLinks}>
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Facebook">
                            <FontAwesomeIcon icon={faFacebook} size="lg" />
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Twitter">
                            <FontAwesomeIcon icon={faTwitter} size="lg" />
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram">
                            <FontAwesomeIcon icon={faInstagram} size="lg" />
                        </a>
                    </div>
                </div>
                <div className={styles.footerItem}>
                    <h4>Quick Links</h4>
                    <ul>
                        <li>
                            <a href="#">Home</a>
                        </li>
                        <li>
                            <a href="#">About Us</a>
                        </li>
                        <li>
                            <a href="#">Services</a>
                        </li>
                        <li>
                            <a href="#">Elements</a>
                        </li>
                        <li>
                            <a href="#">Contact Us</a>
                        </li>
                    </ul>
                </div>
                <div className={styles.footerItem}>
                    <h4>Useful Links</h4>
                    <ul>
                        <li>
                            <a href="#">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="#">Terms & Conditions</a>
                        </li>
                        <li>
                            <a href="#">Support</a>
                        </li>
                        <li>
                            <a href="#">Disclaimer</a>
                        </li>
                        <li>
                            <a href="#">FAQ</a>
                        </li>
                    </ul>
                </div>

                <div className={styles.footerItem}>
                    <h4>Contact Info</h4>
                    <div className={styles.contactItem}>
                        <FontAwesomeIcon
                            icon={faMapMarkerAlt}
                            size="lg"
                            style={{ marginRight: '1rem' }}
                        />
                        <p>3891 Ranchview Dr. Richardson, California USA</p>
                    </div>
                    <div className={styles.contactItem}>
                        <FontAwesomeIcon
                            icon={faPhone}
                            size="lg"
                            style={{ marginRight: '1rem' }}
                        />
                        <a href="#">0307-4315952</a>
                    </div>
                    <div className={styles.contactItem}>
                        <FontAwesomeIcon
                            icon={faEnvelope}
                            size="lg"
                            style={{ marginRight: '1rem' }}
                        />
                        <a
                            href="mailto:example@info.com"
                            className={styles.contactLink}>
                            example@info.com
                        </a>
                    </div>
                </div>
            </div>
            <div className={styles.footerBottom}>
                <p>Cardiograph Pro</p>
                <p>
                    &copy; {new Date().getFullYear()} Cardiograph Pro. All
                    rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
