import {RequestDetails} from 'deep-chat/dist/types/interceptors';
import {DeepChat} from 'deep-chat-react';
import './App.css';
import './style.css';
import {useEffect} from "react";
interface Message {
    text?: string;
}
interface DeepChatElement extends HTMLElement {
    demo?: {
        response: (message: Message) => { text: string };
    };
}
function App() {
    useEffect(() => {
        const chatElementRef = document.getElementById('chat-element') as DeepChatElement;
        if (chatElementRef) {
            chatElementRef.demo = {
                response: (message: Message) => {
                    const productQuestions = [
                        { question: 'What type of product you are launching', answer: 'We are launching a new tech gadget.' },
                        { question: 'What is the name of your product', answer: 'Our product is called TechGizmo.' },
                        { question: 'What features does it have', answer: 'TechGizmo features cutting-edge technology and user-friendly design.' },
                        { question: 'When will it be available', answer: 'TechGizmo will be available starting next month.' },
                        { question: 'What is the price', answer: 'The price of TechGizmo will be $299.' }
                    ];

                    const userQuestion = message.text?.toLowerCase();
                    const foundAnswer = productQuestions.find(q => userQuestion?.includes(q.question.toLowerCase()));
                    let response = 'I am not sure about that. Can you ask something else?';
                    if (foundAnswer) {
                        response = foundAnswer.answer;
                    }

                    return { text: response };
                },
            };
        }
    }, []);
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
          <DeepChat id="chat-element" initialMessages={initialMessages} demo={true} />
      </div>
  );
}

export default App;
