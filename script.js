const canvas = document.getElementById('bannerCanvas');
        const ctx = canvas.getContext('2d');
        
        let currentTheme = 'holographic';
        let currentAnimation = 'particles';
        let frame = 0;
        let particles = [];
        let orbs = [];
        let stars = [];
        let matrixChars = [];
        let hexagons = [];
        let ripples = [];

        const themes = {
            holographic: {
                colors: ['#667eea', '#764ba2', '#f093fb', '#4facfe'],
                glow: '#b084ff'
            },
            cyberpunk: {
                colors: ['#ff00ff', '#00ffff', '#ff0080', '#0080ff'],
                glow: '#ff00ff'
            },
            aurora: {
                colors: ['#00c6ff', '#0072ff', '#00ff88', '#00d4ff'],
                glow: '#00c6ff'
            },
            sunset: {
                colors: ['#fa709a', '#fee140', '#ff6b6b', '#feca57'],
                glow: '#fa709a'
            },
            cosmic: {
                colors: ['#1a1a2e', '#16213e', '#0f3460', '#533483'],
                glow: '#7209b7'
            },
            neon: {
                colors: ['#f857a6', '#ff5858', '#ff006e', '#fb5607'],
                glow: '#f857a6'
            },
            ocean: {
                colors: ['#2E3192', '#1BFFFF', '#0575E6', '#021B79'],
                glow: '#1BFFFF'
            },
            fire: {
                colors: ['#f12711', '#f5af19', '#ff416c', '#ff4b2b'],
                glow: '#f5af19'
            },
            forest: {
                colors: ['#0ba360', '#3cba92', '#56ab2f', '#a8e063'],
                glow: '#3cba92'
            },
            royal: {
                colors: ['#141e30', '#243b55', '#667eea', '#764ba2'],
                glow: '#667eea'
            },
            rose: {
                colors: ['#eb3349', '#f45c43', '#ff6a88', '#ffa07a'],
                glow: '#eb3349'
            },
            galaxy: {
                colors: ['#5f2c82', '#49a09d', '#8e2de2', '#4a00e0'],
                glow: '#8e2de2'
            }
        };

        // Initialize particles
        for(let i = 0; i < 100; i++) {
            particles.push({
                x: Math.random() * 600,
                y: Math.random() * 240,
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 1,
                speedY: (Math.random() - 0.5) * 1,
                alpha: Math.random()
            });
        }

        // Initialize orbs
        for(let i = 0; i < 5; i++) {
            orbs.push({
                x: Math.random() * 600,
                y: Math.random() * 240,
                radius: Math.random() * 50 + 30,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                colorIndex: Math.floor(Math.random() * 4)
            });
        }

        // Initialize stars
        for(let i = 0; i < 150; i++) {
            stars.push({
                x: Math.random() * 600,
                y: Math.random() * 240,
                size: Math.random() * 2,
                speed: Math.random() * 0.3 + 0.1,
                brightness: Math.random()
            });
        }

        // Initialize matrix
        for(let i = 0; i < 20; i++) {
            matrixChars.push({
                x: i * 30,
                chars: [],
                speed: Math.random() * 2 + 1
            });
            for(let j = 0; j < 15; j++) {
                matrixChars[i].chars.push({
                    char: String.fromCharCode(33 + Math.random() * 94),
                    y: Math.random() * 240
                });
            }
        }

        // Initialize hexagons
        for(let i = 0; i < 15; i++) {
            hexagons.push({
                x: Math.random() * 600,
                y: Math.random() * 240,
                size: Math.random() * 30 + 20,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.02
            });
        }

        // Initialize ripples
        for(let i = 0; i < 3; i++) {
            ripples.push({
                x: Math.random() * 600,
                y: Math.random() * 240,
                radius: 0,
                maxRadius: Math.random() * 100 + 100,
                speed: Math.random() * 2 + 1
            });
        }

        function setTheme(theme) {
            currentTheme = theme;
            document.querySelectorAll('.preset-btn').forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
        }

        function setAnimation(animation) {
            currentAnimation = animation;
            document.querySelectorAll('.animation-btn').forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
        }

        function drawBackground() {
            const colors = themes[currentTheme].colors;
            
            switch(currentAnimation) {
                case 'particles':
                    drawParticlesEffect(colors);
                    break;
                case 'waves':
                    drawWavesEffect(colors);
                    break;
                case 'orbs':
                    drawOrbsEffect(colors);
                    break;
                case 'matrix':
                    drawMatrixEffect(colors);
                    break;
                case 'stars':
                    drawStarsEffect(colors);
                    break;
                case 'geometric':
                    drawGeometricEffect(colors);
                    break;
                case 'plasma':
                    drawPlasmaEffect(colors);
                    break;
                case 'hexagons':
                    drawHexagonsEffect(colors);
                    break;
                case 'ripples':
                    drawRipplesEffect(colors);
                    break;
            }
        }

        function drawParticlesEffect(colors) {
            const gradient = ctx.createLinearGradient(0, 0, 600, 240);
            gradient.addColorStop(0, colors[0]);
            gradient.addColorStop(0.5, colors[1]);
            gradient.addColorStop(1, colors[2]);
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 600, 240);

            particles.forEach(p => {
                p.x += p.speedX;
                p.y += p.speedY;
                p.alpha = Math.sin(frame * 0.02 + p.x * 0.01) * 0.5 + 0.5;
                
                if(p.x < 0 || p.x > 600) p.speedX *= -1;
                if(p.y < 0 || p.y > 240) p.speedY *= -1;
                
                ctx.fillStyle = `rgba(255,255,255,${p.alpha * 0.8})`;
                ctx.shadowBlur = 10;
                ctx.shadowColor = themes[currentTheme].glow;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.shadowBlur = 0;
        }

        function drawWavesEffect(colors) {
            const gradient = ctx.createLinearGradient(0, 0, 600, 240);
            gradient.addColorStop(0, colors[0]);
            gradient.addColorStop(1, colors[1]);
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 600, 240);

            for(let i = 0; i < 4; i++) {
                ctx.fillStyle = `rgba(255,255,255,${0.05 + i * 0.03})`;
                ctx.beginPath();
                for(let x = 0; x <= 600; x += 5) {
                    const y = 120 + Math.sin((x + frame * 3 + i * 80) * 0.015) * (30 + i * 10);
                    if(x === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.lineTo(600, 240);
                ctx.lineTo(0, 240);
                ctx.fill();
            }
        }

        function drawOrbsEffect(colors) {
            ctx.fillStyle = colors[0];
            ctx.fillRect(0, 0, 600, 240);

            orbs.forEach(orb => {
                orb.x += orb.speedX;
                orb.y += orb.speedY;
                
                if(orb.x < -50 || orb.x > 650) orb.speedX *= -1;
                if(orb.y < -50 || orb.y > 290) orb.speedY *= -1;

                const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
                gradient.addColorStop(0, colors[orb.colorIndex] + '80');
                gradient.addColorStop(0.5, colors[orb.colorIndex] + '40');
                gradient.addColorStop(1, 'transparent');
                
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
                ctx.fill();
            });
        }

        function drawMatrixEffect(colors) {
            ctx.fillStyle = colors[0];
            ctx.fillRect(0, 0, 600, 240);

            ctx.font = '16px monospace';
            matrixChars.forEach(col => {
                col.chars.forEach((char, i) => {
                    char.y += col.speed;
                    if(char.y > 240) {
                        char.y = 0;
                        char.char = String.fromCharCode(33 + Math.random() * 94);
                    }
                    
                    const alpha = 1 - (i / col.chars.length);
                    ctx.fillStyle = colors[1] + Math.floor(alpha * 255).toString(16).padStart(2, '0');
                    ctx.fillText(char.char, col.x, char.y);
                });
            });
        }

        function drawStarsEffect(colors) {
            const gradient = ctx.createRadialGradient(300, 120, 0, 300, 120, 300);
            gradient.addColorStop(0, colors[0]);
            gradient.addColorStop(1, colors[1]);
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 600, 240);

            stars.forEach(s => {
                s.y += s.speed;
                s.brightness = Math.sin(frame * 0.05 + s.x * 0.01) * 0.5 + 0.5;
                
                if(s.y > 240) {
                    s.y = 0;
                    s.x = Math.random() * 600;
                }
                
                ctx.fillStyle = `rgba(255,255,255,${s.brightness})`;
                ctx.shadowBlur = 5;
                ctx.shadowColor = '#fff';
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.shadowBlur = 0;
        }

        function drawGeometricEffect(colors) {
            const gradient = ctx.createLinearGradient(0, 0, 600, 240);
            gradient.addColorStop(0, colors[0]);
            gradient.addColorStop(1, colors[1]);
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 600, 240);

            const size = 60;
            for(let x = -size; x < 600 + size; x += size) {
                for(let y = -size; y < 240 + size; y += size) {
                    const offsetX = Math.sin(frame * 0.02 + x * 0.01) * 20;
                    const offsetY = Math.cos(frame * 0.02 + y * 0.01) * 20;
                    const rotation = frame * 0.01 + (x + y) * 0.001;
                    
                    ctx.save();
                    ctx.translate(x + offsetX, y + offsetY);
                    ctx.rotate(rotation);
                    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
                    ctx.lineWidth = 2;
                    ctx.strokeRect(-25, -25, 50, 50);
                    ctx.restore();
                }
            }
        }

        function drawPlasmaEffect(colors) {
            for(let y = 0; y < 240; y += 4) {
                for(let x = 0; x < 600; x += 4) {
                    const value = Math.sin(x * 0.01 + frame * 0.05) +
                                  Math.sin(y * 0.01 + frame * 0.05) +
                                  Math.sin((x + y) * 0.01 + frame * 0.05);
                    
                    const colorIndex = Math.floor((value + 3) / 6 * colors.length);
                    const color = colors[Math.min(colorIndex, colors.length - 1)];
                    
                    ctx.fillStyle = color;
                    ctx.fillRect(x, y, 4, 4);
                }
            }
        }

        function drawHexagonsEffect(colors) {
            const gradient = ctx.createLinearGradient(0, 0, 600, 240);
            gradient.addColorStop(0, colors[0]);
            gradient.addColorStop(1, colors[1]);
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 600, 240);

            hexagons.forEach(hex => {
                hex.rotation += hex.rotationSpeed;
                
                ctx.save();
                ctx.translate(hex.x, hex.y);
                ctx.rotate(hex.rotation);
                
                ctx.strokeStyle = 'rgba(255,255,255,0.3)';
                ctx.lineWidth = 2;
                ctx.beginPath();
                for(let i = 0; i < 6; i++) {
                    const angle = (Math.PI / 3) * i;
                    const x = Math.cos(angle) * hex.size;
                    const y = Math.sin(angle) * hex.size;
                    if(i === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.closePath();
                ctx.stroke();
                ctx.restore();
            });
        }

        function drawRipplesEffect(colors) {
            const gradient = ctx.createLinearGradient(0, 0, 600, 240);
            gradient.addColorStop(0, colors[0]);
            gradient.addColorStop(1, colors[1]);
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 600, 240);

            ripples.forEach(ripple => {
                ripple.radius += ripple.speed;
                
                if(ripple.radius > ripple.maxRadius) {
                    ripple.radius = 0;
                    ripple.x = Math.random() * 600;
                    ripple.y = Math.random() * 240;
                }
                
                const alpha = 1 - (ripple.radius / ripple.maxRadius);
                ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.5})`;
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
                ctx.stroke();
            });
        }

        function drawText() {
            const mainText = document.getElementById('mainText').value || 'NITRO USER';
            const subText = document.getElementById('subText').value || 'Premium Member';

            ctx.shadowColor = 'rgba(0,0,0,0.8)';
            ctx.shadowBlur = 30;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 4;

            // Main text with gradient
            const textGradient = ctx.createLinearGradient(0, 80, 0, 130);
            textGradient.addColorStop(0, '#ffffff');
            textGradient.addColorStop(1, '#e0e0e0');
            
            ctx.fillStyle = textGradient;
            ctx.font = 'bold 56px Arial, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(mainText, 300, 105);

            // Subtitle
            ctx.shadowBlur = 15;
            ctx.fillStyle = 'rgba(255,255,255,0.9)';
            ctx.font = '22px Arial, sans-serif';
            ctx.fillText(subText, 300, 160);
            
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
        }

        function animate() {
            ctx.clearRect(0, 0, 600, 240);
            drawBackground();
            drawText();
            frame++;
            requestAnimationFrame(animate);
        }

        function showStatus(message, type = 'loading') {
            const status = document.getElementById('status');
            status.textContent = message;
            status.className = `status ${type}`;
            status.style.display = 'block';
        }

        function hideStatus() {
            setTimeout(() => {
                document.getElementById('status').style.display = 'none';
            }, 3000);
        }

        function downloadPNG() {
            try {
                const link = document.createElement('a');
                link.download = 'discord-banner.png';
                link.href = canvas.toDataURL('image/png');
                link.click();
                showStatus('✅ PNG downloaded successfully!', 'success');
                hideStatus();
            } catch(error) {
                showStatus('❌ Error downloading PNG', 'error');
                hideStatus();
            }
        }

        function generateGIF() {
            const gifBtn = document.getElementById('gifBtn');
            gifBtn.disabled = true;
            showStatus('🎨 Loading GIF library...', 'loading');

            // Load gif.js library dynamically
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/gif.js@0.2.0/dist/gif.js';
            script.onerror = function() {
                showStatus('❌ Failed to load GIF library. Please try PNG download instead.', 'error');
                gifBtn.disabled = false;
                hideStatus();
            };
            script.onload = function() {
                showStatus('🎬 Generating GIF... Please wait', 'loading');
                
                setTimeout(() => {
                    try {
                        const gif = new GIF({
    workers: 2,
    quality: 10,
    width: 600,
    height: 240,
    workerScript: './gif.worker.js'  // 👈 Local path instead of CDN
});


                        const tempCanvas = document.createElement('canvas');
                        tempCanvas.width = 600;
                        tempCanvas.height = 240;
                        const tempCtx = tempCanvas.getContext('2d');

                        const totalFrames = 40;
                        let currentFrame = 0;
                        const savedFrame = frame;

                        function captureFrame() {
                            if(currentFrame < totalFrames) {
                                frame = savedFrame + currentFrame * 2;
                                
                                tempCtx.clearRect(0, 0, 600, 240);
                                ctx.clearRect(0, 0, 600, 240);
                                drawBackground();
                                drawText();
                                tempCtx.drawImage(canvas, 0, 0);
                                
                                gif.addFrame(tempCanvas, {delay: 50, copy: true});
                                currentFrame++;
                                
                                const progress = Math.round((currentFrame/totalFrames)*100);
                                showStatus(`🎬 Generating: ${progress}%`, 'loading');
                                setTimeout(captureFrame, 10);
                            } else {
                                frame = savedFrame;
                                gif.on('finished', function(blob) {
                                    const url = URL.createObjectURL(blob);
                                    const a = document.createElement('a');
                                    a.href = url;
                                    a.download = 'discord-nitro-banner.gif';
                                    a.click();
                                    showStatus('✨ Premium GIF downloaded successfully!', 'success');
                                    gifBtn.disabled = false;
                                    hideStatus();
                                });
                                gif.render();
                            }
                        }

                        captureFrame();
                    } catch(error) {
                        showStatus('❌ Error generating GIF. Try PNG download instead.', 'error');
                        gifBtn.disabled = false;
                        hideStatus();
                    }
                }, 100);
            };
            document.head.appendChild(script);
        }

        // Auto-update text
        document.getElementById('mainText').addEventListener('input', () => {});
        document.getElementById('subText').addEventListener('input', () => {});

        animate();