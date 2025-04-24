import React from "react";
import WaitlistForm from "./WaitlistForm"; // path sahi ho

const App = () => {
  return (
    <div className="min-h-screen p-8 bg-white text-black">
      <h1 className="text-3xl font-bold mb-4">🚀 Join Courseova Waitlist</h1>
      <WaitlistForm />
    </div>
  );
};

export default App;
