import { useState } from "react";
import "./index.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex justify-center items-center shadow-lg">
      <div className="w-96 text-center text-2xl text-indigo-50 font-medium bg-indigo-800/75">
        Chatbot
      </div>
    </div>
  );
}

export default App;
