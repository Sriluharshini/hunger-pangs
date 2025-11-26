import React, { useEffect, useState } from "react";

export default function ChatBot() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        if (open) {
            setMessages([
                { sender: "bot", text: "Hello there! How may I help you?" }
            ]);
        }
    }, [open]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: "user", text: input };
        setMessages(prev => [...prev, userMessage]);

        const userInput = input;
        setInput("");

        try {
            const res = await fetch("http://localhost:5000/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userInput })
            });

            const data = await res.json();

            const botResponse = {
                sender: "bot",
                text: data.reply || "Couldn't get a response"
            };

            setMessages(prev => [...prev, botResponse]);
        } catch (err) {
            setMessages(prev => [
                ...prev,
                { sender: "bot", text: "Server error. Please try again later." }
            ]);
        }
    };


    return (
        <>
            {/* Chat Bubble Button */}
            <button
                onClick={() => setOpen(!open)}
                className="fixed bottom-6 right-6 bg-blue-600 text-white w-14 h-14 rounded-full shadow-xl text-2xl flex items-center justify-center hover:bg-blue-700 z-50"
            >
                💬
            </button>

            {/* Chat Window */}
            {open && (
                <div className="fixed bottom-24 right-6 bg-white w-80 h-96 shadow-xl rounded-xl flex flex-col z-50">
                    <div className="bg-blue-600 text-white p-3 rounded-t-xl font-semibold">
                        Hunger Pangs Support Bot
                    </div>

                    <div className="flex-1 p-3 overflow-y-auto">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`mb-2 p-2 rounded-lg max-w-[70%] ${msg.sender === "user"
                                    ? "bg-blue-100 ml-auto text-right"
                                    : "bg-gray-200"
                                    }`}
                            >
                                {msg.text}
                            </div>
                        ))}
                    </div>

                    {/* Input Box */}
                    <div className="p-3 border-t flex gap-2">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                            className="border rounded px-2 py-1 flex-1"
                            placeholder="Type a message..."
                        />
                        <button
                            onClick={sendMessage}
                            className="bg-blue-600 text-white px-3 rounded"
                        >
                            ➤
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
