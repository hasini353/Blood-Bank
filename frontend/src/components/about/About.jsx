import React from 'react';
import { Heart, Users, Shield, Award, Target, Droplet, Clock, MapPin } from 'lucide-react';
import Footer from '../Footer';
import Header from '../Header';

const AboutUs = () => {
  const stats = [
    { icon: Users, number: '10,000+', label: 'Lives Saved' },
    { icon: Droplet, number: '50,000+', label: 'Blood Units Managed' },
    { icon: MapPin, number: '150+', label: 'Partner Facilities' },
    { icon: Clock, number: '< 30 min', label: 'Avg Response Time' },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Compassion',
      description: 'We believe in the power of human kindness and the impact one person can make in saving lives.',
    },
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Every donation follows strict medical protocols ensuring donor safety and blood quality.',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building strong communities where people help each other in times of critical need.',
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'Committed to maintaining the highest standards in blood collection and distribution.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      <Header />

      {/* Hero Section */}
      <section className="relative py-24 mt-10 bg-gradient-to-r from-red-600 to-red-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-8 left-8 w-40 h-40 rounded-full bg-white"></div>
          <div className="absolute bottom-8 right-8 w-64 h-64 rounded-full bg-white"></div>
          <div className="absolute top-1/2 left-1/2 w-20 h-20 rounded-full bg-white"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center z-10">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-5">
            Saving Lives, One Drop at a Time
          </h1>
          <p className="text-lg md:text-xl text-red-100 max-w-3xl mx-auto leading-relaxed">
            We are a dedicated digital platform connecting blood donors with hospitals and blood banks,
            making blood donation accessible, safe, and impactful across India.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-red-50 rounded-2xl hover:bg-red-100 transition-all duration-300 group">
                <div className="bg-red-100 group-hover:bg-red-200 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300">
                  <stat.icon className="w-7 h-7 text-red-600" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-red-700 mb-1">{stat.number}</div>
                <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-red-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-semibold mb-6">
                <Heart className="w-4 h-4" /> Our Mission
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">
                No one should die waiting for blood
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                We bridge the gap between voluntary blood donors and patients in need, ensuring
                timely access to safe blood. Our platform digitizes the entire blood supply lifecycle —
                from donor registration and inventory tracking to emergency hospital requests.
              </p>
              <div className="space-y-3">
                {[
                  { icon: Clock, text: "24/7 Emergency Blood Request System" },
                  { icon: Shield, text: "100% Verified Donors & Facilities" },
                  { icon: MapPin, text: "Nationwide Network Coverage" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm border border-red-100">
                    <item.icon className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <span className="text-gray-700 text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl border border-red-100">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-semibold mb-6">
                <Target className="w-4 h-4" /> Our Vision
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">A future without blood shortages</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We envision a future where blood transfusion is a seamless, instant process — supported
                by a vast network of committed donors, technologically empowered hospitals, and
                data-driven blood laboratories working in perfect coordination.
              </p>
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl border border-red-200">
                <Award className="w-10 h-10 text-red-600 mb-3" />
                <h4 className="text-lg font-bold text-gray-900 mb-2">Quality Promise</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Every unit of blood tracked through our system goes through rigorous quality checks
                  with expiry monitoring and donor eligibility verification ensuring maximum safety for
                  both donors and recipients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              These principles guide every decision we make and define who we are as a platform.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-7">
            {values.map((value, index) => (
              <div key={index} className="text-center group p-7 bg-red-50 rounded-2xl hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-red-100">
                <div className="bg-red-100 group-hover:bg-red-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-all duration-300">
                  <value.icon className="w-8 h-8 text-red-600 group-hover:text-white transition-all duration-300" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;