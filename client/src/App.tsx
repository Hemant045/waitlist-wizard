import React from "react";
import WaitlistForm from "./WaitlistForm";

const App = () => {
  return (
    <div className="min-h-screen bg-white text-black p-8">
      <h1 className="text-3xl font-bold">👋 Welcome to My Site</h1>
      <p>This is my actual homepage now!</p>

      {/* Waitlist form yaha render karega */}
      <WaitlistForm />
    </div>
  );
};

export default App;
