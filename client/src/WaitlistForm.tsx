import React, { useState } from "react";

const WaitlistForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      if (res.ok) {
        setMessage("✅ Email sent successfully!");
        setEmail(""); // clear form
      } else {
        const data = await res.json();
        setMessage("❌ " + (data.error || "Something went wrong"));
      }
    } catch (err) {
      setMessage("❌ Failed to connect to server.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        required
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border px-4 py-2 rounded w-full"
      />
      <button
        type="submit"
        className="bg-purple-600 text-white px-6 py-2 rounded"
      >
        Join Waitlist
      </button>
      {message && <p className="text-sm">{message}</p>}
    </form>
  );
};

export default WaitlistForm;
