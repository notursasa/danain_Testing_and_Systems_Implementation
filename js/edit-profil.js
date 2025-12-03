document.addEventListener('DOMContentLoaded', function() {
    const editProfileContent = document.getElementById('editProfileContent');
    const successPopup = document.getElementById('successPopup');
    const form = document.getElementById('editProfileForm');
    const isUserLoggedIn = localStorage.getItem('isUserLoggedIn');
    const loggedInUserName = localStorage.getItem('loggedInUserName') || "Pengguna";
    const userRole = localStorage.getItem('userRole') || "startup";
    const userEmailDemo = localStorage.getItem('demoUserEmail') || "email@example.com";
    const userPasswordDemo = localStorage.getItem('demoUserPassword') || "";

    const navAuthLinksDesktop = document.getElementById('navAuthLinksDesktop');
    const navUserSectionDesktop = document.getElementById('navUserSectionDesktop');
    const navAuthLinksMobile = document.getElementById('navAuthLinksMobile');
    const navUserSectionMobile = document.getElementById('navUserSectionMobile');
    const backToDashboardLink = document.getElementById('backToDashboardLink');
    const cancelEditButton = document.getElementById('cancelEditButton');

    const dashboardUrl = userRole === 'investor' ? 'dashboard-investor.html' : 'dashboard-startup.html';
    if(backToDashboardLink) backToDashboardLink.href = dashboardUrl;
    if(cancelEditButton) cancelEditButton.href = dashboardUrl;

    if (isUserLoggedIn !== 'true') {
        window.location.href = `auth.html#login?redirect=${encodeURIComponent(window.location.pathname + window.location.search)}`;
        return;
    }

    editProfileContent.classList.remove('opacity-0');
    editProfileContent.style.opacity = '1';

    if (isUserLoggedIn === 'true') {
        if(navAuthLinksDesktop) navAuthLinksDesktop.style.display = 'none';
        if(navUserSectionDesktop) {
            navUserSectionDesktop.innerHTML = `<a href="${dashboardUrl}" class="nav-link">Dashboard</a> <span class="nav-link">Halo, ${loggedInUserName}!</span><a href="#" id="logoutButtonDesktop" class="btn-secondary px-4 py-2 rounded-md text-sm">Logout</a>`;
            navUserSectionDesktop.classList.remove('hidden');
            navUserSectionDesktop.classList.add('flex', 'items-center');
            setupLogoutButton('logoutButtonDesktop');
        }

        if(navAuthLinksMobile) navAuthLinksMobile.style.display = 'none';
        if(navUserSectionMobile) {
            navUserSectionMobile.innerHTML = `<a href="${dashboardUrl}" class="block px-6 py-3 nav-link hover:bg-gray-700">Dashboard</a><span class="block px-6 py-3 nav-link">Halo, ${loggedInUserName}!</span><a href="#" id="logoutButtonMobile" class="block mx-4 my-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-center rounded-md font-semibold">Logout</a>`;
            navUserSectionMobile.classList.remove('hidden');
             setupLogoutButton('logoutButtonMobile');
        }
    }

    function setupLogoutButton(buttonId) {
        const logoutButton = document.getElementById(buttonId);
        if (logoutButton) {
            logoutButton.addEventListener('click', function(e) {
                e.preventDefault();
                localStorage.removeItem('isUserLoggedIn');
                localStorage.removeItem('loggedInUserName');
                localStorage.removeItem('userRole');
                localStorage.removeItem('demoUserEmail');
                localStorage.removeItem('demoUserPassword');
                window.location.href = 'index.html';
            });
        }
    }

    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if(mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
         document.addEventListener('click', function(event) {
            if (!mobileMenuButton.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }

    const currentYearFooter = document.getElementById('currentYearFooter');
    if(currentYearFooter) currentYearFooter.textContent = new Date().getFullYear();
    const profileFullNameInput = document.getElementById('profileFullName');
    const profileUsernameInput = document.getElementById('profileUsername');
    const profileEmailInput = document.getElementById('profileEmail');
    const profileRoleInput = document.getElementById('profileRole');
    const currentPasswordInput = document.getElementById('profileCurrentPassword');
    const newPasswordInput = document.getElementById('profileNewPassword');
    const confirmPasswordInput = document.getElementById('profileConfirmPassword');

    if(profileFullNameInput) profileFullNameInput.value = loggedInUserName;
    if(profileUsernameInput) profileUsernameInput.value = localStorage.getItem('demoUserUsername') || loggedInUserName.toLowerCase().replace(/\s+/g, '');
    if(profileEmailInput) profileEmailInput.value = userEmailDemo;
    if(profileRoleInput) profileRoleInput.value = userRole.charAt(0).toUpperCase() + userRole.slice(1);

    const requiredInputs = form.querySelectorAll('input[required]');

    function validateField(field) {
        let isValid = true;
        let errorMessageText = "";
        const errorDisplay = field.parentElement.querySelector('.error-message');

        field.classList.remove('error', 'success');
        if(errorDisplay) errorDisplay.style.display = 'none';

        if (field.hasAttribute('required') && field.value.trim() === '') {
            isValid = false;
            errorMessageText = "Kolom ini wajib diisi.";
        } else if (field.id === 'profileUsername' && (field.value.length < 3 || !/^[a-zA-Z0-9_]+$/.test(field.value))) {
            isValid = false;
            errorMessageText = "Username minimal 3 karakter, hanya huruf, angka, dan underscore.";
        }

        if (!isValid) {
            field.classList.add('error');
            if(errorDisplay) {
                errorDisplay.textContent = errorMessageText;
                errorDisplay.style.display = 'block';
            }
        } else if (field.value.trim() !== '') {
            field.classList.add('success');
        }
        return isValid;
    }

    requiredInputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
             if(input.classList.contains('error')){
                input.classList.remove('error');
                const errorDisplay = input.parentElement.querySelector('.error-message');
                if(errorDisplay) errorDisplay.style.display = 'none';
             }
        });
    });

    function validatePasswordFields() {
        let isValid = true;
        const currentPasswordError = currentPasswordInput.parentElement.querySelector('.error-message');
        const newPasswordError = newPasswordInput.parentElement.querySelector('.error-message');
        const confirmPasswordError = confirmPasswordInput.parentElement.querySelector('.error-message');

        [currentPasswordInput, newPasswordInput, confirmPasswordInput].forEach(f => f.classList.remove('error', 'success'));
        [currentPasswordError, newPasswordError, confirmPasswordError].forEach(e => e.style.display = 'none');

        if (newPasswordInput.value.trim() !== '' || confirmPasswordInput.value.trim() !== '') {
            if (currentPasswordInput.value !== userPasswordDemo) {
                currentPasswordInput.classList.add('error');
                currentPasswordError.textContent = "Kata sandi saat ini tidak cocok (Demo).";
                currentPasswordError.style.display = 'block';
                isValid = false;
            } else if (currentPasswordInput.value.trim() !== '') {
                 currentPasswordInput.classList.add('success');
            }

            if (newPasswordInput.value.length < 6) {
                newPasswordInput.classList.add('error');
                newPasswordError.textContent = "Kata sandi baru minimal 6 karakter.";
                newPasswordError.style.display = 'block';
                isValid = false;
            } else {
                newPasswordInput.classList.add('success');
            }

            if (confirmPasswordInput.value !== newPasswordInput.value) {
                confirmPasswordInput.classList.add('error');
                confirmPasswordError.textContent = "Konfirmasi kata sandi tidak cocok.";
                confirmPasswordError.style.display = 'block';
                isValid = false;
            } else if (confirmPasswordInput.value.trim() !== '') {
                confirmPasswordInput.classList.add('success');
            }
        }
        return isValid;
    }

    [currentPasswordInput, newPasswordInput, confirmPasswordInput].forEach(input => {
         input.addEventListener('input', () => {
             if(input.classList.contains('error')){
                input.classList.remove('error');
                const errorDisplay = input.parentElement.querySelector('.error-message');
                if(errorDisplay) errorDisplay.style.display = 'none';
             }
        });
    });


    form.addEventListener('submit', function(event) {
        event.preventDefault();
        let isFormValid = true;
        requiredInputs.forEach(input => {
            if (!validateField(input)) {
                isFormValid = false;
            }
        });

        if (newPasswordInput.value.trim() !== '' || confirmPasswordInput.value.trim() !== '') {
            if (!validatePasswordFields()) {
                isFormValid = false;
            }
        }


        if (isFormValid) {
            localStorage.setItem('loggedInUserName', profileFullNameInput.value);
            localStorage.setItem('demoUserUsername', profileUsernameInput.value);

            if (newPasswordInput.value.trim() !== '' && currentPasswordInput.value === userPasswordDemo) {
                localStorage.setItem('demoUserPassword', newPasswordInput.value);
            }

            console.log('Profil diperbarui:', {
                nama: profileFullNameInput.value,
                username: profileUsernameInput.value,
            });

            successPopup.textContent = `Profil berhasil diperbarui!`;
            successPopup.classList.add('show');

            setTimeout(() => {
                successPopup.classList.remove('show');
                window.location.href = dashboardUrl;
            }, 2000);

        } else {
            alert('Harap perbaiki semua error pada form sebelum menyimpan.');
        }
    });
});