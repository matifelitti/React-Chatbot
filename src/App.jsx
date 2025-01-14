import { useRef, useState } from "react";
import "./index.css";

function App() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I help you?" },
  ]);
  const inputRef = useRef();

  const chatbotResponse = async (message) => {
    const apiUrl = import.meta.env.VITE_API_URL;

    if (!apiUrl) {
      console.error("API_URL is missing. Check your .env file.");
      return "Configuration error: Missing API URL.";
    }

    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        instances: [
          {
            content: message,
          },
        ],
        parameters: {
          temperature: 0.7,
        },
      }),
    };

    try {
      const response = await fetch(apiUrl, request);
      const text = await response.text();

      if (!response.ok) {
        console.error(`Error ${response.status}: ${text}`);
        return `Error: ${response.statusText}`;
      }

      const data = JSON.parse(text);
      return data?.candidates?.[0]?.output || "No response from API";
    } catch (error) {
      console.error("Error:", error);
      return "Sorry, I couldn't process your request.";
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const message = inputRef.current.value.trim();
    if (!message) return;
    inputRef.current.value = "";

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: message },
    ]);

    const responseMessage = await chatbotResponse(message);

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "bot", text: responseMessage },
    ]);
  };

  return (
    <div className="m-auto mt-8 w-full max-w-sm h-[500px] col-auto flex flex-col justify-between shadow-lg border border-teal-600 rounded-lg bg-white">
      <div className="p-2 text-center text-xl text-teal-50 font-bold bg-teal-600 rounded-t-lg">
        Chatbot
      </div>
      <div className="h-80 overflow-y-auto px-4 py-2 message-scrollbar">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mt-2 mb-2 p-2 rounded-lg ${
              msg.sender === "bot" ? "bg-teal-100 text-teal-900" : "bg-teal-200"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <form
        action="#"
        className="flex items-center px-4 py-3 bg-gray-50 rounded-b-lg"
        onSubmit={handleFormSubmit}
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Type a message..."
          className="flex-grow rounded-l-lg border border-teal-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-teal-600 text-white font-bold rounded-r-lg hover:bg-teal-700 focus:outline-none"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default App;
