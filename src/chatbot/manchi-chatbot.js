// Manchi Chatbot - Bilingual Pizza Assistant
// Main chatbot functionality for Manhattan Chicago Pizza

export class ManchiChatbot {
    constructor() {
        this.language = 'en';
        this.conversationHistory = [];
        this.isOpen = false;
        this.initialized = false;
        this.isTyping = false;
        this.typingTimeout = null;
        this.knowledgeBase = {
            hours: {
                en: "We're open Monday-Thursday 11am-9pm, Friday-Saturday 11am-10pm, Sunday 12pm-8pm",
                es: "Estamos abiertos Lunes-Jueves 11am-9pm, Viernes-Sábado 11am-10pm, Domingo 12pm-8pm"
            },
            popular: {
                en: "Our most popular pizzas are the Chicago Deep Dish Supreme and Manhattan Thin Crust Margherita!",
                es: "¡Nuestras pizzas más populares son la Chicago Deep Dish Supreme y Manhattan Thin Crust Margherita!"
            },
            location: {
                en: "We're located at Manhattan Chicago Pizza - come visit us for the best pizza in town!",
                es: "¡Estamos ubicados en Manhattan Chicago Pizza - ven a visitarnos para la mejor pizza de la ciudad!"
            },
            deals: {
                en: "Check out our family deals and combo specials! Perfect for sharing.",
                es: "¡Echa un vistazo a nuestras ofertas familiares y especiales de combo! Perfecto para compartir."
            }
        };
        this.init();
    }

    init() {
        if (this.initialized) return;
        this.injectStyles();
        this.createChatbotHTML();
        this.setupEventListeners();
        this.initialized = true;
        console.log('Manchi Chatbot initialized');
    }

    injectStyles() {
        const styleId = 'manchi-chatbot-styles';
        if (document.getElementById(styleId)) return;
        
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            #manchi-chatbot-container {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 10000;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }
            
            .manchi-chat-toggle {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: linear-gradient(135deg, #ff6900 0%, #ff8c42 100%);
                border: none;
                box-shadow: 0 4px 20px rgba(255, 105, 0, 0.4);
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
            }
            
            .manchi-chat-toggle:hover {
                transform: scale(1.05);
                box-shadow: 0 6px 25px rgba(255, 105, 0, 0.6);
            }
            
            .manchi-chat-toggle svg {
                transition: all 0.3s ease;
            }
            
            .manchi-chat-close {
                position: absolute;
                font-size: 28px;
                font-weight: 300;
                opacity: 0;
                transform: rotate(90deg);
                transition: all 0.3s ease;
            }
            
            .manchi-chatbot-open .manchi-chat-toggle svg {
                opacity: 0;
                transform: rotate(-90deg);
            }
            
            .manchi-chatbot-open .manchi-chat-close {
                opacity: 1;
                transform: rotate(0deg);
            }
            
            .manchi-chat-widget {
                position: absolute;
                bottom: 70px;
                right: 0;
                width: 350px;
                height: 500px;
                background: white;
                border-radius: 12px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
                opacity: 0;
                transform: translateY(20px) scale(0.95);
                transition: all 0.3s ease;
                pointer-events: none;
                overflow: hidden;
            }
            
            .manchi-chatbot-open .manchi-chat-widget {
                opacity: 1;
                transform: translateY(0) scale(1);
                pointer-events: all;
            }
            
            .manchi-chat-header {
                background: linear-gradient(135deg, #ff6900 0%, #ff8c42 100%);
                color: white;
                padding: 20px;
                display: flex;
                align-items: center;
                gap: 12px;
            }
            
            .manchi-chat-avatar {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.2);
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                font-size: 18px;
            }
            
            .manchi-chat-info h4 {
                margin: 0;
                font-size: 16px;
                font-weight: 600;
            }
            
            .manchi-status {
                font-size: 12px;
                opacity: 0.9;
            }
            
            .manchi-chat-messages {
                height: 360px;
                padding: 20px;
                overflow-y: auto;
                background: #f8f9fa;
            }
            
            .manchi-message {
                margin-bottom: 16px;
                display: flex;
                gap: 10px;
            }
            
            .manchi-message.user {
                flex-direction: row-reverse;
            }
            
            .manchi-message-content {
                max-width: 70%;
                padding: 12px 16px;
                border-radius: 18px;
                font-size: 14px;
                line-height: 1.4;
            }
            
            .manchi-message.bot .manchi-message-content {
                background: white;
                color: #333;
                border-bottom-left-radius: 4px;
            }
            
            .manchi-message.user .manchi-message-content {
                background: #ff6900;
                color: white;
                border-bottom-right-radius: 4px;
            }
            
            .manchi-chat-input {
                padding: 20px;
                border-top: 1px solid #eee;
                display: flex;
                gap: 10px;
                align-items: center;
            }
            
            .manchi-chat-input input {
                flex: 1;
                border: 1px solid #ddd;
                border-radius: 20px;
                padding: 10px 16px;
                font-size: 14px;
                outline: none;
            }
            
            .manchi-chat-input input:focus {
                border-color: #ff6900;
            }
            
            .manchi-send-btn {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: #ff6900;
                border: none;
                color: white;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease;
            }
            
            .manchi-send-btn:hover {
                background: #e55a00;
                transform: scale(1.05);
            }
            
            .manchi-quick-actions {
                padding: 0 20px 20px;
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
            }
            
            .manchi-quick-btn {
                background: #f0f0f0;
                border: none;
                border-radius: 16px;
                padding: 8px 12px;
                font-size: 12px;
                cursor: pointer;
                transition: all 0.2s ease;
                color: #666;
            }
            
            .manchi-quick-btn:hover {
                background: #ff6900;
                color: white;
            }
            
            @media (max-width: 480px) {
                .manchi-chat-widget {
                    width: calc(100vw - 40px);
                    right: -10px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    createChatbotHTML() {
        const existing = document.getElementById('manchi-chatbot-container');
        if (existing) existing.remove();

        const chatbotHTML = `
            <div id="manchi-chatbot-container" class="manchi-chatbot-closed">
                <button id="manchi-chat-toggle" class="manchi-chat-toggle" aria-label="Toggle chat">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="currentColor"/>
                    </svg>
                    <span class="manchi-chat-close">×</span>
                </button>

                <div id="manchi-chat-widget" class="manchi-chat-widget">
                    <div class="manchi-chat-header">
                        <div class="manchi-chat-avatar">🍕</div>
                        <div class="manchi-chat-info">
                            <h4>Manchi</h4>
                            <span class="manchi-status">Pizza Expert • Online</span>
                        </div>
                    </div>
                    
                    <div class="manchi-chat-messages" id="manchi-chat-messages">
                        <div class="manchi-message bot">
                            <div class="manchi-message-content">
                                ¡Hola! I'm Manchi, your pizza expert. How can I help you today? 🍕
                            </div>
                        </div>
                    </div>
                    
                    <div class="manchi-quick-actions">
                        <button class="manchi-quick-btn" data-message="What are your hours?">Hours</button>
                        <button class="manchi-quick-btn" data-message="What's your most popular pizza?">Popular Pizza</button>
                        <button class="manchi-quick-btn" data-message="Do you deliver?">Delivery</button>
                    </div>
                    
                    <div class="manchi-chat-input">
                        <input type="text" id="manchi-message-input" placeholder="Type your message..." maxlength="500">
                        <button id="manchi-send-btn" class="manchi-send-btn">➤</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        const toggle = document.getElementById('manchi-chat-toggle');
        const sendBtn = document.getElementById('manchi-send-btn');
        const input = document.getElementById('manchi-message-input');
        const quickBtns = document.querySelectorAll('.manchi-quick-btn');
        
        toggle.addEventListener('click', () => this.toggleChat());
        sendBtn.addEventListener('click', () => this.sendMessage());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        
        quickBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const message = btn.dataset.message;
                this.sendQuickMessage(message);
            });
        });
    }
    
    toggleChat() {
        const container = document.getElementById('manchi-chatbot-container');
        container.classList.toggle('manchi-chatbot-closed');
    }
    
    sendMessage() {
        const input = document.getElementById('manchi-message-input');
        const message = input.value.trim();
        if (!message) return;
        
        this.addMessage(message, 'user');
        input.value = '';
        
        setTimeout(() => {
            const response = this.generateResponse(message);
            this.addMessage(response, 'bot');
        }, 500);
    }
    
    sendQuickMessage(message) {
        this.addMessage(message, 'user');
        
        setTimeout(() => {
            const response = this.generateResponse(message);
            this.addMessage(response, 'bot');
        }, 500);
    }
    
    addMessage(text, type) {
        const messagesContainer = document.getElementById('manchi-chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `manchi-message ${type}`;
        messageDiv.innerHTML = `<div class="manchi-message-content">${text}</div>`;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Enhanced keyword matching with synonyms and variations
        const keywordMap = {
            'hours': ['hours', 'time', 'open', 'close', 'closed', 'when', 'schedule', 'operating'],
            'menu': ['menu', 'food', 'eat', 'order', 'pizza', 'pizzas', 'dish', 'dishes', 'what do you have', 'what can i get'],
            'delivery': ['delivery', 'deliver', 'order online', 'takeout', 'pickup', 'get food', 'bring'],
            'location': ['location', 'address', 'where', 'find you', 'directions', 'map'],
            'phone': ['phone', 'number', 'call', 'contact', 'telephone'],
            'popular': ['popular', 'best', 'favorite', 'most ordered', 'recommend', 'good', 'special'],
            'price': ['price', 'cost', 'expensive', 'cheap', 'how much', 'money', '$'],
            'chicago': ['chicago', 'deep dish', 'thick crust', 'stuffed'],
            'thin': ['thin', 'thin crust', 'crispy', 'new york'],
            'toppings': ['toppings', 'ingredients', 'pepperoni', 'sausage', 'cheese', 'vegetarian', 'meat'],
            'size': ['size', 'large', 'medium', 'small', 'personal', 'family'],
            'specials': ['special', 'deal', 'promotion', 'discount', 'offer', 'combo']
        };
        
        // Check for keyword matches
        for (const [baseKey, variations] of Object.entries(keywordMap)) {
            for (const variation of variations) {
                if (lowerMessage.includes(variation)) {
                    if (this.knowledgeBase[baseKey]) {
                        return this.knowledgeBase[baseKey];
                    }
                }
            }
        }
        
        // Greeting responses
        if (lowerMessage.match(/\b(hi|hello|hey|hola|good morning|good afternoon|good evening)\b/)) {
            const greetings = [
                "¡Hola! Welcome to Manhattan Chicago Pizza! How can I help you today? 🍕",
                "Hi there! Ready for some amazing Chicago-style pizza? What can I do for you? 🍕",
                "Hello! Thanks for visiting Manhattan Chicago Pizza. What would you like to know? 🍕"
            ];
            return greetings[Math.floor(Math.random() * greetings.length)];
        }
        
        // Thank you responses
        if (lowerMessage.match(/\b(thank|thanks|gracias|appreciate)\b/)) {
            return "You're welcome! Is there anything else I can help you with about Manhattan Chicago Pizza? 🍕";
        }
        
        // Goodbye responses
        if (lowerMessage.match(/\b(bye|goodbye|see you|later|adios)\b/)) {
            return "Thanks for chatting with me! Hope to see you soon at Manhattan Chicago Pizza! 🍕👋";
        }
        
        // Default response with helpful suggestions
        const suggestions = [
            "I'm here to help! Try asking me about our hours, menu, delivery, or location. 🍕",
            "Not sure what you're looking for? Ask me about our Chicago-style pizzas, hours, or delivery options! 🍕",
            "I'd love to help! You can ask me about our menu, prices, location, or anything about Manhattan Chicago Pizza! 🍕"
        ];
        
        return suggestions[Math.floor(Math.random() * suggestions.length)];
    }
}

// Initialize the chatbot when the DOM is loaded
if (typeof window !== 'undefined') {
    window.ManchiChatbot = ManchiChatbot;
}