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
    <div className="m-auto mt-8 w-80 h-96 col-auto justify-end shadow-lg border-solid border-2 border-teal-600/75">
      <div className="p-1 text-center text-2xl text-teal-50 font-medium bg-teal-600/75">
        Chatbot
      </div>
      <div className="h-60 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mt-4 mb-4 ml-5 pt-2 pl-2 w-60 rounded ${
              msg.sender === "bot" ? "bg-teal-100/75" : "bg-teal-200/75"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <form
        action="#"
        className="flex items-center"
        onSubmit={handleFormSubmit}
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Message"
          className="my-1 mb-2 ml-5 pt-2 pl-2 w-56 rounded border-2 border-[#0d9488] focus:outline-none"
          required
        />
        <button className="my-1 mb-2 ml-3 px-2 w-12 h-9 text-white bg-teal-600/75 rounded">
          ^
        </button>
      </form>
    </div>
  );
}

export default App;
