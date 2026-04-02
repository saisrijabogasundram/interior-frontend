import React, { useState } from 'react';
import axios from 'axios';

const SMSOTPVerification = ({ phone, onVerified }) => {
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const sendOTP = async () => {
    setLoading(true);
    setError('');
    setMessage('');
    try {
      await axios.post('/api/users/send-otp/', { phone_number: phone });
      setOtpSent(true);
      setMessage(`OTP sent to ${phone}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send OTP.');
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    setLoading(true);
    setError('');
    try {
      await axios.post('/api/users/verify-otp/', { phone_number: phone, otp });
      setMessage('Phone verified successfully!');
      onVerified();
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid or expired OTP.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="otp-container">
      {!otpSent ? (
        <div>
          <p>Sending OTP to: <strong>{phone}</strong></p>
          <button onClick={sendOTP} disabled={loading}>
            {loading ? 'Sending...' : 'Send OTP'}
          </button>
        </div>
      ) : (
        <div>
          {message && <p className="success-text">{message}</p>}
          <input
            type="text"
            placeholder="Enter 6-digit OTP"
            value={otp}
            maxLength={6}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} // numbers only
          />
          <button onClick={verifyOTP} disabled={loading || otp.length !== 6}>
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
          <button onClick={sendOTP} disabled={loading}>
            Resend OTP
          </button>
        </div>
      )}
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default SMSOTPVerification;