// Community Page Manager
class CommunityManager {
    constructor() {
        this.currentFilter = 'all';
        this.currentSort = 'recent';
        this.discussions = [];
        this.studyGroups = [];
        this.mentors = [];
        this.events = [];

        this.init();
    }

    init() {
        this.initializeAOS();
        this.initializeEventListeners();
        this.initializeSearch();
        this.initializeFilters();
        this.initializeLiveChat();
        this.loadMockData();
    }

    initializeAOS() {
        // Initialize Animate On Scroll
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true
            });
        }
    }

    initializeEventListeners() {
        // Quick action buttons
        const actionCards = document.querySelectorAll('.action-card');
        actionCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const action = e.currentTarget.querySelector('h3').textContent.toLowerCase();
                this.handleQuickAction(action);
            });
        });

        // Discussion cards
        const discussionCards = document.querySelectorAll('.discussion-card');
        discussionCards.forEach(card => {
            card.addEventListener('click', () => {
                const discussionId = card.dataset.id || 'default';
                this.openDiscussion(discussionId);
            });
        });

        // Study group cards
        const groupCards = document.querySelectorAll('.group-card');
        groupCards.forEach(card => {
            card.addEventListener('click', () => {
                const groupId = card.dataset.id || 'default';
                this.joinStudyGroup(groupId);
            });
        });

        // Mentor cards
        const mentorCards = document.querySelectorAll('.mentor-card');
        mentorCards.forEach(card => {
            card.addEventListener('click', () => {
                const mentorId = card.dataset.id || 'default';
                this.connectWithMentor(mentorId);
            });
        });

        // Event cards
        const eventCards = document.querySelectorAll('.event-card');
        eventCards.forEach(card => {
            card.addEventListener('click', () => {
                const eventId = card.dataset.id || 'default';
                this.joinEvent(eventId);
            });
        });

        // Support cards
        const supportCards = document.querySelectorAll('.support-card');
        supportCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const action = e.currentTarget.querySelector('h3').textContent.toLowerCase();
                this.handleSupportAction(action);
            });
        });

        // Filter selects
        const filterSelects = document.querySelectorAll('.filter-select');
        filterSelects.forEach(select => {
            select.addEventListener('change', (e) => {
                this.handleFilterChange(e.target);
            });
        });

        // Search functionality
        const searchInput = document.querySelector('.search-bar input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }
    }

    initializeSearch() {
        // Initialize search with debouncing
        let searchTimeout;
        const searchInput = document.querySelector('.search-bar input');

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    this.performSearch(e.target.value);
                }, 300);
            });
        }
    }

    initializeFilters() {
        // Initialize filter functionality
        const filterButtons = document.querySelectorAll('.filter-select');
        filterButtons.forEach(button => {
            button.addEventListener('change', (e) => {
                this.applyFilters();
            });
        });
    }

    initializeLiveChat() {
        // Initialize live chat widget
        this.createLiveChatWidget();
    }



    loadMockData() {
        // Load mock data for demonstrations
        this.discussions = [
            {
                id: 'react-hooks',
                title: 'Best practices for React Hooks performance optimization?',
                author: 'Sarah Chen',
                date: '2 hours ago',
                replies: 24,
                views: 156,
                tags: ['React', 'JavaScript', 'Performance'],
                status: 'solved',
                preview: 'I\'m working on a large React application and noticed some performance issues with custom hooks. What are the best practices for optimizing hook performance?'
            },
            {
                id: 'python-ml',
                title: 'Machine Learning project ideas for beginners',
                author: 'Mike Rodriguez',
                date: '5 hours ago',
                replies: 18,
                views: 89,
                tags: ['Python', 'Machine Learning', 'Beginner'],
                status: 'active',
                preview: 'I just completed the Python for Data Science course and want to build my first ML project. Any suggestions for beginner-friendly project ideas?'
            },
            {
                id: 'career-advice',
                title: 'Transitioning from marketing to data science',
                author: 'Emily Watson',
                date: '1 day ago',
                replies: 32,
                views: 234,
                tags: ['Career', 'Data Science', 'Transition'],
                status: 'featured',
                preview: 'I have 5 years of experience in digital marketing and want to transition to data science. What skills should I focus on first?'
            }
        ];

        this.studyGroups = [
            {
                id: 'react-masters',
                name: 'React Masters',
                category: 'Web Development',
                members: 156,
                activity: 'high',
                description: 'Advanced React development techniques, state management, and performance optimization.',
                schedule: 'Weekly meetings: Sundays 2 PM EST',
                progress: 75
            },
            {
                id: 'python-data',
                name: 'Python Data Science',
                category: 'Data Science',
                members: 89,
                activity: 'medium',
                description: 'Learning Python for data analysis, machine learning, and statistical modeling.',
                schedule: 'Bi-weekly meetings: Wednesdays 7 PM EST',
                progress: 45
            },
            {
                id: 'mobile-dev',
                name: 'Mobile Development',
                category: 'Mobile Development',
                members: 203,
                activity: 'high',
                description: 'Cross-platform mobile development with React Native and Flutter.',
                schedule: 'Weekly meetings: Saturdays 10 AM EST',
                progress: 60
            }
        ];

        this.mentors = [
            {
                id: 'david-chen',
                name: 'David Chen',
                title: 'Senior Software Engineer at Google',
                rating: 4.9,
                sessions: 127,
                badge: 'Top Mentor',
                bio: '10+ years experience in full-stack development. Expert in React, Node.js, and cloud architecture. Passionate about helping developers grow their careers.',
                expertise: ['React', 'Node.js', 'AWS', 'Career Growth'],
                availability: 'Mon-Fri 6-9 PM EST',
                price: 75
            },
            {
                id: 'maria-garcia',
                name: 'Maria Garcia',
                title: 'Data Scientist at Netflix',
                rating: 4.8,
                sessions: 89,
                badge: 'Rising Star',
                bio: 'Machine learning specialist with expertise in recommendation systems and big data processing. Loves teaching data science concepts to beginners.',
                expertise: ['Python', 'Machine Learning', 'TensorFlow', 'Data Analysis'],
                availability: 'Weekends 10 AM-2 PM EST',
                price: 60
            },
            {
                id: 'james-wilson',
                name: 'James Wilson',
                title: 'Product Manager at Apple',
                rating: 4.7,
                sessions: 156,
                badge: 'Verified',
                bio: 'Product management expert with experience in mobile apps and SaaS products. Helps developers understand business and product strategy.',
                expertise: ['Product Management', 'iOS Development', 'Business Strategy', 'User Experience'],
                availability: 'Tue-Thu 7-9 PM EST',
                price: 90
            }
        ];

        this.events = [
            {
                id: 'webinar-react',
                title: 'React Performance Optimization Webinar',
                date: '2024-03-15',
                time: '2:00 PM EST',
                registered: 1247,
                description: 'Learn advanced techniques for optimizing React applications with industry expert David Chen.'
            },
            {
                id: 'workshop-ml',
                title: 'Machine Learning Workshop',
                date: '2024-03-22',
                time: '10:00 AM EST',
                registered: 856,
                description: 'Hands-on workshop on building your first ML model with Python and scikit-learn.'
            },
            {
                id: 'career-panel',
                title: 'Tech Career Panel Discussion',
                date: '2024-03-29',
                time: '7:00 PM EST',
                registered: 2134,
                description: 'Panel discussion with industry leaders about career growth and opportunities in tech.'
            }
        ];
    }

    // Event handlers
    handleQuickAction(action) {
        switch (action) {
            case 'start discussion':
                this.openDiscussionModal();
                break;
            case 'create study group':
                this.createStudyGroup();
                break;
            case 'find mentor':
                this.findMentor();
                break;
            case 'report issue':
                this.reportBug();
                break;
        }
    }

    openDiscussionModal() {
        this.createModal({
            title: 'Start a New Discussion',
            content: `
                <div class="discussion-form">
                    <div class="form-group">
                        <label>Title</label>
                        <input type="text" placeholder="What would you like to discuss?" id="discussionTitle">
                    </div>
                    <div class="form-group">
                        <label>Category</label>
                        <select id="discussionCategory">
                            <option>Web Development</option>
                            <option>Data Science</option>
                            <option>Mobile Development</option>
                            <option>Business</option>
                            <option>Career</option>
                            <option>General</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <textarea placeholder="Provide details about your discussion topic..." id="discussionDescription" rows="5"></textarea>
                    </div>
                    <div class="form-group">
                        <label>Tags (optional)</label>
                        <input type="text" placeholder="Add tags separated by commas" id="discussionTags">
                    </div>
                    <button class="btn btn-primary" onclick="this.submitDiscussion()">Post Discussion</button>
                </div>
            `
        });
    }

    createStudyGroup() {
        this.createModal({
            title: 'Create a Study Group',
            content: `
                <div class="study-group-form">
                    <div class="form-group">
                        <label>Group Name</label>
                        <input type="text" placeholder="Enter group name" id="groupName">
                    </div>
                    <div class="form-group">
                        <label>Category</label>
                        <select id="groupCategory">
                            <option>Web Development</option>
                            <option>Data Science</option>
                            <option>Mobile Development</option>
                            <option>Business</option>
                            <option>Design</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <textarea placeholder="Describe what your group will focus on..." id="groupDescription" rows="4"></textarea>
                    </div>
                    <div class="form-group">
                        <label>Meeting Schedule</label>
                        <input type="text" placeholder="e.g., Weekly on Sundays at 2 PM EST" id="groupSchedule">
                    </div>
                    <div class="form-group">
                        <label>Maximum Members</label>
                        <input type="number" min="2" max="100" value="20" id="groupMaxMembers">
                    </div>
                    <button class="btn btn-primary" onclick="this.submitStudyGroup()">Create Group</button>
                </div>
            `
        });
    }

    findMentor() {
        this.createModal({
            title: 'Find a Mentor',
            content: `
                <div class="mentor-search">
                    <div class="search-filters">
                        <div class="form-group">
                            <label>Expertise</label>
                            <select id="mentorExpertise">
                                <option>All Areas</option>
                                <option>Web Development</option>
                                <option>Data Science</option>
                                <option>Mobile Development</option>
                                <option>Product Management</option>
                                <option>Career Growth</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Price Range</label>
                            <select id="mentorPrice">
                                <option>Any Price</option>
                                <option>$0 - $50/hour</option>
                                <option>$50 - $100/hour</option>
                                <option>$100+/hour</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Availability</label>
                            <select id="mentorAvailability">
                                <option>Any Time</option>
                                <option>Weekdays</option>
                                <option>Weekends</option>
                                <option>Evenings</option>
                            </select>
                        </div>
                    </div>
                    <div class="mentor-results">
                        <h4>Recommended Mentors</h4>
                        <div class="mentor-list">
                            <!-- Mentor results will be populated here -->
                        </div>
                    </div>
                </div>
            `,
            size: 'large'
        });
    }

    reportBug() {
        this.createModal({
            title: 'Report an Issue',
            content: `
                <div class="bug-report-form">
                    <div class="form-group">
                        <label>Issue Type</label>
                        <select id="issueType">
                            <option>Technical Problem</option>
                            <option>Content Error</option>
                            <option>Inappropriate Content</option>
                            <option>Feature Request</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Title</label>
                        <input type="text" placeholder="Brief description of the issue" id="issueTitle">
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <textarea placeholder="Please provide detailed information about the issue..." id="issueDescription" rows="5"></textarea>
                    </div>
                    <div class="form-group">
                        <label>Steps to Reproduce</label>
                        <textarea placeholder="1. Go to...&#10;2. Click on...&#10;3. See error..." id="issueSteps" rows="4"></textarea>
                    </div>
                    <div class="form-group">
                        <label>Expected vs Actual Behavior</label>
                        <textarea placeholder="What did you expect to happen vs what actually happened?" id="issueBehavior" rows="3"></textarea>
                    </div>
                    <div class="form-group">
                        <label>Additional Information</label>
                        <textarea placeholder="Browser, OS, device info, etc." id="issueAdditional" rows="2"></textarea>
                    </div>
                    <div class="form-group">
                        <label>Attachments (optional)</label>
                        <input type="file" id="issueAttachments" multiple>
                        <small>You can attach screenshots or other files</small>
                    </div>
                    <button class="btn btn-primary" onclick="this.submitBugReport()">Submit Report</button>
                </div>
            `,
            size: 'large'
        });
    }

    openDiscussion(discussionId) {
        const discussion = this.discussions.find(d => d.id === discussionId);
        if (!discussion) return;

        this.createModal({
            title: discussion.title,
            content: `
                <div class="discussion-detail">
                    <div class="discussion-meta">
                        <div class="author-info">
                            <img src="https://via.placeholder.com/40x40" alt="${discussion.author}">
                            <div>
                                <span class="author-name">${discussion.author}</span>
                                <span class="discussion-date">${discussion.date}</span>
                            </div>
                        </div>
                        <div class="discussion-stats">
                            <span>${discussion.replies} replies</span>
                            <span>${discussion.views} views</span>
                        </div>
                    </div>
                    <div class="discussion-content">
                        <p>${discussion.preview}</p>
                    </div>
                    <div class="discussion-tags">
                        ${discussion.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <div class="discussion-replies">
                        <h4>Replies (${discussion.replies})</h4>
                        <div class="reply-form">
                            <textarea placeholder="Add your reply..." rows="3"></textarea>
                            <button class="btn btn-primary">Post Reply</button>
                        </div>
                    </div>
                </div>
            `,
            size: 'large'
        });
    }

    joinStudyGroup(groupId) {
        const group = this.studyGroups.find(g => g.id === groupId);
        if (!group) return;

        this.createModal({
            title: `Join ${group.name}`,
            content: `
                <div class="group-join">
                    <div class="group-info">
                        <h3>${group.name}</h3>
                        <p class="group-category">${group.category}</p>
                        <p class="group-description">${group.description}</p>
                        <div class="group-details">
                            <span><i class="fas fa-users"></i> ${group.members} members</span>
                            <span><i class="fas fa-calendar"></i> ${group.schedule}</span>
                            <span><i class="fas fa-chart-line"></i> ${group.progress}% progress</span>
                        </div>
                    </div>
                    <div class="group-rules">
                        <h4>Group Guidelines</h4>
                        <ul>
                            <li>Be respectful and supportive of other members</li>
                            <li>Participate actively in discussions and activities</li>
                            <li>Share knowledge and help others learn</li>
                            <li>Follow the meeting schedule</li>
                        </ul>
                    </div>
                    <button class="btn btn-primary" onclick="this.confirmJoinGroup('${groupId}')">Join Group</button>
                </div>
            `
        });
    }

    connectWithMentor(mentorId) {
        const mentor = this.mentors.find(m => m.id === mentorId);
        if (!mentor) return;

        this.createModal({
            title: `Connect with ${mentor.name}`,
            content: `
                <div class="mentor-connect">
                    <div class="mentor-profile">
                        <img src="https://via.placeholder.com/100x100" alt="${mentor.name}">
                        <h3>${mentor.name}</h3>
                        <p class="mentor-title">${mentor.title}</p>
                        <div class="mentor-rating">
                            <span class="stars">★★★★★</span>
                            <span>${mentor.rating} (${mentor.sessions} sessions)</span>
                        </div>
                    </div>
                    <div class="mentor-bio">
                        <p>${mentor.bio}</p>
                    </div>
                    <div class="mentor-expertise">
                        <h4>Expertise</h4>
                        <div class="expertise-tags">
                            ${mentor.expertise.map(exp => `<span class="tag">${exp}</span>`).join('')}
                        </div>
                    </div>
                    <div class="mentor-availability">
                        <h4>Availability</h4>
                        <p><i class="fas fa-clock"></i> ${mentor.availability}</p>
                    </div>
                    <div class="mentor-pricing">
                        <h4>Pricing</h4>
                        <p class="price">$${mentor.price}/hour</p>
                    </div>
                    <div class="booking-form">
                        <h4>Book a Session</h4>
                        <div class="form-group">
                            <label>Date</label>
                            <input type="date" id="sessionDate">
                        </div>
                        <div class="form-group">
                            <label>Time</label>
                            <select id="sessionTime">
                                <option>Select a time slot</option>
                                <option>6:00 PM</option>
                                <option>7:00 PM</option>
                                <option>8:00 PM</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Duration</label>
                            <select id="sessionDuration">
                                <option>30 minutes</option>
                                <option>1 hour</option>
                                <option>1.5 hours</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Topics to discuss</label>
                            <textarea placeholder="What would you like to discuss?" rows="3"></textarea>
                        </div>
                        <button class="btn btn-primary" onclick="this.bookSession('${mentorId}')">Book Session</button>
                    </div>
                </div>
            `,
            size: 'large'
        });
    }

    joinEvent(eventId) {
        const event = this.events.find(e => e.id === eventId);
        if (!event) return;

        this.createModal({
            title: `Register for ${event.title}`,
            content: `
                <div class="event-registration">
                    <div class="event-details">
                        <h3>${event.title}</h3>
                        <p>${event.description}</p>
                        <div class="event-meta">
                            <span><i class="fas fa-calendar"></i> ${event.date}</span>
                            <span><i class="fas fa-clock"></i> ${event.time}</span>
                            <span><i class="fas fa-users"></i> ${event.registered} registered</span>
                        </div>
                    </div>
                    <div class="registration-form">
                        <h4>Registration Details</h4>
                        <div class="form-group">
                            <label>Full Name</label>
                            <input type="text" placeholder="Enter your full name">
                        </div>
                        <div class="form-group">
                            <label>Email</label>
                            <input type="email" placeholder="Enter your email">
                        </div>
                        <div class="form-group">
                            <label>Questions for the speaker (optional)</label>
                            <textarea placeholder="Any specific questions you'd like to ask?" rows="3"></textarea>
                        </div>
                        <div class="form-group">
                            <label>
                                <input type="checkbox" id="eventReminder">
                                Send me reminders about this event
                            </label>
                        </div>
                        <button class="btn btn-primary" onclick="this.confirmEventRegistration('${eventId}')">Register for Event</button>
                    </div>
                </div>
            `
        });
    }

    handleSupportAction(action) {
        switch (action) {
            case 'knowledge base':
                this.openKnowledgeBase();
                break;
            case 'live chat support':
                this.openLiveChat();
                break;
            case 'bug reporting':
                this.reportBug();
                break;
            case 'email support':
                this.contactSupport();
                break;
        }
    }

    openKnowledgeBase() {
        this.createModal({
            title: 'Knowledge Base',
            content: `
                <div class="knowledge-base">
                    <div class="kb-search">
                        <input type="text" placeholder="Search knowledge base..." id="kbSearch">
                        <button><i class="fas fa-search"></i></button>
                    </div>
                    <div class="kb-categories">
                        <h4>Popular Categories</h4>
                        <div class="category-grid">
                            <div class="category-card">
                                <i class="fas fa-user-graduate"></i>
                                <h5>Getting Started</h5>
                                <span>15 articles</span>
                            </div>
                            <div class="category-card">
                                <i class="fas fa-book"></i>
                                <h5>Course Navigation</h5>
                                <span>23 articles</span>
                            </div>
                            <div class="category-card">
                                <i class="fas fa-credit-card"></i>
                                <h5>Billing & Payments</h5>
                                <span>18 articles</span>
                            </div>
                            <div class="category-card">
                                <i class="fas fa-cog"></i>
                                <h5>Account Settings</h5>
                                <span>12 articles</span>
                            </div>
                        </div>
                    </div>
                    <div class="kb-recent">
                        <h4>Recently Updated</h4>
                        <ul>
                            <li><a href="#">How to reset your password</a></li>
                            <li><a href="#">Understanding course certificates</a></li>
                            <li><a href="#">Mobile app troubleshooting</a></li>
                            <li><a href="#">Downloading course content</a></li>
                        </ul>
                    </div>
                </div>
            `,
            size: 'large'
        });
    }

    openLiveChat() {
        this.createModal({
            title: 'Live Chat Support',
            content: `
                <div class="live-chat">
                    <div class="chat-header">
                        <div class="agent-info">
                            <img src="https://via.placeholder.com/40x40" alt="Support Agent">
                            <div>
                                <span class="agent-name">Sarah Johnson</span>
                                <span class="agent-status online">Online</span>
                            </div>
                        </div>
                        <div class="chat-actions">
                            <button class="btn btn-secondary"><i class="fas fa-phone"></i></button>
                            <button class="btn btn-secondary"><i class="fas fa-video"></i></button>
                        </div>
                    </div>
                    <div class="chat-messages" id="chatMessages">
                        <div class="message agent">
                            <div class="message-content">
                                <p>Hi! I'm Sarah, your support agent. How can I help you today?</p>
                                <span class="message-time">2:30 PM</span>
                            </div>
                        </div>
                    </div>
                    <div class="chat-input">
                        <input type="text" placeholder="Type your message..." id="chatInput">
                        <button onclick="this.sendChatMessage()"><i class="fas fa-paper-plane"></i></button>
                    </div>
                </div>
            `,
            size: 'medium'
        });
    }

    contactSupport() {
        this.createModal({
            title: 'Contact Support',
            content: `
                <div class="contact-support">
                    <div class="contact-info">
                        <h4>Get in Touch</h4>
                        <p>Our support team is here to help you with any questions or issues.</p>
                        <div class="contact-methods">
                            <div class="contact-method">
                                <i class="fas fa-envelope"></i>
                                <span>support@learnhub.com</span>
                            </div>
                            <div class="contact-method">
                                <i class="fas fa-phone"></i>
                                <span>+1 (555) 123-4567</span>
                            </div>
                            <div class="contact-method">
                                <i class="fas fa-clock"></i>
                                <span>24/7 Support</span>
                            </div>
                        </div>
                    </div>
                    <div class="contact-form">
                        <h4>Send us a Message</h4>
                        <div class="form-group">
                            <label>Subject</label>
                            <select>
                                <option>General Inquiry</option>
                                <option>Technical Issue</option>
                                <option>Billing Question</option>
                                <option>Course Feedback</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Message</label>
                            <textarea placeholder="Describe your issue or question..." rows="5"></textarea>
                        </div>
                        <div class="form-group">
                            <label>Priority</label>
                            <select>
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                                <option>Urgent</option>
                            </select>
                        </div>
                        <button class="btn btn-primary">Send Message</button>
                    </div>
                </div>
            `,
            size: 'large'
        });
    }

    // Utility methods
    createModal(options) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content ${options.size || 'medium'}">
                <div class="modal-header">
                    <h3>${options.title}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    ${options.content}
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Add event listeners
        const closeBtn = modal.querySelector('.modal-close');
        const overlay = modal.querySelector('.modal-overlay');

        const closeModal = () => {
            modal.remove();
        };

        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', closeModal);

        // Auto-close on escape
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">&times;</button>
        `;

        document.body.appendChild(notification);

        // Add event listeners
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => notification.remove());

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    getNotificationIcon(type) {
        switch (type) {
            case 'success': return 'check-circle';
            case 'error': return 'exclamation-circle';
            case 'warning': return 'exclamation-triangle';
            default: return 'info-circle';
        }
    }

    performSearch(query) {
        if (!query.trim()) return;

        // Simulate search functionality
        this.showNotification(`Searching for "${query}"...`, 'info');

        // In a real app, this would search through discussions, groups, mentors, etc.
        setTimeout(() => {
            this.showNotification(`Found 15 results for "${query}"`, 'success');
        }, 1000);
    }

    applyFilters() {
        // Simulate filter application
        this.showNotification('Filters applied successfully', 'success');
    }

    createLiveChatWidget() {
        // Create floating chat widget
        const chatWidget = document.createElement('div');
        chatWidget.className = 'chat-widget';
        chatWidget.innerHTML =
        `

        `;

        document.body.appendChild(chatWidget);

        // Add event listeners
        const closeBtn = chatWidget.querySelector('.chat-widget-close');
        closeBtn.addEventListener('click', () => chatWidget.remove());
    }

    // Additional functionality methods
    submitDiscussion() {
        this.showNotification('Discussion posted successfully!', 'success');
        this.closeAllModals();
    }

    submitStudyGroup() {
        this.showNotification('Study group created successfully!', 'success');
        this.closeAllModals();
    }

    submitBugReport() {
        this.showNotification('Bug report submitted successfully!', 'success');
        this.closeAllModals();
    }

    confirmJoinGroup(groupId) {
        this.showNotification('Successfully joined the study group!', 'success');
        this.closeAllModals();
    }

    bookSession(mentorId) {
        this.showNotification('Session booked successfully!', 'success');
        this.closeAllModals();
    }

    confirmEventRegistration(eventId) {
        this.showNotification('Event registration confirmed!', 'success');
        this.closeAllModals();
    }

    sendChatMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();

        if (!message) return;

        const chatMessages = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user';
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
                <span class="message-time">${new Date().toLocaleTimeString()}</span>
            </div>
        `;

        chatMessages.appendChild(messageDiv);
        input.value = '';

        // Simulate agent response
        setTimeout(() => {
            const agentDiv = document.createElement('div');
            agentDiv.className = 'message agent';
            agentDiv.innerHTML = `
                <div class="message-content">
                    <p>Thanks for your message! I'll help you with that.</p>
                    <span class="message-time">${new Date().toLocaleTimeString()}</span>
                </div>
            `;
            chatMessages.appendChild(agentDiv);
        }, 1000);
    }

    closeAllModals() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => modal.remove());
    }

    viewAllDiscussions() {
        this.showNotification('Loading all discussions...', 'info');
        // In a real app, this would navigate to a full discussions page
    }

    viewAllEvents() {
        this.showNotification('Loading all events...', 'info');
        // In a real app, this would navigate to a full events page
    }
}

class CommunityAIAssistant {
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

// Initialize the Community manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CommunityManager();
    new CommunityAIAssistant();
});

// Add additional CSS for modals and notifications
const additionalCSS = `
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(5px);
    }

    .modal-content {
        position: relative;
        background: var(--white);
        border-radius: 12px;
        box-shadow: var(--shadow-card);
        max-width: 90vw;
        max-height: 90vh;
        overflow: auto;
        animation: modal3DEnter 0.3s ease-out;
    }

    .modal-content.small { width: 400px; }
    .modal-content.medium { width: 600px; }
    .modal-content.large { width: 800px; }

    .modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px;
        border-bottom: 1px solid var(--border-color);
    }

    .modal-header h3 {
        margin: 0;
        color: var(--text-dark);
    }

    .modal-close {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: var(--text-muted);
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.2s ease;
    }

    .modal-close:hover {
        background: var(--light-bg);
        color: var(--text-dark);
    }

    .modal-body {
        padding: 20px;
    }

    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--white);
        border-radius: 8px;
        box-shadow: var(--shadow-card);
        padding: 15px 20px;
        display: flex;
        align-items: center;
        gap: 15px;
        z-index: 10001;
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
    }

    .notification-success {
        border-left: 4px solid var(--green-success);
    }

    .notification-error {
        border-left: 4px solid var(--red-error);
    }

    .notification-warning {
        border-left: 4px solid var(--orange-warning);
    }

    .notification-info {
        border-left: 4px solid var(--blue-info);
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
        flex: 1;
    }

    .notification-close {
        background: none;
        border: none;
        font-size: 18px;
        cursor: pointer;
        color: var(--text-muted);
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.2s ease;
    }

    .notification-close:hover {
        background: var(--light-bg);
        color: var(--text-dark);
    }

    .chat-widget {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--white);
        border-radius: 12px;
        box-shadow: var(--shadow-card);
        width: 300px;
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
    }

    .chat-widget-header {
        background: var(--udemy-purple);
        color: var(--white);
        padding: 15px;
        border-radius: 12px 12px 0 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .chat-widget-close {
        background: none;
        border: none;
        color: var(--white);
        font-size: 18px;
        cursor: pointer;
    }

    .chat-widget-body {
        padding: 20px;
        text-align: center;
    }

    .chat-widget-body p {
        margin-bottom: 15px;
        color: var(--text-muted);
    }

    .form-group {
        margin-bottom: 20px;
    }

    .form-group label {
        display: block;
        margin-bottom: 8px;
        font-weight: 500;
        color: var(--text-dark);
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
        width: 100%;
        padding: 12px;
        border: 1px solid var(--border-color);
        border-radius: 8px;
        font-size: 14px;
        transition: border-color 0.2s ease;
    }

    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
        outline: none;
        border-color: var(--udemy-purple);
    }

    .btn {
        padding: 12px 24px;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        text-decoration: none;
        display: inline-block;
    }

    .btn-primary {
        background: var(--udemy-purple);
        color: var(--white);
    }

    .btn-primary:hover {
        background: var(--udemy-purple-hover);
    }

    .btn-secondary {
        background: var(--light-bg);
        color: var(--text-dark);
    }

    .btn-secondary:hover {
        background: var(--border-color);
    }

    @keyframes modal3DEnter {
        from {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
        }
        to {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
    }

    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    .live-chat {
        height: 500px;
        display: flex;
        flex-direction: column;
    }

    .chat-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px;
        border-bottom: 1px solid var(--border-color);
    }

    .agent-info {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .agent-info img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    .agent-status.online {
        color: var(--green-success);
    }

    .chat-messages {
        flex: 1;
        overflow-y: auto;
        padding: 15px;
    }

    .message {
        margin-bottom: 15px;
    }

    .message.user {
        text-align: right;
    }

    .message-content {
        display: inline-block;
        max-width: 70%;
        padding: 10px 15px;
        border-radius: 15px;
        background: var(--light-bg);
    }

    .message.user .message-content {
        background: var(--udemy-purple);
        color: var(--white);
    }

    .message-time {
        font-size: 0.8rem;
        color: var(--text-muted);
        margin-top: 5px;
        display: block;
    }

    .chat-input {
        display: flex;
        gap: 10px;
        padding: 15px;
        border-top: 1px solid var(--border-color);
    }

    .chat-input input {
        flex: 1;
        padding: 10px;
        border: 1px solid var(--border-color);
        border-radius: 20px;
        outline: none;
    }

    .chat-input button {
        background: var(--udemy-purple);
        color: var(--white);
        border: none;
        padding: 10px 15px;
        border-radius: 50%;
        cursor: pointer;
    }
`;

// Inject additional CSS
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);