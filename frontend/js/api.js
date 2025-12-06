// API Service for COMPSA Event Management System

const API_BASE_URL = 'http://localhost:3000/api';

// Get authentication token
function getAuthToken() {
    return localStorage.getItem('token');
}

// Generic API request function
async function apiRequest(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    // Add default headers
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };
    
    // Add authorization header if token exists
    const token = getAuthToken();
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    // Merge options
    const config = {
        ...options,
        headers
    };
    
    try {
        const response = await fetch(url, config);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'API request failed');
        }
        
        return data;
    } catch (error) {
        console.error(`API request failed: ${error.message}`);
        throw error;
    }
}

// Committee Formation APIs
async function submitCommitteeNomination(nominationData) {
    return await apiRequest('/committee-nominate', {
        method: 'POST',
        body: JSON.stringify(nominationData)
    });
}

// Refreshment Management APIs
async function generateRefreshmentCoupon(couponData) {
    return await apiRequest('/generate-coupon', {
        method: 'POST',
        body: JSON.stringify(couponData)
    });
}

async function redeemRefreshmentCoupon(couponData) {
    return await apiRequest('/redeem-coupon', {
        method: 'POST',
        body: JSON.stringify(couponData)
    });
}

// Scoring & Results APIs
async function submitScore(scoreData) {
    return await apiRequest('/submit-score', {
        method: 'POST',
        body: JSON.stringify(scoreData)
    });
}

async function getScoresForCompetition(competition) {
    return await apiRequest(`/scores/${competition}`, {
        method: 'GET'
    });
}

// Export functions
window.COMPSAAPI = {
    submitCommitteeNomination,
    generateRefreshmentCoupon,
    redeemRefreshmentCoupon,
    submitScore,
    getScoresForCompetition
};