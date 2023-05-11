"use client";
import React, { useEffect } from "react";
import ChemicalCard from "./ChemicalCard";
import { Card } from "semantic-ui-react";
import ChemicalData from "../public/data/ChemicalTriggers.json";
import "tailwindcss/tailwind.css";
// import "./ChemicalCollection.css";

interface IChemical {
  id: number;
  name: string;
  image: string;
  foods: string[];
}

function ChemicalCollection() {
  //const [chemicals, setChemicals] = React.useState<IChemical[]>([]);

  let chemicals: IChemical[] = [];

  ChemicalData.forEach((chemical) => {
    const currentChemical: IChemical = {
      id: chemical.id,
      name: chemical.name,
      image: chemical.image,
      foods: chemical.foods,
    };
    chemicals.push(currentChemical);
  });

  console.log(chemicals);

  return (
    <div>
      <h3 className="chem-card-header">
        Click on Each Card for more Information
      </h3>
      <Card.Group>
        <ul className="cards">
          {chemicals.map((chemical) => {
            return (
              <ChemicalCard
                className="cardz"
                key={chemical.id}
                name={chemical.name}
                image={chemical.image}
                foods={chemical.foods}
              />
            );
          })}
        </ul>
      </Card.Group>
    </div>
  );
}

export default ChemicalCollection;
