import React from 'react';

const initialMessages = [
    { text: 'What is the meaning of life?', role: 'user' },
    {
        text: 'This ultimately depends on the person, but it could be the pursuit of happiness or fulfillment.',
        role: 'ai'
    },
    {
        text: 'We don\'t laugh because we feel good, we feel good because we laugh.',
        role: 'bob'
    }
];

const messageStyles = {
    default: {
        shared: { bubble: { color: 'white' } },
        ai: { bubble: { backgroundColor: '#3cbe3c' } },
        user: { bubble: { backgroundColor: '#6767ff' } },
        bob: { bubble: { backgroundColor: '#ffa500' } }
    }
};

const DeepChat = () => {
    return (
        <div style={{ borderRadius: '8px', padding: '10px', border: '1px solid #ccc' }}>
            {initialMessages.map((message, index) => (
                <div
                    key={index}
                    style={{
                        ...messageStyles.default.shared.bubble,
                        ...messageStyles.default[message.role].bubble,
                        padding: '10px',
                        margin: '5px 0',
                        borderRadius: '4px'
                    }}
                >
                    {message.text}
                </div>
            ))}
        </div>
    );
};

export default DeepChat;
