"use client";
import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Head from "next/head";
import Layout from "../layout";

type ChemicalTrigger = {
  name: string;
  description: string;
};

type MigraineTrigger = {
  name: string;
  description: string;
};

type ProfileProps = {
  chemicalTriggers: ChemicalTrigger[];
  migraineTriggers: MigraineTrigger[];
};

const Profile: React.FC<ProfileProps> = ({
  chemicalTriggers,
  migraineTriggers,
}) => {
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [foodInput, setFoodInput] = useState("");
  const [foodIngredientInput, setFoodIngredientInput] = useState("");
  const [foodTimeInput, setFoodTimeInput] = useState("");
  const [symptomInput, setSymptomInput] = useState("");
  const [symptomTimeInput, setSymptomTimeInput] = useState("");

  useEffect(() => {
    // fetch calendar events from external API
    const fetchEvents = async () => {
      try {
        const response = await fetch("https://example.com/calendar-events");
        const data = await response.json();
        setCalendarEvents(data);
      } catch (error) {
        console.error("Error fetching calendar events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleDateClick = (info: any) => {
    setSelectedDate(info.date);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // create new calendar event with user input
    const newEvent = {
      title: `${foodInput} / ${symptomInput}`,
      start: selectedDate,
      extendedProps: {
        foodTime: foodTimeInput,
        symptomTime: symptomTimeInput,
      },
    };

    // update calendar events state with new event
    setCalendarEvents([...calendarEvents, newEvent]);

    // clear form input fields and selected date state
    setFoodInput("");
    setFoodTimeInput("");
    setSymptomInput("");
    setSymptomTimeInput("");
    setSelectedDate(null);
  };

  return (
    <Layout>
      <Head>
        <title>My Profile - Migraine Helper App</title>
      </Head>
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-5">My Profile</h1>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <h2 className="text-2xl font-bold mb-3">My Chemical Triggers</h2>
            <ul className="list-disc pl-5">
              {chemicalTriggers &&
                chemicalTriggers.map((trigger) => (
                  <li key={trigger.name}>
                    <strong>{trigger.name}</strong>: {trigger.description}
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-3">My Migraine Triggers</h2>
            <ul className="list-disc pl-5">
              {migraineTriggers &&
                migraineTriggers.map((trigger) => (
                  <li key={trigger.name}>
                    <strong>{trigger.name}</strong>: {trigger.description}
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-3">My Migraine Diary</h2>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={calendarEvents}
            dateClick={handleDateClick}
          />
          {selectedDate && (
            <form className="mt-5" onSubmit={handleSubmit}>
              <h3 className="text-xl font-bold mb-3">
                {selectedDate.toDateString()}
              </h3>
              <div className="mb-3">
                <label htmlFor="food">Food item consumed:</label>
                <input
                  type="text"
                  id="food"
                  value={foodInput}
                  onChange={(e) => setFoodInput(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="food-ingredients">
                  Known ingredients in food:
                </label>
                <input
                  type="text"
                  id="food ingredients"
                  value={foodIngredientInput}
                  onChange={(e) => setFoodIngredientInput(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="food-time">Time of food consumption:</label>
                <input
                  type="time"
                  id="food-time"
                  value={foodTimeInput}
                  onChange={(e) => setFoodTimeInput(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="symptoms">Symptoms experienced:</label>
                <input
                  type="text"
                  id="symptoms"
                  value={symptomInput}
                  onChange={(e) => setSymptomInput(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="symptoms-time">Time of symptom onset:</label>
                <input
                  type="time"
                  id="symptoms-time"
                  value={symptomTimeInput}
                  onChange={(e) => setSymptomTimeInput(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Add Entry
              </button>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
