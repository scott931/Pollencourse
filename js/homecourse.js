// HomeCourse JavaScript - Interactive Course Page Functionality

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Initialize countdown timer
    initializeCountdown();

    // Initialize content sections
    initializeContentSections();

    // Initialize helpful buttons
    initializeHelpfulButtons();

    // Initialize start course button
    initializeStartCourseButton();
});

// Countdown Timer Functionality
function initializeCountdown() {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;

    // Set countdown to 5 hours from now
    const endTime = new Date().getTime() + (5 * 60 * 60 * 1000);

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = endTime - now;

        if (distance < 0) {
            countdownElement.textContent = "Offer expired!";
            return;
        }

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.textContent = `${hours}h ${minutes}m ${seconds}s left at this price!`;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Content Section Toggle Functionality
function initializeContentSections() {
    // The onclick attributes in HTML will handle the toggle functionality
    // This function is kept for any additional initialization if needed
    console.log('Content sections initialized');
}

function toggleContent(header) {
    const contentItems = header.nextElementSibling;
    const toggleIcon = header.querySelector('.toggle-icon');

    if (contentItems.classList.contains('show')) {
        contentItems.classList.remove('show');
        header.classList.remove('expanded');
    } else {
        contentItems.classList.add('show');
        header.classList.add('expanded');
    }
}

function expandAllSections() {
    const contentHeaders = document.querySelectorAll('.content-header');
    const expandBtn = document.querySelector('.expand-all-btn');

    const allExpanded = Array.from(contentHeaders).every(header =>
        header.classList.contains('expanded')
    );

    contentHeaders.forEach(header => {
        const contentItems = header.nextElementSibling;
        if (allExpanded) {
            contentItems.classList.remove('show');
            header.classList.remove('expanded');
        } else {
            contentItems.classList.add('show');
            header.classList.add('expanded');
        }
    });

    expandBtn.textContent = allExpanded ? 'Expand all sections' : 'Collapse all sections';
}

// Description Toggle Functionality
function toggleDescription() {
    const hiddenDescription = document.getElementById('hiddenDescription');
    const showMoreBtn = document.querySelector('.show-more-btn');

    if (hiddenDescription.classList.contains('show')) {
        hiddenDescription.classList.remove('show');
        showMoreBtn.textContent = 'Show more';
    } else {
        hiddenDescription.classList.add('show');
        showMoreBtn.textContent = 'Show less';
    }
}

// Instructor Bio Toggle Functionality
function toggleInstructorBio() {
    const hiddenBio = document.getElementById('hiddenBio');
    const showMoreBtn = hiddenBio.nextElementSibling;

    if (hiddenBio.classList.contains('show')) {
        hiddenBio.classList.remove('show');
        showMoreBtn.textContent = 'Show more';
    } else {
        hiddenBio.classList.add('show');
        showMoreBtn.textContent = 'Show less';
    }
}

// Helpful Buttons Functionality
function initializeHelpfulButtons() {
    const helpfulBtns = document.querySelectorAll('.helpful-btn');

    helpfulBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const countElement = this.querySelector('.helpful-count');
            let count = parseInt(countElement.textContent);

            if (this.classList.contains('active')) {
                this.classList.remove('active');
                count--;
            } else {
                // Remove active from other buttons in the same group
                const parentGroup = this.closest('.helpful-buttons');
                parentGroup.querySelectorAll('.helpful-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                count++;
            }

            countElement.textContent = count;
        });
    });
}

function markHelpful(btn) {
    const countElement = btn.querySelector('.helpful-count');
    let count = parseInt(countElement.textContent);

    if (!btn.classList.contains('active')) {
        btn.classList.add('active');
        count++;
        countElement.textContent = count;
    }
}

function markNotHelpful(btn) {
    const countElement = btn.querySelector('.helpful-count');
    let count = parseInt(countElement.textContent);

    if (!btn.classList.contains('active')) {
        btn.classList.add('active');
        count++;
        countElement.textContent = count;
    }
}

// Pricing Tab Functionality
function switchPricingTab(tab) {
    const tabs = document.querySelectorAll('.pricing-tab');
    tabs.forEach(t => t.classList.remove('active'));

    const activeTab = document.querySelector(`[onclick="switchPricingTab('${tab}')"]`);
    if (activeTab) {
        activeTab.classList.add('active');
    }

    // Update pricing based on tab
    updatePricing(tab);
}

function updatePricing(tab) {
    const currentPrice = document.querySelector('.current-price');
    const originalPrice = document.querySelector('.original-price');
    const discountBadge = document.querySelector('.discount-badge');

    if (tab === 'personal') {
        currentPrice.textContent = '$13.99';
        originalPrice.textContent = '$54.99';
        discountBadge.textContent = '75% off';
    } else if (tab === 'teams') {
        currentPrice.textContent = '$29.99';
        originalPrice.textContent = '$89.99';
        discountBadge.textContent = '67% off';
    }
}

// Course Actions
function previewCourse() {
    // Simulate course preview
    alert('Course preview would open here. This would typically open a video player or preview modal.');
}

function addToCart() {
    // Simulate adding to cart
    const btn = document.querySelector('.add-to-cart-btn');
    const originalText = btn.textContent;

    btn.textContent = 'Added to cart!';
    btn.style.background = 'var(--green-success)';
    btn.style.color = 'white';

    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.style.color = '';
    }, 2000);
}

function buyNow() {
    // Simulate buy now action
    alert('This would redirect to the checkout page.');
}

function addAllToCart() {
    // Simulate adding all courses to cart
    alert('All courses added to cart!');
}

// Navigation Functions
function navigateToCourse(courseId) {
    // Simulate navigation to course
    console.log(`Navigating to course: ${courseId}`);
    // In a real application, this would redirect to the course page
    // window.location.href = `/course/${courseId}`;
}

// Social and Sharing Functions
function shareCourse() {
    if (navigator.share) {
        navigator.share({
            title: 'Complete Guide to Build IOT Things from Scratch to Market',
            text: 'Check out this amazing IoT course on LearnHub!',
            url: window.location.href
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent('Check out this amazing IoT course on LearnHub!');
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    }
}

function giftCourse() {
    alert('Gift course functionality would open here.');
}

function applyCoupon() {
    const couponInput = document.getElementById('couponInput');
    if (couponInput) {
        couponInput.focus();
    }
}

function applyCouponCode() {
    const couponInput = document.getElementById('couponInput');
    const couponCode = couponInput.value.trim();

    if (couponCode === '') {
        alert('Please enter a coupon code.');
        return;
    }

    // Simulate coupon validation
    if (couponCode.toLowerCase() === 'welcome10') {
        alert('Coupon applied! 10% discount added.');
        couponInput.style.borderColor = 'var(--green-success)';
        couponInput.value = '';
    } else {
        alert('Invalid coupon code. Please try again.');
        couponInput.style.borderColor = 'var(--red-timer)';
    }
}

// Review Functions
function showAllReviews() {
    alert('This would load and display all reviews for the course.');
}

// Search Functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');

    if (searchInput && searchButton) {
        searchButton.addEventListener('click', function() {
            performSearch(searchInput.value);
        });

        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });
    }
});

function performSearch(query) {
    if (query.trim() === '') {
        alert('Please enter a search term.');
        return;
    }

    console.log(`Searching for: ${query}`);
    // In a real application, this would perform the search
    // window.location.href = `/search?q=${encodeURIComponent(query)}`;
}

// Notification and Message Functions
document.addEventListener('DOMContentLoaded', function() {
    const notificationBtn = document.querySelector('.notification-btn');
    const messagesBtn = document.querySelector('.messages-btn');

    if (notificationBtn) {
        notificationBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Notifications panel would open here.');
        });
    }

    if (messagesBtn) {
        messagesBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Messages panel would open here.');
        });
    }
});

// User Profile Dropdown
document.addEventListener('DOMContentLoaded', function() {
    const userProfile = document.querySelector('.user-profile');

    if (userProfile) {
        userProfile.addEventListener('click', function() {
            // Toggle user dropdown menu
            console.log('User profile dropdown would toggle here.');
        });
    }
});

// Heart Icon Toggle
document.addEventListener('DOMContentLoaded', function() {
    const heartIcons = document.querySelectorAll('.heart-icon i');

    heartIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.stopPropagation();

            if (this.classList.contains('far')) {
                this.classList.remove('far');
                this.classList.add('fas');
                this.style.color = 'var(--red-timer)';
            } else {
                this.classList.remove('fas');
                this.classList.add('far');
                this.style.color = '';
            }
        });
    });
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key to close modals or dropdowns
    if (e.key === 'Escape') {
        // Close any open modals or dropdowns
        console.log('ESC pressed - closing modals/dropdowns');
    }

    // Enter key for interactive elements
    if (e.key === 'Enter') {
        const focusedElement = document.activeElement;
        if (focusedElement && focusedElement.classList.contains('content-header')) {
            toggleContent(focusedElement);
        }
    }
});

// Performance optimization: Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// Error handling for failed image loads
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');

    images.forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
            this.alt = 'Image not available';
        });
    });
});

// Analytics tracking (placeholder)
function trackEvent(eventName, eventData = {}) {
    console.log(`Analytics Event: ${eventName}`, eventData);
    // In a real application, this would send data to analytics service
    // gtag('event', eventName, eventData);
}

// Track course interactions
document.addEventListener('DOMContentLoaded', function() {
    // Track course preview clicks
    const previewBtn = document.querySelector('.course-preview');
    if (previewBtn) {
        previewBtn.addEventListener('click', () => {
            trackEvent('course_preview_clicked');
        });
    }

    // Track add to cart clicks
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            trackEvent('add_to_cart_clicked');
        });
    }

    // Track buy now clicks
    const buyNowBtn = document.querySelector('.buy-now-btn');
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', () => {
            trackEvent('buy_now_clicked');
        });
    }
});

// Start Course Button Functionality
function initializeStartCourseButton() {
    const startCourseBtn = document.querySelector('.start-course-btn');
    if (!startCourseBtn) return;

    startCourseBtn.addEventListener('click', function(e) {
        e.preventDefault();

        // Track the start course event
        trackEvent('start_course', {
            course_name: 'Complete Guide to Beekeeping',
            course_id: 'beekeeping-complete'
        });

        // Show notification about redirecting to login
        showNotification('Redirecting to login page...', 'info');

        // Redirect to login page
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1000);
    });
}

function showNotification(message, type = 'info') {
    // Create a simple toast notification
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas fa-${getToastIcon(type)}"></i>
            <span>${message}</span>
            <button class="toast-close">&times;</button>
        </div>
    `;

    // Add toast styles if not already present
    addToastStyles();

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

function getToastIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function addToastStyles() {
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