
        // Sample scheme data for demonstration
        const sampleSchemes = {
            'agriculture': [
                {
                    title: 'PM-KISAN Samman Nidhi',
                    description: 'Financial assistance of ₹6,000 per year to small and marginal farmers across the country.',
                    ministry: 'Agriculture & Farmers Welfare',
                    beneficiary: 'Small & Marginal Farmers',
                    tags: ['Financial Assistance', 'Direct Benefit Transfer', 'Farmers']
                },
                {
                    title: 'Pradhan Mantri Fasal Bima Yojana',
                    description: 'Crop insurance scheme providing financial support to farmers suffering crop loss/damage.',
                    ministry: 'Agriculture & Farmers Welfare',
                    beneficiary: 'All Farmers',
                    tags: ['Insurance', 'Crop Protection', 'Risk Management']
                },
                {
                    title: 'Kisan Credit Card',
                    description: 'Credit facility for farmers to meet their agricultural financing needs.',
                    ministry: 'Agriculture & Farmers Welfare',
                    beneficiary: 'Farmers',
                    tags: ['Credit', 'Agricultural Finance', 'Banking']
                }
            ],
            'education': [
                {
                    title: 'National Scholarship Portal',
                    description: 'Scholarships for students from various backgrounds to support their education.',
                    ministry: 'Education',
                    beneficiary: 'Students',
                    tags: ['Scholarship', 'Education', 'Financial Support']
                },
                {
                    title: 'Beti Bachao Beti Padhao',
                    description: 'Initiative to generate awareness and improve services for girls.',
                    ministry: 'Women & Child Development',
                    beneficiary: 'Girl Child',
                    tags: ['Girl Education', 'Women Empowerment', 'Social Welfare']
                },
                {
                    title: 'Mid Day Meal Scheme',
                    description: 'Free lunch provided to school children to boost enrollment and nutrition.',
                    ministry: 'Education',
                    beneficiary: 'School Children',
                    tags: ['Nutrition', 'School Meals', 'Child Welfare']
                }
            ],
            'health': [
                {
                    title: 'Ayushman Bharat - PM-JAY',
                    description: 'Health insurance scheme providing coverage of ₹5 lakh per family per year.',
                    ministry: 'Health & Family Welfare',
                    beneficiary: 'Economically Vulnerable Families',
                    tags: ['Health Insurance', 'Medical Coverage', 'Universal Healthcare']
                },
                {
                    title: 'Janani Suraksha Yojana',
                    description: 'Cash assistance to mothers for institutional delivery and post-delivery care.',
                    ministry: 'Health & Family Welfare',
                    beneficiary: 'Pregnant Women',
                    tags: ['Maternal Health', 'Safe Delivery', 'Cash Incentive']
                }
            ],
            'employment': [
                {
                    title: 'MGNREGA',
                    description: 'Employment guarantee scheme providing 100 days of wage employment.',
                    ministry: 'Rural Development',
                    beneficiary: 'Rural Households',
                    tags: ['Employment Guarantee', 'Rural Development', 'Wage Employment']
                },
                {
                    title: 'Pradhan Mantri Mudra Yojana',
                    description: 'Micro-finance scheme for small businesses and entrepreneurs.',
                    ministry: 'Finance',
                    beneficiary: 'Micro Entrepreneurs',
                    tags: ['Microfinance', 'Small Business', 'Entrepreneurship']
                }
            ],
            'housing': [
                {
                    title: 'PM Awas Yojana - Gramin',
                    description: 'Housing scheme for rural poor to construct pucca houses.',
                    ministry: 'Rural Development',
                    beneficiary: 'Rural Poor',
                    tags: ['Rural Housing', 'Pucca Houses', 'Financial Assistance']
                },
                {
                    title: 'PM Awas Yojana - Urban',
                    description: 'Affordable housing scheme for urban poor and middle-income groups.',
                    ministry: 'Housing & Urban Affairs',
                    beneficiary: 'Urban Poor & Middle Income',
                    tags: ['Urban Housing', 'Affordable Housing', 'Credit Subsidy']
                }
            ]
        };

        // Search functionality
        function searchSchemes(event) {
            event.preventDefault();
            
            const formData = new FormData(event.target);
            const searchParams = Object.fromEntries(formData);
            
            // Show loading state
            const resultsContainer = document.getElementById('resultsContainer');
            const searchResults = document.getElementById('searchResults');
            
            resultsContainer.innerHTML = '<div style="text-align: center; padding: 40px;"><div style="display: inline-block; width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #FF6B35; border-radius: 50%; animation: spin 1s linear infinite;"></div><p style="margin-top: 15px;">Searching for schemes...</p></div>';
            
            // Add CSS for spinner
            if (!document.getElementById('spinner-style')) {
                const style = document.createElement('style');
                style.id = 'spinner-style';
                style.textContent = '@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }';
                document.head.appendChild(style);
            }
            
            searchResults.classList.add('show');
            searchResults.scrollIntoView({ behavior: 'smooth' });
            
            // Simulate search delay
            setTimeout(() => {
                displaySearchResults(searchParams);
            }, 1500);
        }

        function displaySearchResults(params) {
            const resultsContainer = document.getElementById('resultsContainer');
            let allSchemes = [];
            
            // Get schemes based on category or show all relevant schemes
            if (params.category && sampleSchemes[params.category]) {
                allSchemes = sampleSchemes[params.category];
            } else {
                // Combine schemes from multiple relevant categories based on user profile
                if (params.occupation === 'farmer') {
                    allSchemes = [...(sampleSchemes.agriculture || [])];
                }
                if (params.age && parseInt(params.age) < 25) {
                    allSchemes = [...allSchemes, ...(sampleSchemes.education || [])];
                }
                if (params.income === 'below-1-lakh' || params.income === '1-3-lakh') {
                    allSchemes = [...allSchemes, ...(sampleSchemes.housing || []), ...(sampleSchemes.employment || [])];
                }
                
                // If no specific matches, show a general set
                if (allSchemes.length === 0) {
                    allSchemes = [
                        ...sampleSchemes.agriculture.slice(0, 1),
                        ...sampleSchemes.education.slice(0, 1),
                        ...sampleSchemes.health.slice(0, 1),
                        ...sampleSchemes.employment.slice(0, 1)
                    ];
                }
            }
            
            // Remove duplicates
            allSchemes = allSchemes.filter((scheme, index, self) => 
                index === self.findIndex(s => s.title === scheme.title)
            );
            
            if (allSchemes.length === 0) {
                resultsContainer.innerHTML = `
                    <div style="text-align: center; padding: 40px;">
                        <div style="font-size: 48px; margin-bottom: 20px;">🔍</div>
                        <h3>No schemes found</h3>
                        <p>Try adjusting your search criteria to find more schemes.</p>
                    </div>
                `;
                return;
            }
            
            const resultsHTML = allSchemes.map(scheme => `
                <div class="result-item">
                    <h3>${scheme.title}</h3>
                    <p>${scheme.description}</p>
                    <p><strong>Ministry:</strong> ${scheme.ministry}</p>
                    <p><strong>Beneficiary:</strong> ${scheme.beneficiary}</p>
                    <div class="result-tags">
                        ${scheme.tags.map(tag => `<span class="result-tag">${tag}</span>`).join('')}
                    </div>
                    <button class="apply-btn" onclick="showSchemeDetails('${scheme.title}')">View Details & Apply</button>
                </div>
            `).join('');
            
            resultsContainer.innerHTML = resultsHTML;
        }

        function showSchemeDetails(schemeTitle) {
            alert(`Detailed information for "${schemeTitle}" would be displayed here.\n\nIn a real implementation, this would:\n• Show complete scheme details\n• Display eligibility criteria\n• Provide application links\n• Show required documents\n• Give step-by-step application guidance`);
        }

        function filterByCategory(category) {
            // Simulate category filtering
            const resultsContainer = document.getElementById('resultsContainer');
            const searchResults = document.getElementById('searchResults');
            
            if (sampleSchemes[category]) {
                const schemes = sampleSchemes[category];
                const resultsHTML = schemes.map(scheme => `
                    <div class="result-item">
                        <h3>${scheme.title}</h3>
                        <p>${scheme.description}</p>
                        <p><strong>Ministry:</strong> ${scheme.ministry}</p>
                        <p><strong>Beneficiary:</strong> ${scheme.beneficiary}</p>
                        <div class="result-tags">
                            ${scheme.tags.map(tag => `<span class="result-tag">${tag}</span>`).join('')}
                        </div>
                        <button class="apply-btn" onclick="showSchemeDetails('${scheme.title}')">View Details & Apply</button>
                    </div>
                `).join('');
                
                resultsContainer.innerHTML = resultsHTML;
                searchResults.classList.add('show');
                searchResults.scrollIntoView({ behavior: 'smooth' });
            }
        }

        function scrollToSearch() {
            document.getElementById('search').scrollIntoView({ behavior: 'smooth' });
        }

        // FAQ Toggle
        function toggleFAQ(button) {
            const answer = button.nextElementSibling;
            const isActive = button.classList.contains('active');
            
            // Close all other FAQs
            document.querySelectorAll('.faq-question').forEach(q => {
                q.classList.remove('active');
                q.nextElementSibling.classList.remove('active');
            });
            
            if (!isActive) {
                button.classList.add('active');
                answer.classList.add('active');
            }
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Animate elements on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-on-scroll');
                }
            });
        }, observerOptions);

        // Observe all category cards and step cards
        document.querySelectorAll('.category-card, .step-card').forEach(card => {
            observer.observe(card);
        });

        // Update stats with animation
        function animateStats() {
            const statItems = document.querySelectorAll('.stat-item h3');
            statItems.forEach(stat => {
                const finalValue = stat.textContent;
                const numericValue = parseInt(finalValue.replace(/\D/g, ''));
                let currentValue = 0;
                const increment = Math.ceil(numericValue / 50);
                
                const updateCounter = () => {
                    if (currentValue < numericValue) {
                        currentValue += increment;
                        if (currentValue > numericValue) currentValue = numericValue;
                        stat.textContent = currentValue + finalValue.replace(/\d/g, '').replace(/\+/g, '') + (finalValue.includes('+') ? '+' : '');
                        requestAnimationFrame(updateCounter);
                    }
                };
                
                updateCounter();
            });
        }

        // Observe stats section
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    statsObserver.unobserve(entry.target);
                }
            });
        });

        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            statsObserver.observe(statsSection);
        }

        // Add dynamic greeting based on time
        function addTimeBasedGreeting() {
            const hour = new Date().getHours();
            let greeting = '';
            
            if (hour < 12) greeting = 'Good Morning! ☀️';
            else if (hour < 17) greeting = 'Good Afternoon! 🌅';
            else greeting = 'Good Evening! 🌙';
            
            const heroTitle = document.querySelector('.hero h1');
            if (heroTitle) {
                heroTitle.innerHTML = `${greeting}<br>Find Government Schemes`;
            }
        }

        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            addTimeBasedGreeting();
            
            // Add some interactive feedback
            const searchBtn = document.querySelector('.search-btn');
            if (searchBtn) {
                searchBtn.addEventListener('click', function() {
                    this.innerHTML = '🔄 Searching...';
                    setTimeout(() => {
                        this.innerHTML = '🔍 Search Schemes';
                    }, 2000);
                });
            }
        });
    