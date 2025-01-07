import { useState } from "react";
import "./index.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="m-auto mt-8 w-80 h-96 col-auto justify-end shadow-lg border-solid border-2 border-teal-600/75">
      <div className=" p-1 text-center text-2xl text-teal-50 font-medium bg-teal-600/75">
        Chatbot
      </div>
      <div className="h-60">
        <div className="mt-8 mb-4 ml-12 pt-2 pl-2 w-60 bg-teal-100/75 rounded">
          Hello! How can I help you?
        </div>
      </div>

      <form action="" className="flex items-center">
        <input
          type="text"
          placeholder="message"
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
