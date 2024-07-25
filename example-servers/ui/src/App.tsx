import { DeepChat } from 'deep-chat-react';
import './App.css';
import './style.css';
import React, { useEffect, useState, useRef } from 'react';

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

interface ChatMessage {
  text?: string;
  role: string;
  html?: string;
}

const App: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [currentNodeIndex, setCurrentNodeIndex] = useState(0);
  const chatRef = useRef<any>(null); // Create a ref for DeepChat component

  const sampleInitialMessage: ChatMessage[] = [
    {
      text: 'Welcome to Deep Chat!',
      role: 'ai'
    }
  ];

  useEffect(() => {
    const fetchInitialMessages = async () => {
      try {
        const chat_id = 'd290f1ee-6c54-4b01-90e6-d701748f0851'; // replace with your actual chat_id
        const response = await fetch(`http://localhost:5000/nodes/${chat_id}`);
        const fetchedNodes: Node[] = await response.json();

        console.log('Fetched nodes:', fetchedNodes); // Debugging

        setNodes(fetchedNodes);
      } catch (error) {
        console.error('Error fetching initial messages:', error);
      }
    };

    fetchInitialMessages();
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.demo = {
        response: (message: any) => {
          const nextIndex = currentNodeIndex + 1;
          if (nextIndex <= nodes.length) {
            const node = nodes[nextIndex];
            let responseMessage = '';

            if (node.data.buttons_data || node.data.card_data || node.data.type === 'image') {
              responseMessage = generateHTML(node.data);
            } else if (node.data.message_data) {
              responseMessage = node.data.message_data.messages[0]?.message || '';
            }

            setCurrentNodeIndex(nextIndex);

            return { text: "responseMessage" };
          } else {
            return { text: 'No more messages.' };
          }
        },

      };
    }
  }, [currentNodeIndex, nodes]);
  useEffect(() => {
    // (window as any).changeNode = () =>{
    //  setCurrentNodeIndex(1);
    // }
    if (chatRef.current) {
      chatRef.current.history = [
        {html: '<button class="custom-button">Hoverable</button>', role: 'user'},
        {html: '<button class="custom-button ai-button">Hoverable</button>', role: 'ai'},
      ];
    }
  }, []);

  const generateHTML = (data: NodeDataType) => {
    console.log('Generating HTML for data:', data); // Debugging

    if ( data.buttons_data) {
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
    } else if ( data.card_data) {
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
    } else if ( data.message_data) {
      return `
                <div class="deep-chat-temporary-message">
                    ${data.message_data.messages[0] ? `<img src="${data.message_data.messages[0].message}" alt="Image"  style="height: 20%;width:20%"/>` : '<p>No image available</p>'}
                </div>
            `;
    }
    return '<p>No data available</p>';
  };

  return (
    <div className="App">
      <h1>Deep Chat</h1>
      <DeepChat
        id="chat-element"
        ref={chatRef}
        initialMessages={sampleInitialMessage}
        style={{ borderRadius: '8px' }}
        inputAreaStyle={{ display: 'none' }}
      />
    </div>
  );
};

export default App;
