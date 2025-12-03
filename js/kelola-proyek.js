document.addEventListener('DOMContentLoaded', function() {
    const manageProjectContent = document.getElementById('manageProjectContent');
    const successPopup = document.getElementById('successPopup');
    const addUpdateForm = document.getElementById('addUpdateForm');
    const projectNotFoundMessage = document.getElementById('projectNotFoundMessageManage');
    const projectManagementUI = document.getElementById('projectManagementUI');
    const managedProjectNameSpan = document.getElementById('managedProjectName');
    const previousUpdatesListDiv = document.getElementById('previousUpdatesList');
    const noUpdatesMessageP = document.getElementById('noUpdatesMessage');
    const updateProjectIdInput = document.getElementById('updateProjectId');

    const isUserLoggedIn = localStorage.getItem('isUserLoggedIn');
    const loggedInUserName = localStorage.getItem('loggedInUserName') || "Pengguna";
    const userRole = localStorage.getItem('userRole');

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
         alert("Hanya pengelola proyek yang dapat mengakses halaman ini. Anda akan diarahkan ke dashboard Anda.");
         window.location.href = dashboardUrl;
         return;
    }

    manageProjectContent.classList.remove('opacity-0');
    manageProjectContent.style.opacity = '1';

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
                localStorage.removeItem('demoUserUsername');
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

    const urlParams = new URLSearchParams(window.location.search);
    const projectIdToManage = parseInt(urlParams.get('id'));
    let myProjects = JSON.parse(localStorage.getItem('myProjects')) || [];
    const projectToManage = myProjects.find(p => p.id === projectIdToManage);

    if (projectToManage) {
        projectManagementUI.classList.remove('hidden');
        projectNotFoundMessage.classList.add('hidden');
        if(managedProjectNameSpan) managedProjectNameSpan.textContent = projectToManage.projectName || 'Proyek Tanpa Nama';
        if(updateProjectIdInput) updateProjectIdInput.value = projectIdToManage;
        renderUpdates(projectToManage.updates || []);
    } else {
        projectManagementUI.classList.add('hidden');
        projectNotFoundMessage.classList.remove('hidden');
    }

    function renderUpdates(updatesArray) {
        previousUpdatesListDiv.innerHTML = '';
        if (updatesArray.length > 0) {
            noUpdatesMessageP.classList.add('hidden');
            updatesArray.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
            updatesArray.forEach(update => {
                const updateElement = document.createElement('div');
                updateElement.className = 'update-item';
                updateElement.innerHTML = `
                    <p class="text-xs text-gray-500 mb-1">${new Date(update.tanggal).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                    <h4 class="font-semibold text-gray-200 mb-1">${update.judul}</h4>
                    <p class="text-sm text-gray-300 whitespace-pre-line">${update.deskripsi}</p>
                `;
                previousUpdatesListDiv.appendChild(updateElement);
            });
        } else {
            noUpdatesMessageP.classList.remove('hidden');
        }
    }

    const updateTitleInput = document.getElementById('updateTitle');
    const updateDescriptionInput = document.getElementById('updateDescription');

    function validateUpdateField(field) {
        let isValid = true;
        const errorDisplay = field.parentElement.querySelector('.error-message');
        field.classList.remove('error');
        if(errorDisplay) errorDisplay.style.display = 'none';

        if (field.value.trim() === '') {
            isValid = false;
            field.classList.add('error');
            if(errorDisplay) {
                errorDisplay.textContent = "Kolom ini wajib diisi.";
                errorDisplay.style.display = 'block';
            }
        }
        return isValid;
    }

    [updateTitleInput, updateDescriptionInput].forEach(input => {
        if(input) {
            input.addEventListener('blur', () => validateUpdateField(input));
            input.addEventListener('input', () => {
                if(input.classList.contains('error')){
                    input.classList.remove('error');
                    const errorDisplay = input.parentElement.querySelector('.error-message');
                    if(errorDisplay) errorDisplay.style.display = 'none';
                }
            });
        }
    });


    if (addUpdateForm) {
        addUpdateForm.addEventListener('submit', function(event) {
            event.preventDefault();
            let isFormValid = true;
            if(!validateUpdateField(updateTitleInput)) isFormValid = false;
            if(!validateUpdateField(updateDescriptionInput)) isFormValid = false;

            if (isFormValid && projectToManage) {
                const newUpdate = {
                    tanggal: new Date().toISOString(),
                    judul: updateTitleInput.value.trim(),
                    deskripsi: updateDescriptionInput.value.trim()
                };

                if (!projectToManage.updates) {
                    projectToManage.updates = [];
                }
                projectToManage.updates.push(newUpdate);

                const projectIndex = myProjects.findIndex(p => p.id === projectIdToManage);
                if (projectIndex > -1) {
                    myProjects[projectIndex] = projectToManage;
                    localStorage.setItem('myProjects', JSON.stringify(myProjects));
                }

                console.log('Update Baru Ditambahkan:', newUpdate);
                if(successPopup) {
                    successPopup.textContent = 'Update berhasil diposting!';
                    successPopup.classList.add('show');
                    setTimeout(() => {
                        successPopup.classList.remove('show');
                    }, 2000);
                }

                addUpdateForm.reset();
                renderUpdates(projectToManage.updates);

            } else if (!projectToManage) {
                alert('Gagal memposting: Proyek tidak ditemukan.');
            } else {
                // Tidak perlu
            }
        });
    }
});