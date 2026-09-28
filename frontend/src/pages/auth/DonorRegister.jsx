"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, User, Mail, Lock, Phone, Calendar, Droplets, Weight, Ruler, MapPin, Heart } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const GENDERS = ["Male", "Female", "Other"];
const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
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


const calculateAge = (dobString) => {
  if (!dobString) return null;
  const birthDate = new Date(dobString);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
  return age;
};

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

export default function DonorRegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "", email: "", password: "", phone: "", emergencyContact: "",
    dob: "", gender: "", bloodGroup: "",
    healthInfo: { weight: "", height: "", hasDiseases: false, diseaseDetails: "" },
    address: { street: "", city: "", state: "", pincode: "" },
  });
  const [errors, setErrors] = useState({});

  const get = (name) => {
    if (name.startsWith("healthInfo.")) return formData.healthInfo[name.split(".")[1]];
    if (name.startsWith("address.")) return formData.address[name.split(".")[1]];
    return formData[name];
  };

  const validate = () => {
    const e = {};
    if (!formData.fullName.trim()) e.fullName = "Full name is required";
    if (!formData.email.trim()) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) e.email = "Invalid email address";
    if (!formData.password) e.password = "Password is required";
    else if (formData.password.length < 8) e.password = "Minimum 8 characters";
    if (!formData.phone) e.phone = "Phone is required";
    else if (!/^\d{10}$/.test(formData.phone)) e.phone = "Must be exactly 10 digits";
    if (!formData.emergencyContact) e.emergencyContact = "Emergency contact is required";
    else if (!/^\d{10}$/.test(formData.emergencyContact)) e.emergencyContact = "Must be exactly 10 digits";
    if (!formData.dob) e.dob = "Date of birth is required";
    else { const a = calculateAge(formData.dob); if (a < 18 || a > 65) e.dob = "Must be 18–65 years old"; }
    if (!formData.gender) e.gender = "Gender is required";
    if (!formData.bloodGroup) e.bloodGroup = "Blood group is required";
    if (!formData.healthInfo.weight) e["healthInfo.weight"] = "Weight is required";
    else if (parseFloat(formData.healthInfo.weight) < 45) e["healthInfo.weight"] = "Minimum 45 kg";
    if (!formData.healthInfo.height) e["healthInfo.height"] = "Height is required";
    if (!formData.address.street.trim()) e["address.street"] = "Street address is required";
    if (!formData.address.state) e["address.state"] = "State is required";
    if (!formData.address.city) e["address.city"] = "City is required";
    if (!formData.address.pincode) e["address.pincode"] = "Pincode is required";
    else if (!/^[1-9][0-9]{5}$/.test(formData.address.pincode)) e["address.pincode"] = "Invalid 6-digit pincode";
    return e;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      if (name.startsWith("healthInfo.")) {
        const f = name.split(".")[1];
        return { ...prev, healthInfo: { ...prev.healthInfo, [f]: type === "checkbox" ? checked : value } };
      }
      if (name.startsWith("address.")) {
        const f = name.split(".")[1];
        return { ...prev, address: { ...prev.address, [f]: value } };
      }
      return { ...prev, [name]: type === "checkbox" ? checked : value };
    });
    if (errors[name]) setErrors((prev) => { const n = { ...prev }; delete n[name]; return n; });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const first = document.querySelector(`[name="${Object.keys(validationErrors)[0]}"]`);
      if (first) first.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setIsSubmitting(true);
    const payload = {
      fullName: formData.fullName, email: formData.email, password: formData.password,
      phone: formData.phone, emergencyContact: formData.emergencyContact,
      age: calculateAge(formData.dob), gender: formData.gender, bloodGroup: formData.bloodGroup,
      weight: parseFloat(formData.healthInfo.weight), height: parseFloat(formData.healthInfo.height),
      address: formData.address, role: "donor",
    };
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/auth/register`, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
      });
      if (res.ok) {
        toast.success("🎉 Registered successfully! Please login.");
        navigate("/login");
      } else {
        const data = await res.json();
        toast.error(`Registration failed: ${data.message || "Please try again."}`);
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
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Donor Registration</h1>
          <p className="text-gray-500 mt-2">Join our life-saving community. Fill in your details below.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl border border-red-100 overflow-hidden">
          {/* Section: Personal Information */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 px-8 py-4">
            <h2 className="text-white font-semibold text-sm uppercase tracking-wider">Personal Information</h2>
          </div>
          <div className="p-8 space-y-5">
            <InputField label="Full Name" icon={User} error={errors.fullName} required>
              <input name="fullName" type="text" placeholder="Enter your full name" value={formData.fullName} onChange={handleChange} className={inputCls("fullName")} />
            </InputField>

            <div className="grid md:grid-cols-2 gap-5">
              <InputField label="Email Address" icon={Mail} error={errors.email} required>
                <input name="email" type="email" placeholder="Enter email address" value={formData.email} onChange={handleChange} className={inputCls("email")} />
              </InputField>
              <InputField label="Password" icon={Lock} error={errors.password} required hint="Minimum 8 characters">
                <input name="password" type={showPassword ? "text" : "password"} placeholder="Create a password" value={formData.password} onChange={handleChange} className={`${inputCls("password")} pr-10`} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 text-gray-400 hover:text-red-500 transition">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </InputField>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <InputField label="Phone Number" icon={Phone} error={errors.phone} required hint="10-digit mobile number">
                <input name="phone" type="tel" placeholder="Enter phone number" value={formData.phone} onChange={handleChange} maxLength="10" className={inputCls("phone")} />
              </InputField>
              <InputField label="Emergency Contact" icon={Phone} error={errors.emergencyContact} required hint="10-digit emergency contact">
                <input name="emergencyContact" type="tel" placeholder="Emergency contact number" value={formData.emergencyContact} onChange={handleChange} maxLength="10" className={inputCls("emergencyContact")} />
              </InputField>
            </div>
          </div>

          {/* Section: Health Details */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 px-8 py-4">
            <h2 className="text-white font-semibold text-sm uppercase tracking-wider">Health Details</h2>
          </div>
          <div className="p-8 space-y-5">
            <div className="grid md:grid-cols-3 gap-5">
              <InputField label="Date of Birth" icon={Calendar} error={errors.dob} required>
                <input name="dob" type="date" value={formData.dob} onChange={handleChange} className={inputCls("dob")} />
              </InputField>
              <InputField label="Gender" error={errors.gender} required>
                <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-4 py-3 bg-transparent outline-none text-sm text-gray-800 rounded-xl">
                  <option value="">Select Gender</option>
                  {GENDERS.map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
              </InputField>
              <InputField label="Blood Group" icon={Droplets} error={errors.bloodGroup} required>
                <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-transparent outline-none text-sm text-gray-800 rounded-xl">
                  <option value="">Select Blood Group</option>
                  {BLOOD_GROUPS.map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
              </InputField>
            </div>

            {formData.dob && (
              <p className="text-sm text-gray-500">Age: <span className="font-semibold text-red-600">{calculateAge(formData.dob)} years</span></p>
            )}

            <div className="grid md:grid-cols-2 gap-5">
              <InputField label="Weight (kg)" icon={Weight} error={errors["healthInfo.weight"]} required hint="Minimum 45 kg required">
                <input name="healthInfo.weight" type="number" placeholder="e.g. 65" value={formData.healthInfo.weight} onChange={handleChange} min="45" step="0.1" className={inputCls("healthInfo.weight")} />
              </InputField>
              <InputField label="Height (cm)" icon={Ruler} error={errors["healthInfo.height"]} required>
                <input name="healthInfo.height" type="number" placeholder="e.g. 170" value={formData.healthInfo.height} onChange={handleChange} min="100" step="0.1" className={inputCls("healthInfo.height")} />
              </InputField>
            </div>

            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" name="healthInfo.hasDiseases" checked={formData.healthInfo.hasDiseases} onChange={handleChange} className="w-4 h-4 accent-red-500 rounded" />
              <span className="text-sm text-gray-700 group-hover:text-red-600 transition">I have existing medical conditions</span>
            </label>

            {formData.healthInfo.hasDiseases && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Medical Condition Details</label>
                <textarea name="healthInfo.diseaseDetails" value={formData.healthInfo.diseaseDetails} onChange={handleChange} rows={3} placeholder="Describe any medical conditions, medications, or allergies..." className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-red-400 outline-none text-sm transition resize-none" />
              </div>
            )}
          </div>

          {/* Section: Address */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 px-8 py-4">
            <h2 className="text-white font-semibold text-sm uppercase tracking-wider">Address Details</h2>
          </div>
          <div className="p-8 space-y-5">
            <InputField label="Street Address" icon={MapPin} error={errors["address.street"]} required>
              <input name="address.street" type="text" placeholder="Enter your street address" value={formData.address.street} onChange={handleChange} className={inputCls("address.street")} />
            </InputField>

            <div className="grid md:grid-cols-3 gap-5">
              <InputField label="State" error={errors["address.state"]} required>
                <select name="address.state" value={formData.address.state} onChange={(e) => { handleChange(e); setFormData((p) => ({ ...p, address: { ...p.address, city: "" } })); }} className="w-full px-4 py-3 bg-transparent outline-none text-sm text-gray-800 rounded-xl">
                  <option value="">Select State</option>
                  {Object.keys(STATES).map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </InputField>
              <InputField label="City" error={errors["address.city"]} required>
                <select name="address.city" value={formData.address.city} onChange={handleChange} disabled={!formData.address.state} className="w-full px-4 py-3 bg-transparent outline-none text-sm text-gray-800 rounded-xl disabled:opacity-50">
                  <option value="">Select City</option>
                  {formData.address.state && STATES[formData.address.state].map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </InputField>
              <InputField label="Pincode" error={errors["address.pincode"]} required>
                <input name="address.pincode" type="text" placeholder="6-digit pincode" value={formData.address.pincode} onChange={handleChange} maxLength="6" className="w-full px-4 py-3 bg-transparent outline-none text-sm text-gray-800 rounded-xl" />
              </InputField>
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
                <><Heart className="w-5 h-5" /> Register as Donor</>
              )}
            </button>
            <p className="text-center text-sm text-gray-500 mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-red-600 font-semibold hover:underline">Login here</Link>
            </p>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
