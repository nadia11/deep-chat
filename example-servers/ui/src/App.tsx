import { DeepChat } from 'deep-chat-react';
import './App.css';
import './style.css';
import React, { useEffect, useState } from 'react';

interface Node {
  chat_id: string;
  node_id: string;
  data: NodeDataType;
}

export type NodeDataType = {
  background?: string;
  type?: string;
  label: string;
  icon: string; // Adjusted for simplicity
  description?: string;
  message_data?: MessageNodeData;
  buttons_data?: IButtons;
  card_data?: {
    cards: ICard[];
  };
};

export interface ICard {
  title: string;
  background?: string;
  description?: string;
  image: string;
  buttons: {
    name: string;
    type: "action" | "url";
    link: string;
  }[];
}

export interface IButtons {
  messages: ButtonNodeData[];
  buttons?: {
    button: string;
    type: string;
  }[];
}

export interface ButtonNodeData {
  type: MessageType;
  message: string;
}

export enum MessageType {
  TEXT = "text",
  IMAGE = "image"
}

interface MessageNodeData {
  messages: MessgeData[];
}

interface MessgeData {
  type: MessageType;
  message: string;
}

function App() {
  const [initialMessages, setInitialMessages] = useState<{ text?: string; role: string; html?: string }[]>([]);

  useEffect(() => {
    const fetchInitialMessages = async () => {
      try {
        const chat_id = 'd290f1ee-6c54-4b01-90e6-d701748f0851'; // replace with your actual chat_id
        const response = await fetch(`http://localhost:5000/nodes/${chat_id}`);
        const nodes: Node[] = await response.json();

        console.log('Fetched nodes:', nodes); // Debugging

        const messages = nodes.map(node => {
          if (node.data.type === 'buttons' || node.data.type === 'card' || node.data.type === 'image') {
            return {
              html: generateHTML(node.data),
              role: 'ai'
            };
          } else if (node.data.message_data) {
            return {
              text: node.data.message_data.messages[0]?.message || '',
              role: 'ai'
            };
          }
          return { text: '', role: 'ai' };
        });

        setInitialMessages(messages);
      } catch (error) {
        console.error('Error fetching initial messages:', error);
      }
    };

    fetchInitialMessages();
  }, []);

  const generateHTML = (data: NodeDataType) => {
    console.log('Generating HTML for data:', data); // Debugging

    if (data.type === 'buttons' && data.buttons_data) {
      const messageHtml = data.buttons_data.messages.length > 0
        ? data.buttons_data.messages.map((message: ButtonNodeData) => `<p>${message.message}</p>`).join('')
        : '<p>No messages available</p>';

      const buttonsHtml = data.buttons_data.buttons && data.buttons_data.buttons.length > 0
        ? data.buttons_data.buttons.map((button) => `<button class="deep-chat-button deep-chat-suggestion-button" style="border: 1px solid green">${button.button}</button>`).join('')
        : '<p>No buttons available</p>';

      return `
                <div class="deep-chat-temporary-message">
                    ${messageHtml}
                    ${buttonsHtml}
                </div>
            `;
    } else if (data.type === 'card' && data.card_data) {
      return `
                <div class="deep-chat-temporary-message">
                    ${data.card_data.cards?.map((card) => `
                        <div>
                            <h3>${card.title}</h3>
                            <p>${card.description}</p>
                            <img src="${card.image}" alt="${card.title}" />
                            ${card.buttons.map((button) => `
                                <button class="deep-chat-button deep-chat-suggestion-button" style="border: 1px solid green">${button.name}</button>
                            `).join('')}
                        </div>
                    `).join('') || ''}
                </div>
            `;
    } else if (data.type === 'image' && data.message_data) {
      return `
                <div class="deep-chat-temporary-message">
                    ${data.message_data.messages[0] ? `<img src="${data.message_data.messages[0].message}" alt="Image" />` : '<p>No image available</p>'}
                </div>
            `;
    }
    return '<p>No data available</p>';
  };

  return (
    <div className="App">
      <h1>Deep Chat</h1>
      <DeepChat initialMessages={initialMessages} demo={true} inputAreaStyle={{ display: 'none' }} />
    </div>
  );
}

export default App;
