 // ============================================
// AUTHENTICATION JAVASCRIPT
// ============================================

// ============================================
// TOGGLE PASSWORD VISIBILITY
// ============================================
function togglePassword(fieldId) {
    const passwordInput = document.getElementById(fieldId);
    const toggleIcon = passwordInput.parentElement.querySelector('.toggle-password i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}

// ============================================
// PASSWORD STRENGTH CHECKER
// ============================================
const passwordInput = document.getElementById('password');
const strengthBar = document.getElementById('strengthBar');
const passwordHint = document.getElementById('passwordHint');

if (passwordInput && strengthBar) {
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        let strength = 0;
        
        // Length check
        if (password.length >= 8) strength += 25;
        
        // Lowercase check
        if (password.match(/[a-z]/)) strength += 25;
        
        // Uppercase check
        if (password.match(/[A-Z]/)) strength += 25;
        
        // Number or special character check
        if (password.match(/[0-9]/) || password.match(/[^a-zA-Z0-9]/)) strength += 25;
        
        // Update strength bar
        strengthBar.style.width = strength + '%';
        
        // Update color based on strength
        strengthBar.classList.remove('weak', 'medium', 'strong');
        
        if (strength <= 25) {
            strengthBar.classList.add('weak');
            if (passwordHint) passwordHint.textContent = 'Weak password';
            if (passwordHint) passwordHint.style.color = 'var(--error)';
        } else if (strength <= 50) {
            strengthBar.classList.add('medium');
            if (passwordHint) passwordHint.textContent = 'Medium password';
            if (passwordHint) passwordHint.style.color = 'var(--warning)';
        } else {
            strengthBar.classList.add('strong');
            if (passwordHint) passwordHint.textContent = 'Strong password';
            if (passwordHint) passwordHint.style.color = 'var(--success)';
        }
    });
}

// ============================================
// LOGIN FORM VALIDATION & SUBMISSION
// ============================================
const loginForm = document.getElementById('loginForm');

if (loginForm) {
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Clear previous errors
        clearErrors();
        
        // Get form values
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;
        
        // Validate
        let isValid = true;
        
        if (!email) {
            showError('emailError', 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('emailError', 'Please enter a valid email');
            isValid = false;
        }
        
        if (!password) {
            showError('passwordError', 'Password is required');
            isValid = false;
        }
        
        if (!isValid) return;
        
        // Show loader
        const btn = this.querySelector('button[type="submit"]');
        const btnText = btn.querySelector('.btn-text');
        const btnLoader = btn.querySelector('.btn-loader');
        
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline-block';
        btn.disabled = true;
        
        try {
            // Simulate API call (Replace with actual API call)
            // const response = await fetch('/api/login.php', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ email, password, remember })
            // });
            
            // Simulate delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Simulate success
            // For demo: redirect to dashboard
            alert('Login successful! (Demo mode)');
            window.location.href = 'student/dashboard.html';
            
        } catch (error) {
            alert('Login failed: ' + error.message);
        } finally {
            // Hide loader
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
            btn.disabled = false;
        }
    });
}

// ============================================
// SIGNUP FORM VALIDATION & SUBMISSION
// ============================================
const signupForm = document.getElementById('signupForm');

if (signupForm) {
    signupForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Clear previous errors
        clearErrors();
        
        // Get form values
        const fullname = document.getElementById('fullname').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const terms = document.getElementById('terms').checked;
        
        // Validate
        let isValid = true;
        
        if (!fullname) {
            showError('nameError', 'Full name is required');
            isValid = false;
        }
        
        if (!email) {
            showError('emailError', 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('emailError', 'Please enter a valid email');
            isValid = false;
        }
        
        if (!password) {
            showError('passwordError', 'Password is required');
            isValid = false;
        } else if (password.length < 8) {
            showError('passwordError', 'Password must be at least 8 characters');
            isValid = false;
        }
        
        if (!confirmPassword) {
            showError('confirmPasswordError', 'Please confirm your password');
            isValid = false;
        } else if (password !== confirmPassword) {
            showError('confirmPasswordError', 'Passwords do not match');
            isValid = false;
        }
        
        if (!terms) {
            showError('termsError', 'You must agree to the terms');
            isValid = false;
        }
        
        if (!isValid) return;
        
        // Show loader
        const btn = this.querySelector('button[type="submit"]');
        const btnText = btn.querySelector('.btn-text');
        const btnLoader = btn.querySelector('.btn-loader');
        
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline-block';
        btn.disabled = true;
        
        try {
            // Simulate API call (Replace with actual API call)
            // const response = await fetch('/api/signup.php', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ fullname, email, password })
            // });
            
            // Simulate delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Simulate success
            alert('Account created successfully! Please login.');
            window.location.href = 'login.html';
            
        } catch (error) {
            alert('Signup failed: ' + error.message);
        } finally {
            // Hide loader
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
            btn.disabled = false;
        }
    });
}

// ============================================
// HELPER FUNCTIONS
// ============================================

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show error message
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        const inputElement = errorElement.previousElementSibling;
        if (inputElement && inputElement.tagName === 'INPUT') {
            inputElement.classList.add('error');
        }
    }
}

// Clear all errors
function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => {
        error.textContent = '';
    });
    
    const errorInputs = document.querySelectorAll('input.error');
    errorInputs.forEach(input => {
        input.classList.remove('error');
    });
}

