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