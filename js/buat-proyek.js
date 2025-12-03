document.addEventListener('DOMContentLoaded', function() {
    const createProjectContent = document.getElementById('createProjectContent');
    const successPopup = document.getElementById('successPopup');

    const isUserLoggedIn = localStorage.getItem('isUserLoggedIn');
    const loggedInUserName = localStorage.getItem('loggedInUserName') || "Pengguna";
    const userRole = localStorage.getItem('userRole') || "startup"; // Asumsikan peran startup jika tidak ada

    const navAuthLinksDesktop = document.getElementById('navAuthLinksDesktop');
    const navUserSectionDesktop = document.getElementById('navUserSectionDesktop');
    const navAuthLinksMobile = document.getElementById('navAuthLinksMobile');
    const navUserSectionMobile = document.getElementById('navUserSectionMobile');

    const dashboardUrl = userRole === 'investor' ? 'dashboard-investor.html' : 'dashboard-startup.html';

    if (isUserLoggedIn !== 'true') {
        window.location.href = `auth.html#login?redirect=${encodeURIComponent(window.location.pathname + window.location.search)}`;
        return;
    }
    if (userRole !== 'startup') {
         alert("Hanya pengelola proyek yang dapat membuat proyek baru. Anda akan diarahkan ke dashboard Anda.");
         window.location.href = dashboardUrl;
         return;
    }

    createProjectContent.classList.remove('opacity-0');
    createProjectContent.style.opacity = '1';

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

    const form = document.getElementById('createProjectForm');
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');

    function validateField(field) {
        let isValid = true;
        let errorMessage = "";
        const errorDisplay = field.parentElement.querySelector('.error-message');

        field.classList.remove('error', 'success');
        if(errorDisplay) errorDisplay.style.display = 'none';

        if (field.hasAttribute('required') && field.value.trim() === '') {
            isValid = false;
            errorMessage = "Kolom ini wajib diisi.";
        } else if (field.type === 'url' && field.value.trim() !== '' && !/^https?:\/\/.+\..+/.test(field.value)) {
            isValid = false;
            errorMessage = "Format URL tidak valid.";
        } else if (field.type === 'number') {
            const min = parseFloat(field.min);
            const max = parseFloat(field.max);
            const value = parseFloat(field.value);
            if (field.hasAttribute('min') && value < min) {
                isValid = false;
                errorMessage = `Nilai minimal adalah ${min}.`;
            }
            if (field.hasAttribute('max') && value > max) {
                isValid = false;
                errorMessage = `Nilai maksimal adalah ${max}.`;
            }
        } else if (field.id === 'projectCategory' && field.value === '') {
             isValid = false;
             errorMessage = "Silakan pilih kategori proyek.";
        }


        if (!isValid) {
            field.classList.add('error');
            if(errorDisplay) {
                errorDisplay.textContent = errorMessage;
                errorDisplay.style.display = 'block';
            }
        } else if (field.value.trim() !== '') {
            field.classList.add('success');
        }
        return isValid;
    }

    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
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
        inputs.forEach(input => {
            if (!validateField(input)) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            const formData = new FormData(form);
            const projectData = {};
            formData.forEach((value, key) => {
                projectData[key] = value;
            });

            let myProjects = JSON.parse(localStorage.getItem('myProjects')) || [];
            projectData.id = Date.now();
            projectData.status = 'Menunggu Persetujuan';
            projectData.danaTerkumpul = 0;
            projectData.pemilikProyek = localStorage.getItem('loggedInUserName') || 'Pengguna Startup';

            myProjects.push(projectData);
            localStorage.setItem('myProjects', JSON.stringify(myProjects));

            console.log('Data Proyek Diajukan:', projectData);

            successPopup.textContent = `Proyek "${projectData.projectName}" berhasil diajukan dan akan ditinjau!`;
            successPopup.classList.add('show');

            setTimeout(() => {
                successPopup.classList.remove('show');
                window.location.href = 'dashboard-startup.html';
            }, 3000);

            form.reset();
            inputs.forEach(input => input.classList.remove('success', 'error'));

        } else {
            alert('Harap perbaiki semua error pada form sebelum mengajukan.');
        }
    });

    const saveDraftButton = document.getElementById('saveDraftButton');
    if(saveDraftButton){
        saveDraftButton.addEventListener('click', function(){
            alert('Fitur "Simpan sebagai Draf" akan segera hadir!');
        });
    }
});