import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleCardClick = (goal) => {
    switch (goal) {
      case "Weight Loss":
      case "Muscle Gain":
        navigate("/workouts");
        break;
      case "Balanced Meal Plan":
        navigate("/meal-plans");
        break;
      default:
        navigate("/login");
        break;
    }
  };

  return (
    <div className="bg-gray-50">
      {/* ---------- HERO ---------- */}
      <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-800 via-teal-500 to-emerald-400">
          <img
            src="/img-1.png"
            alt="wellness"
            className="w-full h-full object-cover mix-blend-overlay opacity-40"
          />
        </div>

        <div className="relative z-10 max-w-3xl px-6 text-white">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-2xl">
            Wellness & Fitness
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/90 drop-shadow-lg">
            Your personal health partner — track, learn, and grow healthier every day.
          </p>
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <Link
              to="/signup"
              className="px-8 py-3 bg-white text-emerald-700 font-semibold rounded-full shadow hover:bg-gray-100 transition"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="px-8 py-3 border border-white text-white rounded-full font-semibold hover:bg-white hover:text-emerald-700 transition"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- FEATURES ---------- */}
      <Section title="Everything you need for a healthier life" bg="from-gray-50 to-emerald-50">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <Card key={f.title} {...f} />
          ))}
        </div>
      </Section>

      {/* ---------- GOALS ---------- */}
      <Section title="Pick Your Health Goal" bg="from-gray-50 to-emerald-50">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {goals.map((g) => (
            <GoalCard key={g.title} {...g} onClick={() => handleCardClick(g.title)} />
          ))}
        </div>
      </Section>

      {/* ---------- WHY US ---------- */}
      <Section title="Why Choose Bio-Companion?" bg="white">
        <div className="grid md:grid-cols-3 gap-6">
          {whyUs.map((w) => (
            <Card key={w.title} {...w} />
          ))}
        </div>
      </Section>

      {/* ---------- CONTACT ---------- */}
      <Section title="Contact Us" bg="gray-100">
        <form className="max-w-xl mx-auto text-left space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <textarea
            placeholder="Message"
            rows="4"
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="button"
            className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition w-full md:w-auto"
          >
            Send Message
          </button>
        </form>
      </Section>

      {/* ---------- FOOTER ---------- */}
      <footer className="bg-emerald-700 text-white py-16 text-center">
        <h4 className="text-2xl font-bold mb-4">
          Ready to take control of your health?
        </h4>
        <Link
          to="/signup"
          className="px-8 py-3 bg-white text-emerald-700 rounded-full font-semibold hover:bg-gray-100 transition"
        >
          Create Your Free Account
        </Link>
        <p className="mt-6 text-sm text-white/80">
          © {new Date().getFullYear()} Bio-Companion. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

/* ---------- Sub Components ---------- */
function Section({ title, bg, children }) {
  return (
    <section className={`py-24 bg-gradient-to-b ${bg}`}>
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-emerald-900">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}

function Card({ title, desc, icon }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition transform hover:-translate-y-1 text-center flex flex-col items-center">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-emerald-900">{title}</h3>
      <p className="text-gray-700">{desc}</p>
    </div>
  );
}

function GoalCard({ title, desc, icon, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white p-6 rounded-2xl shadow hover:shadow-2xl transition transform hover:-translate-y-1 hover:scale-105 text-center flex flex-col items-center"
    >
      <div className="text-5xl mb-3">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-emerald-900">{title}</h3>
      <p className="text-gray-700">{desc}</p>
      <p className="mt-3 text-emerald-600 font-semibold text-sm">Click to explore →</p>
    </div>
  );
}

/* ---------- Static Data ---------- */
const features = [
  { title: "Easy Tracking", desc: "Log weight, BMI & activity quickly.", icon: "📊" },
  { title: "Personal Goals", desc: "Set health targets & see progress.", icon: "🎯" },
  { title: "AI Insights", desc: "Get smart recommendations.", icon: "🤖" },
  { title: "Beautiful Charts", desc: "Visualize your journey clearly.", icon: "📈" },
];

const goals = [
  { title: "Weight Loss", desc: "Personalized calorie & activity plans.", icon: "⚖️" },
  { title: "Muscle Gain", desc: "Strength training & protein tracking.", icon: "💪" },
  { title: "Balanced Meal Plan", desc: "Daily meals designed by nutritionists.", icon: "🥗" },
  { title: "General Wellness", desc: "Maintain and track a healthy lifestyle.", icon: "🌿" },
];

const whyUs = [
  { title: "Proven Results", desc: "Thousands have achieved their goals with Bio-Companion.", icon: "🏆" },
  { title: "AI Powered", desc: "Smart insights keep you on track every day.", icon: "🤖" },
  { title: "Community Support", desc: "Join a vibrant community to stay motivated.", icon: "🤝" },
];