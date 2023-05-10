import React, { useState } from "react";
import { Form } from "semantic-ui-react";

interface FoodFormProps {
  addNewFood: (data: any) => void;
  setNewFoods: React.Dispatch<React.SetStateAction<any[]>>;
  newFoods: any[];
}

function FoodForm({ addNewFood, setNewFoods, newFoods }: FoodFormProps) {
  const [formName, setFormName] = useState("");
  const [formChemicals, setFormChemicals] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newFood = {
      name: formName,
      chemicals: formChemicals,
    };
    fetch("http://localhost:3000/triggers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFood),
    })
      .then((res) => res.json())
      .then((data) => addNewFood(data));
    setFormName("");
    setFormChemicals("");
  }

  return (
    <>
      <h3 className="form-header">Search and Identify your Food Triggers</h3>
      <Form className="form" onSubmit={handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            onChange={(e) => setFormName(e.target.value)}
            fluid
            label="Name"
            placeholder="Name"
            name="name"
            value={formName}
          />
          <Form.Input
            onChange={(e) => setFormChemicals(e.target.value)}
            fluid
            label="Chemical"
            placeholder="Chemical"
            name="hp"
            value={formChemicals}
          />
        </Form.Group>
        <Form.Button className="formsubmit">Submit</Form.Button>
      </Form>
    </>
  );
}

export default FoodForm;
