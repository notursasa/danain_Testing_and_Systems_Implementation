document.addEventListener('DOMContentLoaded', function() {
    const editProjectContent = document.getElementById('editProjectContent');
    const successPopup = document.getElementById('successPopup');
    const form = document.getElementById('editProjectForm');
    const projectNotFoundMessage = document.getElementById('projectNotFoundMessage');
    const deleteProjectButton = document.getElementById('deleteProjectButton');
    const deleteConfirmationModal = document.getElementById('deleteConfirmationModal');
    const cancelDeleteButton = document.getElementById('cancelDeleteButton');
    const confirmDeleteButton = document.getElementById('confirmDeleteButton');
    const deleteProjectNameSpan = document.getElementById('deleteProjectName');
    let currentEditingProjectId = null;
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
         alert("Hanya pengelola proyek yang dapat mengedit proyek. Anda akan diarahkan ke dashboard Anda.");
         window.location.href = dashboardUrl;
         return;
    }

    editProjectContent.classList.remove('opacity-0');
    editProjectContent.style.opacity = '1';

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

    const urlParams = new URLSearchParams(window.location.search);
    const projectIdToEdit = parseInt(urlParams.get('id'));
    currentEditingProjectId = projectIdToEdit;
    let myProjects = JSON.parse(localStorage.getItem('myProjects')) || [];
    const projectToEdit = myProjects.find(p => p.id === projectIdToEdit);

    if (projectToEdit) {
        form.classList.remove('hidden');
        projectNotFoundMessage.classList.add('hidden');
        document.getElementById('projectId').value = projectToEdit.id;
        document.getElementById('projectName').value = projectToEdit.projectName || '';
        document.getElementById('projectTagline').value = projectToEdit.projectTagline || '';
        document.getElementById('projectCategory').value = projectToEdit.projectCategory || '';
        document.getElementById('projectLocation').value = projectToEdit.projectLocation || '';
        document.getElementById('projectImageURL').value = projectToEdit.projectImageURL || '';
        document.getElementById('projectVideoURL').value = projectToEdit.projectVideoURL || '';
        document.getElementById('projectDescription').value = projectToEdit.projectDescription || '';
        document.getElementById('fundingTarget').value = projectToEdit.fundingTarget || '';
        document.getElementById('campaignDuration').value = projectToEdit.campaignDuration || '';
        document.getElementById('investmentScheme').value = projectToEdit.investmentScheme || '';
        document.getElementById('projectRisks').value = projectToEdit.projectRisks || '';
        document.getElementById('teamInfo').value = projectToEdit.teamInfo || '';
        document.getElementById('proposalLink').value = projectToEdit.proposalLink || '';
        document.getElementById('presentationLink').value = projectToEdit.presentationLink || '';

        if(deleteProjectNameSpan) deleteProjectNameSpan.textContent = projectToEdit.projectName || 'proyek ini';

    } else {
        form.classList.add('hidden');
        projectNotFoundMessage.classList.remove('hidden');
        if(deleteProjectButton) deleteProjectButton.style.display = 'none';
    }

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

        if (isFormValid && projectToEdit) {
            const formData = new FormData(form);
            projectToEdit.projectName = formData.get('projectName');
            projectToEdit.projectTagline = formData.get('projectTagline');
            projectToEdit.projectCategory = formData.get('projectCategory');
            projectToEdit.projectLocation = formData.get('projectLocation');
            projectToEdit.projectImageURL = formData.get('projectImageURL');
            projectToEdit.projectVideoURL = formData.get('projectVideoURL');
            projectToEdit.projectDescription = formData.get('projectDescription');
            projectToEdit.fundingTarget = formData.get('fundingTarget');
            projectToEdit.campaignDuration = formData.get('campaignDuration');
            projectToEdit.investmentScheme = formData.get('investmentScheme');
            projectToEdit.projectRisks = formData.get('projectRisks');
            projectToEdit.teamInfo = formData.get('teamInfo');
            projectToEdit.proposalLink = formData.get('proposalLink');
            projectToEdit.presentationLink = formData.get('presentationLink');

            const projectIndex = myProjects.findIndex(p => p.id === projectIdToEdit);
            if (projectIndex > -1) {
                myProjects[projectIndex] = projectToEdit;
                localStorage.setItem('myProjects', JSON.stringify(myProjects));
            }

            console.log('Data Proyek Diperbarui:', projectToEdit);
            successPopup.textContent = `Proyek "${projectToEdit.projectName}" berhasil diperbarui!`;
            successPopup.classList.add('show');

            setTimeout(() => {
                successPopup.classList.remove('show');
                window.location.href = 'dashboard-startup.html';
            }, 2000);

        } else if (!projectToEdit) {
             alert('Gagal menyimpan: Proyek tidak ditemukan.');
        } else {
            alert('Harap perbaiki semua error pada form sebelum menyimpan.');
        }
    });
    if (deleteProjectButton) {
        deleteProjectButton.addEventListener('click', function() {
            if (projectToEdit) {
                deleteConfirmationModal.classList.add('show');
            } else {
                alert('Proyek tidak ditemukan untuk dihapus.');
            }
        });
    }

    if (cancelDeleteButton) {
        cancelDeleteButton.addEventListener('click', function() {
            deleteConfirmationModal.classList.remove('show');
        });
    }

    if (confirmDeleteButton) {
        confirmDeleteButton.addEventListener('click', function() {
            if (currentEditingProjectId !== null) {
                myProjects = myProjects.filter(p => p.id !== currentEditingProjectId);
                localStorage.setItem('myProjects', JSON.stringify(myProjects));

                deleteConfirmationModal.classList.remove('show');
                successPopup.textContent = 'Proyek berhasil dihapus!';
                successPopup.classList.add('show');

                setTimeout(() => {
                    successPopup.classList.remove('show');
                    window.location.href = 'dashboard-startup.html';
                }, 2000);
            }
        });
    }
    if(deleteConfirmationModal){
        deleteConfirmationModal.addEventListener('click', function(event){
            if(event.target === deleteConfirmationModal){
                deleteConfirmationModal.classList.remove('show');
            }
        });
    }
});