import React, { useState } from "react";
import ToggleSwitch from "../components/ToggleSwitch.jsx";

export default function NotificationSettings() {
  const [settings, setSettings] = useState({
    weight: true,
    tips: false,
    community: true,
    workouts: false,
    mealPlans: false,
  });

  const toggle = (key) => setSettings((s) => ({ ...s, [key]: !s[key] }));

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-xl shadow-md">
      <h1 className="text-3xl font-bold text-emerald-700 mb-6">
        Notification Settings
      </h1>

      <p className="mb-6 text-gray-700">
        Manage what kind of updates you’d like to receive.{" "}
        <span className="font-semibold text-black">
          You will be notified
        </span>{" "}
        according to your preferences below.
      </p>

      <div className="space-y-4">
        <ToggleSwitch
          label="Daily weight reminder"
          checked={settings.weight}
          onChange={() => toggle("weight")}
        />
        <ToggleSwitch
          label="Health tips & articles"
          checked={settings.tips}
          onChange={() => toggle("tips")}
        />
        <ToggleSwitch
          label="Community replies"
          checked={settings.community}
          onChange={() => toggle("community")}
        />
        <ToggleSwitch
          label="Workout reminders"
          checked={settings.workouts}
          onChange={() => toggle("workouts")}
        />
        <ToggleSwitch
          label="Meal plan reminders"
          checked={settings.mealPlans}
          onChange={() => toggle("mealPlans")}
        />
      </div>
    </div>
  );
}
