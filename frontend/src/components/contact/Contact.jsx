import React, { useState } from "react";
import { Phone, Mail, MapPin, Send, User, MessageSquare } from "lucide-react";
import Header from "../Header";
import Footer from "../Footer";

const bloodBankOffices = [
  {
    name: "Rotary Blood Bank",
    phone: "+91 11 2332 2442",
    email: "info@rotarybloodbank.org",
    address: "New Delhi, India – 110001",
    hours: "Mon–Sat: 8 AM – 8 PM",
    type: "Blood Bank",
  },
  {
    name: "King Edward Memorial Hospital Blood Bank",
    phone: "+91 22 2410 7000",
    email: "kemhospital@kem.edu",
    address: "Mumbai, Maharashtra – 400012",
    hours: "24 × 7",
    type: "Hospital",
  },
  {
    name: "Sankalp India Foundation",
    phone: "+91 80 2354 8512",
    email: "support@sankalpindia.net",
    address: "Bengaluru, Karnataka – 560038",
    hours: "Mon–Sun: 9 AM – 6 PM",
    type: "NGO Blood Bank",
  },
];

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      <Header />

      {/* Hero */}
      <section className="py-24 mt-10 bg-gradient-to-r from-red-600 to-red-800 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-white"></div>
        </div>
        <div className="relative z-10 max-w-2xl mx-auto px-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Phone className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-red-100">
            Need blood urgently or have a query? Reach out to any of our partner blood banks or send us a message.
          </p>
        </div>
      </section>

      {/* Blood Bank Contact Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Partner Blood Banks & Hospitals</h2>
            <p className="text-gray-500 text-lg">Contact these facilities directly for blood availability and donation appointments.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {bloodBankOffices.map((bb, i) => (
              <div key={i} className="bg-white border-2 border-red-100 rounded-2xl p-7 shadow-lg hover:shadow-xl hover:border-red-300 transition-all duration-300 group">
                <div className="w-12 h-12 bg-red-100 group-hover:bg-red-600 rounded-xl flex items-center justify-center mb-5 transition-all duration-300">
                  <MapPin className="w-6 h-6 text-red-600 group-hover:text-white transition-all duration-300" />
                </div>
                <span className="inline-block text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full mb-3">{bb.type}</span>
                <h3 className="text-lg font-bold text-gray-900 mb-4">{bb.name}</h3>
                <div className="space-y-2.5 text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <Phone className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span>{bb.phone}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Mail className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span>{bb.email}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span>{bb.address}</span>
                  </div>
                  <div className="mt-3 px-3 py-2 bg-green-50 text-green-700 rounded-lg text-xs font-semibold">
                    🕐 {bb.hours}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gradient-to-br from-red-50 to-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-14 items-start">
            {/* Left */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Send Us a Message</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Have a question about blood donation, camp organization, or platform support? Fill out the form and our team will get back to you within 24 hours.
              </p>
              <div className="space-y-5">
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-red-100">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">Emergency Helpline</p>
                    <p className="text-gray-600 text-sm">+91 98765 43210</p>
                    <p className="text-green-600 text-xs font-medium">Available 24/7</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-red-100">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">Email Support</p>
                    <p className="text-gray-600 text-sm">support@bloodconnect.org</p>
                    <p className="text-gray-500 text-xs">Response within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-red-100">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">Head Office</p>
                    <p className="text-gray-600 text-sm">Navi Mumbai, Maharashtra</p>
                    <p className="text-gray-500 text-xs">India – 410206</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl shadow-xl border border-red-100 p-8">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name <span className="text-red-500">*</span></label>
                    <div className="flex items-center border border-gray-200 bg-gray-50 focus-within:bg-white focus-within:border-red-400 rounded-xl transition">
                      <User className="ml-3 w-4 h-4 text-red-400 flex-shrink-0" />
                      <input name="name" type="text" required placeholder="Enter your name" value={form.name} onChange={handleChange} className="w-full px-3 py-3 bg-transparent outline-none text-sm text-gray-800" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address <span className="text-red-500">*</span></label>
                    <div className="flex items-center border border-gray-200 bg-gray-50 focus-within:bg-white focus-within:border-red-400 rounded-xl transition">
                      <Mail className="ml-3 w-4 h-4 text-red-400 flex-shrink-0" />
                      <input name="email" type="email" required placeholder="Enter your email" value={form.email} onChange={handleChange} className="w-full px-3 py-3 bg-transparent outline-none text-sm text-gray-800" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
                    <div className="flex items-center border border-gray-200 bg-gray-50 focus-within:bg-white focus-within:border-red-400 rounded-xl transition">
                      <Phone className="ml-3 w-4 h-4 text-red-400 flex-shrink-0" />
                      <input name="phone" type="tel" placeholder="Your phone number" value={form.phone} onChange={handleChange} className="w-full px-3 py-3 bg-transparent outline-none text-sm text-gray-800" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Subject <span className="text-red-500">*</span></label>
                    <div className="flex items-center border border-gray-200 bg-gray-50 focus-within:bg-white focus-within:border-red-400 rounded-xl transition">
                      <MessageSquare className="ml-3 w-4 h-4 text-red-400 flex-shrink-0" />
                      <input name="subject" type="text" required placeholder="What is this regarding?" value={form.subject} onChange={handleChange} className="w-full px-3 py-3 bg-transparent outline-none text-sm text-gray-800" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Message <span className="text-red-500">*</span></label>
                    <textarea name="message" required rows={4} placeholder="Write your message here..." value={form.message} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 bg-gray-50 focus:bg-white focus:border-red-400 rounded-xl outline-none text-sm text-gray-800 transition resize-none" />
                  </div>
                  <button type="submit" className="w-full py-3.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold hover:from-red-700 hover:to-red-800 transition-all shadow-lg flex items-center justify-center gap-2 text-sm">
                    <Send className="w-4 h-4" /> Send Message
                  </button>
                </form>
              ) : (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">✅</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Message Sent!</h3>
                  <p className="text-gray-500 text-sm">Thank you, {form.name}! We'll respond to {form.email} within 24 hours.</p>
                  <button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }} className="mt-6 px-6 py-2.5 bg-red-600 text-white rounded-xl text-sm font-semibold hover:bg-red-700 transition">
                    Send Another
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
