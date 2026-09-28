import {
  ArrowRight,
  Heart,
  Users,
  MapPin,
  Clock,
  Droplets,
  Shield,
  Zap,
  Search,
  Bell,
  Calendar,
  FileText,
  Award,
  CheckCircle,
  Target,
  Activity,
  RefreshCw,
  AlertTriangle,
  Stethoscope,
} from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const LandingPage = () => {
  const stats = [
    { icon: Users, label: "Lives Saved", value: "10,000+" },
    { icon: Heart, label: "Blood Units", value: "50,000+" },
    { icon: MapPin, label: "Partner Hospitals", value: "150+" },
    { icon: Clock, label: "Response Time", value: "< 30min" },
  ];

  const features = [
    {
      icon: Users,
      title: "Easy Donor Registration",
      description:
        "Simple and secure donor registration process with medical history tracking and eligibility verification.",
    },
    {
      icon: Droplets,
      title: "Real-time Inventory Tracking",
      description:
        "Monitor blood inventory levels, expiration dates, and distribution in real-time across all partner facilities.",
    },
    {
      icon: Zap,
      title: "Quick Response",
      description:
        "Emergency request system with automated matching and notification to ensure rapid response in critical situations.",
    },
  ];

  const processSteps = [
    {
      step: "01",
      icon: FileText,
      title: "Register & Screen",
      description: "Complete simple registration and health screening process",
    },
    {
      step: "02",
      icon: Search,
      title: "Find Match",
      description: "Our system matches blood needs with compatible donors",
    },
    {
      step: "03",
      icon: Bell,
      title: "Get Notified",
      description: "Receive instant alerts for urgent needs in your area",
    },
    {
      step: "04",
      icon: Droplets,
      title: "Donate & Save Lives",
      description: "Visit approved centers and make your life-saving donation",
    },
  ];

  const bloodTypes = [
    { type: "A+", need: "High", donors: "32%" },
    { type: "A-", need: "Critical", donors: "8%" },
    { type: "B+", need: "Medium", donors: "12%" },
    { type: "B-", need: "High", donors: "3%" },
    { type: "O+", need: "High", donors: "35%" },
    { type: "O-", need: "Critical", donors: "5%" },
    { type: "AB+", need: "Low", donors: "4%" },
    { type: "AB-", need: "Medium", donors: "1%" },
  ];

  const donationFacts = [
    {
      icon: Heart,
      title: "One Donation, Multiple Lives",
      description:
        "A single blood donation can save up to 3 lives. Your one hour can give someone a lifetime.",
      stat: "3 Lives Saved",
    },
    {
      icon: RefreshCw,
      title: "Blood Regeneration",
      description:
        "Your body replaces the blood you donate within 24-48 hours. The red blood cells are completely replaced in 4-6 weeks.",
      stat: "48 Hours",
    },
    {
      icon: Users,
      title: "Constant Need",
      description:
        "Every 2 seconds, someone needs blood. Your regular donation ensures continuous supply for emergencies.",
      stat: "Every 2 Seconds",
    },
    {
      icon: AlertTriangle,
      title: "Short Shelf Life",
      description:
        "Red blood cells last only 42 days, platelets just 5 days. Regular donations are essential to maintain supply.",
      stat: "42 Days Shelf Life",
    },
  ];

  const eligibilityInfo = [
    {
      icon: CheckCircle,
      title: "Who Can Donate",
      items: [
        "Age 17-75 (16 with parental consent)",
        "Weight at least 110 lbs (50 kg)",
        "Good general health",
        "No flu or cold symptoms",
      ],
    },
    {
      icon: Stethoscope,
      title: "Health Benefits",
      items: [
        "Free health screening",
        "Burns 650 calories per donation",
        "Reduces risk of heart disease",
        "Stimulates blood cell production",
      ],
    },
    {
      icon: Shield,
      title: "Safety First",
      items: [
        "Sterile, disposable equipment",
        "Trained medical staff",
        "Comfortable environment",
        "Post-donation care",
      ],
    },
  ];

  const emergencyNeeds = [
    { type: "Accident Victims", units: "Up to 100 units", icon: AlertTriangle },
    { type: "Cancer Patients", units: "8 units weekly", icon: Heart },
    { type: "Surgery Patients", units: "5-10 units", icon: Stethoscope },
    { type: "Burn Victims", units: "20+ units", icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-red-950 mt-10">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-900 via-red-800 to-red-950 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-48 h-48 rounded-full bg-red-400"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-red-300"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-red-500"></div>
        </div>
        <div className="container mx-auto px-4 py-24 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-700/60 text-red-100 text-sm font-semibold mb-6 border border-red-600">
              <Heart className="w-4 h-4" />
              Saving Lives Every Day
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Connect{" "}
              <span className="text-red-300">Blood Donors</span>{" "}
              with Those in Need
            </h1>

            <p className="text-lg md:text-xl text-red-200 mb-10 max-w-2xl mx-auto leading-relaxed">
              Our advanced blood bank management system ensures efficient
              donation, storage, and distribution of blood products to save
              lives when every second counts.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <button className="inline-flex items-center justify-center px-8 py-3.5 text-lg font-bold rounded-xl bg-white text-red-800 hover:bg-red-50 transition-all duration-300 shadow-xl hover:shadow-2xl">
                  Get Started <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Gradient Fade Divider — no harsh edge */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-red-950 pointer-events-none" />
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-red-950">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="text-center p-7 rounded-2xl bg-red-900 border border-red-700 hover:border-red-400 hover:bg-red-800 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-red-700 group-hover:bg-red-500 flex items-center justify-center transition-all duration-300">
                    <Icon className="w-7 h-7 text-red-200 group-hover:text-white transition-all duration-300" />
                  </div>
                  <div className="text-3xl md:text-4xl font-extrabold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-red-300 text-sm font-semibold uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Blood Need Section */}
      <section className="py-20 bg-red-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Current Blood Needs
            </h2>
            <p className="text-lg text-red-200">
              Blood type requirements across our network. Your donation matters now more than ever.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {bloodTypes.map((blood, index) => (
              <div
                key={index}
                className="bg-red-950 rounded-xl border border-red-700 p-5 text-center hover:border-red-400 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className={`text-3xl font-extrabold mb-2 ${
                    blood.need === "Critical"
                      ? "text-red-400"
                      : blood.need === "High"
                      ? "text-orange-400"
                      : blood.need === "Medium"
                      ? "text-yellow-400"
                      : "text-green-400"
                  }`}
                >
                  {blood.type}
                </div>
                <div
                  className={`text-xs font-bold px-2 py-1 rounded-full mb-2 ${
                    blood.need === "Critical"
                      ? "bg-red-800 text-red-200"
                      : blood.need === "High"
                      ? "bg-orange-900 text-orange-200"
                      : blood.need === "Medium"
                      ? "bg-yellow-900 text-yellow-200"
                      : "bg-green-900 text-green-200"
                  }`}
                >
                  {blood.need} Need
                </div>
                <div className="text-xs text-red-400">{blood.donors} Donors</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Donate Blood Section */}
      <section className="py-20 bg-red-950">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Your Blood Donation Matters
            </h2>
            <p className="text-lg text-red-300">
              Every donation creates a ripple effect of hope and healing in our community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-7 max-w-6xl mx-auto">
            {donationFacts.map((fact, index) => {
              const Icon = fact.icon;
              return (
                <div
                  key={index}
                  className="bg-red-900 rounded-2xl border-t-4 border-red-500 p-6 text-center hover:bg-red-800 hover:shadow-2xl transition-all duration-300"
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-red-700 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-red-200" />
                  </div>
                  <h3 className="text-base font-bold mb-3 text-white">
                    {fact.title}
                  </h3>
                  <p className="text-red-300 text-sm mb-4 leading-relaxed">
                    {fact.description}
                  </p>
                  <div className="text-red-400 font-extrabold text-base border border-red-600 rounded-xl px-3 py-1">
                    {fact.stat}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Emergency Needs Section */}
      <section className="py-20 bg-gradient-to-br from-red-800 to-red-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Who Needs Your Blood?
            </h2>
            <p className="text-lg text-red-200">
              Your donation directly impacts patients in critical situations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {emergencyNeeds.map((need, index) => {
              const Icon = need.icon;
              return (
                <div
                  key={index}
                  className="bg-red-950/70 rounded-2xl p-6 text-center border border-red-700 hover:border-red-400 hover:bg-red-950 transition-all duration-300"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-red-700 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-red-200" />
                  </div>
                  <h3 className="text-base font-bold mb-2 text-white">
                    {need.type}
                  </h3>
                  <p className="text-red-300 text-sm">{need.units}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <div className="bg-red-950/60 rounded-2xl p-6 max-w-2xl mx-auto border border-red-700">
              <p className="text-lg text-white mb-2">
                <strong className="text-red-300">47% of the population</strong> is eligible to donate
                blood, but only <strong className="text-red-300">5%</strong> actually do.
              </p>
              <p className="text-red-300 text-sm">
                Your single donation can make all the difference.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section — Lines 388–425 */}
      <section className="py-20 bg-red-950">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-lg text-red-300">
              Simple steps to become a life-saver. Join thousands of donors making a difference.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-7 max-w-6xl mx-auto">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="bg-red-900 rounded-2xl border border-red-700 p-6 hover:border-red-400 hover:bg-red-800 hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-red-700 flex items-center justify-center text-red-200 font-extrabold text-lg">
                      {step.step}
                    </div>
                    {Icon && (
                      <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-red-600 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    )}
                    <h3 className="text-base font-bold mb-3 text-white">
                      {step.title}
                    </h3>
                    <p className="text-red-300 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Eligibility & Benefits Section */}
      <section className="py-20 bg-red-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Donor Eligibility & Benefits
            </h2>
            <p className="text-lg text-red-200">
              Safe, simple, and rewarding — discover the benefits of blood donation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {eligibilityInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div
                  key={index}
                  className="bg-red-950 rounded-2xl border border-red-700 p-7 hover:border-red-400 hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-12 h-12 mb-5 rounded-full bg-red-700 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-red-200" />
                  </div>
                  <h3 className="text-xl font-bold mb-5 text-white">
                    {info.title}
                  </h3>
                  <ul className="space-y-3">
                    {info.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="flex items-start gap-3 text-red-200 text-sm"
                      >
                        <CheckCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section id="about" className="py-20 bg-red-950">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose Our Blood Bank System?
            </h2>
            <p className="text-lg text-red-300">
              We provide a comprehensive platform that connects donors, hospitals, and blood banks
              to ensure efficient blood collection and distribution.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-red-900 rounded-2xl border-t-4 border-red-500 p-7 text-center hover:bg-red-800 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-red-700 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-red-200" />
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-red-300 text-sm leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-20 bg-red-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl mx-auto">
            <div className="flex-1">
              <div className="w-16 h-16 rounded-xl bg-red-700 flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-red-200" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Secure & Compliant
              </h2>
              <p className="text-red-200 mb-6 leading-relaxed">
                Our system meets all healthcare data security standards with
                end-to-end encryption and strict compliance with medical
                regulations to protect donor and patient information.
              </p>
              <ul className="space-y-3">
                {["HIPAA compliant data handling", "End-to-end encryption", "Regular security audits"].map((item, i) => (
                  <li key={i} className="flex items-center text-red-200">
                    <div className="w-2 h-2 bg-red-400 rounded-full mr-3 flex-shrink-0"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 bg-red-950 rounded-2xl p-8 border border-red-700">
              <div className="aspect-video bg-gradient-to-br from-red-800 to-red-950 rounded-xl flex items-center justify-center border border-red-700">
                <div className="text-center p-4">
                  <Shield className="w-14 h-14 text-red-400 mx-auto mb-4" />
                  <p className="text-red-200 font-bold text-lg">
                    Secure Blood Bank Management
                  </p>
                  <p className="text-red-400 text-sm mt-2">Enterprise-grade protection</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
