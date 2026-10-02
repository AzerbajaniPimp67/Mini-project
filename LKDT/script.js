document.addEventListener('DOMContentLoaded', () => {

    const filterButtons = document.querySelectorAll('.filter-btn');
    const programCards = document.querySelectorAll('.program-grid .card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const selectedCategory = button.getAttribute('data-category');

            programCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                if (selectedCategory === 'all' || cardCategory === selectedCategory) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    const form = document.getElementById('registration-form');
    const nameInput = document.getElementById('fullname');
    const emailInput = document.getElementById('email');
    const roleSelect = document.getElementById('role');
    const feedbackDiv = document.getElementById('form-feedback');

    const isValidEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const showError = (input, messageId) => {
        input.classList.add('error');
        document.getElementById(messageId).style.display = 'block';
    };

    const clearError = (input, messageId) => {
        input.classList.remove('error');
        document.getElementById(messageId).style.display = 'none';
    };

    nameInput.addEventListener('input', () => {
        if (nameInput.value.trim().length >= 3) {
            clearError(nameInput, 'name-error');
        }
    });

    emailInput.addEventListener('input', () => {
        if (isValidEmail(emailInput.value.trim())) {
            clearError(emailInput, 'email-error');
        }
    });

    roleSelect.addEventListener('change', () => {
        if (roleSelect.value !== '') {
            clearError(roleSelect, 'role-error');
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;

        if (nameInput.value.trim().length < 3) {
            showError(nameInput, 'name-error');
            isValid = false;
        } else {
            clearError(nameInput, 'name-error');
        }

        if (!isValidEmail(emailInput.value.trim())) {
            showError(emailInput, 'email-error');
            isValid = false;
        } else {
            clearError(emailInput, 'email-error');
        }

        if (roleSelect.value === '') {
            showError(roleSelect, 'role-error');
            isValid = false;
        } else {
            clearError(roleSelect, 'role-error');
        }

        if (isValid) {
            feedbackDiv.className = 'success';
            feedbackDiv.innerText = `Köszönjük a jelentkezést, ${nameInput.value.trim()}! Sikeresen regisztráltál a Nyílt Napra.`;
            feedbackDiv.style.display = 'block';

            form.reset();
        } else {
            feedbackDiv.style.display = 'none';
        }
    });
});