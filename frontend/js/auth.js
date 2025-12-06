// ============================================
// AUTHENTICATION SYSTEM
// ============================================

// Supabase client setup (optional). Configure window.SUPABASE_URL and window.SUPABASE_ANON_KEY in HTML.
const SUPABASE_URL = typeof window !== 'undefined' ? (window.SUPABASE_URL || '') : '';
const SUPABASE_ANON_KEY = typeof window !== 'undefined' ? (window.SUPABASE_ANON_KEY || '') : '';
let __supabaseClient = null;

function isSupabaseConfigured() {
    return typeof window !== 'undefined' && typeof window.supabase !== 'undefined' && !!SUPABASE_URL && !!SUPABASE_ANON_KEY;
}

function getSupabaseClient() {
    if (!isSupabaseConfigured()) return null;
    if (!__supabaseClient) {
        __supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
    return __supabaseClient;
}

// Initialize default faculty/admin accounts
function initializeDefaultAccounts() {
    const defaultAccounts = [
        {
            email: 'admin@college.edu',
            password: 'admin123',
            role: 'admin',
            name: 'System Administrator'
        },
        {
            email: 'faculty@college.edu',
            password: 'faculty123',
            role: 'faculty',
            name: 'Faculty Member'
        }
    ];

    // Store default accounts if not already stored
    if (!localStorage.getItem('facultyAccounts')) {
        localStorage.setItem('facultyAccounts', JSON.stringify(defaultAccounts));
    }
}

// ============================================
// STUDENT SIGNUP FUNCTION
// ============================================
async function studentSignup(formData) {
    try {
        const response = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password,
                department: formData.department,
                year: formData.year
            })
        });

        const result = await response.json();

        if (result.success) {
            // Store token and user data in localStorage
            localStorage.setItem('token', result.token);
            localStorage.setItem('currentUser', JSON.stringify(result.user));
            return {
                success: true,
                message: result.message,
                student: result.user
            };
        } else {
            return {
                success: false,
                message: result.message
            };
        }
    } catch (error) {
        console.error('Signup error:', error);
        return {
            success: false,
            message: 'Signup failed. Please try again.'
        };
    }
}

// ============================================
// STUDENT LOGIN FUNCTION
// ============================================
async function studentLogin(email, password) {
    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();

        if (result.success) {
            // Store token and user data in localStorage
            localStorage.setItem('token', result.token);
            localStorage.setItem('currentUser', JSON.stringify(result.user));
            return {
                success: true,
                message: result.message,
                user: result.user
            };
        } else {
            return {
                success: false,
                message: result.message
            };
        }
    } catch (error) {
        console.error('Login error:', error);
        return {
            success: false,
            message: 'Login failed. Please try again.'
        };
    }
}

// ============================================
// FACULTY/ADMIN LOGIN FUNCTION
// ============================================
function facultyLogin(email, password) {
    // Initialize default accounts
    initializeDefaultAccounts();

    // Get faculty accounts
    const facultyAccounts = JSON.parse(localStorage.getItem('facultyAccounts')) || [];

    // Find account with matching email
    const account = facultyAccounts.find(acc => acc.email === email);

    if (!account) {
        return {
            success: false,
            message: 'No faculty/admin account found with this email!'
        };
    }

    // Check password
    if (account.password !== password) {
        return {
            success: false,
            message: 'Incorrect password!'
        };
    }

    // Create session
    const session = {
        email: account.email,
        name: account.name,
        role: account.role,
        loginTime: new Date().toISOString()
    };

    // Save session
    localStorage.setItem('currentUser', JSON.stringify(session));

    return {
        success: true,
        message: 'Login successful!',
        user: session
    };
}

// ============================================
// LOGOUT FUNCTION
// ============================================
function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    window.location.href = '/index.html';
}

// ============================================
// CHECK LOGIN STATUS
// ============================================
function checkLoginStatus() {
    const token = localStorage.getItem('token');
    const currentUser = localStorage.getItem('currentUser');
    if (token && currentUser) {
        return JSON.parse(currentUser);
    }
    return null;
}

// ============================================
// PASSWORD STRENGTH CHECKER
// ============================================
function checkPasswordStrength(password) {
    let strength = 0;
    const strengthText = ['Weak', 'Fair', 'Good', 'Strong'];
    const strengthColor = ['#ef4444', '#f59e0b', '#10b981', '#059669'];

    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;

    strength = Math.min(3, Math.floor(strength / 1.5));

    return {
        level: strength,
        text: strengthText[strength],
        color: strengthColor[strength]
    };
}

// ============================================
// FORM VALIDATION UTILITIES
// ============================================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(elem => {
        elem.textContent = '';
    });
}

function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function showAlert(message, type = 'success') {
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `custom-alert alert-${type}`;
    alert.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;

    // Add to page
    document.body.appendChild(alert);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        alert.remove();
    }, 5000);
}

// ============================================
// STUDENT SIGNUP FORM HANDLER
// ============================================
if (document.getElementById('studentSignupForm')) {
    const signupForm = document.getElementById('studentSignupForm');
    const passwordInput = document.getElementById('signupPassword');
    const passwordStrengthDiv = document.getElementById('passwordStrength');

    // Password strength indicator
    if (passwordInput && passwordStrengthDiv) {
        passwordInput.addEventListener('input', (e) => {
            const strength = checkPasswordStrength(e.target.value);
            if (e.target.value.length > 0) {
                passwordStrengthDiv.innerHTML = `
                    <div class="strength-bar">
                        <div class="strength-fill" style="width: ${(strength.level + 1) * 25}%; background: ${strength.color}"></div>
                    </div>
                    <span style="color: ${strength.color}; font-size: 12px;">${strength.text}</span>
                `;
            } else {
                passwordStrengthDiv.innerHTML = '';
            }
        });
    }

    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearErrors();

        // Get form data
        const formData = {
            fullName: document.getElementById('signupName').value.trim(),
            email: document.getElementById('signupEmail').value.trim(),
            department: document.getElementById('signupDepartment').value,
            year: document.getElementById('signupYear').value,
            password: document.getElementById('signupPassword').value,
            confirmPassword: document.getElementById('signupConfirmPassword').value
        };

        // Validate
        let isValid = true;

        if (!formData.fullName) {
            showError('nameError', 'Full name is required');
            isValid = false;
        }

        if (!validateEmail(formData.email)) {
            showError('emailError', 'Please enter a valid email address');
            isValid = false;
        }

        if (!formData.department) {
            showError('departmentError', 'Please select a department');
            isValid = false;
        }

        if (!formData.year) {
            showError('yearError', 'Please select your year');
            isValid = false;
        }

        if (formData.password.length < 6) {
            showError('passwordError', 'Password must be at least 6 characters');
            isValid = false;
        }

        if (formData.password !== formData.confirmPassword) {
            showError('confirmPasswordError', 'Passwords do not match');
            isValid = false;
        }

        if (!document.getElementById('agreeTerms').checked) {
            showAlert('Please agree to the Terms and Conditions', 'error');
            isValid = false;
        }

        if (!isValid) return;

        // Attempt signup
        const result = await studentSignup(formData);

        if (result.success) {
            showAlert(result.message, 'success');
            setTimeout(() => {
                window.location.href = '/pages/auth/student-login.html';
            }, 1500);
        } else {
            showError('emailError', result.message);
            showAlert(result.message, 'error');
        }
    });
}

// ============================================
// STUDENT LOGIN FORM HANDLER
// ============================================
if (document.getElementById('studentLoginForm')) {
    const loginForm = document.getElementById('studentLoginForm');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearErrors();

        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;

        // Validate
        let isValid = true;

        if (!validateEmail(email)) {
            showError('emailError', 'Please enter a valid email address');
            isValid = false;
        }

        if (!password) {
            showError('passwordError', 'Password is required');
            isValid = false;
        }

        if (!isValid) return;

        // Attempt login
        const result = await studentLogin(email, password);

        if (result.success) {
            showAlert(result.message, 'success');
            setTimeout(() => {
                // Redirect to student dashboard
                window.location.href = '/pages/dashboard/student-dashboard.html';
            }, 1000);
        } else {
            if (result.message.includes('email')) {
                showError('emailError', result.message);
            } else {
                showError('passwordError', result.message);
            }
            showAlert(result.message, 'error');
        }
    });
}

// ============================================
// FACULTY/ADMIN LOGIN FORM HANDLER
// ============================================
if (document.getElementById('facultyLoginForm')) {
    const facultyForm = document.getElementById('facultyLoginForm');

    facultyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        clearErrors();

        const email = document.getElementById('facultyEmail').value.trim();
        const password = document.getElementById('facultyPassword').value;

        // Validate
        let isValid = true;

        if (!validateEmail(email)) {
            showError('emailError', 'Please enter a valid email address');
            isValid = false;
        }

        if (!password) {
            showError('passwordError', 'Password is required');
            isValid = false;
        }

        if (!isValid) return;

        // Attempt login
        const result = facultyLogin(email, password);

        if (result.success) {
            showAlert(result.message, 'success');
            setTimeout(() => {
                // Redirect based on role
                if (result.user.role === 'admin') {
                    window.location.href = '/pages/dashboard/admin-dashboard.html';
                } else {
                    window.location.href = '/pages/dashboard/faculty-dashboard.html';
                }
            }, 1000);
        } else {
            if (result.message.includes('email')) {
                showError('emailError', result.message);
            } else {
                showError('passwordError', result.message);
            }
            showAlert(result.message, 'error');
        }
    });
}

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize default accounts
    initializeDefaultAccounts();
});
