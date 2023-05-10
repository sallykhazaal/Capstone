import React from "react";
import { ListItem, List } from "semantic-ui-react";

interface Props {
  addNewFood: Function;
  name: string;
  chemicals: string;
  triggers: Array<any>;
  setTriggers: Function;
  handleDelete: Function;
  id: number;
}

function MyFoodTriggers({
  addNewFood,
  name,
  chemicals,
  triggers,
  setTriggers,
  handleDelete,
  id,
}: Props) {
  function deleteTrigger(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    fetch(`http://localhost:3000/triggers/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => handleDelete(id));
  }

  return (
    <List animated verticalAlign="middle">
      <List.Item>
        <List.Content>
          <List.Header>{name}</List.Header>
          <List.Description>{chemicals}</List.Description>
          <ListItem>
            <button onClick={deleteTrigger} className="delete" type="button">
              Delete
            </button>
          </ListItem>
        </List.Content>
      </List.Item>
    </List>
  );
}

export default MyFoodTriggers;
