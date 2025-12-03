document.addEventListener('DOMContentLoaded', function() {
            const authContainer = document.getElementById('authContainer');
            const formTitle = document.getElementById('formTitle');
            const loginForm = document.getElementById('loginForm');
            const signupForm = document.getElementById('signupForm');
            const showSignupBtn = document.getElementById('showSignup');
            const showLoginBtn = document.getElementById('showLogin');
            
            const loginFormElement = document.getElementById('loginFormElement');
            const signupFormElement = document.getElementById('signupFormElement');

            const loginUserInput = document.getElementById('loginUser');
            const loginPasswordInput = document.getElementById('loginPassword');
            const signupNameInput = document.getElementById('signupName');
            const signupUsernameInput = document.getElementById('signupUsername');
            const signupEmailInput = document.getElementById('signupEmail');
            const signupPasswordInput = document.getElementById('signupPassword');

            const successNotification = document.getElementById('successNotification');

            let isSignupMode = false;

            function showSuccessNotification(message) {
                successNotification.textContent = message;
                successNotification.classList.add('show');
                setTimeout(() => {
                    successNotification.classList.remove('show');
                }, 3000);
            }

            function displayForm(showSignup) {
                isSignupMode = showSignup;
                if (showSignup) {
                    authContainer.classList.add('signup-mode');
                    formTitle.textContent = 'Buat Akun Danain';
                    loginForm.classList.add('hidden-left');
                    signupForm.classList.remove('hidden', 'hidden-left');
                    loginFormElement.reset();
                    clearAllErrors(loginFormElement);
                } else {
                    authContainer.classList.remove('signup-mode');
                    formTitle.textContent = 'Masuk ke Danain';
                    signupForm.classList.add('hidden');
                    loginForm.classList.remove('hidden', 'hidden-left');
                    signupFormElement.reset();
                    clearAllErrors(signupFormElement);
                }
            }

            const currentHash = window.location.hash;
            if (currentHash === '#signup') {
                displayForm(true);
            } else { 
                displayForm(false);
            }

            window.addEventListener('hashchange', function() {
                const newHash = window.location.hash;
                if (newHash === '#signup') {
                    displayForm(true);
                } else {
                    displayForm(false);
                }
            });

            showSignupBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.hash = 'signup'; 
            });

            showLoginBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.hash = 'login'; 
            });
            
            function setErrorMessage(field, message, isRoleError = false) {
                const errorElement = isRoleError ? document.getElementById('roleError') : field.parentElement.querySelector('.error-message');
                if (!isRoleError) {
                    field.classList.add('error');
                    field.classList.remove('success');
                }
                errorElement.textContent = message;
                errorElement.classList.add('show');
            }

            function clearError(field, isRoleError = false) {
                const errorElement = isRoleError ? document.getElementById('roleError') : field.parentElement.querySelector('.error-message');
                 if (!isRoleError && field) { 
                    field.classList.remove('error');
                }
                if(errorElement) { 
                    errorElement.textContent = '';
                    errorElement.classList.remove('show');
                }
            }
            
            function clearAllErrors(form) {
                form.querySelectorAll('.input-field').forEach(input => clearError(input));
                clearError(null, true); 
            }

            function validateRequired(field, message = "Kolom ini wajib diisi.") {
                if (!field || field.value.trim() === '') { 
                    if(field) setErrorMessage(field, message);
                    return false;
                }
                clearError(field);
                if(field) field.classList.add('success');
                return true;
            }

            function validateEmailFormat(field, message = "Format email tidak valid.") {
                if (!validateRequired(field)) return false;
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(field.value)) {
                    setErrorMessage(field, message);
                    return false;
                }
                clearError(field);
                field.classList.add('success');
                return true;
            }
            
            function validateLoginUser(field, message = "Masukkan username atau email yang valid."){
                if (!validateRequired(field)) return false;
                clearError(field);
                field.classList.add('success');
                return true;
            }

            function validatePasswordLength(field, minLength = 6, message = `Kata sandi minimal ${minLength} karakter.`) {
                if (!validateRequired(field)) return false;
                if (field.value.length < minLength) {
                    setErrorMessage(field, message);
                    return false;
                }
                clearError(field);
                field.classList.add('success');
                return true;
            }

            function validateUsernameFormat(field, message = "Username minimal 3 karakter, hanya huruf, angka, dan underscore.") {
                 if (!validateRequired(field)) return false;
                const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
                if (!usernameRegex.test(field.value)) {
                    setErrorMessage(field, message);
                    return false;
                }
                clearError(field);
                field.classList.add('success');
                return true;
            }
            
            function validateRoleSelection() {
                const selectedRole = document.querySelector('input[name="userRole"]:checked');
                if (!selectedRole) {
                    setErrorMessage(null, "Silakan pilih peran Anda.", true);
                    return false;
                }
                clearError(null, true);
                return true;
            }

            loginUserInput.addEventListener('blur', () => validateLoginUser(loginUserInput));
            loginPasswordInput.addEventListener('blur', () => validatePasswordLength(loginPasswordInput));
            signupNameInput.addEventListener('blur', () => validateRequired(signupNameInput, "Nama lengkap wajib diisi."));
            signupUsernameInput.addEventListener('blur', () => validateUsernameFormat(signupUsernameInput));
            signupEmailInput.addEventListener('blur', () => validateEmailFormat(signupEmailInput));
            signupPasswordInput.addEventListener('blur', () => validatePasswordLength(signupPasswordInput));
            
            const roleInputs = document.querySelectorAll('input[name="userRole"]');
            roleInputs.forEach(input => input.addEventListener('change', () => clearError(null, true)));

            [loginUserInput, loginPasswordInput, signupNameInput, signupUsernameInput, signupEmailInput, signupPasswordInput].forEach(input => {
                input.addEventListener('focus', () => clearError(input));
            });

            function handleFormSubmit(formElement, isRegistration) {
                formElement.addEventListener('submit', function(e) {
                    e.preventDefault();
                    let isValid = true;
                    let userNameForStorage = "Pengguna Demo";
                    let userRoleForStorage = "startup"; 
                    let userPasswordForDemo = ""; 

                    if (!isRegistration) { // Login
                        isValid &= validateLoginUser(loginUserInput);
                        isValid &= validatePasswordLength(loginPasswordInput);
                        if(isValid) {
                            userNameForStorage = loginUserInput.value.includes('@') ? loginUserInput.value.split('@')[0] : loginUserInput.value;

                        }
                        userRoleForStorage = localStorage.getItem('userRole') || 'startup';
                    } else { 
                        isValid &= validateRequired(signupNameInput, "Nama lengkap wajib diisi.");
                        isValid &= validateUsernameFormat(signupUsernameInput);
                        isValid &= validateEmailFormat(signupEmailInput);
                        isValid &= validatePasswordLength(signupPasswordInput);
                        isValid &= validateRoleSelection(); 
                        if(isValid) {
                            userNameForStorage = signupNameInput.value;
                            userRoleForStorage = document.querySelector('input[name="userRole"]:checked').value;
                            userPasswordForDemo = signupPasswordInput.value; 
                        }
                    }

                    if (isValid) {
                        const btn = this.querySelector('.submit-btn');
                        const btnText = btn.querySelector('span');
                        if(btnText) btnText.style.opacity = '0';
                        btn.classList.add('loading');
                        
                        setTimeout(() => {
                            btn.classList.remove('loading');
                            if(btnText) btnText.style.opacity = '1';
                            
                            localStorage.setItem('isUserLoggedIn', 'true');
                            localStorage.setItem('loggedInUserName', userNameForStorage);
                            localStorage.setItem('userRole', userRoleForStorage);

                            if (isRegistration) {
                                localStorage.setItem('demoUserPassword', userPasswordForDemo);
                            }


                            const successMessage = isRegistration ? 'Pendaftaran berhasil!' : 'Login berhasil!';
                            showSuccessNotification(successMessage);
                            
                            const urlParams = new URLSearchParams(window.location.search);
                            const redirectUrl = urlParams.get('redirect');

                            setTimeout(() => {
                                if (redirectUrl) {
                                    window.location.href = decodeURIComponent(redirectUrl);
                                } else {
                                    if (userRoleForStorage === 'startup') {
                                        window.location.href = 'dashboard-startup.html';
                                    } else if (userRoleForStorage === 'investor') {
                                        window.location.href = 'dashboard-investor.html'; 
                                    } else {
                                        window.location.href = 'index.html'; 
                                    }
                                }
                            }, 1500); 
                            
                        }, 1500);
                    }
                });
            }

            handleFormSubmit(loginFormElement, false); 
            handleFormSubmit(signupFormElement, true);  
            
            document.getElementById('currentYear').textContent = new Date().getFullYear();
        });