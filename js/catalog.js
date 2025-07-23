// Course Catalog JavaScript - Enhanced Discovery Interface

class CatalogManager {
    constructor() {
        this.filters = {
            category: 'all',
            level: 'all',
            price: 100,
            duration: 'all',
            language: 'all',
            features: []
        };
        this.savedFilters = [];
        this.aiAssistant = null;
        this.init();
    }

    init() {
        this.initializeAOS();
        this.initializeEventListeners();
        this.loadMockData();
    }

    // Initialize AOS (Animate On Scroll)
    initializeAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true
            });
        }
    }

    // Initialize Event Listeners
    initializeEventListeners() {
        // Save filters button
        const saveFiltersBtn = document.querySelector('.save-filters-btn');
        if (saveFiltersBtn) {
            saveFiltersBtn.addEventListener('click', () => {
                this.saveFilters();
            });
        }

        // Clear filters button
        const clearFiltersBtn = document.querySelector('.clear-filters-btn');
        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', () => {
                this.clearAllFilters();
            });
        }

        // Sort select
        const sortSelect = document.getElementById('sortSelect');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.sortCourses(e.target.value);
            });
        }

        // Load more button
        const loadMoreBtn = document.querySelector('.load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.loadMoreCourses();
            });
        }

        // Course cards
        const courseCards = document.querySelectorAll('.course-card');
        courseCards.forEach(card => {
            // Add to cart button
            const addToCartBtn = card.querySelector('.add-to-cart-btn');
            if (addToCartBtn) {
                addToCartBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.addToCart(card);
                });
            }

            // Instructor link
            const instructorLink = card.querySelector('.instructor');
            if (instructorLink) {
                instructorLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.showInstructorProfile(instructorLink.textContent);
                });
            }
        });

        // Path cards
        const pathCards = document.querySelectorAll('.path-card');
        pathCards.forEach(card => {
            const continueBtn = card.querySelector('.continue-path-btn, .start-path-btn');
            if (continueBtn) {
                continueBtn.addEventListener('click', () => {
                    this.continueLearningPath(card);
                });
            }
        });

        // Bundle cards
        const bundleCards = document.querySelectorAll('.bundle-card');
        bundleCards.forEach(card => {
            const buyBtn = card.querySelector('.buy-bundle-btn');
            if (buyBtn) {
                buyBtn.addEventListener('click', () => {
                    this.buyBundle(card);
                });
            }
        });

        // Close 3D modal
        const close3DBtn = document.querySelector('.close-3d');
        if (close3DBtn) {
            close3DBtn.addEventListener('click', () => {
                this.close3DPreview();
            });
        }

        // Close modal when clicking outside
        const modal3D = document.getElementById('modal3D');
        if (modal3D) {
            modal3D.addEventListener('click', (e) => {
                if (e.target === modal3D) {
                    this.close3DPreview();
                }
            });
        }
    }

    // Course Actions
    addToCart(card) {
        const courseTitle = card.querySelector('h3').textContent;
        this.showNotification(`"${courseTitle}" added to cart!`, 'success');

        // Add animation to cart button
        const addToCartBtn = card.querySelector('.add-to-cart-btn');
        addToCartBtn.textContent = 'Added ✓';
        addToCartBtn.style.background = 'var(--green-success)';

        setTimeout(() => {
            addToCartBtn.textContent = 'Add to Cart';
            addToCartBtn.style.background = '';
        }, 2000);
    }

    showInstructorProfile(instructorName) {
        const modal = this.createModal(`Instructor: ${instructorName}`, `
            <div class="instructor-profile-modal">
                <div class="instructor-header">
                    <img src="https://via.placeholder.com/100x100" alt="${instructorName}" class="instructor-avatar">
                    <div class="instructor-info">
                        <h3>${instructorName}</h3>
                        <p>Senior Web Developer & Instructor</p>
                        <div class="instructor-stats">
                            <span><i class="fas fa-star"></i> 4.8 Instructor Rating</span>
                            <span><i class="fas fa-users"></i> 500k+ Students</span>
                            <span><i class="fas fa-play-circle"></i> 15 Courses</span>
                        </div>
                    </div>
                </div>
                <div class="instructor-bio">
                    <p>${instructorName} is a passionate instructor with over 10 years of experience in web development. They have helped hundreds of thousands of students master modern web technologies.</p>
                </div>
                <div class="instructor-courses">
                    <h4>Popular Courses</h4>
                    <div class="course-list">
                        <div class="course-item">The Complete JavaScript Course 2024</div>
                        <div class="course-item">Advanced CSS and Sass</div>
                        <div class="course-item">Node.js, Express, MongoDB</div>
                    </div>
                </div>
            </div>
        `);

        document.body.appendChild(modal);
    }

    continueLearningPath(pathCard) {
        const pathTitle = pathCard.querySelector('h3').textContent;
        this.showNotification(`Continuing "${pathTitle}" learning path...`, 'info');

        // Simulate navigation to learning path
        setTimeout(() => {
            window.location.href = 'learning-interface.html';
        }, 1000);
    }

    buyBundle(bundleCard) {
        const bundleTitle = bundleCard.querySelector('h3').textContent;
        this.showNotification(`Bundle "${bundleTitle}" added to cart!`, 'success');
    }

    // Sort Courses
    sortCourses(sortBy) {
        const coursesGrid = document.querySelector('.courses-grid');
        const courseCards = Array.from(coursesGrid.children);

        courseCards.sort((a, b) => {
            switch (sortBy) {
                case 'popular':
                    return this.getPopularityScore(b) - this.getPopularityScore(a);
                case 'newest':
                    return this.getNewnessScore(b) - this.getNewnessScore(a);
                case 'rating':
                    return this.getRatingScore(b) - this.getRatingScore(a);
                case 'price-low':
                    return this.getPriceScore(a) - this.getPriceScore(b);
                case 'price-high':
                    return this.getPriceScore(b) - this.getPriceScore(a);
                default:
                    return 0;
            }
        });

        // Re-append sorted cards
        courseCards.forEach(card => {
            coursesGrid.appendChild(card);
        });

        // Animate the reordering
        this.animateCourseReordering();
    }

    getPopularityScore(card) {
        const popularityText = card.querySelector('.popularity span')?.textContent;
        const match = popularityText?.match(/(\d+(?:\.\d+)?)k/);
        return match ? parseFloat(match[1]) * 1000 : 0;
    }

    getNewnessScore(card) {
        const badges = card.querySelectorAll('.badge');
        return Array.from(badges).some(badge => badge.textContent.includes('New')) ? 1 : 0;
    }

    getRatingScore(card) {
        const ratingText = card.querySelector('.rating-value')?.textContent;
        const match = ratingText?.match(/(\d+\.\d+)/);
        return match ? parseFloat(match[1]) : 0;
    }

    getPriceScore(card) {
        const priceText = card.querySelector('.current-price')?.textContent;
        const match = priceText?.match(/\$(\d+)/);
        return match ? parseInt(match[1]) : 0;
    }

    animateCourseReordering() {
        const courseCards = document.querySelectorAll('.course-card');
        courseCards.forEach((card, index) => {
            card.style.transition = 'transform 0.3s ease';
            card.style.transform = 'translateY(20px)';

            setTimeout(() => {
                card.style.transform = 'translateY(0)';
            }, index * 50);
        });
    }

    // Load More Courses
    loadMoreCourses() {
        const loadMoreBtn = document.querySelector('.load-more-btn');
        loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        loadMoreBtn.disabled = true;

        // Simulate loading more courses
        setTimeout(() => {
            this.showNotification('More courses loaded!', 'success');
            loadMoreBtn.innerHTML = '<i class="fas fa-plus"></i> Load More Courses';
            loadMoreBtn.disabled = false;
        }, 2000);
    }

    // Utility Methods
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
}

class CatalogAIAssistant {
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

// Global functions for onclick handlers
function open3DPreview(courseId) {
    if (window.catalogManager) {
        window.catalogManager.open3DPreview(courseId);
    }
}

function close3DPreview() {
    if (window.catalogManager) {
        window.catalogManager.close3DPreview();
    }
}

// Initialize catalog when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.catalogManager = new CatalogManager();
    new CatalogAIAssistant();
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
    max-width: 600px;
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

.instructor-profile-modal .instructor-header {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
}

.instructor-avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
}

.instructor-info h3 {
    margin-bottom: 8px;
    color: var(--text-dark);
}

.instructor-info p {
    color: var(--text-light);
    margin-bottom: 12px;
}

.instructor-stats {
    display: flex;
    gap: 16px;
    font-size: 0.9rem;
    color: var(--text-light);
}

.instructor-stats span {
    display: flex;
    align-items: center;
    gap: 4px;
}

.instructor-bio {
    margin-bottom: 20px;
    line-height: 1.6;
    color: var(--text-dark);
}

.instructor-courses h4 {
    margin-bottom: 12px;
    color: var(--text-dark);
}

.course-list .course-item {
    padding: 8px 0;
    border-bottom: 1px solid var(--border-color);
    color: var(--text-dark);
}

.course-list .course-item:last-child {
    border-bottom: none;
}

.modal-3d-active {
    animation: modal3DEnter 0.3s ease;
}

@keyframes modal3DEnter {
    from {
        opacity: 0;
        transform: scale(0.9) rotateX(10deg);
    }
    to {
        opacity: 1;
        transform: scale(1) rotateX(0deg);
    }
}

.course-card.animate-in {
    animation: cardSlideIn 0.5s ease forwards;
}

@keyframes cardSlideIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideInRight {
    from {
        opacity: 0;
        transform: translateX(20px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', additionalStyles);