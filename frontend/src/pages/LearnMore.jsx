import {
  Heart,
  Users,
  MapPin,
  Clock,
  Droplets,
  Shield,
  CheckCircle,
  ArrowRight,
  Activity,
  AlertTriangle,
  Stethoscope,
  RefreshCw,
  Building2,
  FlaskConical,
  UserCheck,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const LearnMore = () => {
  const statsExplained = [
    {
      icon: Users,
      value: "10,000+",
      label: "Lives Saved",
      color: "red",
      explanation:
        "This figure represents the cumulative count of patients who received timely blood transfusions through our platform across all partner hospitals. Each life saved corresponds to a critical emergency — surgeries, accident victims, cancer patients — where the system successfully matched a blood request with available stock within the golden response window.",
      howCalculated:
        "Tracked via fulfilled BloodRequest records where hospital status transitions to 'Accepted' and blood units are dispatched. Each unit fulfillment for a critical patient case is logged as a life-saving event.",
    },
    {
      icon: Heart,
      value: "50,000+",
      label: "Blood Units Managed",
      color: "pink",
      explanation:
        "Over 50,000 individual blood units have been recorded, tracked, and distributed through the system. This includes whole blood, packed red blood cells, platelets, and plasma across all 8 blood types (A+, A−, B+, B−, O+, O−, AB+, AB−) from all registered blood laboratories.",
      howCalculated:
        "Aggregated from the Blood inventory collection — each document represents one unit with its blood group, quantity, expiration date, and source lab. The total is the sum of all unit quantities ever entered into the system.",
    },
    {
      icon: MapPin,
      value: "150+",
      label: "Partner Hospitals & Labs",
      color: "blue",
      explanation:
        "150+ verified medical facilities — hospitals and blood laboratories — are registered and active on the platform. Each facility undergoes an admin verification process where registration documents and licensing proofs are reviewed before they can participate in blood requests and donations.",
      howCalculated:
        "Derived from the Facility collection filtered by status: 'approved'. Includes both hospital-type and blood-lab-type facilities that have completed the admin document verification workflow.",
    },
    {
      icon: Clock,
      value: "< 30 min",
      label: "Average Response Time",
      color: "green",
      explanation:
        "Emergency blood requests placed by hospitals are typically acknowledged and responded to by blood labs within 30 minutes. This is made possible by the real-time notification system and direct hospital-to-lab request pipeline that instantly alerts labs when a request is submitted.",
      howCalculated:
        "Measured as the average time delta between BloodRequest 'createdAt' timestamp and the lab's 'Accepted'/'Rejected' response timestamp across all fulfilled requests in the system.",
    },
  ];

  const howItWorksDetailed = [
    {
      step: "1",
      icon: UserCheck,
      title: "Register & Get Verified",
      description:
        "Donors register with basic health info — blood group, age, weight, medical history. Hospitals and Blood Labs submit registration documents for admin verification. Once approved, they gain full access to the platform.",
      details: [
        "Donors need age 17-75, weight ≥ 50 kg, no recent illness",
        "Facilities submit licensing proofs and registration numbers",
        "Admin reviews and approves/rejects within 24-48 hours",
        "JWT-secured accounts issued on approval",
      ],
    },
    {
      step: "2",
      icon: Droplets,
      title: "Blood Inventory & Matching",
      description:
        "Blood labs maintain real-time inventory of all 8 blood types with quantity and expiration tracking. The system automatically surfaces compatible donors and available stock when a hospital places a request.",
      details: [
        "Each blood unit tracked with type, quantity, and expiry date",
        "Hospitals can view donor directory filtered by city and blood group",
        "Labs update stock in real-time after donations",
        "Expiration alerts prevent use of outdated units",
      ],
    },
    {
      step: "3",
      icon: Zap,
      title: "Emergency Request Pipeline",
      description:
        "When a hospital faces an emergency, they submit an instant blood request specifying type, units needed, and urgency. The system notifies relevant blood labs who then accept or reject with real-time status updates back to the hospital.",
      details: [
        "Hospital selects blood type, units required, and target lab",
        "Request status: Pending → Accepted / Rejected",
        "Hospitals track all submitted requests in real-time",
        "Average response turnaround: under 30 minutes",
      ],
    },
    {
      step: "4",
      icon: Heart,
      title: "Donation Camps & 90-Day Safety",
      description:
        "Blood donation camps are organized by hospitals and labs where donors sign up and participate. The system enforces a strict 90-day cooldown between donations per medical guidelines, automatically tracking each donor's last donation timestamp.",
      details: [
        "Camps posted with venue, date, time, and capacity",
        "Donors browse and register for nearby camps",
        "90-day cooldown auto-calculated — prevents unsafe re-donation",
        "Donation history stored permanently for each donor",
      ],
    },
  ];

  const rolesExplained = [
    {
      icon: Shield,
      role: "System Administrator",
      path: "/admin",
      color: "purple",
      description:
        "The backbone of trust in the system. Admins review and approve all facility registrations, ensuring only legitimate hospitals and blood labs operate on the platform. They also have access to global analytics and audit trails.",
      capabilities: [
        "Approve/reject hospital & lab registrations with custom reasons",
        "View all registered donors across the network",
        "Monitor all active facilities and their status",
        "Access system-wide activity logs",
      ],
    },
    {
      icon: Building2,
      role: "Hospital",
      path: "/hospital",
      color: "blue",
      description:
        "Hospitals manage their internal blood inventory, send emergency blood requests to labs, organize donation camps, and search the donor directory when they need specific blood types quickly.",
      capabilities: [
        "Monitor blood stock across all 8 blood groups in real-time",
        "Send emergency blood requests directly to blood labs",
        "Track request status: Pending, Accepted, or Rejected",
        "Search donors by city and blood group",
        "Host blood donation camps for the community",
      ],
    },
    {
      icon: FlaskConical,
      role: "Blood Laboratory",
      path: "/lab",
      color: "green",
      description:
        "Blood labs are the supply side of the ecosystem. They receive hospital requests, manage their blood unit inventory, track expiration dates, and record actual donor turnouts at donation camps.",
      capabilities: [
        "Add and manage blood unit stock with expiry tracking",
        "Receive and respond to hospital blood requests",
        "Accept or reject requests based on stock availability",
        "Manage donation camp operations and donor records",
      ],
    },
    {
      icon: Heart,
      role: "Donor",
      path: "/donor",
      color: "red",
      description:
        "Donors are the lifeblood of the system. They maintain their health profile, check eligibility, view donation history, and discover nearby donation camps — all within a personal dashboard.",
      capabilities: [
        "Complete donor profile with medical stats and ID proof",
        "Automatic 90-day eligibility countdown checker",
        "Full personal donation history with facility records",
        "Browse and register for nearby blood donation camps",
      ],
    },
  ];

  const colorMap = {
    red: { bg: "bg-red-100", text: "text-red-600", border: "border-red-500", badge: "bg-red-50 text-red-700" },
    pink: { bg: "bg-pink-100", text: "text-pink-600", border: "border-pink-500", badge: "bg-pink-50 text-pink-700" },
    blue: { bg: "bg-blue-100", text: "text-blue-600", border: "border-blue-500", badge: "bg-blue-50 text-blue-700" },
    green: { bg: "bg-green-100", text: "text-green-600", border: "border-green-500", badge: "bg-green-50 text-green-700" },
    purple: { bg: "bg-purple-100", text: "text-purple-600", border: "border-purple-500", badge: "bg-purple-50 text-purple-700" },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-red-50 mt-10">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-r from-red-700 to-red-900 text-white py-20">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium mb-6 backdrop-blur-sm">
            <Droplets className="w-4 h-4" />
            Platform Deep Dive
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            How Smart BBMS{" "}
            <span className="bg-gradient-to-r from-red-200 to-red-300 bg-clip-text text-transparent">
              Works
            </span>
          </h1>
          <p className="text-lg text-red-100 max-w-2xl mx-auto mb-8">
            Everything you need to know — from the numbers behind our impact stats to how each
            role, feature, and workflow operates under the hood.
          </p>
          <Link to="/login">
            <button className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium rounded-xl bg-white text-red-700 hover:bg-red-50 transition-all duration-300 shadow-lg hover:shadow-xl">
              Get Started <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </Link>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-16" viewBox="0 0 1200 150" preserveAspectRatio="none">
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V150H0V90.83C36.67,85.19,76.33,76,112,69.33C160.67,59.67,224.67,47.33,321.39,56.44Z"
              className="fill-slate-50"
            ></path>
          </svg>
        </div>
      </section>

      {/* Stats Explained */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Behind the Numbers
            </h2>
            <p className="text-lg text-slate-600">
              Every stat on our homepage is grounded in real system data. Here's exactly what each figure means and how it's calculated.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {statsExplained.map((stat, index) => {
              const Icon = stat.icon;
              const colors = colorMap[stat.color];
              return (
                <div
                  key={index}
                  className={`bg-white rounded-2xl shadow-lg p-8 border-l-4 ${colors.border} hover:shadow-xl transition-all duration-300`}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-14 h-14 rounded-full ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-7 h-7 ${colors.text}`} />
                    </div>
                    <div>
                      <div className={`text-3xl font-bold ${colors.text}`}>{stat.value}</div>
                      <div className="text-slate-700 font-semibold text-lg">{stat.label}</div>
                    </div>
                  </div>

                  <p className="text-slate-600 mb-5 leading-relaxed">{stat.explanation}</p>

                  <div className={`rounded-xl p-4 ${colors.badge.split(' ')[0]} border border-current/10`}>
                    <p className={`text-sm font-semibold mb-1 ${colors.text}`}>📊 How It's Calculated</p>
                    <p className={`text-sm ${colors.badge.split(' ')[1]}`}>{stat.howCalculated}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works — Detailed */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              The 4-Step Workflow — In Detail
            </h2>
            <p className="text-lg text-slate-600">
              A complete walkthrough of how the platform operates from registration to donation.
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-8">
            {howItWorksDetailed.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border-t-4 border-red-500"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex items-start gap-4 flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center text-xl font-bold flex-shrink-0">
                        {step.step}
                      </div>
                      <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-red-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-800 mb-3">{step.title}</h3>
                      <p className="text-slate-600 mb-5 leading-relaxed">{step.description}</p>
                      <ul className="grid sm:grid-cols-2 gap-2">
                        {step.details.map((detail, i) => (
                          <li key={i} className="flex items-start gap-2 text-slate-600 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Roles Explained */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              The Four Roles in the Ecosystem
            </h2>
            <p className="text-lg text-slate-600">
              Each role has a distinct dashboard, permissions, and responsibilities within the platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {rolesExplained.map((role, index) => {
              const Icon = role.icon;
              const colors = colorMap[role.color];
              return (
                <div
                  key={index}
                  className={`bg-slate-50 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border-t-4 ${colors.border}`}
                >
                  <div className="flex items-center gap-4 mb-5">
                    <div className={`w-12 h-12 rounded-full ${colors.bg} flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">{role.role}</h3>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${colors.bg} ${colors.text}`}>
                        Dashboard: {role.path}
                      </span>
                    </div>
                  </div>
                  <p className="text-slate-600 mb-5 leading-relaxed">{role.description}</p>
                  <ul className="space-y-2">
                    {role.capabilities.map((cap, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-600 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tech Stack Quick View */}
      <section className="py-16 bg-gradient-to-br from-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Built With Modern Technology</h2>
            <p className="text-slate-300">
              A full-stack MERN application designed for reliability and scalability.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { label: "Frontend", tech: "React 19 + Vite 7", icon: "⚛️" },
              { label: "Backend", tech: "Node.js + Express 5", icon: "🟢" },
              { label: "Database", tech: "MongoDB Atlas", icon: "🍃" },
              { label: "Auth", tech: "JWT + bcryptjs", icon: "🔐" },
              { label: "Styling", tech: "Tailwind CSS v4", icon: "🎨" },
              { label: "Routing", tech: "React Router v7", icon: "🛤️" },
              { label: "API Docs", tech: "Swagger / OpenAPI", icon: "📖" },
              { label: "Deploy", tech: "Vercel + Docker", icon: "🚀" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm hover:bg-white/15 transition-all duration-300"
              >
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">{item.label}</div>
                <div className="text-white text-sm font-semibold">{item.tech}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-red-700 to-red-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Be Part of It?</h2>
          <p className="text-red-100 mb-8 max-w-xl mx-auto">
            Register as a donor, hospital, or blood lab and start making a difference today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <button className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium rounded-xl bg-white text-red-700 hover:bg-red-50 transition-all duration-300 shadow-lg">
                Get Started <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </Link>
            <Link to="/">
              <button className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium rounded-xl border-2 border-white text-white hover:bg-white/10 transition-all duration-300">
                Back to Home
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LearnMore;
