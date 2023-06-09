"use client";
import signIn from "@/firebase/auth/signin";
import signUp from "@/firebase/auth/signup";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getApp } from "firebase/app";
import {
  getAuth,
  EmailAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";

const firebaseAuthConfig = {
  signInFlow: "popup",
  // Auth providers
  // https://github.com/firebase/firebaseui-web#configure-oauth-providers
  signInOptions: [
    {
      provider: EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false,
    },
    {
      provider: GoogleAuthProvider.PROVIDER_ID,
      scopes: ["https://www.googleapis.com/auth/contacts.readonly"],
      customParameters: {
        prompt: "select_account",
      },
    },
  ],
  signInSuccessUrl: "/",
  credentialHelper: "none",
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
};

function Page() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();
  const auth = getAuth(getApp());

  const handleSignIn = async (event: any) => {
    event.preventDefault();

    const { result, error } = await signIn(email, password);

    if (error) {
      return console.log(error);
    }

    // else successful
    console.log(result);
    return router.push("/admin");
  };

  const handleSignUp = async (event: any) => {
    event.preventDefault();

    const { result, error } = await signUp(email, password);

    if (error) {
      return console.log(error);
    }

    // else successful
    console.log(result);
    return router.push("/admin");
  };

  return (
    <div className="flex flex-col items-center justify-between p-4">
      <div className="block h-12 justify-center font-bold ">
        Sign in with Firebase
      </div>
      <div className="wrapper">
        <div className="form-wrapper">
          <h1 className="mt-10 mb-2 font-bold">Sign in</h1>
          <form onSubmit={handleSignIn} className="form">
            <label htmlFor="email">
              <Input
                className="text-black mb-3"
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                name="email"
                id="email"
                placeholder="example@mail.com"
              />
              <br />
            </label>
            <label htmlFor="password">
              <Input
                className="text-black mb-3"
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
                name="password"
                id="password"
                placeholder="password"
              />
              <br />
            </label>
            <Button variant="contained" type="submit">
              Sign in
            </Button>
          </form>
        </div>

        <div className="form-wrapper">
          <h1 className="mt-10 mb-2 font-bold">Sign up</h1>
          <form onSubmit={handleSignUp} className="form">
            <label htmlFor="email">
              <Input
                className="text-black mb-3"
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                name="email"
                id="email"
                placeholder="example@mail.com"
              />
              <br />
            </label>
            <label htmlFor="password">
              <Input
                className="text-black mb-3"
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
                name="password"
                id="password"
                placeholder="password"
              />
              <br />
            </label>
            <Button variant="contained" type="submit">
              Sign up
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Page;
