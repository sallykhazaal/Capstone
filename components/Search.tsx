import React, { useEffect, useState } from "react";
import Food from "./Food";
import FoodForm from "./FoodForm";
import MyFoodTriggers from "./MyFoodTriggers";

interface SearchProps {
  search: string;
  setSearch: (search: string) => void;
  food: { id: number; name: string; chemicals: string }[];
  setFood: (food: { id: number; name: string; chemicals: string }[]) => void;
}

interface FoodTriggers {
  id: number;
  name: string;
  chemicals: string;
}

function Search({ search, setSearch, food, setFood }: SearchProps) {
  const [newFoods, setNewFoods] = useState<FoodTriggers[]>([]);
  const [triggers, setTriggers] = useState<FoodTriggers[]>([]);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  useEffect(() => {
    fetch("http://localhost:3000/foods")
      .then((res) => res.json())
      .then((data: { id: number; name: string; chemicals: string }[]) =>
        setFood(data)
      );
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/triggers")
      .then((res) => res.json())
      .then((triggers: FoodTriggers[]) => setTriggers(triggers));
  }, []);

  function addNewFood(newFoods: FoodTriggers) {
    setTriggers([...triggers, newFoods]);
  }

  function handleDelete(id: number) {
    setTriggers(triggers.filter((t) => t.id !== id));
  }

  const foodToDisplay = food.filter((foods) =>
    foods.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <FoodForm
        addNewFood={addNewFood}
        newFoods={newFoods}
        setNewFoods={setNewFoods}
      />
      <div className="searchbar">
        <label htmlFor="search">Search Food Ingredients:</label>
        <input
          type="text"
          id="search"
          placeholder="Type a name to search..."
          onChange={handleSearch}
          value={search}
        />
      </div>
      <div className="foods">
        <h2>
          Food and Ingredients Containing Known Potential Migraine Triggers
        </h2>
        {foodToDisplay.map((foods) => {
          return (
            <Food
              key={foods.id}
              name={foods.name}
              chemicals={foods.chemicals}
            />
          );
        })}
      </div>
      <div className="triggers">
        <h2>My Food Triggers!</h2>
        {triggers.map((foodz) => {
          return (
            <MyFoodTriggers
              key={foodz.id}
              id={foodz.id}
              handleDelete={handleDelete}
              setTriggers={setTriggers}
              triggers={triggers}
              addNewFood={addNewFood}
              name={foodz.name}
              chemicals={foodz.chemicals}
            />
          );
        })}
      </div>
    </>
  );
}

export default Search;
