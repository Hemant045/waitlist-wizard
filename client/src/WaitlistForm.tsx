import React, { useState } from "react";

const WaitlistForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("🎉 Email sent successfully!");
        setEmail(""); // Reset form
      } else {
        setMessage(`❌ Error: ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Something went wrong!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-10">
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">
        Notify Me
      </button>
      {message && <p className="text-center mt-2">{message}</p>}
    </form>
  );
};

export default WaitlistForm;
