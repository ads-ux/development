document.addEventListener('DOMContentLoaded', () => {

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- Progressive Form Logic ---
    const form = document.getElementById('application-form');
    const step1 = document.getElementById('step-1');
    const step2 = document.getElementById('step-2');
    const stepSuccess = document.getElementById('step-success');

    const btnNext = document.getElementById('btn-next');
    const btnPrev = document.getElementById('btn-prev');

    const dot1 = document.getElementById('dot-1');
    const dot2 = document.getElementById('dot-2');

    // Validation function for Step 1
    function validateStep1() {
        const fullName = document.getElementById('fullName');
        const email = document.getElementById('email');
        const spend = document.getElementById('spend');

        let isValid = true;

        // Simple visual feedback for empty required fields
        [fullName, email, spend].forEach(input => {
            if (!input.value) {
                input.style.borderColor = 'var(--danger)';
                isValid = false;
            } else {
                input.style.borderColor = 'var(--border-color)';
            }
        });

        // Basic email format check
        if (email.value && !/\S+@\S+\.\S+/.test(email.value)) {
            email.style.borderColor = 'var(--danger)';
            isValid = false;
        }

        return isValid;
    }

    // Next Step Action
    btnNext.addEventListener('click', () => {
        if (validateStep1()) {
            step1.classList.remove('active');
            step2.classList.add('active');

            dot1.classList.remove('active');
            dot1.style.backgroundColor = 'var(--success)';
            dot1.style.borderColor = 'var(--success)';
            dot1.innerHTML = '<svg viewBox="0 0 24 24" width="16" fill="none" stroke="#fff" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>';

            dot2.classList.add('active');
        }
    });

    // Previous Step Action
    btnPrev.addEventListener('click', () => {
        step2.classList.remove('active');
        step1.classList.add('active');

        dot2.classList.remove('active');
        dot1.classList.add('active');
        dot1.style.backgroundColor = 'var(--bg-surface-elevated)';
        dot1.style.borderColor = 'var(--border-color)';
        dot1.innerHTML = '1';
    });

    // Form Submission Action
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const btnSubmit = document.getElementById('btn-submit');
        const originalText = btnSubmit.innerHTML;

        // Simulating submission delay
        btnSubmit.innerHTML = 'Submitting...';
        btnSubmit.disabled = true;

        setTimeout(() => {
            step2.classList.remove('active');
            stepSuccess.classList.add('active');

            dot2.style.backgroundColor = 'var(--success)';
            dot2.style.borderColor = 'var(--success)';
            dot2.innerHTML = '<svg viewBox="0 0 24 24" width="16" fill="none" stroke="#fff" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>';

            // Optionally, you would send FormData via fetch here
            // const formData = new FormData(form);
            // console.log(Object.fromEntries(formData));

            // Optional: reset form after a few seconds so they can see success state
            // setTimeout(() => form.reset(), 5000);

        }, 1200);
    });

    // Clear error styling on input
    const inputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            input.style.borderColor = 'var(--border-color)';
        });
        input.addEventListener('change', () => {
            input.style.borderColor = 'var(--border-color)';
        });
    });

});
