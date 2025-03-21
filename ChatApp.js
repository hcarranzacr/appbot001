import { useState } from "react";

export default function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const API_URL = process.env.REACT_APP_API_URL; // Usa variable de entorno para la API

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput("");
    
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
      });
      
      const data = await response.json();
      const botMessage = { role: "assistant", content: data.response };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-4">
        <h1 className="text-xl font-bold mb-4">Chat con GPT (AWS)</h1>
        <div className="h-96 overflow-y-auto border p-2 mb-4">
          {messages.map((msg, index) => (
            <div key={index} className={`p-2 rounded my-2 ${msg.role === "user" ? "bg-blue-200 text-right" : "bg-gray-200 text-left"}`}>
              {msg.content}
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 border rounded-l"
            placeholder="Escribe un mensaje..."
          />
          <button onClick={sendMessage} className="bg-blue-500 text-white p-2 rounded-r">Enviar</button>
        </div>
      </div>
    </div>
  );
}
