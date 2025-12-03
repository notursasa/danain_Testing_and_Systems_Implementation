document.addEventListener('DOMContentLoaded', function() {
    const settingsContent = document.getElementById('settingsContent');
    const successPopup = document.getElementById('successPopup');

    const isUserLoggedIn = localStorage.getItem('isUserLoggedIn');
    const loggedInUserName = localStorage.getItem('loggedInUserName') || "Pengguna";
    const userRole = localStorage.getItem('userRole') || "startup";

    const navAuthLinksDesktop = document.getElementById('navAuthLinksDesktop');
    const navUserSectionDesktop = document.getElementById('navUserSectionDesktop');
    const navAuthLinksMobile = document.getElementById('navAuthLinksMobile');
    const navUserSectionMobile = document.getElementById('navUserSectionMobile');
    const backToDashboardLink = document.getElementById('backToDashboardLinkSettings');

    const dashboardUrl = userRole === 'investor' ? 'dashboard-investor.html' : 'dashboard-startup.html';
    if(backToDashboardLink) backToDashboardLink.href = dashboardUrl;


    if (isUserLoggedIn !== 'true') {
        window.location.href = `auth.html#login?redirect=${encodeURIComponent(window.location.pathname + window.location.search)}`;
        return;
    }

    settingsContent.classList.remove('opacity-0');
    settingsContent.style.opacity = '1';

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
                localStorage.removeItem('notificationPreferences');
                localStorage.removeItem('myProjects');
                localStorage.removeItem('myInvestments');
                localStorage.removeItem('wishlistedProjects');
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

    const emailNotifToggle = document.getElementById('emailNotifToggle');
    const appNotifToggle = document.getElementById('appNotifToggle');
    const newsletterToggle = document.getElementById('newsletterToggle');
    const saveNotifButton = document.getElementById('saveNotifPreferences');

    let notifPreferences = JSON.parse(localStorage.getItem('notificationPreferences')) || {
        email: true,
        app: true,
        newsletter: false
    };
    if(emailNotifToggle) emailNotifToggle.checked = notifPreferences.email;
    if(appNotifToggle) appNotifToggle.checked = notifPreferences.app;
    if(newsletterToggle) newsletterToggle.checked = notifPreferences.newsletter;

    if(saveNotifButton) {
        saveNotifButton.addEventListener('click', function() {
            notifPreferences.email = emailNotifToggle.checked;
            notifPreferences.app = appNotifToggle.checked;
            notifPreferences.newsletter = newsletterToggle.checked;
            localStorage.setItem('notificationPreferences', JSON.stringify(notifPreferences));

            if(successPopup) {
                successPopup.textContent = 'Preferensi notifikasi disimpan!';
                successPopup.classList.add('show');
                setTimeout(() => {
                    successPopup.classList.remove('show');
                }, 2000);
            }
            console.log("Preferensi Notifikasi Disimpan:", notifPreferences);
        });
    }

    const initiateDeleteAccountButton = document.getElementById('initiateDeleteAccountButton');
    const deleteAccountModal = document.getElementById('deleteAccountModal');
    const cancelDeleteAccountButton = document.getElementById('cancelDeleteAccountButton');
    const confirmDeleteAccountButton = document.getElementById('confirmDeleteAccountButton');

    if(initiateDeleteAccountButton && deleteAccountModal) {
        initiateDeleteAccountButton.addEventListener('click', function() {
            deleteAccountModal.classList.add('show');
        });
    }
    if(cancelDeleteAccountButton && deleteAccountModal) {
        cancelDeleteAccountButton.addEventListener('click', function() {
            deleteAccountModal.classList.remove('show');
        });
    }
    if(deleteAccountModal){
         deleteAccountModal.addEventListener('click', function(event){
            if(event.target === deleteAccountModal){
                deleteAccountModal.classList.remove('show');
            }
        });
    }

    if(confirmDeleteAccountButton && deleteAccountModal) {
        confirmDeleteAccountButton.addEventListener('click', function() {
            localStorage.removeItem('isUserLoggedIn');
            localStorage.removeItem('loggedInUserName');
            localStorage.removeItem('userRole');
            localStorage.removeItem('demoUserEmail');
            localStorage.removeItem('demoUserPassword');
            localStorage.removeItem('demoUserUsername');
            localStorage.removeItem('notificationPreferences');
            localStorage.removeItem('myProjects');
            localStorage.removeItem('myInvestments');
            localStorage.removeItem('wishlistedProjects');

            deleteAccountModal.classList.remove('show');
            if(successPopup) {
                successPopup.textContent = 'Akun Anda telah berhasil dihapus.';
                successPopup.classList.add('show');
                setTimeout(() => {
                    successPopup.classList.remove('show');
                    window.location.href = 'index.html';
                }, 3000);
            } else {
                 alert('Akun Anda telah berhasil dihapus.');
                 window.location.href = 'index.html';
            }
        });
    }
});