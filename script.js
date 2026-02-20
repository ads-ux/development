document.addEventListener('DOMContentLoaded', () => {
    // --- State Management ---
    const state = {
        answers: {},
        currentStep: 1,
        totalSteps: 7
    };

    // --- DOM Elements ---
    const views = {
        home: document.getElementById('view-home'),
        quiz: document.getElementById('view-quiz'),
        analyzing: document.getElementById('view-analyzing'),
        qualified: document.getElementById('view-result-qualified'),
        rejected: document.getElementById('view-result-rejected')
    };

    const startBtns = document.querySelectorAll('.start-quiz-btn');
    const backBtn = document.getElementById('btn-back');
    const progressBar = document.getElementById('progressBar');
    const stepNumDisplay = document.getElementById('currentStepNum');
    const slides = document.querySelectorAll('.question-slide');
    const leadForm = document.getElementById('lead-form');

    // --- View Navigation ---
    function showView(viewId) {
        Object.values(views).forEach(v => {
            if (v) v.classList.remove('active');
        });
        document.getElementById(viewId).classList.add('active');
    }

    startBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showView('view-quiz');
        });
    });

    // --- Quiz Logic ---
    function updateProgress() {
        const progress = (state.currentStep / state.totalSteps) * 100;
        progressBar.style.width = `${progress}%`;
        stepNumDisplay.textContent = state.currentStep;

        if (state.currentStep > 1) {
            backBtn.classList.remove('hidden');
        } else {
            backBtn.classList.add('hidden');
        }
    }

    function showStep(step) {
        // Hide current
        slides.forEach(s => {
            s.classList.remove('active', 'exit-left');
            if (parseInt(s.dataset.step) < step) {
                s.classList.add('exit-left');
            }
        });

        // Show new
        const targetSlide = document.querySelector(`.question-slide[data-step="${step}"]`);
        if (targetSlide) {
            targetSlide.classList.add('active');
            state.currentStep = step;
            updateProgress();
        }
    }

    backBtn.addEventListener('click', () => {
        if (state.currentStep > 1) {
            showStep(state.currentStep - 1);
        } else {
            showView('view-home'); // Go back to start if on step 1
        }
    });

    // Auto-advance on radio selection
    const radioInputs = document.querySelectorAll('.question-slide input[type="radio"]');
    radioInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            const name = e.target.name;
            const value = e.target.value;
            state.answers[name] = value;

            // Short delay to show selection state before sliding
            setTimeout(() => {
                if (state.currentStep < state.totalSteps) {
                    showStep(state.currentStep + 1);
                }
            }, 300);
        });
    });

    // --- Form Submission & Analysis ---
    leadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('name').value;
        const emailInput = document.getElementById('email').value;

        state.answers.name = nameInput;
        state.answers.email = emailInput;

        runAnalysis();
    });

    function runAnalysis() {
        showView('view-analyzing');

        const steps = document.querySelectorAll('.analysis-steps .step');

        // Mock analysis progression
        setTimeout(() => steps[0].classList.add('done'), 800);
        setTimeout(() => steps[1].classList.add('done'), 1800);
        setTimeout(() => steps[2].classList.add('done'), 2800);

        setTimeout(() => {
            showResults();
        }, 3600);
    }

    function showResults() {
        const { budget, experience, bottleneck, model } = state.answers;

        // Soft reject criteria: Budget < 10k AND beginner experience
        if (budget === 'under_10k' && ['beginner', 'intermediate'].includes(experience)) {
            showView('view-result-rejected');
            return;
        }

        // --- Determine Archetype ---
        let archetype = "The Performance Marketer";
        let desc = "You need high-quality traffic to scale your campaigns.";
        let formats = [];

        if (budget === '250k_plus' || budget === '50k_250k') {
            if (bottleneck === 'volume') {
                archetype = "The Volume Seeker";
                desc = "You have proven funnels but are capped by network limits. Vrume unlocks massive scale on high-converting placements.";
                formats = ["Global Push & Pop Volume", "High-Volume Native Integrations"];
            } else {
                archetype = "The Scaling Operator";
                desc = "Scaling spend usually degrades ROI. Vrume maintains quality at high spend tiers through strict publisher vetting.";
                formats = ["Premium Tier 1 Native", "Direct Publisher Placements"];
            }
        } else {
            // Mid tier 10k-50k or highly experienced small budget
            if (model === 'cpa_cpl' || model === 'revshare') {
                archetype = "The Conversion Specialist";
                desc = "You buy strictly on performance. We have proprietary formats designed for high-intent conversions.";
                formats = ["High-Intent Search Formats", "Smart Bidding Display"];
            } else {
                archetype = "The Agile Media Buyer";
                desc = "You test fast and scale winners. Vrume provides the clean data and rapid campaign deployment you need.";
                formats = ["Self-Serve Native Ads", "Cost-effective Push Traffic"];
            }
        }

        // Render Results
        document.getElementById('res-archetype-title').textContent = archetype;
        document.getElementById('res-archetype-desc').textContent = desc;

        const formatsList = document.getElementById('res-formats-list');
        formatsList.innerHTML = '';
        formats.forEach(f => {
            const li = document.createElement('li');
            li.textContent = f;
            formatsList.appendChild(li);
        });

        // Add standard benefit
        const standardBenefit = document.createElement('li');
        standardBenefit.textContent = "Dedicated Account Manager";
        formatsList.appendChild(standardBenefit);

        showView('view-result-qualified');
    }

    document.getElementById('final-apply-btn')?.addEventListener('click', function () {
        this.innerHTML = "Application Sent ✓";
        this.style.background = "var(--success)";
        this.style.color = "#fff";
    });
});
