import React, { useState, useEffect } from 'react';
import { getAuth, RecaptchaVerifier, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { app } from './firebase'; // Import your Firebase app instance

const PhoneAuth = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [verificationId, setVerificationId] = useState(null);
    const [message, setMessage] = useState('');
    const auth = getAuth(app);

    // useEffect hook to check if auth is initialized
    useEffect(() => {
        if (!auth) {
            console.error("Firebase Auth is not initialized!");
        }
    }, [auth]);

    const generateRecaptcha = () => {
        // Check if auth and auth.settings are defined IMMEDIATELY before use
        if (!auth) {
            console.error("Firebase Auth is not initialized in generateRecaptcha.");
            return; // Don't proceed if auth is undefined
        }

        // TRY to create auth.settings if it's missing (VERY unusual)
        if (!auth.settings) {
            console.warn("auth.settings is missing!  Attempting to create it...");
            auth.settings = {}; //  This might not work, but it's worth trying for debugging
        }

        if (auth.settings) {
            auth.settings.appVerificationDisabledForTesting = true;
        } else {
            console.error("Firebase Auth settings are still not properly initialized.");
            return; // Don't proceed if auth.settings is undefined
        }

        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                console.log("Recaptca varified")
            }
        }, auth);
    }

    const handleSendOTP = async (e) => {
        e.preventDefault();
        if (phoneNumber === "") return;
        generateRecaptcha();
        let appVerifier = window.recaptchaVerifier;
        const provider = new PhoneAuthProvider(auth);
        try {
            const confirmationResult = await provider.verifyPhoneNumber(phoneNumber, appVerifier);
            setVerificationId(confirmationResult.verificationId);
            setMessage('OTP sent!');
        } catch (error) {
            setMessage(`Error sending OTP: ${error.message}`);
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        if (verificationCode === "" || verificationId === null) return;
        try {
            const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
            const userCredential = await signInWithCredential(auth, credential);
            setMessage('Successfully signed in!');
            console.log(userCredential.user)
        } catch (error) {
            setMessage(`Error verifying OTP: ${error.message}`);
        }
    };

    return (
        <div>
            <h2>Phone Authentication</h2>
            <form onSubmit={handleSendOTP}>
                <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <button type="submit">Send OTP</button>
            </form>
            <form onSubmit={handleVerifyOTP}>
                <input
                    type="text"
                    placeholder="Verification Code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                />
                <button type="submit">Verify OTP</button>
            </form>
            <div id="recaptcha-container"></div>
            {message && <p>{message}</p>}
        </div>
    );
};

export default PhoneAuth;
