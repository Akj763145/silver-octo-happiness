document.addEventListener('DOMContentLoaded', function() {
    // Gift box elements
    const giftBoxContainer = document.querySelector('.gift-box-container');
    const giftBox = document.querySelector('.gift-box');
    const birthdayCard = document.querySelector('.birthday-card');
    
    // Birthday elements (after reveal)
    const balloons = document.querySelectorAll('.balloon');
    const cake = document.querySelector('.cake');
    
    // Gift box click handler - main interaction
    giftBox.addEventListener('click', function() {
        explodeGiftBox();
    });
    
    function explodeGiftBox() {
        // Add exploding animation to gift box
        giftBox.classList.add('exploding');
        
        // Play explosion sound
        playExplosionSound();
        
        // Create explosion effects
        createGiftExplosion();
        
        // Hide gift box container after explosion
        setTimeout(() => {
            giftBoxContainer.classList.add('exploded');
        }, 200);
        
        // Reveal birthday card after explosion
        setTimeout(() => {
            birthdayCard.classList.add('revealed');
            // Add interactive listeners after reveal
            addBirthdayInteractions();
        }, 800);
        
        // Extra confetti burst after card reveals
        setTimeout(() => {
            createCelebrationBurst();
        }, 1200);
    }
    
    function addBirthdayInteractions() {
        // Create more confetti on balloon click
        balloons.forEach(balloon => {
            balloon.addEventListener('click', function() {
                createBurstConfetti(this);
                playBalloonSound();
            });
        });
        
        // Make cake interactive
        cake.addEventListener('click', function() {
            createFireworks();
            playCelebrationSound();
        });
        
        // Memory photo interaction
        const memoryFrame = document.querySelector('.memory-frame');
        if (memoryFrame) {
            memoryFrame.addEventListener('click', function() {
                createMemorySparkles();
                playMemorySound();
            });
        }
    }
    
    function createMemorySparkles() {
        const container = document.querySelector('.confetti');
        const memoryFrame = document.querySelector('.memory-frame');
        const rect = memoryFrame.getBoundingClientRect();
        
        // Create special memory sparkles around the photo
        for (let i = 0; i < 15; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'confetti-piece memory-sparkle';
            sparkle.style.left = rect.left + rect.width / 2 + 'px';
            sparkle.style.top = rect.top + rect.height / 2 + 'px';
            sparkle.style.background = '#ff69b4';
            sparkle.style.width = '12px';
            sparkle.style.height = '12px';
            sparkle.style.borderRadius = '50%';
            sparkle.style.animation = `memorySparkle 1.8s ease-out forwards`;
            sparkle.style.animationDelay = Math.random() * 0.5 + 's';
            
            container.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 1800);
        }
    }
    
    function playMemorySound() {
        if ('AudioContext' in window || 'webkitAudioContext' in window) {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Create a gentle, magical sound for memories
            const frequencies = [659.25, 783.99, 987.77]; // E, G, B - a beautiful triad
            
            frequencies.forEach((freq, index) => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.value = freq;
                oscillator.type = 'sine';
                
                gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.5);
                
                oscillator.start(audioContext.currentTime + index * 0.15);
                oscillator.stop(audioContext.currentTime + 1.5 + index * 0.15);
            });
        }
    }
    
    function createGiftExplosion() {
        const container = document.querySelector('.confetti');
        
        // Create explosion particles from gift box center
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'confetti-piece explosion-particle';
            particle.style.left = '50%';
            particle.style.top = '50%';
            particle.style.background = getRandomColor();
            particle.style.width = Math.random() * 15 + 5 + 'px';
            particle.style.height = particle.style.width;
            
            const angle = (Math.PI * 2 * i) / 30;
            const velocity = Math.random() * 300 + 200;
            const xMove = Math.cos(angle) * velocity;
            const yMove = Math.sin(angle) * velocity;
            
            particle.style.animation = `explosionParticle 1.5s ease-out forwards`;
            particle.style.setProperty('--x-move', xMove + 'px');
            particle.style.setProperty('--y-move', yMove + 'px');
            
            container.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 1500);
        }
    }
    
    function createCelebrationBurst() {
        const container = document.querySelector('.confetti');
        
        // Create celebratory burst around the revealed card
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece celebration-burst';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '20%';
            confetti.style.background = getRandomColor();
            confetti.style.animation = `celebrationBurst 2s ease-out forwards`;
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            
            container.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 2000);
        }
    }
    
    function createBurstConfetti(element) {
        const rect = element.getBoundingClientRect();
        const container = document.querySelector('.confetti');
        
        for (let i = 0; i < 10; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece burst-confetti';
            confetti.style.left = rect.left + rect.width / 2 + 'px';
            confetti.style.top = rect.top + rect.height / 2 + 'px';
            confetti.style.background = getRandomColor();
            confetti.style.animation = `burstConfetti 1.5s ease-out forwards`;
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            
            container.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 1500);
        }
    }
    
    function createFireworks() {
        const container = document.querySelector('.confetti');
        
        for (let i = 0; i < 20; i++) {
            const firework = document.createElement('div');
            firework.className = 'confetti-piece firework';
            firework.style.left = Math.random() * 100 + '%';
            firework.style.top = '50%';
            firework.style.background = getRandomColor();
            firework.style.animation = `fireworkBurst 2s ease-out forwards`;
            firework.style.animationDelay = Math.random() * 1 + 's';
            
            container.appendChild(firework);
            
            setTimeout(() => {
                firework.remove();
            }, 2000);
        }
    }
    
    function getRandomColor() {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    function playBalloonSound() {
        // Create a simple audio feedback using Web Audio API
        if ('AudioContext' in window || 'webkitAudioContext' in window) {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        }
    }
    
    function playCelebrationSound() {
        if ('AudioContext' in window || 'webkitAudioContext' in window) {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Create a celebratory chord
            const frequencies = [523.25, 659.25, 783.99]; // C, E, G
            
            frequencies.forEach((freq, index) => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.value = freq;
                oscillator.type = 'sine';
                
                gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
                
                oscillator.start(audioContext.currentTime + index * 0.1);
                oscillator.stop(audioContext.currentTime + 1 + index * 0.1);
            });
        }
    }
    
    function playExplosionSound() {
        if ('AudioContext' in window || 'webkitAudioContext' in window) {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Create explosion sound effect
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            const filter = audioContext.createBiquadFilter();
            
            oscillator.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(100, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.1);
            oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.2);
            
            filter.frequency.value = 1000;
            filter.Q.value = 10;
            
            oscillator.type = 'sawtooth';
            
            gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        }
    }
    
    // Add dynamic styles for burst animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes burstConfetti {
            0% {
                transform: scale(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: scale(1) rotate(360deg) translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px);
                opacity: 0;
            }
        }
        
        @keyframes fireworkBurst {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            50% {
                transform: scale(2);
                opacity: 0.8;
            }
            100% {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes explosionParticle {
            0% {
                transform: translate(0, 0) scale(1) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translate(var(--x-move), var(--y-move)) scale(0) rotate(720deg);
                opacity: 0;
            }
        }
        
        @keyframes celebrationBurst {
            0% {
                transform: translateY(0) scale(0) rotate(0deg);
                opacity: 1;
            }
            50% {
                transform: translateY(-200px) scale(1) rotate(180deg);
                opacity: 0.8;
            }
            100% {
                transform: translateY(-400px) scale(0.3) rotate(360deg);
                opacity: 0;
            }
        }
        
        .burst-confetti, .firework, .explosion-particle, .celebration-burst {
            position: fixed;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
        }
        
        .explosion-particle {
            border-radius: 50%;
            position: absolute;
        }
        
        .celebration-burst {
            width: 6px;
            height: 6px;
        }
        
        @keyframes memorySparkle {
            0% {
                transform: translate(0, 0) scale(0) rotate(0deg);
                opacity: 1;
            }
            50% {
                transform: translate(${Math.random() * 150 - 75}px, ${Math.random() * 150 - 75}px) scale(1.2) rotate(180deg);
                opacity: 0.8;
            }
            100% {
                transform: translate(${Math.random() * 250 - 125}px, ${Math.random() * 250 - 125}px) scale(0) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});