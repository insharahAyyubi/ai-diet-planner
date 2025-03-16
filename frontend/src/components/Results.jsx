import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Loader } from "lucide-react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const doshaDietInfo = {
  Vata: {
    macronutrients: [
      { name: "Carbs", value: 50, color: "#f4a261" },
      { name: "Protein", value: 20, color: "#e76f51" },
      { name: "Veggies", value: 20, color: "#2a9d8f" },
      { name: "Fruits", value: 10, color: "#2cc61b" },
    ],
    tasteBalance: [
      { name: "Sweet", value: 30, color: "#ffb703" },
      { name: "Sour", value: 20, color: "#fb8500" },
      { name: "Salty", value: 25, color: "#023047" },
      { name: "Astringent", value: 15, color: "#00a72f" },
      { name: "Bitter", value: 5, color: "#219ebc" },
      { name: "Pungent", value: 5, color: "#ff006e" },
    ],
    dietPlan: [
      "Whole grains: cooked cereals, pasta, bread, chapatis, oats, wheat, rice.",
      "Protein: split lentils, tofu, mung beans, lightly roasted nuts.",
      "Vegetables: preferably lightly cooked.",
      "Fruits: fresh and sweeter preferable, steamed/baked fruits.",
      "Dairy: butter, buttermilk, kefir, warm milk, yogurt (fresh).",
    ],
    generalRule:
      "Vata foods must not be light, dry, crunchy, cold, raw, or hard-to-digest.",
  },
  Pitta: {
    macronutrients: [
      { name: "Carbs", value: 30, color: "#f4a261" },
      { name: "Protein", value: 30, color: "#e76f51" },
      { name: "Veggies", value: 30, color: "#2a9d8f" },
      { name: "Fruits", value: 10, color: "#059a2c" },
    ],
    tasteBalance: [
      { name: "Sweet", value: 40, color: "#ff88ca" },
      { name: "Sour", value: 15, color: "#fb8500" },
      { name: "Salty", value: 20, color: "#023047" },
      { name: "Astringent", value: 10, color: "#008709" },
      { name: "Bitter", value: 10, color: "#219ebc" },
      { name: "Pungent", value: 5, color: "#ff006e" },
    ],
    dietPlan: [
      "Whole grains: whole-wheat bread, basmati rice, oats, quinoa, pasta.",
      "Protein: black lentils, chickpeas, mung beans, soy products.",
      "Vegetables: most veggies, squashes, potatoes, peas.",
      "Fruits: sweet & ripe, avoid sour fruits.",
      "Dairy: small quantities, unsalted butter, cottage cheese, ghee, milk.",
    ],
    generalRule:
      "Pitta foods must not be salty, sour & pungent. Avoid hot spices, fried foods, alcohol, and refined sugars.",
  },
  Kapha: {
    macronutrients: [
      { name: "Carbs", value: 30, color: "#f4a261" },
      { name: "Protein", value: 20, color: "#e76f51" },
      { name: "Veggies", value: 40, color: "#2a9d8f" },
      { name: "Fruits", value: 10, color: "#03b553" },
    ],
    tasteBalance: [
      { name: "Sweet", value: 15, color: "#f37bd5" },
      { name: "Sour", value: 25, color: "#fb8500" },
      { name: "Salty", value: 20, color: "#023047" },
      { name: "Astringent", value: 20, color: "#249800" },
      { name: "Bitter", value: 15, color: "#219ebc" },
      { name: "Pungent", value: 5, color: "#ff006e" },
    ],
    dietPlan: [
      "Whole grains: crackers, dry cereals, barley, basmati rice, buckwheat, corn.",
      "Protein: all legumes & lentils, tofu, soymilk, split peas.",
      "Vegetables: almost all; raw in summer & cooked in winter.",
      "Fruits: dried and astringent fruits are best.",
      "Dairy: minimal quantities; goat milk, skim milk, soy milk.",
    ],
    generalRule:
      "Kapha foods must not be heavy, oily & cold. Reduce sweet, salty and sour foods. Avoid fried foods and sweets.",
  },
};

const Results = () => {
  const location = useLocation();
  const userAnswers = location.state?.answers || {};
  const [dietPlan, setDietPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDietPlan = async () => {
      const response = await fetch("http://127.0.0.1:5000/generate_diet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userAnswers),
      });

      const data = await response.json();

      setTimeout(() => {
        setDietPlan(data);
        setLoading(false);
      }, 2000);
    };

    fetchDietPlan();
  }, [userAnswers]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-green-100 p-6">
        <Loader className="animate-spin text-green-600 w-12 h-12" />
        <p className="mt-4 text-lg font-semibold text-gray-700">
          Generating your Ayurvedic diet plan...
        </p>
      </div>
    );
  }

  const dosha = dietPlan.dosha;
  const dietInfo = doshaDietInfo[dosha];

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100 p-6">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-xl p-6 flex flex-col md:flex-row">
        {/* Left Section - Diet Plan */}
        <div className="w-full md:w-1/2 p-4">
          <h2 className="text-2xl font-bold text-green-700">
            Your Ayurvedic Dosha: {dosha}
          </h2>
          <h3 className="text-xl font-semibold text-gray-800 mt-4">
            Recommended Diet Plan:
          </h3>
          <ul className="mt-4 space-y-2 text-lg text-gray-700">
            {dietInfo.dietPlan.map((item, index) => {
              const [title, ...rest] = item.split(":"); // Splitting the title and description
              return (
                <li
                  key={index}
                  className="p-2 bg-green-100 rounded-md shadow-sm"
                >
                  <strong>{title}:</strong> {rest.join(":")}
                </li>
              );
            })}
          </ul>

          {/* General Rule Section */}
          <div className="mt-6 p-4 bg-yellow-100 text-gray-800 rounded-lg shadow-md">
            <strong>General Rule:</strong> {dietInfo.generalRule}
          </div>
        </div>

        {/* Right Section - Charts */}
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <h3 className="text-lg text-black font-semibold mt-4">Diet Chart</h3>
          <PieChart width={280} height={280}>
            <Pie
              data={dietInfo.macronutrients}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {dietInfo.macronutrients.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>

          <h3 className="text-lg text-black font-semibold mt-6">
            Taste Palette
          </h3>
          <PieChart width={280} height={280}>
            <Pie
              data={dietInfo.tasteBalance}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {dietInfo.tasteBalance.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default Results;
