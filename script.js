// DOM Elements
const paymentBtn = document.getElementById('paymentBtn');
const paymentSection = document.getElementById('paymentSection');
const photoboothSection = document.getElementById('photoboothSection');
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photo = document.getElementById('photo');
const captureBtn = document.getElementById('captureBtn');
const downloadBtn = document.getElementById('downloadBtn');
const newBtn = document.getElementById('newBtn');
const countdownEl = document.getElementById('countdown');

// State
let stream = null;
let currentFilter = 'none';
let isPaid = false;
let mediaRecorder = null;

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    attachEventListeners();
});

// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.width = particle.style.height = (Math.random() * 10 + 5) + 'px';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 4) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Event listeners
function attachEventListeners() {
    // Payment button
    paymentBtn.addEventListener('click', simulatePayment);
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelector('.filter-btn.active').classList.remove('active');
            e.target.classList.add('active');
            currentFilter = e.target.dataset.filter;
        });
    });
    
    // Social share buttons
    document.querySelectorAll('.social-btn').forEach(btn => {
        btn.addEventListener('click', sharePhoto);
    });
}

// Simulate payment process
function simulatePayment() {
    paymentBtn.textContent = '✅ TELAH DIBAYAR!';
    paymentBtn.classList.add('paid');
    paymentBtn.disabled = true;
    isPaid = true;
    
    // Show photobooth after payment
    setTimeout(() => {
        paymentSection.style.display = 'none';
        photoboothSection.style.display = 'grid';
        initCamera();
    }, 1500);
}

// Initialize camera
async function initCamera() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({
            video: { 
                width: { ideal: 1280 },
                height: { ideal: 720 },
                facingMode: 'user'
            },
            audio: false
        });
        video.srcObject = stream;
        video.play();
    } catch (err
