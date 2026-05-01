import { useState } from "react";
import "./App.css";


function App() {
 const [input, setInput] = useState("");
 const [messages, setMessages] = useState([
   { text: "How many hours do you have in your day?", sender: "bot" }
 ]);


 const handleSend = () => {
   const value = parseFloat(input);


   // Validate input
   if (isNaN(value)) {
     addMessage("Please enter a valid number.", "bot");
   } else if (value <= 0 || value > 24) {
     addMessage("Enter a number between 1 and 24 hours.", "bot");
   } else {
     addMessage(`You have ${value} hours. Great! Let's plan your day.`, "bot");
     // 👉 You can move to next step here later
   }


   addMessage(input, "user");
   setInput("");
 };


 const addMessage = (text, sender) => {
   setMessages((prev) => [...prev, { text, sender }]);
 };


 return (
   <div className="page">
     <div className="overlay">
       <h1 className="title">Golden Gate Itineraries</h1>
       <h2 className="subtitle">Plan a Fun Day in SF with us.</h2>


       {/* Chat */}
       <div className="chat-container">
         {messages.map((msg, index) => (
           <div key={index} className={`message-row ${msg.sender}`}>
             <div className={`message ${msg.sender}`}>
               {msg.text}
             </div>
           </div>
         ))}
       </div>


       {/* Input */}
       <div className="search-bar">
         <input
           placeholder="Enter hours (e.g. 5.5)"
           value={input}
           onChange={(e) => setInput(e.target.value)}
         />
         <button onClick={handleSend}>➤</button>
       </div>
     </div>
   </div>
 );
}


export default App;
