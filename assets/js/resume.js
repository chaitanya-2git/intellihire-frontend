// ============================================
// RESUME UPLOAD JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Elements
    const uploadArea = document.getElementById('uploadArea');
    const browseBtn = document.getElementById('browseBtn');
    const resumeFile = document.getElementById('resumeFile');
    const uploadProgress = document.getElementById('uploadProgress');
    const uploadSuccess = document.getElementById('uploadSuccess');
    const progressBarFill = document.getElementById('progressBarFill');
    const progressText = document.getElementById('progressText');
    const fileName = document.getElementById('fileName');
    const fileSize = document.getElementById('fileSize');
    const cancelUpload = document.getElementById('cancelUpload');
    const uploadAnother = document.getElementById('uploadAnother');
    const viewAnalysis = document.getElementById('viewAnalysis');
    const analysisCard = document.getElementById('analysisCard');
    
    // ============================================
    // UPLOAD AREA INTERACTIONS
    // ============================================
    
    // Click to browse
    if (browseBtn && resumeFile) {
        browseBtn.addEventListener('click', function() {
            resumeFile.click();
        });
    }
    
    if (uploadArea && resumeFile) {
        uploadArea.addEventListener('click', function() {
            resumeFile.click();
        });
    }
    
    // Drag and drop
    if (uploadArea) {
        uploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });
        
        uploadArea.addEventListener('dragleave', function() {
            uploadArea.classList.remove('dragover');
        });
        
        uploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleFileUpload(files[0]);
            }
        });
    }
    
    // File input change
    if (resumeFile) {
        resumeFile.addEventListener('change', function() {
            if (this.files.length > 0) {
                handleFileUpload(this.files[0]);
            }
        });
    }
    
    // ============================================
    // FILE UPLOAD HANDLER
    // ============================================
    function handleFileUpload(file) {
        // Validate file type
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        
        if (!allowedTypes.includes(file.type)) {
            alert('Please upload PDF, DOC, or DOCX files only');
            return;
        }
        
        // Validate file size (5MB)
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            alert('File size should be less than 5MB');
            return;
        }
        
        // Show file details
        fileName.textContent = file.name;
        fileSize.textContent = formatFileSize(file.size);
        
        // Hide upload area, show progress
        uploadArea.style.display = 'none';
        uploadProgress.classList.add('active');
        
        // Simulate upload progress
        simulateUpload();
    }
    
    // ============================================
    // SIMULATE UPLOAD
    // ============================================
    function simulateUpload() {
        let progress = 0;
        
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                
                // Show success after upload complete
                setTimeout(() => {
                    uploadProgress.classList.remove('active');
                    uploadSuccess.classList.add('active');
                }, 500);
            }
            
            progressBarFill.style.width = progress + '%';
            progressText.textContent = `Uploading... ${Math.round(progress)}%`;
            
        }, 300);
    }
    
    // ============================================
    // CANCEL UPLOAD
    // ============================================
    if (cancelUpload) {
        cancelUpload.addEventListener('click', function() {
            uploadProgress.classList.remove('active');
            uploadArea.style.display = 'block';
            progressBarFill.style.width = '0%';
        });
    }
    
    // ============================================
    // UPLOAD ANOTHER
    // ============================================
    if (uploadAnother) {
        uploadAnother.addEventListener('click', function() {
            uploadSuccess.classList.remove('active');
            uploadArea.style.display = 'block';
            resumeFile.value = '';
        });
    }
    
    // ============================================
    // VIEW ANALYSIS
    // ============================================
    if (viewAnalysis && analysisCard) {
        viewAnalysis.addEventListener('click', function() {
            analysisCard.classList.add('active');
            
            // Scroll to analysis
            analysisCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }
    
    // ============================================
    // RESUME ACTIONS
    // ============================================
    const deleteButtons = document.querySelectorAll('.resume-actions .btn-icon:last-child');
    
    deleteButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (confirm('Are you sure you want to delete this resume?')) {
                const resumeItem = this.closest('.resume-item');
                resumeItem.style.opacity = '0';
                setTimeout(() => {
                    resumeItem.remove();
                }, 300);
            }
        });
    });
    
    // ============================================
    // HELPER FUNCTIONS
    // ============================================
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }
    
});
