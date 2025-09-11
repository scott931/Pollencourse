// Analytics Page Manager
class AnalyticsManager {
    constructor() {
        this.currentPeriod = '7d';
        this.charts = {};
        this.mockData = {};

        this.init();
    }

    init() {
        this.initializeAOS();
        this.initializeEventListeners();

        // Check if Chart.js is loaded
        if (typeof Chart === 'undefined') {
            console.error('Chart.js is not loaded. Please check your internet connection.');
            this.showChartError();
            return;
        }

        this.loadMockData();
        this.initializeCharts();
        this.initializeStreakCalendar();
        this.initializeFilters();
        this.updateCharts();
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
        // Time filter buttons
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.switchPeriod(btn.dataset.period);
            });
        });

        // Chart type selector
        const chartTypeSelect = document.querySelector('.chart-type-select');
        if (chartTypeSelect) {
            chartTypeSelect.addEventListener('change', (e) => {
                this.updateChartType(e.target.value);
            });
        }

        // Performance filter
        const performanceSelect = document.querySelector('.performance-select');
        if (performanceSelect) {
            performanceSelect.addEventListener('change', (e) => {
                this.filterPerformance(e.target.value);
            });
        }

        // Date range inputs
        const startDate = document.getElementById('startDate');
        const endDate = document.getElementById('endDate');
        if (startDate && endDate) {
            startDate.addEventListener('change', () => this.updateDateRange());
            endDate.addEventListener('change', () => this.updateDateRange());
        }

        // Apply button
        const applyBtn = document.querySelector('.apply-btn');
        if (applyBtn) {
            applyBtn.addEventListener('click', () => this.applyDateRange());
        }

        // Export buttons
        const exportBtns = document.querySelectorAll('.export-btn');
        exportBtns.forEach(btn => {
            btn.addEventListener('click', () => this.exportData());
        });
    }

    initializeCharts() {
        // Initialize all charts
        this.createDailyActivityChart();
        this.createCompletionRateChart();
        this.createTimeDistributionChart();
        this.createQuizPerformanceChart();
        this.createAssignmentChart();
    }

    initializeStreakCalendar() {
        this.generateStreakCalendar();
    }

    initializeFilters() {
        // Initialize filter functionality
        this.currentPeriod = '7d';
        this.updateActiveFilter();
    }

    loadMockData() {
        // Load mock data for demonstrations
        this.mockData = {
            dailyActivity: {
                '7d': [2.5, 3.2, 1.8, 4.1, 2.9, 3.7, 2.3],
                '30d': [2.5, 3.2, 1.8, 4.1, 2.9, 3.7, 2.3, 3.5, 2.8, 4.2, 3.1, 2.7, 3.9, 2.4, 3.6, 2.1, 3.8, 2.6, 4.0, 3.3, 2.9, 3.4, 2.2, 3.7, 2.8, 4.1, 3.0, 2.5, 3.6, 2.9],
                '90d': Array.from({length: 90}, () => Math.random() * 4 + 1),
                '1y': Array.from({length: 365}, () => Math.random() * 4 + 1),
                'all': Array.from({length: 730}, () => Math.random() * 4 + 1)
            },
            completionRate: {
                labels: ['Hive Management', 'Bee Biology', 'Honey Production', 'Equipment Safety', 'Disease Control'],
                data: [85, 72, 68, 91, 78]
            },
            timeDistribution: {
                labels: ['Hive Management', 'Honey Production', 'Queen Rearing', 'Bee Health'],
                data: [42, 31, 19, 8]
            },
            quizPerformance: {
                labels: ['Hive Management', 'Bee Biology', 'Honey Production', 'Disease Control', 'Queen Rearing', 'Equipment Safety'],
                data: [92, 88, 95, 85, 78, 90]
            },
            assignmentCompletion: {
                labels: ['On Time', 'Late', 'Not Submitted'],
                data: [89, 8, 3]
            }
        };
    }

    // Chart creation methods
    createDailyActivityChart() {
        const ctx = document.getElementById('dailyActivityChart');
        if (!ctx) return;

        this.charts.dailyActivity = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.getLabelsForPeriod(this.currentPeriod),
                datasets: [{
                    label: 'Hours Learned',
                    data: this.mockData.dailyActivity[this.currentPeriod],
                    borderColor: '#a435f0',
                    backgroundColor: 'rgba(164, 53, 240, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#a435f0',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8
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
                    y: {
                        beginAtZero: true,
                        max: 5,
                        ticks: {
                            stepSize: 1
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
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
                        hoverBackgroundColor: '#8b2bd9'
                    }
                }
            }
        });
    }

    createCompletionRateChart() {
        const ctx = document.getElementById('completionRateChart');
        if (!ctx) return;

        this.charts.completionRate = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: this.mockData.completionRate.labels,
                datasets: [{
                    data: this.mockData.completionRate.data,
                    backgroundColor: [
                        '#a435f0',
                        '#1fbd6a',
                        '#0073b1',
                        '#f69c08',
                        '#d41b2c'
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
    }

    createTimeDistributionChart() {
        const ctx = document.getElementById('timeDistributionChart');
        const fallback = document.getElementById('chartFallback');

        if (!ctx) {
            console.error('Canvas element timeDistributionChart not found');
            if (fallback) {
                fallback.style.display = 'block';
                fallback.innerHTML = '<i class="fas fa-exclamation-triangle" style="font-size: 3rem; margin-bottom: 1rem; color: #ff6b6b;"></i><p>Chart container not found</p>';
            }
            return;
        }

        console.log('Creating time distribution chart with data:', this.mockData.timeDistribution);

        // Check if data exists
        if (!this.mockData.timeDistribution || !this.mockData.timeDistribution.labels || !this.mockData.timeDistribution.data) {
            console.error('Time distribution data is missing or incomplete');
            if (fallback) {
                fallback.style.display = 'block';
                fallback.innerHTML = '<i class="fas fa-exclamation-triangle" style="font-size: 3rem; margin-bottom: 1rem; color: #ff6b6b;"></i><p>Chart data is missing</p>';
            }
            return;
        }

        try {
            this.charts.timeDistribution = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: this.mockData.timeDistribution.labels,
                datasets: [{
                    label: 'Hours Spent',
                    data: this.mockData.timeDistribution.data,
                    backgroundColor: [
                        '#A435F0',
                        '#FF6B6B',
                        '#4ECDC4',
                        '#45B7D1'
                    ],
                    borderColor: '#ffffff',
                    borderWidth: 2,
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 25,
                            usePointStyle: true,
                            font: {
                                size: 14,
                                weight: '500'
                            }
                        }
                    },
                    tooltip: {
                        enabled: true,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        borderColor: '#A435F0',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: true
                    }
                },
                layout: {
                    padding: {
                        top: 20,
                        bottom: 20
                    }
                }
            }
        });

        console.log('Time distribution chart created successfully');

        // Hide the fallback when chart loads successfully
        if (fallback) {
            fallback.style.display = 'none';
        }
        } catch (error) {
            console.error('Error creating time distribution chart:', error);
            if (fallback) {
                fallback.style.display = 'block';
                fallback.innerHTML = '<i class="fas fa-exclamation-triangle" style="font-size: 3rem; margin-bottom: 1rem; color: #ff6b6b;"></i><p>Error loading chart</p>';
            }
        }
    }

    createQuizPerformanceChart() {
        const ctx = document.getElementById('quizPerformanceChart');
        if (!ctx) return;

        this.charts.quizPerformance = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: this.mockData.quizPerformance.labels,
                datasets: [{
                    label: 'Quiz Scores',
                    data: this.mockData.quizPerformance.data,
                    borderColor: '#a435f0',
                    backgroundColor: 'rgba(164, 53, 240, 0.2)',
                    pointBackgroundColor: '#a435f0',
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
                        }
                    }
                }
            }
        });
    }

    createAssignmentChart() {
        const ctx = document.getElementById('assignmentChart');
        if (!ctx) return;

        this.charts.assignmentChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: this.mockData.assignmentCompletion.labels,
                datasets: [{
                    data: this.mockData.assignmentCompletion.data,
                    backgroundColor: [
                        '#1fbd6a',
                        '#f69c08',
                        '#d41b2c'
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
    }

    // Utility methods
    getLabelsForPeriod(period) {
        switch (period) {
            case '7d':
                return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            case '30d':
                return Array.from({length: 30}, (_, i) => `Day ${i + 1}`);
            case '90d':
                return Array.from({length: 90}, (_, i) => `Week ${Math.floor(i / 7) + 1}`);
            case '1y':
                return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            case 'all':
                return Array.from({length: 24}, (_, i) => `Month ${i + 1}`);
            default:
                return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        }
    }

    switchPeriod(period) {
        this.currentPeriod = period;
        this.updateActiveFilter();
        this.updateCharts();
        this.showNotification(`Switched to ${period} view`, 'info');
    }

    updateActiveFilter() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.period === this.currentPeriod) {
                btn.classList.add('active');
            }
        });
    }

    updateCharts() {
        if (this.charts.dailyActivity) {
            this.charts.dailyActivity.data.labels = this.getLabelsForPeriod(this.currentPeriod);
            this.charts.dailyActivity.data.datasets[0].data = this.mockData.dailyActivity[this.currentPeriod];
            this.charts.dailyActivity.update();
        }
    }

    updateChartType(type) {
        this.showNotification(`Chart type changed to ${type}`, 'info');
        // In a real app, this would update the chart visualization
    }

    filterPerformance(category) {
        this.showNotification(`Filtered by ${category}`, 'info');
        // In a real app, this would filter the performance data
    }

    updateDateRange() {
        const startDate = document.getElementById('startDate');
        const endDate = document.getElementById('endDate');

        if (startDate && endDate) {
            // Validate date range
            if (new Date(startDate.value) > new Date(endDate.value)) {
                this.showNotification('Start date cannot be after end date', 'error');
                return;
            }
        }
    }

    applyDateRange() {
        const startDate = document.getElementById('startDate');
        const endDate = document.getElementById('endDate');

        if (startDate && endDate) {
            this.showNotification(`Date range applied: ${startDate.value} to ${endDate.value}`, 'success');
            // In a real app, this would fetch data for the selected date range
        }
    }

    generateStreakCalendar() {
        const calendar = document.getElementById('streakCalendar');
        if (!calendar) return;

        // Generate calendar for the last 30 days
        const days = [];
        const today = new Date();

        for (let i = 29; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);

            // Simulate learning activity (70% chance of learning each day)
            const learned = Math.random() > 0.3;
            const isCurrentStreak = i >= 14; // Last 15 days as current streak

            days.push({
                date: date,
                learned: learned,
                isCurrentStreak: isCurrentStreak && learned
            });
        }

        // Create calendar grid
        calendar.innerHTML = '';
        days.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';

            if (day.learned) {
                dayElement.classList.add('learned');
                if (day.isCurrentStreak) {
                    dayElement.classList.add('current-streak');
                }
            } else {
                dayElement.classList.add('empty');
            }

            dayElement.textContent = day.date.getDate();
            dayElement.title = `${day.date.toLocaleDateString()}: ${day.learned ? 'Learned' : 'No activity'}`;

            calendar.appendChild(dayElement);
        });
    }

    exportData() {
        this.showNotification('Preparing data export...', 'info');

        // Simulate export process
        setTimeout(() => {
            this.showNotification('Data exported successfully!', 'success');

            // In a real app, this would trigger a download
            const data = {
                period: this.currentPeriod,
                metrics: {
                    totalHours: 247.5,
                    coursesCompleted: 18,
                    certificatesEarned: 15,
                    averageScore: 94.2
                },
                skills: [
                    { name: 'JavaScript', level: 'Advanced', progress: 85 },
                    { name: 'React', level: 'Intermediate', progress: 72 },
                    { name: 'Python', level: 'Advanced', progress: 91 },
                    { name: 'Data Science', level: 'Intermediate', progress: 68 }
                ],
                timestamp: new Date().toISOString()
            };

            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `learning-analytics-${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            URL.revokeObjectURL(url);
        }, 2000);
    }

    refreshInsights() {
        this.showNotification('Refreshing insights...', 'info');

        // Simulate AI insights refresh
        setTimeout(() => {
            this.showNotification('Insights refreshed successfully!', 'success');

            // Update insight cards with new data
            const insightCards = document.querySelectorAll('.insight-card');
            insightCards.forEach((card, index) => {
                card.style.opacity = '0.5';
                setTimeout(() => {
                    card.style.opacity = '1';
                }, 500 + index * 200);
            });
        }, 1500);
    }

    generateReport(type) {
        this.showNotification(`Generating ${type} report...`, 'info');

        setTimeout(() => {
            this.showNotification(`${type.charAt(0).toUpperCase() + type.slice(1)} report generated!`, 'success');

            // In a real app, this would generate and download a report
            const reportData = {
                type: type,
                period: this.currentPeriod,
                generatedAt: new Date().toISOString(),
                summary: {
                    totalLearningTime: 247.5,
                    coursesCompleted: 18,
                    averageScore: 94.2,
                    skillsDeveloped: 12
                }
            };

            const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${type}-report-${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            URL.revokeObjectURL(url);
        }, 2000);
    }

    exportAllData() {
        this.showNotification('Preparing comprehensive data export...', 'info');

        setTimeout(() => {
            this.showNotification('All data exported successfully!', 'success');

            // In a real app, this would export all analytics data
            const comprehensiveData = {
                user: {
                    id: 'user123',
                    name: 'Alex Johnson',
                    joinedDate: '2023-01-15'
                },
                analytics: {
                    learningTime: this.mockData.dailyActivity,
                    skills: [
                        { name: 'JavaScript', level: 'Advanced', progress: 85, hours: 67.5 },
                        { name: 'React', level: 'Intermediate', progress: 72, hours: 45.2 },
                        { name: 'Python', level: 'Advanced', progress: 91, hours: 89.3 },
                        { name: 'Data Science', level: 'Intermediate', progress: 68, hours: 52.7 }
                    ],
                    performance: {
                        quizScores: this.mockData.quizPerformance.data,
                        assignmentCompletion: this.mockData.assignmentCompletion.data,
                        completionRate: this.mockData.completionRate.data
                    }
                },
                exportDate: new Date().toISOString()
            };

            const blob = new Blob([JSON.stringify(comprehensiveData, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `comprehensive-analytics-${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            URL.revokeObjectURL(url);
        }, 3000);
    }

    showChartError() {
        const fallback = document.getElementById('chartFallback');
        if (fallback) {
            fallback.style.display = 'block';
            fallback.innerHTML = `
                <i class="fas fa-exclamation-triangle" style="font-size: 3rem; margin-bottom: 1rem; color: #ff6b6b;"></i>
                <p>Chart.js failed to load</p>
                <p style="font-size: 0.8rem; margin-top: 0.5rem;">Please check your internet connection and refresh the page.</p>
            `;
        }
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
}

class AnalyticsAIAssistant {
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
function exportSkillReport() {
    if (window.analyticsManager) {
        window.analyticsManager.exportData();
    }
}

function refreshInsights() {
    if (window.analyticsManager) {
        window.analyticsManager.refreshInsights();
    }
}

function generateReport(type) {
    if (window.analyticsManager) {
        window.analyticsManager.generateReport(type);
    }
}

function exportAllData() {
    if (window.analyticsManager) {
        window.analyticsManager.exportAllData();
    }
}

// Initialize the Analytics manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.analyticsManager = new AnalyticsManager();
    new AnalyticsAIAssistant();
});

// Add additional CSS for notifications
const additionalCSS = `
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

    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
`;

// Inject additional CSS
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);