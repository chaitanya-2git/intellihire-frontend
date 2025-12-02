 // ============================================
// JOBS PAGE JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // FILTER TOGGLE (Mobile)
    // ============================================
    const filterToggle = document.getElementById('filterToggle');
    const filtersSidebar = document.getElementById('filtersSidebar');
    
    if (filterToggle && filtersSidebar) {
        filterToggle.addEventListener('click', function() {
            filtersSidebar.classList.toggle('open');
        });
        
        // Close filters when clicking outside
        document.addEventListener('click', function(e) {
            if (!filtersSidebar.contains(e.target) && !filterToggle.contains(e.target)) {
                filtersSidebar.classList.remove('open');
            }
        });
    }
    
    // ============================================
    // BOOKMARK TOGGLE
    // ============================================
    const bookmarkButtons = document.querySelectorAll('.btn-bookmark');
    
    bookmarkButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
            
            const icon = this.querySelector('i');
            if (this.classList.contains('active')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
            }
        });
    });
    
    // ============================================
    // SEARCH FUNCTIONALITY
    // ============================================
    const jobSearch = document.getElementById('jobSearch');
    
    if (jobSearch) {
        jobSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const jobCards = document.querySelectorAll('.job-card');
            
            jobCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const company = card.querySelector('.company-name').textContent.toLowerCase();
                const description = card.querySelector('.job-card-description p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || company.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
            
            updateJobCount();
        });
    }
    
    // ============================================
    // SORT FUNCTIONALITY
    // ============================================
    const sortBy = document.getElementById('sortBy');
    
    if (sortBy) {
        sortBy.addEventListener('change', function() {
            const jobsList = document.getElementById('jobsList');
            const jobCards = Array.from(document.querySelectorAll('.job-card'));
            
            jobCards.sort((a, b) => {
                switch(this.value) {
                    case 'match':
                        return parseInt(b.dataset.match) - parseInt(a.dataset.match);
                    case 'salary':
                        // Implement salary sorting
                        return 0;
                    case 'recent':
                        // Implement date sorting
                        return 0;
                    default:
                        return 0;
                }
            });
            
            // Re-append sorted cards
            jobCards.forEach(card => jobsList.appendChild(card));
        });
    }
    
    // ============================================
    // CLEAR FILTERS
    // ============================================
    const clearFilters = document.getElementById('clearFilters');
    
    if (clearFilters) {
        clearFilters.addEventListener('click', function() {
            const checkboxes = document.querySelectorAll('.filters-sidebar input[type="checkbox"]');
            checkboxes.forEach(checkbox => checkbox.checked = false);
            
            const rangeInputs = document.querySelectorAll('.range-inputs input');
            rangeInputs.forEach(input => input.value = '');
            
            // Show all jobs
            const jobCards = document.querySelectorAll('.job-card');
            jobCards.forEach(card => card.style.display = 'block');
            
            updateJobCount();
        });
    }
    
    // ============================================
    // APPLY FILTERS
    // ============================================
    const applyFilters = document.getElementById('applyFilters');
    
    if (applyFilters) {
        applyFilters.addEventListener('click', function() {
            // Get selected filters
            const selectedLocations = getCheckedValues('location');
            const selectedJobTypes = getCheckedValues('jobType');
            const selectedExperience = getCheckedValues('experience');
            const selectedCompanies = getCheckedValues('company');
            
            // Filter logic here (implement based on your data structure)
            console.log('Filters applied:', {
                locations: selectedLocations,
                jobTypes: selectedJobTypes,
                experience: selectedExperience,
                companies: selectedCompanies
            });
            
            // Close sidebar on mobile
            if (window.innerWidth <= 1200) {
                filtersSidebar.classList.remove('open');
            }
        });
    }
    
    // ============================================
    // LOAD MORE
    // ============================================
    const loadMore = document.getElementById('loadMore');
    
    if (loadMore) {
        loadMore.addEventListener('click', function() {
            // Simulate loading more jobs
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-sync-alt"></i> Load More Jobs';
                alert('More jobs loaded! (Demo)');
            }, 1500);
        });
    }
    
    // ============================================
    // HELPER FUNCTIONS
    // ============================================
    
    function getCheckedValues(name) {
        const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
        return Array.from(checkboxes).map(cb => cb.value);
    }
    
    function updateJobCount() {
        const visibleJobs = document.querySelectorAll('.job-card:not([style*="display: none"])').length;
        const jobCount = document.getElementById('jobCount');
        if (jobCount) {
            jobCount.textContent = visibleJobs;
        }
    }
    
});

