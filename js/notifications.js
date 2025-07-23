// Shared Notification System for All Pages
class NotificationManager {
    constructor() {
        this.notifications = this.getDefaultNotifications();
        this.init();
    }

    getDefaultNotifications() {
        return [
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
    }

    init() {
        this.createNotificationDropdown();
        this.initializeNotificationEvents();
        this.updateNotificationBadge();
    }

    createNotificationDropdown() {
        const notificationBtn = document.querySelector('.notification-btn');
        if (!notificationBtn) return;

        // Check if dropdown already exists
        if (document.querySelector('.notification-dropdown')) return;

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
            system: '#95A5A6',
            group: '#A435F0',
            mentor: '#FF6B6B',
            event: '#FFD700'
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
                this.showToast('All notifications marked as read', 'success');
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
                this.showToast('Opening all notifications...', 'info');
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
        this.showToast('Notification removed', 'info');
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

// Initialize notification system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NotificationManager();
});