"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Building2, Mail, Lock, Phone, MapPin, Clock, FlaskConical } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const FACILITY_TYPES = ["Hospital", "Blood Lab"];
const FACILITY_CATEGORIES = ["Government", "Private", "Trust", "Charity", "Other"];
const STATES = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Rajahmundry", "Tirupati", "Kakinada", "Kadapa", "Anantapur"],
  "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Pasighat", "Tawang", "Ziro"],
  "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon", "Tinsukia", "Tezpur"],
  "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia", "Darbhanga", "Bihar Sharif"],
  "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba", "Durg", "Rajnandgaon"],
  "Goa": ["Panaji", "Vasco da Gama", "Margao", "Mapusa", "Ponda"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar", "Bhavnagar", "Jamnagar", "Anand", "Junagadh"],
  "Haryana": ["Chandigarh", "Faridabad", "Gurugram", "Ambala", "Rohtak", "Hisar", "Panipat", "Sonipat"],
  "Himachal Pradesh": ["Shimla", "Dharamshala", "Solan", "Mandi", "Kullu", "Manali", "Baddi"],
  "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar", "Hazaribagh"],
  "Karnataka": ["Bengaluru", "Mysuru", "Mangalore", "Hubli", "Belgaum", "Dharwad", "Gulbarga", "Shimoga", "Tumkur"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Kollam", "Thrissur", "Palakkad", "Alappuzha", "Malappuram"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain", "Sagar", "Rewa", "Satna"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad", "Solapur", "Kolhapur", "Amravati", "Navi Mumbai"],
  "Manipur": ["Imphal", "Bishnupur", "Thoubal", "Churachandpur"],
  "Meghalaya": ["Shillong", "Tura", "Nongstoin"],
  "Mizoram": ["Aizawl", "Lunglei", "Champhai"],
  "Nagaland": ["Kohima", "Dimapur", "Mokokchung"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Brahmapur", "Sambalpur", "Puri", "Balasore"],
  "Punjab": ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer", "Bikaner", "Alwar", "Bharatpur"],
  "Sikkim": ["Gangtok", "Namchi", "Geyzing"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Erode", "Vellore", "Thoothukudi"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam", "Ramagundam", "Nalgonda"],
  "Tripura": ["Agartala", "Udaipur", "Dharmanagar"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi", "Meerut", "Allahabad", "Ghaziabad", "Noida", "Bareilly", "Aligarh", "Moradabad"],
  "Uttarakhand": ["Dehradun", "Haridwar", "Roorkee", "Haldwani", "Nainital", "Rishikesh"],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri", "Bardhaman", "Malda"],
  // Union Territories
  "Andaman & Nicobar Islands": ["Port Blair", "Diglipur", "Rangat"],
  "Chandigarh": ["Chandigarh"],
  "Dadra & Nagar Haveli and Daman & Diu": ["Daman", "Diu", "Silvassa"],
  "Delhi": ["New Delhi", "Rohini", "Dwarka", "Saket", "Karol Bagh", "Lajpat Nagar", "Janakpuri"],
  "Jammu & Kashmir": ["Srinagar", "Jammu", "Sopore", "Anantnag", "Baramulla"],
  "Ladakh": ["Leh", "Kargil"],
  "Lakshadweep": ["Kavaratti", "Agatti"],
  "Puducherry": ["Puducherry", "Karaikal", "Mahe", "Yanam"],
};
const WORKING_DAYS = [
  { value: "Mon", label: "Mon" },
  { value: "Tue", label: "Tue" },
  { value: "Wed", label: "Wed" },
  { value: "Thu", label: "Thu" },
  { value: "Fri", label: "Fri" },
  { value: "Sat", label: "Sat" },
  { value: "Sun", label: "Sun" },
];

const InputField = ({ label, icon: Icon, error, required, children, hint }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className={`relative flex items-center border rounded-xl transition-all ${error ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50 focus-within:bg-white focus-within:border-red-400"}`}>
      {Icon && <Icon className="absolute left-3 w-4 h-4 text-red-400 pointer-events-none" />}
      {children}
    </div>
    {hint && !error && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    {error && <p className="text-xs text-red-500 mt-1 flex items-center gap-1">⚠ {error}</p>}
  </div>
);

export default function FacilityRegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "", email: "", password: "", phone: "", emergencyContact: "",
    facilityType: "Hospital", facilityCategory: "Private",
    address: { street: "", city: "", state: "", pincode: "" },
    operatingHours: { open: "", close: "", workingDays: [] },
    is24x7: false, emergencyServices: false,
  });

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = "Facility name is required";
    if (!formData.email.trim()) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) e.email = "Invalid email address";
    if (!formData.password) e.password = "Password is required";
    else if (formData.password.length < 6) e.password = "Minimum 6 characters";
    if (!formData.phone) e.phone = "Phone is required";
    else if (!/^\d{10}$/.test(formData.phone)) e.phone = "Must be exactly 10 digits";
    if (!formData.emergencyContact) e.emergencyContact = "Emergency contact is required";
    else if (!/^\d{10}$/.test(formData.emergencyContact)) e.emergencyContact = "Must be exactly 10 digits";
    if (!formData.address.street.trim()) e["address.street"] = "Street address is required";
    if (!formData.address.state) e["address.state"] = "State is required";
    if (!formData.address.city) e["address.city"] = "City is required";
    if (!formData.address.pincode) e["address.pincode"] = "Pincode is required";
    else if (!/^[1-9][0-9]{5}$/.test(formData.address.pincode)) e["address.pincode"] = "Invalid 6-digit pincode";
    return e;
  };

  // Generic field change handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      if (name.startsWith("address.")) {
        const field = name.slice("address.".length);
        return { ...prev, address: { ...prev.address, [field]: value } };
      }
      if (name === "operatingHours.open") {
        return { ...prev, operatingHours: { ...prev.operatingHours, open: value } };
      }
      if (name === "operatingHours.close") {
        return { ...prev, operatingHours: { ...prev.operatingHours, close: value } };
      }
      return { ...prev, [name]: type === "checkbox" ? checked : value };
    });
    if (errors[name]) setErrors((prev) => { const n = { ...prev }; delete n[name]; return n; });
  };

  // State change — also resets city in same setState call (no race condition)
  const handleStateChange = (e) => {
    const state = e.target.value;
    setFormData((prev) => ({ ...prev, address: { ...prev.address, state, city: "" } }));
    if (errors["address.state"]) setErrors((prev) => { const n = { ...prev }; delete n["address.state"]; return n; });
  };

  const toggleWorkingDay = (day) => {
    setFormData((prev) => {
      const days = prev.operatingHours.workingDays;
      const updated = days.includes(day) ? days.filter((d) => d !== day) : [...days, day];
      return { ...prev, operatingHours: { ...prev.operatingHours, workingDays: updated } };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Scroll to first error
      const firstKey = Object.keys(validationErrors)[0];
      const el = document.querySelector(`[name="${firstKey}"]`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setIsSubmitting(true);
    const roleSlug = formData.facilityType === "Blood Lab" ? "blood-lab" : "hospital";
    const payload = { ...formData, facilityType: roleSlug, role: roleSlug };
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("✅ Facility Registered! Awaiting admin verification.");
        navigate("/");
      } else {
        toast.error(`Registration failed: ${data.message || data.error || "Please try again."}`);
      }
    } catch {
      toast.error("❌ Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputCls = (name) =>
    `w-full pl-10 pr-4 py-3 bg-transparent outline-none text-sm rounded-xl ${errors[name] ? "text-red-700" : "text-gray-800"}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100">
      <Header />

      <div className="max-w-3xl mx-auto px-4 py-24">
        {/* Page Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <FlaskConical className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Facility Registration</h1>
          <p className="text-gray-500 mt-2">Register your hospital or blood lab to join our network.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl border border-red-100 overflow-hidden">

          {/* Section: Facility Info */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 px-8 py-4">
            <h2 className="text-white font-semibold text-sm uppercase tracking-wider">Facility Information</h2>
          </div>
          <div className="p-8 space-y-5">
            <InputField label="Facility Name" icon={Building2} error={errors.name} required>
              <input name="name" type="text" placeholder="Enter facility name" value={formData.name} onChange={handleChange} className={inputCls("name")} />
            </InputField>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Facility Type <span className="text-red-500">*</span></label>
                <select name="facilityType" value={formData.facilityType} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 bg-gray-50 focus:bg-white focus:border-red-400 rounded-xl outline-none text-sm text-gray-800 transition">
                  {FACILITY_TYPES.map((ft) => <option key={ft} value={ft}>{ft}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Facility Category</label>
                <select name="facilityCategory" value={formData.facilityCategory} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 bg-gray-50 focus:bg-white focus:border-red-400 rounded-xl outline-none text-sm text-gray-800 transition">
                  {FACILITY_CATEGORIES.map((fc) => <option key={fc} value={fc}>{fc}</option>)}
                </select>
              </div>
            </div>

            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                <input type="checkbox" name="emergencyServices" checked={formData.emergencyServices} onChange={handleChange} className="w-4 h-4 accent-red-500" />
                Emergency Services Available
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                <input type="checkbox" name="is24x7" checked={formData.is24x7} onChange={handleChange} className="w-4 h-4 accent-red-500" />
                Open 24×7
              </label>
            </div>
          </div>

          {/* Section: Account */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 px-8 py-4">
            <h2 className="text-white font-semibold text-sm uppercase tracking-wider">Account & Contact</h2>
          </div>
          <div className="p-8 space-y-5">
            <InputField label="Email Address" icon={Mail} error={errors.email} required>
              <input name="email" type="email" placeholder="Facility email address" value={formData.email} onChange={handleChange} className={inputCls("email")} />
            </InputField>

            <InputField label="Password" icon={Lock} error={errors.password} required hint="Minimum 6 characters">
              <input name="password" type={showPassword ? "text" : "password"} placeholder="Create a password" value={formData.password} onChange={handleChange} className={`${inputCls("password")} pr-10`} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 text-gray-400 hover:text-red-500 transition">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </InputField>

            <div className="grid md:grid-cols-2 gap-5">
              <InputField label="Phone Number" icon={Phone} error={errors.phone} required hint="10-digit number">
                <input name="phone" type="tel" placeholder="Facility phone number" value={formData.phone} onChange={handleChange} maxLength="10" className={inputCls("phone")} />
              </InputField>
              <InputField label="Emergency Contact" icon={Phone} error={errors.emergencyContact} required hint="10-digit number">
                <input name="emergencyContact" type="tel" placeholder="Emergency contact number" value={formData.emergencyContact} onChange={handleChange} maxLength="10" className={inputCls("emergencyContact")} />
              </InputField>
            </div>
          </div>

          {/* Section: Address */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 px-8 py-4">
            <h2 className="text-white font-semibold text-sm uppercase tracking-wider">Facility Address</h2>
          </div>
          <div className="p-8 space-y-5">
            <InputField label="Street Address" icon={MapPin} error={errors["address.street"]} required>
              <input name="address.street" type="text" placeholder="Enter street address" value={formData.address.street} onChange={handleChange} className={inputCls("address.street")} />
            </InputField>

            <div className="grid md:grid-cols-3 gap-5">
              <InputField label="State" error={errors["address.state"]} required>
                <select
                  name="address.state"
                  value={formData.address.state}
                  onChange={handleStateChange}
                  className="w-full px-4 py-3 bg-transparent outline-none text-sm text-gray-800 rounded-xl"
                >
                  <option value="">Select State</option>
                  {Object.keys(STATES).map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </InputField>
              <InputField label="City" error={errors["address.city"]} required>
                <select
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleChange}
                  disabled={!formData.address.state}
                  className="w-full px-4 py-3 bg-transparent outline-none text-sm text-gray-800 rounded-xl disabled:opacity-50"
                >
                  <option value="">Select City</option>
                  {formData.address.state && STATES[formData.address.state].map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </InputField>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Pincode <span className="text-red-500">*</span></label>
                <input
                  name="address.pincode"
                  type="text"
                  placeholder="6-digit pincode"
                  value={formData.address.pincode}
                  onChange={handleChange}
                  maxLength="6"
                  className={`w-full px-4 py-3 border rounded-xl outline-none text-sm transition ${errors["address.pincode"] ? "border-red-400 bg-red-50 text-red-700" : "border-gray-200 bg-gray-50 focus:bg-white focus:border-red-400 text-gray-800"}`}
                />
                {errors["address.pincode"] && <p className="text-xs text-red-500 mt-1">⚠ {errors["address.pincode"]}</p>}
              </div>
            </div>
          </div>

          {/* Section: Operating Hours */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 px-8 py-4">
            <h2 className="text-white font-semibold text-sm uppercase tracking-wider">Operating Hours</h2>
          </div>
          <div className="p-8 space-y-6">
            {/* 24x7 toggle at top */}
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  name="is24x7"
                  checked={formData.is24x7}
                  onChange={handleChange}
                  className="w-4 h-4 accent-red-500"
                />
                Open 24×7 (skip time selection)
              </label>
            </div>

            {/* Time inputs — shown only if NOT 24x7 */}
            {!formData.is24x7 && (
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Opening Time <span className="text-red-500">*</span>
                  </label>
                  <div className="relative border border-gray-200 bg-white focus-within:border-red-400 rounded-xl flex items-center transition">
                    <Clock className="absolute left-3 w-4 h-4 text-red-400 pointer-events-none" />
                    <input
                      type="time"
                      name="operatingHours.open"
                      value={formData.operatingHours.open}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-transparent outline-none text-sm text-gray-800 rounded-xl cursor-pointer"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Closing Time <span className="text-red-500">*</span>
                  </label>
                  <div className="relative border border-gray-200 bg-white focus-within:border-red-400 rounded-xl flex items-center transition">
                    <Clock className="absolute left-3 w-4 h-4 text-red-400 pointer-events-none" />
                    <input
                      type="time"
                      name="operatingHours.close"
                      value={formData.operatingHours.close}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-transparent outline-none text-sm text-gray-800 rounded-xl cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            {formData.is24x7 && (
              <p className="text-sm text-green-600 font-medium bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                ✅ Open 24×7 — no time restrictions apply
              </p>
            )}

            {/* Working Days */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Working Days</label>
              <div className="flex flex-wrap gap-3">
                {WORKING_DAYS.map(({ value, label }) => {
                  const selected = formData.operatingHours.workingDays.includes(value);
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => toggleWorkingDay(value)}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all duration-200 ${
                        selected
                          ? "bg-red-600 border-red-600 text-white shadow-md"
                          : "bg-white border-gray-200 text-gray-600 hover:border-red-300 hover:text-red-600"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Selected: {formData.operatingHours.workingDays.length > 0 ? formData.operatingHours.workingDays.join(", ") : "None"}
              </p>
            </div>
          </div>

          {/* Submit */}
          <div className="px-8 pb-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold text-base hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Registering...</>
              ) : (
                <><Building2 className="w-5 h-5" /> Register Facility</>
              )}
            </button>
            <p className="text-center text-xs text-gray-400 mt-4">
              ⚠️ Your facility will be reviewed and approved by our admin team before activation.
            </p>
            <p className="text-center text-sm text-gray-500 mt-2">
              Already registered?{" "}
              <Link to="/login" className="text-red-600 font-semibold hover:underline">Login here</Link>
            </p>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
