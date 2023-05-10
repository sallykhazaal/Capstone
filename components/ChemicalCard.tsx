"use client";
import React, { useState } from "react";
import { Card, SemanticICONS } from "semantic-ui-react";

interface ChemicalCardProps {
  name: string;
  image: string;
  foods: string[];
  className: string;
}

function ChemicalCard({ name, image, foods }: ChemicalCardProps) {
  const [showFront, setShowFront] = useState(true);

  function handleClick() {
    setShowFront((showFront) => !showFront);
    console.log(handleClick);
  }

  return (
    <Card
      onClick={handleClick}
      header={showFront ? name : ""}
      meta={showFront ? "" : name}
      image={showFront ? image : ""}
      description={showFront ? "" : foods}
    />
  );
}

export default ChemicalCard;
