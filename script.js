document.addEventListener('DOMContentLoaded', () => {
    // Basic interaction for the primary button
    const exploreBtn = document.getElementById('exploreBtn');
    
    exploreBtn.addEventListener('click', () => {
        exploreBtn.innerHTML = `
            <span>Connecting...</span>
            <div class="pulse" style="width: 12px; height: 12px; margin-left: 8px;"></div>
        `;
        
        setTimeout(() => {
            exploreBtn.innerHTML = `
                <span>Workspace Initialized</span>
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none">
                    <path d="M5 13l4 4L19 7" />
                </svg>
            `;
            exploreBtn.style.background = '#10b981';
        }, 1500);
    });

    // Simulate connection latency updates
    const msCounter = document.getElementById('msCounter');
    setInterval(() => {
        // Random latency between 8ms and 24ms
        const latency = Math.floor(Math.random() * 16) + 8;
        msCounter.textContent = `${latency}ms`;
    }, 3000);
});
