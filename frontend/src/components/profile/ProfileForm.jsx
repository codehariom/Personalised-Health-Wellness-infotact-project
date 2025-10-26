import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext.jsx";

export default function ProfileForm() {
  const { user, updateUserProfile } = useAuth();
  const [form, setForm] = useState({
    displayName: "",
    profile: {
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
      heightCm: "",
      weightKg: "",
      activityLevel: "",
      preferences: {
        diet: "none",
      },
    },
    goals: [],
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (user) {
      setForm({
        displayName: user.displayName || "",
        profile: {
          firstName: user.profile?.firstName || "",
          lastName: user.profile?.lastName || "",
          age: user.profile?.age || "",
          gender: user.profile?.gender || "",
          heightCm: user.profile?.heightCm || "",
          weightKg: user.profile?.weightKg || "",
          activityLevel: user.profile?.activityLevel || "sedentary",
          preferences: {
            diet: user.profile?.preferences?.diet || "none",
          },
        },
        goals: user.goals || [],
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "displayName") {
      setForm((prev) => ({ ...prev, displayName: value }));
    } else if (name === "diet") {
      setForm((prev) => ({
        ...prev,
        profile: {
          ...prev.profile,
          preferences: { ...prev.profile.preferences, diet: value },
        },
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        profile: { ...prev.profile, [name]: value },
      }));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      const result = await updateUserProfile(form);
      if (result.success) {
        setMsg("✅ Profile saved successfully");
      } else {
        setMsg(result.message || "❌ Save failed");
      }
    } catch (err) {
      setMsg(err.response?.data?.message || "❌ Save failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-3xl bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-8 border border-emerald-100">
        <h2 className="text-3xl font-semibold text-emerald-700 mb-6 text-center">
          🧬 Your Health Profile
        </h2>

        {msg && (
          <div
            className={`mb-5 text-center font-medium ${
              msg.includes("successfully")
                ? "text-emerald-600"
                : "text-red-500"
            }`}
          >
            {msg}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Display Name
            </label>
            <input
              name="displayName"
              value={form.displayName}
              onChange={handleChange}
              placeholder="Enter your display name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none"
            />
          </div>

          {/* Name Section */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                name="firstName"
                value={form.profile.firstName}
                onChange={handleChange}
                placeholder="First name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                name="lastName"
                value={form.profile.lastName}
                onChange={handleChange}
                placeholder="Last name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400"
              />
            </div>
          </div>

          {/* Age & Gender */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Age
              </label>
              <input
                name="age"
                type="number"
                value={form.profile.age}
                onChange={handleChange}
                placeholder="Age"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                name="gender"
                value={form.profile.gender}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400"
              >
                <option value="">Select gender</option>
                <option value="male">♂️ Male</option>
                <option value="female">♀️ Female</option>
                <option value="other">⚧ Other</option>
              </select>
            </div>
          </div>

          {/* Body Measurements */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Height (cm)
              </label>
              <input
                name="heightCm"
                type="number"
                value={form.profile.heightCm}
                onChange={handleChange}
                placeholder="Height in cm"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Weight (kg)
              </label>
              <input
                name="weightKg"
                type="number"
                value={form.profile.weightKg}
                onChange={handleChange}
                placeholder="Weight in kg"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400"
              />
            </div>
          </div>

          {/* Activity & Diet */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Activity Level
              </label>
              <select
                name="activityLevel"
                value={form.profile.activityLevel}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400"
              >
                <option value="sedentary">Sedentary</option>
                <option value="light">Lightly Active</option>
                <option value="moderate">Moderately Active</option>
                <option value="active">Very Active</option>
                <option value="very_active">Extremely Active</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Diet Preference
              </label>
              <select
                name="diet"
                value={form.profile.preferences.diet}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400"
              >
                <option value="none">No specific diet</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="keto">Keto</option>
                <option value="paleo">Paleo</option>
                <option value="mediterranean">Mediterranean</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button
            disabled={loading}
            className="w-full bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 transition duration-300 disabled:opacity-70"
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}