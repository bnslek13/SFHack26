import { useState } from "react";
import "./App.css";
import Itinerary from './components/Itinerary';


function App() {
 const [input, setInput] = useState("");
 const [messages, setMessages] = useState([
   { text: "How many hours do you have in your day?", sender: "bot" }
 ]);
 const [hours, setHours] = useState(null);
 const [userInput, setUserInput] = useState("");
 const [itineraryGenerated, setItineraryGenerated] = useState(0);
 const [step, setStep] = useState('hours');


 const handleSend = async () => {
   if (!input.trim()) return;
   addMessage(input, "user");
   const currentInput = input;
   setInput("");

   if (step === 'hours') {
     const value = parseFloat(currentInput);
     if (isNaN(value)) {
       addMessage("Please enter a valid number.", "bot");
     } else if (value <= 0 || value > 24) {
       addMessage("Enter a number between 1 and 24 hours.", "bot");
     } else {
       setHours(value);
       addMessage(`You have ${value} hours. What are your interests? (e.g., food, sights, adventure)`, "bot");
       setStep('interests');
     }
   } else if (step === 'interests') {
     setUserInput(currentInput);
     addMessage("Generating your itinerary...", "bot");
     try {
       await fetch('/api/recommend-places', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ hours, userInput: currentInput }),
       });
       setItineraryGenerated(prev => prev + 1);
       addMessage("Here's your itinerary!", "bot");
     } catch (error) {
       console.error(error);
       addMessage("Sorry, there was an error generating your itinerary.", "bot");
     }
   }
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

       {/* Itinerary */}
       {itineraryGenerated > 0 && <Itinerary key={itineraryGenerated} />}


       {/* Input */}
       <div className="search-bar">
         <input
           placeholder={step === 'hours' ? "Enter hours (e.g. 5.5)" : "Enter your interests"}
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
