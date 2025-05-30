import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/authStore';
import './style.css';


function ChatMessages() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [error, setError] = useState(null);
    const [isMinimized, setIsMinimized] = useState(false);
    const messagesEndRef = useRef(null);
    const { profile, user } = useAuthStore();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const fetchMessages = async () => {
        try {
            const { data, error } = await supabase
                .from('messages')
                .select('*')
                .order('inserted_at', { ascending: true }); // ✅ campo corregido

            if (error) throw error;
            setMessages(data);
            scrollToBottom();
        } catch (error) {
            console.error('Error al obtener mensajes:', error.message);
            setError('Error al cargar los mensajes. Intenta de nuevo más tarde.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!newMessage.trim()) {
            setError('Por favor, escribe un mensaje.');
            return;
        }

        try {
            const username = profile?.nombre_usuario || user?.email || 'Usuario';
            const { error } = await supabase
                .from('messages')
                .insert([{ username, content: newMessage.trim() }]);

            if (error) throw error;
            setNewMessage('');
        } catch (error) {
            console.error('Error al enviar mensaje:', error.message);
            setError('Error al enviar tu mensaje. Intenta de nuevo.');
        }
    };

    useEffect(() => {
        fetchMessages();

        const messageSubscription = supabase
            .channel('public:messages')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'messages' },
                (payload) => {
                    if (payload.eventType === 'INSERT') {
                        setMessages((prevMessages) => [...prevMessages, payload.new]);
                        setTimeout(scrollToBottom, 100);
                    } else if (payload.eventType === 'DELETE') {
                        setMessages((prevMessages) =>
                            prevMessages.filter((msg) => msg.id !== payload.old.id)
                        );
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(messageSubscription);
        };
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className={`chat-container ${isMinimized ? 'minimized' : ''}`}>
            <div className="chat-header">
                <h2>Chat en vivo</h2>
                <button 
                    className="chat-toggle-btn"
                    onClick={() => setIsMinimized(!isMinimized)}
                >
                    {isMinimized ? '▲' : '▼'}
                </button>
            </div>

            {error && <p className="error-message">{error}</p>}

            <div className="messages-list">
                {messages.length === 0 && <p>No hay mensajes todavía. ¡Sé el primero en comentar!</p>}
                {messages.map((msg) => (
                    <div key={msg.id} className="message-item">
                        <strong>{msg.username}</strong> ({new Date(msg.inserted_at).toLocaleString()}):
                        <p>{msg.content}</p>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="message-form">
                <textarea
                    placeholder="Escribe tu mensaje..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    rows="3"
                    required
                    className="chat-textarea"
                ></textarea>
                <button type="submit" className="chat-button">Enviar</button>
            </form>
        </div>
    );
}

export default ChatMessages;
