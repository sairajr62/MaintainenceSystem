import React, { useState } from "react";

const ForgotPassword = () => {
  const BASE_URL = "http://localhost:5000/api/users"; // your backend base URL

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // STEP 1: send email to backend
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert("OTP sent to your email!");
        setStep(2);
      } else {
        const data = await response.json();
        alert(data.message || "Error sending OTP");
      }
    } catch (err) {
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // STEP 2: user enters OTP (we just verify on next step)
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (!otp.trim()) return alert("Please enter the OTP.");
    setStep(3);
  };

  // STEP 3: reset password using OTP
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/reset-password/${otp}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();
      if (response.ok) {
        // Save token so user stays logged in
        localStorage.setItem("token", data.token);
        alert("Password reset successful! You are now logged in.");
      } else {
        alert(data.message || "Error resetting password");
      }
    } catch (err) {
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
        Forgot Password
      </h2>

      {/* Step 1: Enter Email */}
      {step === 1 && (
        <form onSubmit={handleEmailSubmit}>
          <label className="block mb-2 font-medium text-black">Enter your email:</label>
          <input
            type="email"
            className="border p-2 w-full rounded mb-4"
            value={email}
            placeholder="Enter Your email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white py-2 w-full rounded hover:bg-blue-600"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>
      )}

      {/* Step 2: Enter OTP */}
      {step === 2 && (
        <form onSubmit={handleOtpSubmit}>
          <label className="block mb-2 font-medium">Enter OTP:</label>
          <input
            type="text"
            className="border p-2 w-full rounded mb-4"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Continue
            </button>
          </div>
        </form>
      )}

      {/* Step 3: Reset Password */}
      {step === 3 && (
        <form onSubmit={handlePasswordSubmit}>
          <label className="block mb-2 font-medium">New Password:</label>
          <input
            type="password"
            className="border p-2 w-full rounded mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label className="block mb-2 font-medium">Confirm Password:</label>
          <input
            type="password"
            className="border p-2 w-full rounded mb-4"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
