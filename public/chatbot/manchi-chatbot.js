// Manchi Chatbot - Bilingual Pizza Assistant
// Main chatbot functionality for Manhattan Chicago Pizza

import { pizzaStyles, restaurantInfo, menuHighlights, faq, pricingInfo, bilingualResponses } from './knowledge/pizza_knowledge.js';

export class ManchiChatbot {
    constructor() {
        this.language = 'en'; // Default to English
        this.conversationHistory = [];
        this.isOpen = false;
        this.initialized = false;
        this.isTyping = false;
        this.typingTimeout = null;
        this.init();
    }

    init() {
        if (this.initialized) return;
        this.createChatbotHTML();
        this.attachEventListeners();
        this.initialized = true;
        console.log('Manchi Chatbot initialized');
    }

    createChatbotHTML() {
        // Remove existing chatbot if any
        const existing = document.getElementById('manchi-chatbot-container');
        if (existing) existing.remove();

        const chatbotHTML = `
            <div id="manchi-chatbot-container" class="manchi-chatbot-closed">
                <!-- Chat Toggle Button -->
                <button id="manchi-chat-toggle" class="manchi-chat-toggle" aria-label="Toggle chat">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="currentColor"/>
                    </svg>
                    <span class="manchi-chat-close">×</span>
                </button>

                <!-- Chat Widget -->
                <div id="manchi-chat-widget" class="manchi-chat-widget">
                    <!-- Chat Header -->
                    <div class="manchi-chat-header">
                        <div class="manchi-chat-avatar">
                            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNGRjY5MDAiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSI+CjxwYXRoIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMkM2IDEzIDggMTYgMTIgMTZTMTggMTMgMjIgMTJDMjIgNi40OCAxNy41MiAyIDEyIDJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4KPC9zdmc+" alt="Manchi">
                        </div>
                        <div class="manchi-chat-info">
                            <h4>Manchi</h4>
                            <span class="manchi-status">Pizza Expert • En línea</span>
                        </div>
                        <button class="manchi-minimize-btn" id="manchi-minimize">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M2 8h12M8 2l-6 6 6 6"/>
                            </svg>
                        </button>
                    </div>

                    <!-- Chat Messages -->
                    <div id="manchi-chat-messages" class="manchi-chat-messages">
                        <div class="manchi-message manchi-bot-message">
                            <div class="manchi-message-content">
                                ${bilingualResponses.greeting.en}
                            </div>
                            <div class="manchi-message-time">${this.getCurrentTime()}</div>
                        </div>
                    </div>

                    <!-- Language Toggle -->
                    <div class="manchi-language-toggle">
                        <button id="manchi-lang-toggle" class="manchi-lang-btn">
                            <span class="lang-en ${this.language === 'en' ? 'active' : ''}">EN</span>
                            <span class="lang-es ${this.language === 'es' ? 'active' : ''}">ES</span>
                        </button>
                    </div>

                    <!-- Chat Input -->
                    <div class="manchi-chat-input-container">
                        <input 
                            type="text" 
                            id="manchi-chat-input" 
                            class="manchi-chat-input" 
                            placeholder="${this.language === 'en' ? 'Ask about our pizzas...' : 'Pregunta sobre nuestras pizzas...'}" 
                            maxlength="500"
                        >
                        <button id="manchi-send-btn" class="manchi-send-btn">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2 10L18 2L11 10L18 18L2 10Z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
        this.addChatbotStyles();
    }

    addChatbotStyles() {
        if (document.getElementById('manchi-chatbot-styles')) return;

        const styles = `
            <style id="manchi-chatbot-styles">
                /* Base styles for the chatbot container - floating bubble */
                #manchi-chatbot-container {
                    position: fixed !important;
                    bottom: 20px;
                    right: 20px;
                    z-index: 999999;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    pointer-events: auto;
                    will-change: transform;
                }
                
                /* Ensure chatbot stays above everything */
                body {
                    position: relative;
                }
                
                /* Prevent any interference from page scrolling */
                 #manchi-chatbot-container * {
                     box-sizing: border-box;
                 }
                 
                 /* Mobile responsive adjustments */
                 @media (max-width: 768px) {
                     #manchi-chatbot-container {
                         bottom: 15px;
                         right: 15px;
                     }
                 }
                 
                 @media (max-width: 480px) {
                     #manchi-chatbot-container {
                         bottom: 10px;
                         right: 10px;
                     }
                 }
                 
                 /* Ensure chatbot is always visible even on scroll */
                 html, body {
                     overflow-x: auto;
                 }
                
                .manchi-chat-toggle {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #FF6900, #FF8C00);
                    border: none;
                    cursor: pointer;
                    box-shadow: 0 4px 20px rgba(255, 105, 0, 0.4);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 24px;
                    transition: all 0.3s ease;
                    position: relative;
                }
                
                .manchi-chat-toggle:hover {
                    transform: scale(1.1);
                    box-shadow: 0 6px 25px rgba(255, 105, 0, 0.5);
                }
                
                .manchi-chatbot-closed {
                    animation: float 3s ease-in-out infinite;
                }
                
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-5px);
                    }
                }
                
                .manchi-chatbot-open {
                    animation: none;
                }
                
                .manchi-chat-toggle svg {
                    transition: opacity 0.3s ease;
                }
                
                .manchi-chat-close {
                    position: absolute;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    font-size: 28px;
                    line-height: 1;
                }
                
                .manchi-chatbot-open .manchi-chat-toggle svg {
                    opacity: 0;
                }
                
                .manchi-chatbot-open .manchi-chat-close {
                    opacity: 1;
                }
                
                .manchi-chat-widget {
                    width: 350px;
                    height: 500px;
                    background: white;
                    border-radius: 16px;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
                    display: none;
                    flex-direction: column;
                    overflow: hidden;
                    position: absolute;
                    bottom: 70px;
                    right: 0;
                }
                
                .manchi-chatbot-open .manchi-chat-widget {
                    display: flex;
                }
                
                .manchi-chat-header {
                    background: linear-gradient(135deg, #FF6900, #FF8C00);
                    padding: 16px;
                    color: white;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                
                .manchi-chat-avatar img {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                }
                
                .manchi-chat-info {
                    flex: 1;
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
                
                .manchi-minimize-btn {
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                    padding: 4px;
                    border-radius: 4px;
                    opacity: 0.8;
                    transition: opacity 0.2s;
                }
                
                .manchi-minimize-btn:hover {
                    opacity: 1;
                }
                
                .manchi-chat-messages {
                    flex: 1;
                    padding: 16px;
                    overflow-y: auto;
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }
                
                .manchi-message {
                    display: flex;
                    flex-direction: column;
                    max-width: 80%;
                }
                
                .manchi-bot-message {
                    align-self: flex-start;
                }
                
                .manchi-user-message {
                    align-self: flex-end;
                }
                
                .manchi-message-content {
                    padding: 12px 16px;
                    border-radius: 18px;
                    font-size: 14px;
                    line-height: 1.4;
                }
                
                .manchi-bot-message .manchi-message-content {
                    background: #f1f3f5;
                    color: #333;
                }
                
                .manchi-user-message .manchi-message-content {
                    background: linear-gradient(135deg, #FF6900, #FF8C00);
                    color: white;
                }
                
                .manchi-message-time {
                    font-size: 11px;
                    color: #999;
                    margin-top: 4px;
                    margin-left: 8px;
                }
                
                .manchi-language-toggle {
                    padding: 8px 16px;
                    border-top: 1px solid #eee;
                    display: flex;
                    justify-content: center;
                }
                
                .manchi-lang-btn {
                    display: flex;
                    background: #f8f9fa;
                    border: none;
                    border-radius: 20px;
                    padding: 2px;
                    cursor: pointer;
                }
                
                .manchi-lang-btn span {
                    padding: 6px 12px;
                    border-radius: 16px;
                    font-size: 12px;
                    font-weight: 600;
                    transition: all 0.2s;
                }
                
                .manchi-lang-btn span.active {
                    background: #FF6900;
                    color: white;
                }
                
                .manchi-chat-input-container {
                    padding: 16px;
                    border-top: 1px solid #eee;
                    display: flex;
                    gap: 8px;
                }
                
                .manchi-chat-input {
                    flex: 1;
                    border: 1px solid #ddd;
                    border-radius: 24px;
                    padding: 12px 16px;
                    font-size: 14px;
                    outline: none;
                    transition: border-color 0.2s;
                }
                
                .manchi-chat-input:focus {
                    border-color: #FF6900;
                }
                
                .manchi-send-btn {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #FF6900, #FF8C00);
                    border: none;
                    color: white;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: transform 0.2s;
                }
                
                .manchi-send-btn:hover {
                    transform: scale(1.05);
                }
                
                .manchi-typing-indicator {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 12px 16px;
                    background: #f1f3f5;
                    border-radius: 18px;
                    max-width: fit-content;
                }
                
                .manchi-typing-dots {
                    display: flex;
                    gap: 4px;
                }
                
                .manchi-typing-dots span {
                    width: 6px;
                    height: 6px;
                    background: #999;
                    border-radius: 50%;
                    animation: typing 1.4s infinite;
                }
                
                .manchi-typing-dots span:nth-child(2) {
                    animation-delay: 0.2s;
                }
                
                .manchi-typing-dots span:nth-child(3) {
                    animation-delay: 0.4s;
                }
                
                @keyframes typing {
                    0%, 60%, 100% {
                        transform: translateY(0);
                        opacity: 0.4;
                    }
                    30% {
                        transform: translateY(-10px);
                        opacity: 1;
                    }
                }
                
                @media (max-width: 480px) {
                    #manchi-chatbot-container {
                        position: fixed !important;
                        bottom: 10px;
                        right: 10px;
                    }
                    
                    .manchi-chat-widget {
                        width: calc(100vw - 40px);
                        height: calc(100vh - 100px);
                        bottom: 70px;
                        right: 20px;
                        left: 20px;
                    }
                }
                
                @media (max-width: 768px) {
                    #manchi-chatbot-container {
                        position: fixed !important;
                        bottom: 15px;
                        right: 15px;
                    }
                }
                
                @media (min-width: 1200px) {
                    #manchi-chatbot-container {
                        position: fixed !important;
                        bottom: 30px;
                        right: 30px;
                    }
                }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', styles);
    }

    attachEventListeners() {
        const toggleBtn = document.getElementById('manchi-chat-toggle');
        const minimizeBtn = document.getElementById('manchi-minimize');
        const langBtn = document.getElementById('manchi-lang-toggle');
        const chatInput = document.getElementById('manchi-chat-input');
        const sendBtn = document.getElementById('manchi-send-btn');
        const messagesContainer = document.getElementById('manchi-chat-messages');

        toggleBtn?.addEventListener('click', () => this.toggleChat());
        minimizeBtn?.addEventListener('click', () => this.closeChat());
        langBtn?.addEventListener('click', () => this.toggleLanguage());
        sendBtn?.addEventListener('click', () => this.sendMessage());
        
        chatInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        // Auto-scroll to bottom when new messages arrive
        if (messagesContainer) {
            const observer = new MutationObserver(() => {
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            });
            observer.observe(messagesContainer, { childList: true });
        }
    }

    toggleChat() {
        const container = document.getElementById('manchi-chatbot-container');
        if (!container) return;

        this.isOpen = !this.isOpen;
        container.className = this.isOpen ? 'manchi-chatbot-open' : 'manchi-chatbot-closed';
        
        if (this.isOpen && this.conversationHistory.length === 0) {
            this.addWelcomeMessage();
        }
    }

    closeChat() {
        const container = document.getElementById('manchi-chatbot-container');
        if (container) {
            container.className = 'manchi-chatbot-closed';
            this.isOpen = false;
        }
    }

    toggleLanguage() {
        this.language = this.language === 'en' ? 'es' : 'en';
        this.updateLanguageUI();
        this.addMessage('bot', bilingualResponses.languageSwitch[this.language]);
    }

    updateLanguageUI() {
        // Update language toggle buttons
        const enBtn = document.querySelector('.lang-en');
        const esBtn = document.querySelector('.lang-es');
        const chatInput = document.getElementById('manchi-chat-input');
        const statusSpan = document.querySelector('.manchi-status');

        if (enBtn && esBtn) {
            enBtn.classList.toggle('active', this.language === 'en');
            esBtn.classList.toggle('active', this.language === 'es');
        }

        if (chatInput) {
            chatInput.placeholder = this.language === 'en' 
                ? 'Ask about our pizzas...' 
                : 'Pregunta sobre nuestras pizzas...';
        }

        if (statusSpan) {
            statusSpan.textContent = this.language === 'en' 
                ? 'Pizza Expert • Online' 
                : 'Experto en Pizza • En línea';
        }
    }

    addWelcomeMessage() {
        const welcomeText = this.language === 'en' 
            ? bilingualResponses.greeting.en 
            : bilingualResponses.greeting.es;
        this.addMessage('bot', welcomeText);
    }

    sendMessage() {
        const input = document.getElementById('manchi-chat-input');
        if (!input) return;

        const message = input.value.trim();
        if (!message) return;

        // Add user message
        this.addMessage('user', message);
        input.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        // Process and respond
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.processMessage(message);
            this.addMessage('bot', response);
        }, 1000 + Math.random() * 1000); // Random delay 1-2 seconds
    }

    addMessage(sender, content) {
        const messagesContainer = document.getElementById('manchi-chat-messages');
        if (!messagesContainer) return;

        const messageClass = sender === 'user' ? 'manchi-user-message' : 'manchi-bot-message';
        const messageElement = document.createElement('div');
        messageElement.className = `manchi-message ${messageClass}`;
        messageElement.innerHTML = `
            <div class="manchi-message-content">${content}</div>
            <div class="manchi-message-time">${this.getCurrentTime()}</div>
        `;

        messagesContainer.appendChild(messageElement);
        this.conversationHistory.push({ sender, content, timestamp: Date.now() });
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('manchi-chat-messages');
        if (!messagesContainer) return;

        const typingElement = document.createElement('div');
        typingElement.className = 'manchi-message manchi-bot-message';
        typingElement.id = 'manchi-typing';
        typingElement.innerHTML = `
            <div class="manchi-typing-indicator">
                <span>Manchi is typing</span>
                <div class="manchi-typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;

        messagesContainer.appendChild(typingElement);
    }

    hideTypingIndicator() {
        const typingElement = document.getElementById('manchi-typing');
        if (typingElement) {
            typingElement.remove();
        }
    }

    detectLanguage(text) {
        // Common Spanish words and patterns
        const spanishPatterns = [
            /[¿¡]/,  // Spanish punctuation
            /\b(el|la|los|las|un|una|unos|unas)\b/i,  // Articles
            /\b(qué|cómo|dónde|cuándo|cuánto|quién|por qué)\b/i,  // Question words
            /\b(hola|gracias|por favor|buenos días|buenas tardes|buenas noches)\b/i,  // Common phrases
            /\b(está|estás|estoy|tienen|quiero|puedo|hay|hacer|saber)\b/i,  // Common verbs
            /\b(precio|menú|hora|dirección|entrega|pedido)\b/i  // Common nouns
        ];

        let spanishScore = 0;
        for (const pattern of spanishPatterns) {
            if (pattern.test(text)) spanishScore++;
        }

        return spanishScore >= 2 ? 'es' : 'en';
    }

    async processMessage(userMessage) {
        const message = userMessage.toLowerCase();
        // Detect language and get conversation context
        const detectedLang = this.detectLanguage(userMessage);
        const context = this.getConversationContext();
        const lang = detectedLang;

        // Check if the message contains URLs
        const urls = this.extractURLs(userMessage);
        if (urls.length > 0) {
            try {
                const urlContent = await this.fetchURLContent(urls[0]);
                const question = userMessage.replace(urls[0], '').trim();
                return this.answerFromContent(question, urlContent, lang);
            } catch (error) {
                const errorMsg = lang === 'en'
                    ? context.messageCount > 0 
                        ? "I couldn't access that link. Could you try sharing it again or tell me what you'd like to know?"
                        : "I'm sorry, I couldn't access the URL you provided. Please make sure it's a valid web address."
                    : context.messageCount > 0
                        ? "No pude acceder a ese enlace. ¿Podrías compartirlo de nuevo o decirme qué te gustaría saber?"
                        : "Lo siento, no pude acceder a la URL que proporcionaste. Por favor asegúrate de que sea una dirección web válida.";
                return errorMsg;
            }
        }

        // Calculate intent scores for different categories
        const intentScores = this.calculateIntentScores(message, lang);
        const topIntent = this.getTopIntent(intentScores);

        // Generate response based on intent and context
        let response = this.generateResponse(topIntent, message, context, lang);

        // Update conversation context
        this.updateContext(topIntent, message, response);

        return response;
    }

    calculateIntentScores(message, lang) {
        const scores = {
            greeting: 0,
            pizzaStyle: 0,
            menu: 0,
            hours: 0,
            location: 0,
            price: 0,
            delivery: 0,
            dietary: 0
        };

        // Greeting patterns
        if (this.fuzzyMatch(message, ['hello', 'hi', 'hey', 'hola', 'buenos días', 'buenas'])) {
            scores.greeting += 1;
        }

        // Pizza style patterns
        if (this.fuzzyMatch(message, ['chicago', 'deep dish', 'thick', 'estilo chicago', 'plato hondo', 'deep-dish'])) {
            scores.pizzaStyle += 1;
        }
        if (this.fuzzyMatch(message, ['new york', 'thin crust', 'ny style', 'nueva york', 'masa delgada'])) {
            scores.pizzaStyle += 1;
        }

        // Menu patterns
        if (this.fuzzyMatch(message, ['menu', 'what do you have', 'options', 'menú', 'qué tienen', 'opciones', 'what pizzas', 'tipos de pizza'])) {
            scores.menu += 1;
        }

        // Hours patterns
        if (this.fuzzyMatch(message, ['hours', 'open', 'close', 'time', 'schedule', 'horarios', 'abierto', 'cerrado', 'hora', 'when'])) {
            scores.hours += 1;
        }

        // Location patterns
        if (this.fuzzyMatch(message, ['location', 'address', 'where', 'ubicación', 'dirección', 'dónde', 'find you', 'get there'])) {
            scores.location += 1;
        }

        // Price patterns
        if (this.fuzzyMatch(message, ['price', 'cost', 'how much', 'precio', 'costo', 'cuánto', 'expensive', 'cheap'])) {
            scores.price += 1;
        }

        // Delivery patterns
        if (this.fuzzyMatch(message, ['delivery', 'deliver', 'order online', 'entrega', 'entregar', 'pedir en línea', 'bring', 'pickup'])) {
            scores.delivery += 1;
        }

        // Dietary patterns
        if (this.fuzzyMatch(message, ['ingredients', 'allergies', 'gluten', 'vegan', 'ingredientes', 'alergias', 'vegano', 'vegetarian'])) {
            scores.dietary += 1;
        }

        return scores;
    }

    fuzzyMatch(text, patterns) {
        let score = 0;
        const words = text.split(/\s+/);

        for (const pattern of patterns) {
            // Exact match
            if (text.includes(pattern)) {
                score += 1;
                continue;
            }

            // Word similarity
            const patternWords = pattern.split(/\s+/);
            for (const word of words) {
                for (const patternWord of patternWords) {
                    if (this.calculateSimilarity(word, patternWord) > 0.8) {
                        score += 0.8;
                    }
                }
            }
        }

        return score;
    }

    calculateSimilarity(str1, str2) {
        const len1 = str1.length;
        const len2 = str2.length;
        const matrix = Array(len1 + 1).fill().map(() => Array(len2 + 1).fill(0));

        for (let i = 0; i <= len1; i++) matrix[i][0] = i;
        for (let j = 0; j <= len2; j++) matrix[0][j] = j;

        for (let i = 1; i <= len1; i++) {
            for (let j = 1; j <= len2; j++) {
                const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
                matrix[i][j] = Math.min(
                    matrix[i - 1][j] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j - 1] + cost
                );
            }
        }

        return 1 - (matrix[len1][len2] / Math.max(len1, len2));
    }

    getTopIntent(scores) {
        return Object.entries(scores)
            .reduce((a, b) => a[1] > b[1] ? a : b)[0];
    }

    getConversationContext() {
        const recentMessages = this.conversationHistory.slice(-3);
        return {
            recentTopics: recentMessages.map(msg => msg.content),
            lastIntent: recentMessages.length > 0 ? recentMessages[recentMessages.length - 1].intent : null,
            messageCount: this.conversationHistory.length
        };
    }

    generateResponse(intent, message, context, lang) {
        switch (intent) {
            case 'greeting':
                return this.generateGreetingResponse(context, lang);
            case 'pizzaStyle':
                return this.generatePizzaStyleResponse(message, context, lang);
            case 'menu':
                return this.generateMenuResponse(message, context, lang);
            case 'hours':
                return this.generateHoursResponse(context, lang);
            case 'location':
                return this.generateLocationResponse(context, lang);
            case 'price':
                return this.generatePriceResponse(message, context, lang);
            case 'delivery':
                return this.generateDeliveryResponse(context, lang);
            case 'dietary':
                return this.generateDietaryResponse(message, context, lang);
            default:
                return this.generateDefaultResponse(message, context, lang);
        }
    }

    generateGreetingResponse(context, lang) {
        if (context.messageCount === 0) {
            return bilingualResponses.greeting[lang];
        }
        return lang === 'en' 
            ? "Hi again! How can I help you today?"
            : "¡Hola de nuevo! ¿Cómo puedo ayudarte hoy?";
    }

    generatePizzaStyleResponse(message, context, lang) {
        if (this.fuzzyMatch(message, ['chicago', 'deep dish', 'thick'])) {
            return lang === 'en'
                ? `${pizzaStyles.chicago.description} Our signature Chicago deep-dish features ${pizzaStyles.chicago.characteristics.slice(0, 3).join(', ')}.`
                : `${pizzaStyles.chicago.description} Nuestro deep-dish de Chicago característico incluye ${pizzaStyles.chicago.characteristics.slice(0, 3).join(', ')}.`;
        }
        return lang === 'en'
            ? `${pizzaStyles.newYork.description} Perfect for those who love ${pizzaStyles.newYork.characteristics.slice(0, 3).join(' and ')}.`
            : `${pizzaStyles.newYork.description} Perfecto para quienes aman ${pizzaStyles.newYork.characteristics.slice(0, 3).join(' y ')}.`;
    }

    generateMenuResponse(message, context, lang) {
        const spanishTranslations = {
            'The Original Chicago Deep Dish': 'La Deep Dish Original de Chicago',
            'The Cheese Chicago Deep Dish': 'La Deep Dish de Queso de Chicago',
            'Liberty Supreme': 'Suprema Liberty',
            'Hawaiian at Yankee Stadium': 'Hawaiana del Yankee Stadium',
            'Fresh pasta dishes': 'Platos de pasta fresca',
            'Garden salads': 'Ensaladas frescas',
            'Italian sandwiches': 'Sándwiches italianos'
        };

        // Fallback menu items if menuHighlights is not defined
        const chicagoHighlights = (typeof menuHighlights !== 'undefined' && menuHighlights.pizzas) 
            ? menuHighlights.pizzas.chicago 
            : ['The Original Chicago Deep Dish', 'The Cheese Chicago Deep Dish', 'Liberty Supreme'];
        const nyHighlights = (typeof menuHighlights !== 'undefined' && menuHighlights.pizzas) 
            ? menuHighlights.pizzas.newYork 
            : ['Margherita', 'Pepperoni', 'Supreme'];
        const otherItems = (typeof menuHighlights !== 'undefined') 
            ? menuHighlights.otherItems 
            : ['Fresh pasta dishes', 'Garden salads', 'Italian sandwiches'];

        if (context.lastIntent === 'menu') {
            return lang === 'en'
                ? "Would you like to know more about any specific item? I can tell you about our toppings, sizes, or special combinations."
                : "¿Te gustaría saber más sobre algún elemento específico? Puedo contarte sobre nuestros ingredientes, tamaños o combinaciones especiales.";
        }

        if (lang === 'es') {
            const translatedChicago = chicagoHighlights.map(item => spanishTranslations[item] || item);
            const translatedNY = nyHighlights.map(item => spanishTranslations[item] || item);
            const translatedOther = otherItems.map(item => spanishTranslations[item] || item);

            return `Aquí están nuestras opciones populares:\n\nPizzas estilo Chicago:\n${translatedChicago.map(item => `• ${item}`).join('\n')}\n\nPizzas estilo Nueva York:\n${translatedNY.map(item => `• ${item}`).join('\n')}\n\nTambién ofrecemos: ${translatedOther.slice(0, 3).join(', ')}. ¿Te gustaría saber más sobre algún elemento específico?`;
        }

        return `Here are our popular options:\n\nChicago Style Pizzas:\n${chicagoHighlights.map(item => `• ${item}`).join('\n')}\n\nNew York Style Pizzas:\n${nyHighlights.map(item => `• ${item}`).join('\n')}\n\nWe also offer: ${otherItems.slice(0, 3).join(', ')}. Would you like to know more about any specific item?`;
    }

    generateHoursResponse(context, lang) {
        return bilingualResponses.commonPhrases.hours[lang];
    }

    generateLocationResponse(context, lang) {
        return lang === 'en'
            ? `We're located in ${restaurantInfo.location}. ${context.messageCount < 2 ? `You can reach us at ${restaurantInfo.phone}` : ''}`
            : `Estamos ubicados en ${restaurantInfo.location}. ${context.messageCount < 2 ? `Puedes contactarnos al ${restaurantInfo.phone}` : ''}`;
    }

    generatePriceResponse(message, context, lang) {
        return bilingualResponses.commonPhrases.prices[lang];
    }

    generateDeliveryResponse(context, lang) {
        return bilingualResponses.commonPhrases.delivery[lang];
    }

    generateDietaryResponse(message, context, lang) {
        if (this.fuzzyMatch(message, ['vegan', 'vegetarian', 'vegano', 'vegetariano'])) {
            return lang === 'en'
                ? "We offer vegan cheese options and plenty of vegetable toppings for our vegan and vegetarian customers!"
                : "¡Ofrecemos opciones de queso vegano y muchos ingredientes vegetales para nuestros clientes veganos y vegetarianos!";
        }

        return lang === 'en'
            ? "We can accommodate most dietary restrictions! We offer gluten-free crusts and vegan cheese options. Please let us know about any specific allergies when ordering."
            : "¡Podemos acomodar la mayoría de restricciones dietéticas! Ofrecemos masas sin gluten y opciones de queso vegano. Por favor infórmanos sobre cualquier alergia específica al pedir.";
    }

    generateDefaultResponse(message, context, lang) {
        // If we can't determine intent, try to find relevant FAQ
        const relevantFaq = this.findRelevantFaq(message, lang);
        if (relevantFaq) {
            return relevantFaq;
        }

        const responses = {
            en: [
                "I'd love to help! What would you like to know about our pizzas, menu, hours, or delivery?",
                "I can tell you about our famous Chicago deep dish, NY style pizzas, or anything else on our menu.",
                "Need recommendations? I can suggest our most popular pizzas or tell you about our specials!"
            ],
            es: [
                "¡Me encantaría ayudarte! ¿Qué te gustaría saber sobre nuestras pizzas, menú, horarios o entregas?",
                "Puedo contarte sobre nuestra famosa pizza estilo Chicago, pizzas estilo NY, ¡o cualquier otra cosa del menú!",
                "¿Necesitas recomendaciones? ¡Puedo sugerirte nuestras pizzas más populares o contarte sobre nuestras ofertas!"
            ]
        };

        const randomIndex = Math.floor(Math.random() * responses[lang].length);
        return responses[lang][randomIndex];
    }

    findRelevantFaq(message, lang) {
        // Check if faq is defined and has the right structure
        if (typeof faq === 'undefined' || !faq) {
            return null;
        }

        let bestMatch = null;
        let highestScore = 0;

        // Handle different FAQ structures
        const faqData = faq[lang] || faq;
        
        if (Array.isArray(faqData)) {
            // FAQ is an array of objects with question/answer
            for (const item of faqData) {
                if (item.question && item.answer) {
                    const score = this.fuzzyMatch(message, item.question.toLowerCase().split(/\s+/));
                    if (score > highestScore) {
                        highestScore = score;
                        bestMatch = item.answer;
                    }
                }
            }
        } else if (typeof faqData === 'object') {
            // FAQ is an object with question-answer pairs
            for (const [question, answer] of Object.entries(faqData)) {
                const score = this.fuzzyMatch(message, question.toLowerCase().split(/\s+/));
                if (score > highestScore) {
                    highestScore = score;
                    bestMatch = answer;
                }
            }
        }

        return highestScore > 0.3 ? bestMatch : null;
    }

    updateContext(intent, message, response) {
        this.conversationHistory.push({
            content: message,
            intent: intent,
            response: response,
            timestamp: Date.now()
        });

        // Keep history manageable
        if (this.conversationHistory.length > 10) {
            this.conversationHistory.shift();
        }
    }
    }

    extractURLs(text) {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.match(urlRegex) || [];
    }

    matchesPattern(message, patterns) {
        return patterns.some(pattern => message.includes(pattern.toLowerCase()));
    }

    async fetchURLContent(url) {
        try {
            // Use a CORS proxy to bypass browser restrictions
            const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
            const response = await fetch(proxyUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const html = data.contents;
            
            // Extract text content from HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // Remove script and style elements
            const scripts = doc.querySelectorAll('script, style');
            scripts.forEach(el => el.remove());
            
            // Get text content and clean it up
            const textContent = doc.body ? doc.body.textContent || doc.body.innerText || '' : '';
            return textContent.replace(/\s+/g, ' ').trim();
        } catch (error) {
            console.error('Error fetching URL content:', error);
            throw error;
        }
    }

    answerFromContent(question, content, lang) {
        if (!content || content.length < 10) {
            return lang === 'en'
                ? "I couldn't find enough content from the URL to answer your question."
                : "No pude encontrar suficiente contenido de la URL para responder tu pregunta.";
        }

        // Simple keyword matching to find relevant content
        const questionWords = question.toLowerCase().split(/\s+/).filter(word => word.length > 3);
        const contentLower = content.toLowerCase();
        
        if (questionWords.length === 0) {
            // If no specific question, return a summary of the content
            const summary = content.substring(0, 300) + (content.length > 300 ? '...' : '');
            return lang === 'en'
                ? `Based on the URL you provided, here's what I found:\n\n${summary}`
                : `Basado en la URL que proporcionaste, esto es lo que encontré:\n\n${summary}`;
        }

        // Look for sentences containing question keywords
        const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
        const relevantSentences = sentences.filter(sentence => {
            const sentenceLower = sentence.toLowerCase();
            return questionWords.some(word => sentenceLower.includes(word));
        }).slice(0, 3); // Limit to 3 most relevant sentences

        if (relevantSentences.length > 0) {
            const answer = relevantSentences.join('. ').trim() + '.';
            return lang === 'en'
                ? `Based on the URL you provided: ${answer}`
                : `Basado en la URL que proporcionaste: ${answer}`;
        }

        // Fallback: return first part of content
        const fallback = content.substring(0, 200) + (content.length > 200 ? '...' : '');
        return lang === 'en'
            ? `I found some information from the URL, but couldn't find a specific answer to your question. Here's what's available:\n\n${fallback}`
            : `Encontré información de la URL, pero no pude encontrar una respuesta específica a tu pregunta. Aquí está lo que está disponible:\n\n${fallback}`;
    }

    getRandomFAQ() {
        // Check if faq is defined
        if (typeof faq === 'undefined' || !faq) {
            return this.language === 'en' 
                ? "I'm here to help with any questions about our menu, hours, or delivery!"
                : "¡Estoy aquí para ayudarte con cualquier pregunta sobre nuestro menú, horarios o entregas!";
        }

        const faqs = faq[this.language] || faq;
        
        if (Array.isArray(faqs) && faqs.length > 0) {
            const randomIndex = Math.floor(Math.random() * faqs.length);
            const selectedFaq = faqs[randomIndex];
            return `${selectedFaq.question}\n\n${selectedFaq.answer}`;
        }
        
        // Fallback response
        return this.language === 'en' 
            ? "I'm here to help with any questions about our menu, hours, or delivery!"
            : "¡Estoy aquí para ayudarte con cualquier pregunta sobre nuestro menú, horarios o entregas!";
    }

    getCurrentTime() {
        return new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    }

    // Public methods
    destroy() {
        const container = document.getElementById('manchi-chatbot-container');
        const styles = document.getElementById('manchi-chatbot-styles');
        
        if (container) container.remove();
        if (styles) styles.remove();
        
        this.initialized = false;
        this.conversationHistory = [];
    }

    setLanguage(lang) {
        if (['en', 'es'].includes(lang)) {
            this.language = lang;
            this.updateLanguageUI();
        }
    }

    openChat() {
        if (!this.isOpen) {
            this.toggleChat();
        }
    }
}

// Auto-initialize when DOM is ready
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.ManchiChatbot = new ManchiChatbot();
        });
    } else {
        window.ManchiChatbot = new ManchiChatbot();
    }
}

// Export for module usage
export default ManchiChatbot;