import { DeepChat } from 'deep-chat-react';
import './App.css';
import './style.css';
import React, { useEffect, useState } from 'react';

interface Message {
    text?: string;
}

interface ConversationState {
    suggestions: string[];
    response: string;
}

const App: React.FC = () => {
    const [conversationState, setConversationState] = useState<ConversationState>({
        suggestions: ['Tell me about the product', 'Features of the product', 'Pricing details'],
        response: 'What would you like to know about our product?',
    });

    const [messages, setMessages] = useState<
        { text?: string; role: string; html?: string }[]
    >([
        { text: 'Welcome to next big thing', role: 'ai' },
        { text: 'I am Launchbot and...', role: 'ai' },
        { text: 'I am going to give you an idea on how you could showcase your product', role: 'ai' },
        {
            html: `
        <div class="deep-chat-temporary-message">
          <button class="deep-chat-button deep-chat-suggestion-button" style="border: 1px solid green">Proceed</button>
          <button class="deep-chat-button deep-chat-suggestion-button" style="border: 1px solid #d80000">Not interested</button>
        </div>`,
            role: 'user',
        },
    ]);
    const handleButtonClick = (event: any) => {
        const button = event.target.value;
        // if (button.classList.contains('deep-chat-suggestion-button')) {
            const userChoice = button;

            let response = '';
            let suggestions: string[] = [];

            if (userChoice === 'Tell me about the product') {
                response = 'We are launching a new tech gadget called TechGizmo. What else would you like to know?';
                suggestions = ['Features of the product', 'Pricing details', 'Launch date'];
            } else if (userChoice === 'Features of the product') {
                response = 'TechGizmo features cutting-edge technology and a user-friendly design. What else would you like to know?';
                suggestions = ['Pricing details', 'Launch date', 'Tell me about the product'];
            } else if (userChoice === 'Pricing details') {
                response = 'The price of TechGizmo will be $299. What else would you like to know?';
                suggestions = ['Launch date', 'Features of the product', 'Tell me about the product'];
            } else if (userChoice === 'Launch date') {
                response = 'TechGizmo will be available starting next month. What else would you like to know?';
                suggestions = ['Pricing details', 'Features of the product', 'Tell me about the product'];
            } else {
                response = 'I am not sure about that. Can you ask something else?';
                suggestions = ['Tell me about the product', 'Features of the product', 'Pricing details'];
            }

            setConversationState({ response, suggestions });
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: userChoice, role: 'user' },
                {
                    html: `
              <div>
                <p>${response}</p>
                <div class="deep-chat-temporary-message">
                  ${suggestions
                        .map(
                            (suggestion) => `
                    <button class="deep-chat-button deep-chat-suggestion-button" style="border: 1px solid green">${suggestion}</button>
                  `,
                        )
                        .join('')}
                </div>
              </div>
            `,
                    role: 'ai',
                },
            ]);
        }
   // };
    useEffect(() => {


        document.body.addEventListener('click', handleButtonClick);

        return () => {
            document.body.removeEventListener('click', handleButtonClick);
        };
    }, [conversationState]);

    return (
        <div className="App">
            <h1>Deep Chat</h1>
            <DeepChat initialMessages={messages} demo={true} />
        </div>
    );
};

export default App;
