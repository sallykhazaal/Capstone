// import Food from "@/components/Food";
// import Search from "@/components/Search";
"use client";
import { useState } from "react";
import FoodData from "../../public/data/FoodTriggers.json";

type Food = {
  name: string;
  chemicals: string[];
};

const FoodTriggers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredFoods = FoodData.foods.filter((food: Food) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 min-h-screen">
      <div>
        <h1>Food Triggers</h1>
        <input
          type="text"
          placeholder="Search food..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ul>
          {filteredFoods.map((food: Food) => (
            <li key={food.name}>
              <h2>{food.name}</h2>
              <p>Chemicals: {food.chemicals.join(", ")}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default FoodTriggers;
