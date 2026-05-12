import React, { useState, useRef, useEffect } from 'react';

function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hello! I'm your Rental Bond Assistant. How can I help you today?", sender: 'bot', time: new Date().toLocaleTimeString() }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const getBotResponse = (userMessage) => {
        const msg = userMessage.toLowerCase();
        if (msg.includes('bond') || msg.includes('bond amount')) {
            return "Rental bonds in Australia are typically 4-6 weeks of rent. You can track your bond amount, payment date, and refund status in the Bonds section of your dashboard.";
        } else if (msg.includes('inspection')) {
            return "Inspections are crucial for protecting your bond. Always take photos and keep detailed notes. You can record all your inspections in the Inspections section.";
        } else if (msg.includes('property') || msg.includes('add property')) {
            return "To add a property, go to the Dashboard and click 'Add Property'. Fill in the address, landlord details, and lease dates.";
        } else if (msg.includes('document') || msg.includes('upload')) {
            return "You can upload lease agreements, bond receipts, and inspection reports in the Documents section. Supported formats: PDF, JPEG, PNG, DOCX.";
        } else if (msg.includes('login') || msg.includes('password')) {
            return "If you forgot your password, click 'Forgot Password' on the login page. You'll receive a reset link to your email.";
        } else if (msg.includes('refund')) {
            return "When your lease ends, update the bond status to 'Refunded' in the Bonds section. Enter the refund amount and date to track deductions.";
        } else {
            return "I can help you with questions about rental bonds, property inspections, document uploads, bond refunds, and tenancy management. What would you like to know?";
        }
    };

    const handleSend = async () => {
        if (!input.trim()) return;
        const userMessage = { text: input, sender: 'user', time: new Date().toLocaleTimeString() };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);
        setTimeout(() => {
            const botResponse = getBotResponse(input);
            setMessages(prev => [...prev, { text: botResponse, sender: 'bot', time: new Date().toLocaleTimeString() }]);
            setIsTyping(false);
        }, 800);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    const suggestedQuestions = [
        "How much bond should I pay?",
        "How to add a property?",
        "What documents should I upload?",
        "How to get my bond refund?"
    ];

    return (
        <>
            {!isOpen && (
                <button onClick={() => setIsOpen(true)} style={styles.chatButton}>
                    <span style={styles.chatIcon}>💬</span>
                    <span style={styles.chatText}>Need Help?</span>
                </button>
            )}
            {isOpen && (
                <div style={styles.chatWindow}>
                    <div style={styles.chatHeader}>
                        <div style={styles.chatHeaderLeft}>
                            <span style={styles.chatBotIcon}>🤖</span>
                            <div>
                                <h3 style={styles.chatTitle}>Rental Bond Assistant</h3>
                                <p style={styles.chatStatus}>Online • Ready to help</p>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} style={styles.chatCloseBtn}>✕</button>
                    </div>
                    <div style={styles.chatMessages}>
                        {messages.map((msg, idx) => (
                            <div key={idx} style={{...styles.message, justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'}}>
                                <div style={{...styles.messageBubble, background: msg.sender === 'user' ? '#667eea' : 'rgba(255,255,255,0.2)', color: msg.sender === 'user' ? 'white' : 'white'}}>
                                    <p style={styles.messageText}>{msg.text}</p>
                                    <span style={styles.messageTime}>{msg.time}</span>
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div style={styles.typingIndicator}>
                                <span>●</span><span>●</span><span>●</span>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    <div style={styles.suggestedContainer}>
                        {suggestedQuestions.map((q, idx) => (
                            <button key={idx} onClick={() => setInput(q)} style={styles.suggestedBtn}>{q}</button>
                        ))}
                    </div>
                    <div style={styles.chatInputContainer}>
                        <input type="text" placeholder="Ask me anything..." value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={handleKeyPress} style={styles.chatInput} />
                        <button onClick={handleSend} style={styles.chatSendBtn}>Send</button>
                    </div>
                </div>
            )}
        </>
    );
}

const styles = {
    chatButton: {
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '60px',
        padding: '14px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        cursor: 'pointer',
        boxShadow: '0 10px 25px rgba(102,126,234,0.4)',
        zIndex: 1000,
        fontWeight: '600',
    },
    chatIcon: { fontSize: '24px' },
    chatText: { fontSize: '16px' },
    chatWindow: {
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        width: '380px',
        height: '550px',
        background: 'rgba(26,26,46,0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: '20px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        zIndex: 1000,
        border: '1px solid rgba(255,255,255,0.2)',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
    },
    chatHeader: {
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        padding: '16px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    chatHeaderLeft: { display: 'flex', alignItems: 'center', gap: '12px' },
    chatBotIcon: { fontSize: '32px' },
    chatTitle: { fontSize: '16px', fontWeight: 'bold', margin: 0, color: 'white' },
    chatStatus: { fontSize: '11px', margin: '2px 0 0', opacity: 0.8, color: 'white' },
    chatCloseBtn: { background: 'none', border: 'none', color: 'white', fontSize: '20px', cursor: 'pointer' },
    chatMessages: { flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' },
    message: { display: 'flex', width: '100%' },
    messageBubble: { maxWidth: '80%', padding: '10px 14px', borderRadius: '18px' },
    messageText: { fontSize: '13px', margin: 0, lineHeight: 1.4, color: 'white' },
    messageTime: { fontSize: '9px', opacity: 0.6, marginTop: '4px', display: 'block', color: 'rgba(255,255,255,0.7)' },
    typingIndicator: { display: 'flex', gap: '4px', padding: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '20px', width: '50px', justifyContent: 'center' },
    suggestedContainer: { display: 'flex', gap: '8px', padding: '12px', overflowX: 'auto', borderTop: '1px solid rgba(255,255,255,0.1)' },
    suggestedBtn: { background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', padding: '6px 12px', borderRadius: '20px', fontSize: '11px', cursor: 'pointer', whiteSpace: 'nowrap', color: 'white' },
    chatInputContainer: { display: 'flex', padding: '12px', borderTop: '1px solid rgba(255,255,255,0.1)', gap: '8px' },
    chatInput: { flex: 1, padding: '10px 14px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '25px', outline: 'none', fontSize: '13px', background: 'rgba(255,255,255,0.1)', color: 'white' },
    chatSendBtn: { background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', border: 'none', borderRadius: '25px', padding: '0 20px', cursor: 'pointer', fontWeight: '600' },
};

export default ChatBot;