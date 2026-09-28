"use client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Phone, Lock, Heart, ArrowRight, ShieldCheck } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotMethod, setForgotMethod] = useState("email"); // "email" | "phone"
  const [forgotValue, setForgotValue] = useState("");
  const [forgotSent, setForgotSent] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const apiUrl = `${import.meta.env.VITE_API_URL || ""}/api/auth/login`;
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      let data = {};
      const contentType = res.headers.get("content-type");
      if (contentType?.includes("application/json")) {
        data = await res.json();
      } else if (!res.ok) {
        data = { message: `Server error: ${res.status}` };
      }

      if (!res.ok) {
        if (data.message?.includes("awaiting admin approval")) {
          setError("Your account is awaiting admin approval. Please wait for confirmation.");
          return;
        }
        if (data.message?.includes("rejected")) {
          setError("Your registration has been rejected by admin.");
          return;
        }
        throw new Error(data.message || "Login failed");
      }

      const role = data.user?.role || "unknown";
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", role);

      const targetPath =
        data.redirect ||
        (role === "donor"
          ? "/donor"
          : role === "hospital"
          ? "/hospital"
          : role === "blood-lab"
          ? "/lab"
          : role === "admin"
          ? "/admin"
          : "/");

      navigate(targetPath, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!forgotValue.trim()) return;
    // Simulate sending — for resume project
    setForgotSent(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-red-100">
            {/* Top banner */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 px-8 py-7 text-center">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
              <p className="text-red-100 text-sm mt-1">Sign in to your Blood Bank account</p>
            </div>

            <div className="px-8 py-8">
              {/* Error */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-5 flex items-center gap-2 text-sm">
                  <span>⚠️</span> {error}
                </div>
              )}

              {!showForgot ? (
                <>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email / Phone */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email / Phone Number
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-400" />
                        <input
                          type="text"
                          name="email"
                          placeholder="Enter email or phone number"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          disabled={loading}
                          className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition bg-gray-50 focus:bg-white disabled:opacity-50 text-sm"
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-400" />
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                          disabled={loading}
                          className="w-full pl-11 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition bg-gray-50 focus:bg-white disabled:opacity-50 text-sm"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    {/* Forgot Password link */}
                    <div className="text-right">
                      <button
                        type="button"
                        onClick={() => { setShowForgot(true); setForgotSent(false); setForgotValue(""); }}
                        className="text-sm text-red-600 font-medium hover:text-red-700 hover:underline transition"
                      >
                        Forgot Password?
                      </button>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Signing in...
                        </>
                      ) : (
                        <>Sign In <ArrowRight className="w-4 h-4" /></>
                      )}
                    </button>
                  </form>

                  <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                    <p className="text-sm text-gray-500">
                      Don't have an account?{" "}
                      <a href="/register/donor" className="text-red-600 font-semibold hover:underline">
                        Register as Donor
                      </a>
                      {" or "}
                      <a href="/register/facility" className="text-red-600 font-semibold hover:underline">
                        Register Facility
                      </a>
                    </p>
                  </div>
                </>
              ) : (
                /* Forgot Password Panel */
                <div>
                  <div className="text-center mb-6">
                    <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <ShieldCheck className="w-7 h-7 text-red-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">Reset Your Password</h2>
                    <p className="text-sm text-gray-500 mt-1">Choose how you'd like to receive your reset link</p>
                  </div>

                  {!forgotSent ? (
                    <form onSubmit={handleForgotSubmit} className="space-y-5">
                      {/* Method Selector */}
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => { setForgotMethod("email"); setForgotValue(""); }}
                          className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                            forgotMethod === "email"
                              ? "border-red-500 bg-red-50 text-red-700"
                              : "border-gray-200 text-gray-500 hover:border-red-300"
                          }`}
                        >
                          <Mail className="w-4 h-4" /> Via Email
                        </button>
                        <button
                          type="button"
                          onClick={() => { setForgotMethod("phone"); setForgotValue(""); }}
                          className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                            forgotMethod === "phone"
                              ? "border-red-500 bg-red-50 text-red-700"
                              : "border-gray-200 text-gray-500 hover:border-red-300"
                          }`}
                        >
                          <Phone className="w-4 h-4" /> Via SMS
                        </button>
                      </div>

                      {/* Input */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {forgotMethod === "email" ? "Registered Email Address" : "Registered Phone Number"}
                        </label>
                        <div className="relative">
                          {forgotMethod === "email"
                            ? <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-400" />
                            : <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-400" />
                          }
                          <input
                            type={forgotMethod === "email" ? "email" : "tel"}
                            placeholder={forgotMethod === "email" ? "Enter your email address" : "Enter your phone number"}
                            value={forgotValue}
                            onChange={(e) => setForgotValue(e.target.value)}
                            required
                            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none bg-gray-50 focus:bg-white text-sm transition"
                          />
                        </div>
                        <p className="text-xs text-gray-400 mt-2">
                          {forgotMethod === "email"
                            ? "We'll send a password reset link to this email."
                            : "We'll send a reset OTP via SMS to this number."}
                        </p>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all shadow-lg text-sm"
                      >
                        Send Reset {forgotMethod === "email" ? "Link" : "OTP"}
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowForgot(false)}
                        className="w-full py-3 border-2 border-gray-200 text-gray-600 rounded-xl font-semibold hover:border-red-300 hover:text-red-600 transition-all text-sm"
                      >
                        ← Back to Login
                      </button>
                    </form>
                  ) : (
                    <div className="text-center space-y-5">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <span className="text-3xl">✅</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">
                          {forgotMethod === "email" ? "Reset Link Sent!" : "OTP Sent!"}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {forgotMethod === "email"
                            ? `A password reset link has been sent to ${forgotValue}. Please check your inbox.`
                            : `A reset OTP has been sent to ${forgotValue} via SMS. Check your messages.`}
                        </p>
                      </div>
                      <button
                        onClick={() => setShowForgot(false)}
                        className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all shadow-lg text-sm"
                      >
                        Back to Login
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-6 mt-6 text-xs text-gray-400">
            <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-green-500" /> Secure Login</span>
            <span className="flex items-center gap-1">🔒 Encrypted</span>
            <span className="flex items-center gap-1">❤️ Trusted Platform</span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
