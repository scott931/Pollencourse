// Dashboard JavaScript - Comprehensive Interactive Course Design System

class DashboardManager {
    constructor() {
        this.charts = {};
        this.aiAssistant = null;
        this.floatingMenu = null;
        this.init();
    }

    init() {
        this.checkAuthentication();
        this.initializeCharts();
        this.initializeFloatingMenu();
        this.initializeHeatmap();
        this.initializeEventListeners();
        this.initializeAnimations();
        this.initializeUserProfile();
        this.initializeNotifications();
    }

    // Initialize Chart.js charts
    initializeCharts() {
        try {
            if (typeof Chart === 'undefined') {
                console.error('Chart.js is not loaded');
                return;
            }
            this.createWeeklyProgressChart();
            this.createCategoryChart();
            this.createSkillRadarChart();
        } catch (error) {
            console.error('Error initializing charts:', error);
        }
    }

    createWeeklyProgressChart() {
        const ctx = document.getElementById('weeklyProgressChart');
        if (!ctx) {
            console.error('Canvas element weeklyProgressChart not found');
            return;
        }

        try {
            this.charts.weeklyProgress = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Hours Spent on Hive Management',
                    data: [2.5, 3.2, 1.8, 4.1, 2.9, 3.5, 2.1],
                    borderColor: '#A435F0',
                    backgroundColor: 'rgba(164, 53, 240, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#A435F0',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                layout: {
                    padding: {
                        top: 10,
                        bottom: 10
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 5,
                        ticks: {
                            stepSize: 1
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                elements: {
                    point: {
                        hoverRadius: 8
                    }
                }
            }
        });
        } catch (error) {
            console.error('Error creating weekly progress chart:', error);
        }
    }

    createCategoryChart() {
        const ctx = document.getElementById('categoryChart');
        if (!ctx) {
            console.error('Canvas element categoryChart not found');
            return;
        }

        try {
            this.charts.category = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Hive Management', 'Honey Production', 'Disease Prevention', 'Queen Rearing', 'Equipment Maintenance'],
                datasets: [{
                    data: [35, 25, 20, 15, 5],
                    backgroundColor: [
                        '#A435F0',
                        '#667eea',
                        '#28A745',
                        '#FFC107',
                        '#17A2B8'
                    ],
                    borderWidth: 0,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    }
                }
            }
        });
        } catch (error) {
            console.error('Error creating category chart:', error);
        }
    }

    createSkillRadarChart() {
        const ctx = document.getElementById('skillRadarChart');
        if (!ctx) {
            console.error('Canvas element skillRadarChart not found');
            return;
        }

        try {
            this.charts.skillRadar = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Hive Inspection', 'Swarm Management', 'Honey Extraction', 'Queen Identification', 'Disease Recognition', 'Equipment Handling'],
                datasets: [{
                    label: 'Current Skills',
                    data: [85, 70, 60, 45, 30, 80],
                    borderColor: '#A435F0',
                    backgroundColor: 'rgba(164, 53, 240, 0.2)',
                    borderWidth: 2,
                    pointBackgroundColor: '#A435F0',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 20
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        pointLabels: {
                            font: {
                                size: 12
                            }
                        }
                    }
                }
            }
        });
        } catch (error) {
            console.error('Error creating skill radar chart:', error);
        }
    }

    createTimeDistributionChart() {
        const ctx = document.getElementById('timeDistributionChart');
        if (!ctx) {
            console.error('Canvas element timeDistributionChart not found');
            return;
        }

        try {
            this.charts.timeDistribution = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Hive Management', 'Honey Production', 'Disease Prevention', 'Equipment Maintenance'],
                datasets: [{
                    data: [42, 31, 19, 8],
                    backgroundColor: [
                        '#A435F0',
                        '#FF6B6B',
                        '#4ECDC4',
                        '#45B7D1'
                    ],
                    borderWidth: 0,
                    hoverOffset: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return `${label}: ${percentage}%`;
                            }
                        }
                    }
                },
                elements: {
                    arc: {
                        borderWidth: 0
                    }
                }
            }
        });
        } catch (error) {
            console.error('Error creating time distribution chart:', error);
        }
    }

    // Authentication Check
    checkAuthentication() {
        const userData = localStorage.getItem('userData');
        if (!userData) {
            window.location.href = 'login.html';
            return;
        }

        try {
            const user = JSON.parse(userData);
            this.updateUserInterface(user);
        } catch (error) {
            console.error('Error parsing user data:', error);
            localStorage.removeItem('userData');
            window.location.href = 'login.html';
        }
    }

    updateUserInterface(user) {
        const userNameElement = document.getElementById('userName');
        if (userNameElement) {
            if (user.firstName && user.lastName) {
                userNameElement.textContent = `${user.firstName} ${user.lastName}`;
            } else if (user.name) {
                userNameElement.textContent = user.name;
            }
        }

        // Update welcome message
        const welcomeElement = document.querySelector('.welcome-content h1');
        if (welcomeElement && user.firstName) {
            welcomeElement.textContent = `Welcome back, ${user.firstName}! 🐝`;
        }
    }

    initializeUserProfile() {
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleLogout();
            });
        }
    }

    handleLogout() {
        // Show confirmation dialog
        if (confirm('Are you sure you want to logout?')) {
            // Clear user data
            localStorage.removeItem('userData');

            // Show logout message
            this.showNotification('Logged out successfully!', 'success');

            // Redirect to login page
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1000);
        }
    }

    // Initialize Learning Heatmap
    initializeHeatmap() {
        const heatmapGrid = document.querySelector('.heatmap-grid');
        if (!heatmapGrid) return;

        // Generate 7 weeks of data (49 days)
        for (let i = 0; i < 49; i++) {
            const cell = document.createElement('div');
            cell.className = 'heatmap-cell';

            // Random activity level (0-4)
            const activityLevel = Math.floor(Math.random() * 5);
            const colors = ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'];
            cell.style.backgroundColor = colors[activityLevel];

            // Add tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'heatmap-tooltip';
            tooltip.textContent = `${activityLevel} hours of hive management on day ${i + 1}`;
            cell.appendChild(tooltip);

            cell.addEventListener('mouseenter', () => {
                tooltip.style.display = 'block';
            });

            cell.addEventListener('mouseleave', () => {
                tooltip.style.display = 'none';
            });

            heatmapGrid.appendChild(cell);
        }
    }

    // Initialize AI Assistant
    initializeAIAssistant() {
        this.aiAssistant = document.getElementById('aiAssistant');
        const minimizeBtn = document.getElementById('minimizeAI');
        const chatInput = this.aiAssistant?.querySelector('.chat-input input');
        const sendBtn = this.aiAssistant?.querySelector('.chat-input button');

        if (minimizeBtn) {
            minimizeBtn.addEventListener('click', () => {
                this.toggleAIAssistant();
            });
        }

        if (chatInput && sendBtn) {
            sendBtn.addEventListener('click', () => {
                this.sendAIMessage(chatInput.value);
                chatInput.value = '';
            });

            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendAIMessage(chatInput.value);
                    chatInput.value = '';
                }
            });

            // Focus input when chat is opened
            chatInput.addEventListener('focus', () => {
                this.aiAssistant.classList.add('focused');
            });

            chatInput.addEventListener('blur', () => {
                this.aiAssistant.classList.remove('focused');
            });
        }

        // Add welcome message after a delay
        setTimeout(() => {
            this.addWelcomeMessage();
        }, 2000);
    }

    toggleAIAssistant() {
        const chat = document.getElementById('aiChat');
        const minimizeBtn = document.getElementById('minimizeAI');
        const aiAssistant = this.aiAssistant;

        if (chat.style.display === 'none' || aiAssistant.classList.contains('minimized')) {
            chat.style.display = 'flex';
            aiAssistant.classList.remove('minimized');
            minimizeBtn.innerHTML = '<i class="fas fa-minus"></i>';
            minimizeBtn.title = 'Minimize chat';
        } else {
            chat.style.display = 'none';
            aiAssistant.classList.add('minimized');
            minimizeBtn.innerHTML = '<i class="fas fa-plus"></i>';
            minimizeBtn.title = 'Expand chat';
        }
    }

    addWelcomeMessage() {
        const welcomeMessages = [
            "Hi Alex! 👋 I'm here to help with your learning journey. How can I assist you today?",
            "Welcome back! I noticed you've been making great progress. Need help with anything specific?",
            "Hello! I'm your AI learning assistant. Feel free to ask me anything about your courses or learning goals!"
        ];

        const randomMessage = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
        this.sendAIMessage(randomMessage, 'ai');
    }

    sendAIMessage(message, type = 'user') {
        if (!message.trim() && type === 'user') return;

        const chatMessages = this.aiAssistant.querySelector('.chat-messages');

        if (type === 'user') {
            // Add user message
            const userMessage = this.createMessageElement(message, 'user');
            chatMessages.appendChild(userMessage);
            chatMessages.scrollTop = chatMessages.scrollHeight;

            // Show typing indicator
            this.showTypingIndicator();

            // Simulate AI response with delay
            setTimeout(() => {
                this.hideTypingIndicator();
                const aiResponse = this.generateAIResponse(message);
                const aiMessage = this.createMessageElement(aiResponse, 'ai');
                chatMessages.appendChild(aiMessage);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1500 + Math.random() * 1000); // Random delay between 1.5-2.5 seconds
        } else {
            // Direct AI message (for welcome messages)
            const aiMessage = this.createMessageElement(message, 'ai');
            chatMessages.appendChild(aiMessage);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    showTypingIndicator() {
        const chatMessages = this.aiAssistant.querySelector('.chat-messages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message ai typing-indicator';
        typingDiv.innerHTML = `
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    hideTypingIndicator() {
        const typingIndicator = this.aiAssistant.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    createMessageElement(content, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;

        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.innerHTML = `<p>${content}</p>`;

        const messageTime = document.createElement('span');
        messageTime.className = 'message-time';
        messageTime.textContent = this.getCurrentTime();

        messageDiv.appendChild(messageContent);
        messageDiv.appendChild(messageTime);

        return messageDiv;
    }

    getCurrentTime() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        return `${hours}:${minutes.toString().padStart(2, '0')}`;
    }

    generateAIResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();

        // Context-aware responses based on user input
        if (lowerMessage.includes('help') || lowerMessage.includes('stuck')) {
            return "I'd be happy to help! What specific concept or problem are you facing? I can suggest resources, explain concepts, or help you find the right course.";
        }

        if (lowerMessage.includes('javascript') || lowerMessage.includes('js')) {
            return "JavaScript is a great choice! Based on your progress, I'd recommend exploring ES6+ features, async/await, or React next. Which area interests you most?";
        }

        if (lowerMessage.includes('react') || lowerMessage.includes('frontend')) {
            return "React is excellent for building interactive UIs! Have you tried our React Hooks course? It's perfect for your current skill level.";
        }

        if (lowerMessage.includes('time') || lowerMessage.includes('schedule')) {
            return "I can help you plan your study schedule! You've been studying for 2.5 hours today. Would you like me to suggest optimal study times based on your patterns?";
        }

        if (lowerMessage.includes('course') || lowerMessage.includes('recommend')) {
            return "Based on your learning history, I'd recommend 'Advanced JavaScript Patterns' or 'React State Management'. Both align well with your current progress!";
        }

        if (lowerMessage.includes('motivation') || lowerMessage.includes('tired')) {
            return "Learning can be challenging, but you're doing great! Remember to take breaks and celebrate small wins. You've completed 3 courses this month - that's impressive!";
        }

        // Default responses
        const responses = [
            "That's a great question! Let me help you find the best resources for that.",
            "I can see you're making excellent progress! Would you like me to suggest some next steps?",
            "Interesting! Based on your learning pattern, I think you'd benefit from exploring that topic further.",
            "I'm here to help! What specific aspect would you like to focus on?",
            "Great thinking! That approach aligns well with your current learning goals."
        ];

        return responses[Math.floor(Math.random() * responses.length)];
    }

    // Initialize Floating Menu
    initializeFloatingMenu() {
        this.floatingMenu = document.querySelector('.floating-menu');

        if (this.floatingMenu) {
            const buttons = this.floatingMenu.querySelectorAll('.floating-btn');

            buttons.forEach(button => {
                button.addEventListener('click', (e) => {
                    this.handleFloatingMenuAction(e.currentTarget);
                });
            });
        }
    }

    handleFloatingMenuAction(button) {
        const action = button.getAttribute('title');

        switch(action) {
            case 'Quick Search':
                this.openQuickSearch();
                break;
            case 'New Message':
                this.openNewMessage();
                break;
            case 'Help Center':
                this.openHelpCenter();
                break;
        }
    }

    openQuickSearch() {
        // Create modal for quick search
        const modal = this.createModal('Quick Search', `
            <div class="quick-search-modal">
                <input type="text" placeholder="Search beekeeping courses, techniques, or people..." class="search-input">
                <div class="search-suggestions">
                    <div class="suggestion-item">
                        <i class="fas fa-book"></i>
                        <span>Advanced Hive Management</span>
                    </div>
                    <div class="suggestion-item">
                        <i class="fas fa-users"></i>
                        <span>Beekeeping Community Group</span>
                    </div>
                    <div class="suggestion-item">
                        <i class="fas fa-user"></i>
                        <span>Sarah Mitchell (Beekeeping Instructor)</span>
                    </div>
                    <div class="suggestion-item">
                        <i class="fas fa-bug"></i>
                        <span>Swarm Prevention Techniques</span>
                    </div>
                    <div class="suggestion-item">
                        <i class="fas fa-tint"></i>
                        <span>Honey Extraction Methods</span>
                    </div>
                </div>
            </div>
        `);

        document.body.appendChild(modal);
    }

    openNewMessage() {
        const modal = this.createModal('New Message', `
            <div class="new-message-modal">
                <div class="message-form">
                    <select class="recipient-select">
                        <option>Select recipient...</option>
                        <option>Sarah Mitchell (Beekeeping Instructor)</option>
                        <option>Study Group - Hive Management</option>
                        <option>Beekeeping Support Team</option>
                        <option>Local Beekeeping Association</option>
                        <option>Equipment Supplier</option>
                    </select>
                    <input type="text" placeholder="Subject (e.g., Hive Inspection Question)" class="subject-input">
                    <textarea placeholder="Your message about beekeeping..." class="message-textarea"></textarea>
                    <button class="send-message-btn">Send Message</button>
                </div>
            </div>
        `);

        document.body.appendChild(modal);
    }

    openHelpCenter() {
        const modal = this.createModal('Help Center', `
            <div class="help-center-modal">
                <div class="help-categories">
                    <div class="help-category">
                        <i class="fas fa-question-circle"></i>
                        <h3>Getting Started with Beekeeping</h3>
                        <p>Learn the basics of beekeeping and using Pollen Patrol Academy</p>
                    </div>
                    <div class="help-category">
                        <i class="fas fa-book"></i>
                        <h3>Course & Learning Issues</h3>
                        <p>Problems with beekeeping course content or progress</p>
                    </div>
                    <div class="help-category">
                        <i class="fas fa-bug"></i>
                        <h3>Hive Management Help</h3>
                        <p>Questions about hive inspection, disease prevention, and management</p>
                    </div>
                    <div class="help-category">
                        <i class="fas fa-tools"></i>
                        <h3>Equipment & Supplies</h3>
                        <p>Help with beekeeping equipment, tools, and supplies</p>
                    </div>
                    <div class="help-category">
                        <i class="fas fa-users"></i>
                        <h3>Community & Networking</h3>
                        <p>Help with forums, study groups, and local associations</p>
                    </div>
                    <div class="help-category">
                        <i class="fas fa-credit-card"></i>
                        <h3>Billing & Subscriptions</h3>
                        <p>Questions about course subscriptions and payments</p>
                    </div>
                </div>
            </div>
        `);

        document.body.appendChild(modal);
    }

    createModal(title, content) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h2>${title}</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-content">
                    ${content}
                </div>
            </div>
        `;

        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('modal-close')) {
                modal.remove();
            }
        });

        return modal;
    }

    // Initialize Event Listeners
    initializeEventListeners() {
        // Time filter buttons
        const timeFilterButtons = document.querySelectorAll('.time-filter button');
        timeFilterButtons.forEach(button => {
            button.addEventListener('click', () => {
                timeFilterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                this.updateCharts(button.textContent.toLowerCase());
            });
        });

        // Course recommendation buttons
        const continueButtons = document.querySelectorAll('.continue-btn, .start-btn');
        continueButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleCourseAction(e.currentTarget);
            });
        });

        // Event buttons
        const eventButtons = document.querySelectorAll('.join-btn, .rsvp-btn');
        eventButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleEventAction(e.currentTarget);
            });
        });

        // Activity action buttons
        const activityButtons = document.querySelectorAll('.activity-actions button');
        activityButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleActivityAction(e.currentTarget);
            });
        });

        // Badge cards
        const badgeCards = document.querySelectorAll('.badge-card');
        badgeCards.forEach(card => {
            card.addEventListener('click', () => {
                this.showBadgeDetails(card);
            });
        });
    }

    handleCourseAction(button) {
        const action = button.textContent;
        const courseCard = button.closest('.recommendation-card');
        const courseTitle = courseCard.querySelector('h3').textContent;

        if (action === 'Continue Learning') {
            // Navigate to course learning interface
            window.location.href = 'learning-interface.html';
        } else if (action === 'Start Course') {
            // Show course preview or start enrollment
            this.showCoursePreview(courseTitle);
        }
    }

    handleEventAction(button) {
        const action = button.textContent;
        const eventCard = button.closest('.event-card');
        const eventTitle = eventCard.querySelector('h3').textContent;

        if (action === 'Join Event') {
            this.showEventDetails(eventTitle);
        } else if (action === 'RSVP') {
            this.rsvpToEvent(eventTitle);
        }
    }

    handleActivityAction(button) {
        const action = button.querySelector('i').className;
        const activityCard = button.closest('.activity-card');

        if (action.includes('heart')) {
            this.toggleLike(button);
        } else if (action.includes('comment')) {
            this.showComments(activityCard);
        } else if (action.includes('share')) {
            this.shareActivity(activityCard);
        }
    }

    toggleLike(button) {
        const icon = button.querySelector('i');
        const count = button.textContent.split(' ')[1];

        if (icon.classList.contains('fas')) {
            icon.classList.remove('fas');
            icon.classList.add('far');
            button.textContent = `♥ ${parseInt(count) - 1}`;
        } else {
            icon.classList.remove('far');
            icon.classList.add('fas');
            button.textContent = `♥ ${parseInt(count) + 1}`;
        }
    }

    showBadgeDetails(badgeCard) {
        const badgeTitle = badgeCard.querySelector('h3').textContent;
        const badgeDescription = badgeCard.querySelector('p').textContent;

        const modal = this.createModal(badgeTitle, `
            <div class="badge-details">
                <div class="badge-icon-large">
                    ${badgeCard.querySelector('.badge-icon').innerHTML}
                </div>
                <p>${badgeDescription}</p>
                <div class="badge-criteria">
                    <h4>How to earn this badge:</h4>
                    <ul>
                        <li>Complete the required course or activity</li>
                        <li>Achieve the minimum score threshold</li>
                        <li>Submit all required assignments</li>
                    </ul>
                </div>
            </div>
        `);

        document.body.appendChild(modal);
    }

    // Update charts based on time filter
    updateCharts(timeFilter) {
        // Simulate data updates based on time filter
        const newData = this.getChartDataForTimeFilter(timeFilter);

        if (this.charts.weeklyProgress) {
            this.charts.weeklyProgress.data.datasets[0].data = newData.weekly;
            this.charts.weeklyProgress.update();
        }

        if (this.charts.category) {
            this.charts.category.data.datasets[0].data = newData.categories;
            this.charts.category.update();
        }

        if (this.charts.skillRadar) {
            this.charts.skillRadar.data.datasets[0].data = newData.skills;
            this.charts.skillRadar.update();
        }
    }

    getChartDataForTimeFilter(filter) {
        const dataSets = {
            week: {
                weekly: [2.5, 3.2, 1.8, 4.1, 2.9, 3.5, 2.1],
                categories: [35, 25, 20, 15, 5],
                skills: [85, 70, 60, 45, 30, 80]
            },
            month: {
                weekly: [3.1, 2.8, 4.2, 3.5, 2.9, 3.8, 2.4],
                categories: [40, 20, 25, 10, 5],
                skills: [90, 75, 65, 50, 35, 85]
            },
            year: {
                weekly: [4.2, 3.8, 5.1, 4.5, 3.9, 4.8, 3.2],
                categories: [45, 15, 30, 8, 2],
                skills: [95, 85, 80, 70, 60, 90]
            }
        };

        return dataSets[filter] || dataSets.week;
    }

    // Initialize animations
    initializeAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all cards for animation
        const cards = document.querySelectorAll('.recommendation-card, .chart-card, .badge-card, .event-card, .activity-card');
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }

    // Utility methods
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;

        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);

        // Manual close
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });
    }

    initializeNotifications() {
        this.notifications = [
            {
                id: 1,
                type: 'course',
                title: 'New Course Available',
                message: 'Advanced Hive Management Techniques is now available!',
                time: '2 hours ago',
                read: false,
                icon: 'graduation-cap'
            },
            {
                id: 2,
                type: 'achievement',
                title: 'Achievement Unlocked!',
                message: 'You\'ve earned the "Hive Inspector" badge for completing 10 hive inspections.',
                time: '1 day ago',
                read: false,
                icon: 'trophy'
            },
            {
                id: 3,
                type: 'reminder',
                title: 'Upcoming Webinar',
                message: 'Don\'t forget: "Spring Hive Preparation" webinar starts in 30 minutes.',
                time: '3 hours ago',
                read: true,
                icon: 'calendar-alt'
            },
            {
                id: 4,
                type: 'community',
                title: 'New Discussion',
                message: 'Sarah Johnson started a new discussion: "Best practices for queen rearing".',
                time: '5 hours ago',
                read: false,
                icon: 'users'
            },
            {
                id: 5,
                type: 'system',
                title: 'System Update',
                message: 'New features added: Advanced analytics and progress tracking.',
                time: '1 day ago',
                read: true,
                icon: 'cog'
            }
        ];

        this.createNotificationDropdown();
        this.initializeNotificationEvents();
        this.updateNotificationBadge();
    }

    createNotificationDropdown() {
        const notificationBtn = document.querySelector('.notification-btn');
        if (!notificationBtn) return;

        // Create dropdown container
        const dropdown = document.createElement('div');
        dropdown.className = 'notification-dropdown';
        dropdown.innerHTML = `
            <div class="notification-header">
                <h3>Notifications</h3>
                <button class="mark-all-read">Mark all read</button>
            </div>
            <div class="notification-list">
                ${this.notifications.map(notification => this.createNotificationItem(notification)).join('')}
            </div>
            <div class="notification-footer">
                <a href="#" class="view-all-notifications">View all notifications</a>
            </div>
        `;

        // Insert after notification button
        notificationBtn.parentNode.insertBefore(dropdown, notificationBtn.nextSibling);
    }

    createNotificationItem(notification) {
        const readClass = notification.read ? 'read' : 'unread';
        const iconColor = this.getNotificationIconColor(notification.type);

        return `
            <div class="notification-item ${readClass}" data-id="${notification.id}">
                <div class="notification-icon">
                    <i class="fas fa-${notification.icon}" style="color: ${iconColor}"></i>
                </div>
                <div class="notification-content">
                    <div class="notification-title">${notification.title}</div>
                    <div class="notification-message">${notification.message}</div>
                    <div class="notification-time">${notification.time}</div>
                </div>
                <button class="notification-close-item">&times;</button>
            </div>
        `;
    }

    getNotificationIconColor(type) {
        const colors = {
            course: '#A435F0',
            achievement: '#FFD700',
            reminder: '#FF6B6B',
            community: '#4ECDC4',
            system: '#95A5A6'
        };
        return colors[type] || '#95A5A6';
    }

    initializeNotificationEvents() {
        const notificationBtn = document.querySelector('.notification-btn');
        const dropdown = document.querySelector('.notification-dropdown');

        if (!notificationBtn || !dropdown) return;

        // Toggle dropdown
        notificationBtn.addEventListener('click', (e) => {
            e.preventDefault();
            dropdown.classList.toggle('show');

            // Close other dropdowns
            document.querySelectorAll('.user-dropdown').forEach(dd => dd.classList.remove('show'));
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!notificationBtn.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.classList.remove('show');
            }
        });

        // Mark all as read
        const markAllReadBtn = dropdown.querySelector('.mark-all-read');
        if (markAllReadBtn) {
            markAllReadBtn.addEventListener('click', () => {
                this.notifications.forEach(n => n.read = true);
                this.updateNotificationList();
                this.updateNotificationBadge();
                this.showNotification('All notifications marked as read', 'success');
            });
        }

        // Individual notification actions
        dropdown.addEventListener('click', (e) => {
            if (e.target.classList.contains('notification-close-item')) {
                const item = e.target.closest('.notification-item');
                const id = parseInt(item.dataset.id);
                this.removeNotification(id);
            } else if (e.target.closest('.notification-item')) {
                const item = e.target.closest('.notification-item');
                const id = parseInt(item.dataset.id);
                this.markNotificationAsRead(id);
            }
        });

        // View all notifications
        const viewAllBtn = dropdown.querySelector('.view-all-notifications');
        if (viewAllBtn) {
            viewAllBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showNotification('Opening all notifications...', 'info');
                // Here you could navigate to a dedicated notifications page
            });
        }
    }

    markNotificationAsRead(id) {
        const notification = this.notifications.find(n => n.id === id);
        if (notification) {
            notification.read = true;
            this.updateNotificationList();
            this.updateNotificationBadge();
        }
    }

    removeNotification(id) {
        this.notifications = this.notifications.filter(n => n.id !== id);
        this.updateNotificationList();
        this.updateNotificationBadge();
        this.showNotification('Notification removed', 'info');
    }

    updateNotificationList() {
        const list = document.querySelector('.notification-list');
        if (list) {
            list.innerHTML = this.notifications.map(notification => this.createNotificationItem(notification)).join('');
        }
    }

    updateNotificationBadge() {
        const badge = document.querySelector('.notification-btn .badge');
        const unreadCount = this.notifications.filter(n => !n.read).length;

        if (badge) {
            if (unreadCount > 0) {
                badge.textContent = unreadCount > 99 ? '99+' : unreadCount;
                badge.style.display = 'block';
            } else {
                badge.style.display = 'none';
            }
        }
    }

    showCoursePreview(courseTitle) {
        this.showNotification(`Opening preview for "${courseTitle}"`, 'info');
    }

    showEventDetails(eventTitle) {
        this.showNotification(`Joining "${eventTitle}"`, 'success');
    }

    rsvpToEvent(eventTitle) {
        this.showNotification(`RSVP'd to "${eventTitle}"`, 'success');
    }

    showComments(activityCard) {
        this.showNotification('Opening comments...', 'info');
    }

    shareActivity(activityCard) {
        this.showNotification('Sharing activity...', 'info');
    }
}

class DashboardAIAssistant {
    constructor() {
        this.aiAssistant = document.getElementById('aiAssistant');
        if (!this.aiAssistant) return;
        this.minimizeBtn = document.getElementById('minimizeAI');
        this.chat = document.getElementById('aiChat');
        this.init();
    }
    init() {
        if (this.minimizeBtn) {
            this.minimizeBtn.addEventListener('click', () => this.toggleAIAssistant());
        }
    }
    toggleAIAssistant() {
        if (this.chat.style.display === 'none' || this.aiAssistant.classList.contains('minimized')) {
            this.chat.style.display = 'flex';
            this.aiAssistant.classList.remove('minimized');
            this.minimizeBtn.innerHTML = '<i class="fas fa-minus"></i>';
            this.minimizeBtn.title = 'Minimize chat';
        } else {
            this.chat.style.display = 'none';
            this.aiAssistant.classList.add('minimized');
            this.minimizeBtn.innerHTML = '<i class="fas fa-plus"></i>';
            this.minimizeBtn.title = 'Expand chat';
        }
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DashboardAIAssistant();
});

// Add CSS for modals and notifications
const additionalStyles = `
<style>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
}

.modal {
    background: white;
    border-radius: 16px;
    max-width: 500px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #e0e0e0;
}

.modal-header h2 {
    margin: 0;
    font-size: 1.2rem;
}

.modal-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #666;
}

.modal-content {
    padding: 20px;
}

.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    gap: 12px;
    z-index: 3000;
    animation: slideInRight 0.3s ease;
}

.notification-success {
    border-left: 4px solid #28A745;
}

.notification-error {
    border-left: 4px solid #DC3545;
}

.notification-info {
    border-left: 4px solid #17A2B8;
}

.notification-close {
    background: none;
    border: none;
    cursor: pointer;
    color: #666;
    margin-left: auto;
}

.heatmap-tooltip {
    position: absolute;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.8rem;
    white-space: nowrap;
    z-index: 100;
    display: none;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
}

.quick-search-modal .search-input,
.new-message-modal .recipient-select,
.new-message-modal .subject-input,
.new-message-modal .message-textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin-bottom: 16px;
    font-size: 0.9rem;
}

.new-message-modal .message-textarea {
    height: 120px;
    resize: vertical;
}

.send-message-btn {
    background: var(--udemy-purple);
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
}

.help-categories {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
}

.help-category {
    padding: 20px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease;
}

.help-category:hover {
    border-color: var(--udemy-purple);
    background-color: rgba(164, 53, 240, 0.05);
}

.help-category i {
    font-size: 2rem;
    color: var(--udemy-purple);
    margin-bottom: 12px;
}

.badge-details {
    text-align: center;
}

.badge-icon-large {
    width: 120px;
    height: 120px;
    margin: 0 auto 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    color: white;
    background: var(--gradient-success);
}

.badge-criteria {
    text-align: left;
    margin-top: 20px;
}

.badge-criteria ul {
    padding-left: 20px;
}

.badge-criteria li {
    margin-bottom: 8px;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', additionalStyles);