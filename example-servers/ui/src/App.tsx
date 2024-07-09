import {RequestDetails} from 'deep-chat/dist/types/interceptors';
import {DeepChat} from 'deep-chat-react';
import './App.css';
import './style.css';
import {useEffect} from "react";

function App() {

    const initialMessages = [
        {text: 'Welcome to next big thing', role: 'ai'},
        {text: 'I am Launchbot and...', role: 'ai'},
        {text: 'I am going to give you an idea on how you could showcase your product', role: 'ai'},
        {
            html: `
      <div class="deep-chat-temporary-message">
        <button class="deep-chat-button deep-chat-suggestion-button" style="border: 1px solid green">Proceed</button>
        <button class="deep-chat-button deep-chat-suggestion-button" style="border: 1px solid #d80000">Not interested</button>
      </div>`,
            role: 'user',
        },];
  return (

      <div className="App">
          <h1>Deep Chat</h1>
          <DeepChat initialMessages={initialMessages} demo={true} inputAreaStyle={{"display": "none"}}/>
      </div>
  );
}

export default App;
