// Shared Messaging System for All Pages
class MessageManager {
    constructor() {
        this.messages = this.getDefaultMessages();
        this.init();
    }

    getDefaultMessages() {
        return [
            {
                id: 1,
                type: 'instructor',
                sender: 'Sarah Mitchell',
                title: 'Welcome to Advanced Hive Management!',
                message: 'Hi Alex! Welcome to the Advanced Hive Management course. I\'m excited to be your instructor and help you master advanced beekeeping techniques.',
                time: '2 hours ago',
                read: false,
                avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
                icon: 'graduation-cap'
            },
            {
                id: 2,
                type: 'community',
                sender: 'David Chen',
                title: 'Study Group Invitation',
                message: 'Hey! I noticed you\'re also taking the Advanced Hive Management course. Would you like to join our study group? We meet weekly on Sundays.',
                time: '1 day ago',
                read: false,
                avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
                icon: 'users'
            },
            {
                id: 3,
                type: 'support',
                sender: 'Pollen Patrol Academy Support',
                title: 'Course Progress Update',
                message: 'Great job on completing Module 3! You\'re making excellent progress. Keep up the good work!',
                time: '3 hours ago',
                read: true,
                avatar: 'https://randomuser.me/api/portraits/men/68.jpg',
                icon: 'headset'
            },
            {
                id: 4,
                type: 'mentor',
                sender: 'Maria Garcia',
                title: 'Mentorship Session Confirmed',
                message: 'Your mentorship session is confirmed for tomorrow at 3 PM. We\'ll discuss queen rearing techniques and answer any questions you have.',
                time: '5 hours ago',
                read: false,
                avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
                icon: 'user-tie'
            },
            {
                id: 5,
                type: 'system',
                sender: 'Pollen Patrol Academy System',
                title: 'New Feature Available',
                message: 'We\'ve just launched our new mobile app! Download it to continue learning on the go with offline access to your courses.',
                time: '1 day ago',
                read: true,
                avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
                icon: 'mobile-alt'
            }
        ];
    }

    init() {
        this.createMessageDropdown();
        this.initializeMessageEvents();
        this.updateMessageBadge();
    }

    createMessageDropdown() {
        const messageBtn = document.querySelector('.messages-btn');
        if (!messageBtn) return;

        // Check if dropdown already exists
        if (document.querySelector('.message-dropdown')) return;

        // Create dropdown container
        const dropdown = document.createElement('div');
        dropdown.className = 'message-dropdown';
        dropdown.innerHTML = `
            <div class="message-header">
                <h3>Messages</h3>
                <button class="mark-all-read-messages">Mark all read</button>
            </div>
            <div class="message-list">
                ${this.messages.map(message => this.createMessageItem(message)).join('')}
            </div>
            <div class="message-footer">
                <a href="#" class="view-all-messages">View all messages</a>
                <a href="#" class="compose-message">Compose new message</a>
            </div>
        `;

        // Insert after message button
        messageBtn.parentNode.insertBefore(dropdown, messageBtn.nextSibling);
    }

    createMessageItem(message) {
        const readClass = message.read ? 'read' : 'unread';
        const iconColor = this.getMessageIconColor(message.type);

        return `
            <div class="message-item ${readClass}" data-id="${message.id}">
                <div class="message-avatar">
                    <img src="${message.avatar}" alt="${message.sender}">
                    <div class="message-icon">
                        <i class="fas fa-${message.icon}" style="color: ${iconColor}"></i>
                    </div>
                </div>
                <div class="message-content">
                    <div class="message-header-info">
                        <div class="message-sender">${message.sender}</div>
                        <div class="message-time">${message.time}</div>
                    </div>
                    <div class="message-title">${message.title}</div>
                    <div class="message-preview">${message.message}</div>
                </div>
                <button class="message-close-item">&times;</button>
            </div>
        `;
    }

    getMessageIconColor(type) {
        const colors = {
            instructor: '#A435F0',
            community: '#4ECDC4',
            support: '#FF6B6B',
            mentor: '#FFD700',
            system: '#95A5A6'
        };
        return colors[type] || '#95A5A6';
    }

    initializeMessageEvents() {
        const messageBtn = document.querySelector('.messages-btn');
        const dropdown = document.querySelector('.message-dropdown');

        if (!messageBtn || !dropdown) return;

        // Toggle dropdown
        messageBtn.addEventListener('click', (e) => {
            e.preventDefault();
            dropdown.classList.toggle('show');

            // Close other dropdowns
            document.querySelectorAll('.user-dropdown, .notification-dropdown').forEach(dd => dd.classList.remove('show'));
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!messageBtn.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.classList.remove('show');
            }
        });

        // Mark all as read
        const markAllReadBtn = dropdown.querySelector('.mark-all-read-messages');
        if (markAllReadBtn) {
            markAllReadBtn.addEventListener('click', () => {
                this.messages.forEach(m => m.read = true);
                this.updateMessageList();
                this.updateMessageBadge();
                this.showToast('All messages marked as read', 'success');
            });
        }

        // Individual message actions
        dropdown.addEventListener('click', (e) => {
            if (e.target.classList.contains('message-close-item')) {
                const item = e.target.closest('.message-item');
                const id = parseInt(item.dataset.id);
                this.removeMessage(id);
            } else if (e.target.closest('.message-item')) {
                const item = e.target.closest('.message-item');
                const id = parseInt(item.dataset.id);
                this.markMessageAsRead(id);
            }
        });

        // View all messages
        const viewAllBtn = dropdown.querySelector('.view-all-messages');
        if (viewAllBtn) {
            viewAllBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showToast('Opening all messages...', 'info');
            });
        }

        // Compose new message
        const composeBtn = dropdown.querySelector('.compose-message');
        if (composeBtn) {
            composeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showComposeModal();
            });
        }
    }

    markMessageAsRead(id) {
        const message = this.messages.find(m => m.id === id);
        if (message) {
            message.read = true;
            this.updateMessageList();
            this.updateMessageBadge();
        }
    }

    removeMessage(id) {
        this.messages = this.messages.filter(m => m.id !== id);
        this.updateMessageList();
        this.updateMessageBadge();
        this.showToast('Message removed', 'info');
    }

    updateMessageList() {
        const list = document.querySelector('.message-list');
        if (list) {
            list.innerHTML = this.messages.map(message => this.createMessageItem(message)).join('');
        }
    }

    updateMessageBadge() {
        const badge = document.querySelector('.messages-btn .badge');
        const unreadCount = this.messages.filter(m => !m.read).length;

        if (badge) {
            if (unreadCount > 0) {
                badge.textContent = unreadCount > 99 ? '99+' : unreadCount;
                badge.style.display = 'block';
            } else {
                badge.style.display = 'none';
            }
        }
    }

    showComposeModal() {
        const modal = document.createElement('div');
        modal.className = 'compose-modal-overlay';
        modal.innerHTML = `
            <div class="compose-modal">
                <div class="compose-header">
                    <h3>Compose New Message</h3>
                    <button class="close-compose">&times;</button>
                </div>
                <div class="compose-body">
                    <div class="compose-field">
                        <label>To:</label>
                        <select id="messageRecipient">
                            <option value="">Select recipient...</option>
                            <option value="instructor">Instructor</option>
                            <option value="support">Support Team</option>
                            <option value="mentor">Mentor</option>
                        </select>
                    </div>
                    <div class="compose-field">
                        <label>Subject:</label>
                        <input type="text" id="messageSubject" placeholder="Enter subject...">
                    </div>
                    <div class="compose-field">
                        <label>Message:</label>
                        <textarea id="messageContent" placeholder="Type your message here..." rows="6"></textarea>
                    </div>
                </div>
                <div class="compose-footer">
                    <button class="cancel-compose">Cancel</button>
                    <button class="send-message">Send Message</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Add modal styles
        this.addComposeModalStyles();

        // Event listeners
        const closeBtn = modal.querySelector('.close-compose');
        const cancelBtn = modal.querySelector('.cancel-compose');
        const sendBtn = modal.querySelector('.send-message');

        const closeModal = () => {
            modal.remove();
        };

        closeBtn.addEventListener('click', closeModal);
        cancelBtn.addEventListener('click', closeModal);

        sendBtn.addEventListener('click', () => {
            const recipient = document.getElementById('messageRecipient').value;
            const subject = document.getElementById('messageSubject').value;
            const content = document.getElementById('messageContent').value;

            if (!recipient || !subject || !content) {
                this.showToast('Please fill in all fields', 'error');
                return;
            }

            this.showToast('Message sent successfully!', 'success');
            closeModal();
        });

        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    addComposeModalStyles() {
        if (document.getElementById('compose-modal-styles')) return;

        const style = document.createElement('style');
        style.id = 'compose-modal-styles';
        style.textContent = `
            .compose-modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
            }

            .compose-modal {
                background: white;
                border-radius: 12px;
                width: 90%;
                max-width: 500px;
                max-height: 80vh;
                overflow: hidden;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
            }

            .compose-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 16px 20px;
                border-bottom: 1px solid #e0e0e0;
                background: #f8f9fa;
            }

            .compose-header h3 {
                margin: 0;
                font-size: 1.1rem;
                font-weight: 600;
            }

            .close-compose {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #666;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.2s ease;
            }

            .close-compose:hover {
                background: #e0e0e0;
                color: #333;
            }

            .compose-body {
                padding: 20px;
            }

            .compose-field {
                margin-bottom: 16px;
            }

            .compose-field label {
                display: block;
                margin-bottom: 6px;
                font-weight: 500;
                color: #333;
            }

            .compose-field select,
            .compose-field input,
            .compose-field textarea {
                width: 100%;
                padding: 10px 12px;
                border: 1px solid #ddd;
                border-radius: 6px;
                font-size: 0.9rem;
                transition: border-color 0.2s ease;
            }

            .compose-field select:focus,
            .compose-field input:focus,
            .compose-field textarea:focus {
                outline: none;
                border-color: #A435F0;
                box-shadow: 0 0 0 3px rgba(164, 53, 240, 0.1);
            }

            .compose-footer {
                display: flex;
                justify-content: flex-end;
                gap: 12px;
                padding: 16px 20px;
                border-top: 1px solid #e0e0e0;
                background: #f8f9fa;
            }

            .cancel-compose,
            .send-message {
                padding: 8px 16px;
                border: none;
                border-radius: 6px;
                font-size: 0.9rem;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s ease;
            }

            .cancel-compose {
                background: #f8f9fa;
                color: #666;
                border: 1px solid #ddd;
            }

            .cancel-compose:hover {
                background: #e9ecef;
            }

            .send-message {
                background: #A435F0;
                color: white;
            }

            .send-message:hover {
                background: #8b2fd9;
            }
        `;
        document.head.appendChild(style);
    }

    showToast(message, type = 'info') {
        // Create a simple toast notification
        const toast = document.createElement('div');
        toast.className = `toast-notification toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas fa-${this.getToastIcon(type)}"></i>
                <span>${message}</span>
                <button class="toast-close">&times;</button>
            </div>
        `;

        // Add toast styles if not already present
        this.addToastStyles();

        document.body.appendChild(toast);

        // Show toast
        setTimeout(() => toast.classList.add('show'), 100);

        // Auto remove after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);

        // Manual close
        toast.querySelector('.toast-close').addEventListener('click', () => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        });
    }

    getToastIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    addToastStyles() {
        if (document.getElementById('toast-styles')) return;

        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            .toast-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                padding: 12px 16px;
                z-index: 10000;
                transform: translateX(100%);
                transition: transform 0.3s ease;
                max-width: 300px;
                border-left: 4px solid #ccc;
            }

            .toast-notification.show {
                transform: translateX(0);
            }

            .toast-success {
                border-left-color: #28a745;
            }

            .toast-error {
                border-left-color: #dc3545;
            }

            .toast-warning {
                border-left-color: #ffc107;
            }

            .toast-info {
                border-left-color: #17a2b8;
            }

            .toast-content {
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .toast-content i {
                font-size: 1.1rem;
            }

            .toast-content span {
                flex: 1;
                font-size: 0.9rem;
            }

            .toast-close {
                background: none;
                border: none;
                font-size: 1.2rem;
                cursor: pointer;
                color: #666;
                padding: 0;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .toast-close:hover {
                color: #333;
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize messaging system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MessageManager();
});