import React from "react";

function Food() {
  return <div>Food</div>;
}

export default Food;

// "use client";
// import React, { useState } from "react";
// import { List, Input } from "semantic-ui-react";
// import FoodData from "../public/data/FoodTriggers.json";
// import "tailwindcss/tailwind.css";
// import Search from "semantic-ui-react";

// interface IFood {
//   id: number;
//   name: string;
//   chemicals: string[];
// }

// function Food() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const foods: IFood[] = FoodData.map((food: any) => ({
//     id: food.id,
//     name: food.name,
//     chemicals: food.chemicals.split(", "),
//   }));

//   const filteredFoods = foods.filter((food) =>
//     food.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div>
//       <Input
//         placeholder="Search food triggers..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       <List animated verticalAlign="middle">
//         {filteredFoods.map((food) => (
//           <List.Item key={food.id}>
//             <List.Content>
//               <List.Header>{food.name}</List.Header>
//               <List.Description>{food.chemicals.join(", ")}</List.Description>
//             </List.Content>
//           </List.Item>
//         ))}
//       </List>
//     </div>
//   );
// }

// export default Food;
