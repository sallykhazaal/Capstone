"use client";
import addData from "@/firebase/firestore/addData";
import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const handleForm = async () => {
    const data = {
      name: "John snow",
      house: "Stark",
    };
    const { result, error } = await addData("users", "user-id", data);

    if (error) {
      return console.log(error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mb-32 grid text-center lg:text-left">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Welcome to Migraine Pal
        </h1>
        <p className="text-lg mb-8 text-gray-700">
          Migraine Pal is a migraine tracking app designed to help you manage
          your symptoms and improve your quality of life. With Migraine Pal, you
          can zero in on the foods and chemicals that you are senstitive to and
          that can increase your likliehood of getting a migraine.
        </p>
        <Link href="/signup">
          {/* <a className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition-colors duration-300">
            Get started
          </a> */}
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Track your food and chemical triggers
          </h2>
          <p className="text-lg mb-4 text-gray-700">
            Migraine Pal provides information on different treatment options for
            migraines, such as medication, lifestyle changes, and alternative
            therapies. You can also track your treatment progress to see what's
            working best for you.
          </p>
          <Image
            src="https://myplate-prod.azureedge.us/sites/default/files/styles/medium/public/2020-12/woman-looking-in-fridge-and-person-writing-meal-plan-in-notebook.png?itok=AsRSGGso"
            alt="Food and Chemical Tracking"
            width={400}
            height={400}
            className="mx-auto mb-4"
          />
          <Link
            href="/profile"
            className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition-colors duration-300 inline-block"
          >
            Go to your profile
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Explore food triggers
          </h2>
          <p className="text-lg mb-4 text-gray-700">
            Migraine Pal provides information on different treatment options for
            migraines, such as medication, lifestyle changes, and alternative
            therapies. You can also track your treatment progress to see what's
            working best for you.
          </p>
          <Image
            src="https://organicconsumers.org/wp-content/uploads/2018/11/food_1.png"
            alt="Food Triggers"
            width={400}
            height={400}
            className="mx-auto mb-4"
          />
          <Link
            href="/food-triggers"
            className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition-colors duration-300 inline-block"
          >
            Learn more
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Explore chemical triggers
          </h2>
          <p className="text-lg mb-4 text-gray-700">
            Migraine Pal provides information on different treatment options for
            migraines, such as medication, lifestyle changes, and alternative
            therapies. You can also track your treatment progress to see what's
            working best for you.
          </p>
          <Image
            src="https://www.biologyonline.com/wp-content/uploads/2020/02/Chemical-composition-of-the-body-1536x863.jpg"
            alt="Chemical triggers"
            width={400}
            height={400}
            className="mx-auto mb-4"
          />
          <Link
            href="/chemical-triggers"
            className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition-colors duration-300 inline-block"
          >
            Learn more
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Check your food labels for common triggers
          </h2>
          <p className="text-lg mb-4 text-gray-700">
            Scan ingredient labels and, with the push of a button, find out if
            any of the ingredients are common triggers.
          </p>
          <Image
            src="https://www.aibinternational.com/wp-content/uploads/2021/09/Card_NutritionLabel-e1636649707282.jpg"
            alt="Ingredient Label"
            width={400}
            height={400}
            className="mx-auto mb-4"
          />
          <Link
            href="/label-reader"
            className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition-colors duration-300 inline-block"
          >
            Go to label reader
          </Link>
        </div>
      </div>
    </main>
  );
}
