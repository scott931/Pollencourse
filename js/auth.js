// Authentication JavaScript - Beekeeping Course System

class AuthManager {
    constructor() {
        this.currentPage = window.location.pathname;
        this.init();
    }

    init() {
        this.initializePasswordToggles();
        this.initializePasswordStrength();
        this.initializeFormValidation();
        this.initializeSocialLogin();
        this.initializeAnimations();
    }

    // Password Toggle Functionality
    initializePasswordToggles() {
        const toggleButtons = document.querySelectorAll('.toggle-password');

        toggleButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const input = button.previousElementSibling;
                const icon = button.querySelector('i');

                if (input.type === 'password') {
                    input.type = 'text';
                    icon.classList.remove('fa-eye');
                    icon.classList.add('fa-eye-slash');
                } else {
                    input.type = 'password';
                    icon.classList.remove('fa-eye-slash');
                    icon.classList.add('fa-eye');
                }
            });
        });
    }

    // Password Strength Checker
    initializePasswordStrength() {
        const passwordInput = document.getElementById('password');
        if (!passwordInput) return;

        passwordInput.addEventListener('input', (e) => {
            const password = e.target.value;
            const strength = this.checkPasswordStrength(password);
            this.updatePasswordStrengthUI(strength);
        });
    }

    checkPasswordStrength(password) {
        let score = 0;
        let feedback = [];

        // Length check
        if (password.length >= 8) {
            score += 1;
        } else {
            feedback.push('At least 8 characters');
        }

        // Uppercase check
        if (/[A-Z]/.test(password)) {
            score += 1;
        } else {
            feedback.push('One uppercase letter');
        }

        // Lowercase check
        if (/[a-z]/.test(password)) {
            score += 1;
        } else {
            feedback.push('One lowercase letter');
        }

        // Number check
        if (/\d/.test(password)) {
            score += 1;
        } else {
            feedback.push('One number');
        }

        // Special character check
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            score += 1;
        } else {
            feedback.push('One special character');
        }

        if (score <= 2) return { level: 'weak', score, feedback };
        if (score <= 3) return { level: 'fair', score, feedback };
        if (score <= 4) return { level: 'good', score, feedback };
        return { level: 'strong', score, feedback };
    }

    updatePasswordStrengthUI(strength) {
        const strengthFill = document.getElementById('strengthFill');
        const strengthText = document.getElementById('strengthText');

        if (!strengthFill || !strengthText) return;

        // Remove all classes
        strengthFill.className = 'strength-fill';

        // Add appropriate class
        strengthFill.classList.add(strength.level);

        // Update text
        const strengthMessages = {
            weak: 'Weak password',
            fair: 'Fair password',
            good: 'Good password',
            strong: 'Strong password'
        };

        strengthText.textContent = strengthMessages[strength.level];
    }

    // Form Validation
    initializeFormValidation() {
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        if (registerForm) {
            registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        }

        // Real-time validation
        this.initializeRealTimeValidation();
    }

    initializeRealTimeValidation() {
        const inputs = document.querySelectorAll('input[required], select[required]');

        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Remove existing error
        this.clearFieldError(field);

        // Required field validation
        if (!value) {
            isValid = false;
            errorMessage = 'This field is required';
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }

        // Phone validation
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value.replace(/\s/g, ''))) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
        }

        // Password confirmation validation
        if (field.id === 'confirmPassword') {
            const password = document.getElementById('password')?.value;
            if (value !== password) {
                isValid = false;
                errorMessage = 'Passwords do not match';
            }
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        } else {
            this.showFieldSuccess(field);
        }

        return isValid;
    }

    showFieldError(field, message) {
        const wrapper = field.closest('.input-wrapper');
        wrapper.classList.add('error');

        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i>${message}`;

        wrapper.appendChild(errorDiv);
    }

    showFieldSuccess(field) {
        const wrapper = field.closest('.input-wrapper');
        wrapper.classList.remove('error');
        wrapper.classList.add('success');
    }

    clearFieldError(field) {
        const wrapper = field.closest('.input-wrapper');
        wrapper.classList.remove('error', 'success');

        const errorMessage = wrapper.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    // Form Submission Handlers
    async handleLogin(e) {
        e.preventDefault();

        const form = e.target;
        const submitBtn = form.querySelector('.submit-btn');
        const email = form.email.value;
        const password = form.password.value;
        const remember = form.remember?.checked;

        // Validate form
        if (!this.validateField(form.email) || !this.validateField(form.password)) {
            return;
        }

        // Show loading state
        this.setLoadingState(submitBtn, true);

        try {
            // Simulate API call
            await this.simulateApiCall(1500);

            // Store user data
            const userData = {
                email,
                name: 'Alex Johnson',
                experience: 'intermediate',
                loginTime: new Date().toISOString(),
                remember
            };

            localStorage.setItem('userData', JSON.stringify(userData));

            // Show success message
            this.showNotification('Login successful! Redirecting...', 'success');

            // Redirect to dashboard
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);

        } catch (error) {
            this.showNotification('Login failed. Please try again.', 'error');
        } finally {
            this.setLoadingState(submitBtn, false);
        }
    }

    async handleRegister(e) {
        e.preventDefault();

        const form = e.target;
        const submitBtn = form.querySelector('.submit-btn');

        // Validate all fields
        const fields = ['firstName', 'lastName', 'email', 'phone', 'experience', 'password', 'confirmPassword'];
        let isValid = true;

        fields.forEach(fieldName => {
            const field = form[fieldName];
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        // Check terms agreement
        if (!form.terms?.checked) {
            this.showNotification('Please agree to the Terms of Service and Privacy Policy.', 'error');
            return;
        }

        if (!isValid) {
            return;
        }

        // Show loading state
        this.setLoadingState(submitBtn, true);

        try {
            // Simulate API call
            await this.simulateApiCall(2000);

            // Store user data
            const userData = {
                firstName: form.firstName.value,
                lastName: form.lastName.value,
                email: form.email.value,
                phone: form.phone.value,
                experience: form.experience.value,
                newsletter: form.newsletter?.checked,
                registrationTime: new Date().toISOString()
            };

            localStorage.setItem('userData', JSON.stringify(userData));

            // Show success message
            this.showNotification('Registration successful! Welcome to LearnHub!', 'success');

            // Redirect to dashboard
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);

        } catch (error) {
            this.showNotification('Registration failed. Please try again.', 'error');
        } finally {
            this.setLoadingState(submitBtn, false);
        }
    }

    // Social Login
    initializeSocialLogin() {
        const socialButtons = document.querySelectorAll('.social-btn');

        socialButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const provider = button.classList.contains('google') ? 'Google' : 'Facebook';
                this.handleSocialLogin(provider);
            });
        });
    }

    handleSocialLogin(provider) {
        this.showNotification(`${provider} login coming soon!`, 'info');
    }

    // Utility Functions
    setLoadingState(button, isLoading) {
        if (isLoading) {
            button.classList.add('loading');
            button.disabled = true;
        } else {
            button.classList.remove('loading');
            button.disabled = false;
        }
    }

    async simulateApiCall(delay) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate 90% success rate
                if (Math.random() > 0.1) {
                    resolve();
                } else {
                    reject(new Error('API Error'));
                }
            }, delay);
        });
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">&times;</button>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${this.getNotificationColor(type)};
            color: white;
            padding: 16px 20px;
            border-radius: 12px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.15);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 12px;
            max-width: 400px;
            animation: slideInRight 0.3s ease-out;
        `;

        // Add to page
        document.body.appendChild(notification);

        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease-out';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    getNotificationColor(type) {
        const colors = {
            success: '#28A745',
            error: '#dc3545',
            warning: '#ffc107',
            info: '#17A2B8'
        };
        return colors[type] || '#17A2B8';
    }

    // Animations
    initializeAnimations() {
        // Add animation classes to elements
        const formContainer = document.querySelector('.form-container');
        const brandContent = document.querySelector('.brand-content');

        if (formContainer) {
            formContainer.classList.add('fade-in');
        }

        if (brandContent) {
            brandContent.classList.add('slide-in-right');
        }

        // Add CSS for slideOutRight animation
        if (!document.querySelector('#auth-animations')) {
            const style = document.createElement('style');
            style.id = 'auth-animations';
            style.textContent = `
                @keyframes slideOutRight {
                    from {
                        opacity: 1;
                        transform: translateX(0);
                    }
                    to {
                        opacity: 0;
                        transform: translateX(100%);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AuthManager();
});

// Check if user is already logged in
function checkAuthStatus() {
    const userData = localStorage.getItem('userData');
    // Only redirect if we're on login.html and user is logged in
    if (userData && window.location.pathname.includes('login.html')) {
        window.location.href = 'dashboard.html';
    }
}

// Only run auth check on login and register pages
if (window.location.pathname.includes('login.html') || window.location.pathname.includes('register.html')) {
    checkAuthStatus();
}