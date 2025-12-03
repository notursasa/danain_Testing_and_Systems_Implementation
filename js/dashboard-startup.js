function formatRupiah(angka) { return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka); }
        function getStatusBadgeClass(status) {
            if (!status) return 'status-draf';
            switch (status.toLowerCase()) {
                case 'pendanaan aktif': return 'status-aktif';
                case 'draf': return 'status-draf';
                case 'menunggu persetujuan': return 'status-review';
                case 'terdanai': return 'status-terdanai';
                case 'selesai': return 'status-selesai';
                case 'ditolak': return 'status-ditolak';
                default: return 'status-draf';
            }
        }
        function renderMyProjectTableRow(proyek) {
            const targetDana = parseFloat(proyek.fundingTarget) || parseFloat(proyek.targetDana) || 0;
            const danaTerkumpul = parseFloat(proyek.danaTerkumpul) || 0;
            const persentaseTerkumpul = targetDana > 0 ? (danaTerkumpul / targetDana) * 100 : 0;
            const statusBadgeClass = getStatusBadgeClass(proyek.status);
            const namaProyek = proyek.projectName || proyek.namaProyek || 'Nama Proyek Tidak Ada';
            const kelolaProyekLink = `kelola-proyek.html?id=${proyek.id}`;
            const editProyekLink = `edit-proyek.html?id=${proyek.id}`;
            return `
                <tr class="table-row hover:bg-gray-800 transition-colors">
                    <td class="table-cell"><a href="detail-proyek.html?id=${proyek.id}" class="hover:text-gray-300 font-medium">${namaProyek}</a></td>
                    <td class="table-cell text-right">${formatRupiah(targetDana)}</td>
                    <td class="table-cell text-right">${persentaseTerkumpul.toFixed(0)}%</td>
                    <td class="table-cell"><div class="progress-bar-container-table w-full"><div class="progress-bar-fill-table" style="width: ${persentaseTerkumpul.toFixed(0)}%;"></div></div></td>
                    <td class="table-cell"><span class="status-badge ${statusBadgeClass}">${proyek.status || 'Draf'}</span></td>
                    <td class="table-cell">
                        <a href="detail-proyek.html?id=${proyek.id}" title="Lihat Detail" class="text-blue-400 hover:text-blue-300 mr-3"><i class="fas fa-eye"></i></a>
                        ${(proyek.status && (proyek.status.toLowerCase() === 'draf' || proyek.status.toLowerCase() === 'menunggu persetujuan')) ? `
                        <a href="${editProyekLink}" title="Edit Proyek" class="text-yellow-400 hover:text-yellow-300 mr-3"><i class="fas fa-edit"></i></a>
                        ` : `
                        <a href="${kelolaProyekLink}" title="Kelola Proyek" class="text-green-400 hover:text-green-300"><i class="fas fa-tasks"></i></a>
                        `}
                    </td>
                </tr>
            `;
        }

        function updateNotificationBadgeInSidebar() {
            const sidebarNotificationBadge = document.getElementById('sidebarNotificationBadge');
            if (!sidebarNotificationBadge) return;
            const notifications = JSON.parse(localStorage.getItem('userNotifications')) || [];
            const unreadCount = notifications.filter(n => !n.isRead).length;
            if (unreadCount > 0) {
                sidebarNotificationBadge.textContent = unreadCount;
                sidebarNotificationBadge.classList.remove('hidden');
            } else {
                sidebarNotificationBadge.classList.add('hidden');
            }
        }

        document.addEventListener('DOMContentLoaded', function() {
            const dashboardContent = document.getElementById('dashboardContent');
            const welcomeMessage = document.getElementById('welcomeMessage');
            const sidebar = document.getElementById('sidebar');
            const sidebarToggle = document.getElementById('sidebarToggle');

            const isUserLoggedIn = localStorage.getItem('isUserLoggedIn');
            const loggedInUserName = localStorage.getItem('loggedInUserName') || "Pengguna Startup"; 
            const userRole = localStorage.getItem('userRole');

            if (isUserLoggedIn !== 'true' || userRole !== 'startup') {
                const redirectParam = userRole !== 'startup' && isUserLoggedIn === 'true' 
                                    ? (userRole === 'investor' ? 'dashboard-investor.html' : 'index.html') 
                                    : `auth.html#login?redirect=${encodeURIComponent(window.location.pathname + window.location.search)}`;
                if (userRole !== 'startup' && isUserLoggedIn === 'true') {
                    alert("Hanya pengelola proyek yang dapat mengakses dashboard ini. Anda akan diarahkan.");
                }
                window.location.href = redirectParam;
                return;
            }
            
            dashboardContent.classList.remove('opacity-0');
            dashboardContent.style.opacity = '1';
            if(welcomeMessage) welcomeMessage.textContent = `Welcome Back, ${loggedInUserName}!`;

            const userNameSidebar = document.getElementById('userNameSidebar');
            if(userNameSidebar) userNameSidebar.textContent = loggedInUserName;
            const logoutButtonSidebar = document.getElementById('logoutButtonSidebar');
            if(logoutButtonSidebar) {
                 logoutButtonSidebar.addEventListener('click', function(e) {
                    e.preventDefault();
                     ['isUserLoggedIn', 'loggedInUserName', 'userRole', 'demoUserEmail', 
                         'demoUserPassword', 'demoUserUsername', 'notificationPreferences', 
                         'myProjects', 'myInvestments', 'wishlistedProjects', 'userNotifications'].forEach(item => localStorage.removeItem(item));
                    window.location.href = 'index.html';
                });
            }

            if (sidebarToggle && sidebar) {
                sidebarToggle.addEventListener('click', function() { sidebar.classList.toggle('-translate-x-full'); });
                document.addEventListener('click', function(event) {
                    if (!sidebar.contains(event.target) && !sidebarToggle.contains(event.target) && !sidebar.classList.contains('-translate-x-full') && window.innerWidth < 1024) {
                        sidebar.classList.add('-translate-x-full');
                    }
                });
            }
            
            document.querySelectorAll('aside a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    if (window.innerWidth < 1024 && sidebar) { sidebar.classList.add('-translate-x-full'); }
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        document.querySelector('.main-content-area').scrollTo({ top: targetElement.offsetTop - 20, behavior: 'smooth' });
                    }
                });
            });

            const totalProjectsStat = document.getElementById('totalProjectsStat');
            const avgFundProgressStat = document.getElementById('avgFundProgressStat');
            const investorEngagedStat = document.getElementById('investorEngagedStat');
            const totalProjectsChange = document.getElementById('totalProjectsChange');
            const avgFundProgressChange = document.getElementById('avgFundProgressChange');
            const investorEngagedChange = document.getElementById('investorEngagedChange');

            const myStoredProjects = JSON.parse(localStorage.getItem('myProjects')) || [];
            const projectsToDisplay = myStoredProjects;

            if(totalProjectsStat) totalProjectsStat.textContent = projectsToDisplay.length;
            if(totalProjectsChange) totalProjectsChange.innerHTML = `<i class="fas fa-sync-alt text-blue-500 mr-1"></i>${projectsToDisplay.length} proyek Anda`;
            
            let totalPercentage = 0;
            const activeOrFundedProjects = projectsToDisplay.filter(p => {
                const status = (p.status || '').toLowerCase();
                return (status === 'pendanaan aktif' || status === 'terdanai') && (parseFloat(p.fundingTarget) || parseFloat(p.targetDana) || 0) > 0;
            });

            if (activeOrFundedProjects.length > 0) {
                activeOrFundedProjects.forEach(p => {
                    const target = parseFloat(p.fundingTarget) || parseFloat(p.targetDana) || 1;
                    const terkumpul = parseFloat(p.danaTerkumpul) || 0;
                    totalPercentage += (terkumpul / target) * 100;
                });
                const avgProgress = totalPercentage / activeOrFundedProjects.length;
                if(avgFundProgressStat) avgFundProgressStat.textContent = `${avgProgress.toFixed(0)}%`;
                if(avgFundProgressChange) avgFundProgressChange.innerHTML = `<i class="fas fa-chart-pie text-green-500 mr-1"></i>Dari ${activeOrFundedProjects.length} proyek aktif/terdanai`;
            } else {
                if(avgFundProgressStat) avgFundProgressStat.textContent = `0%`;
                if(avgFundProgressChange) avgFundProgressChange.innerHTML = `<i class="fas fa-info-circle text-gray-500 mr-1"></i>Belum ada proyek aktif/terdanai`;
            }

            if(investorEngagedStat) investorEngagedStat.textContent = Math.floor(Math.random() * 20) + 5; 
            if(investorEngagedChange) investorEngagedChange.innerHTML = `<i class="fas fa-users text-purple-500 mr-1"></i>Estimasi platform`;

            const myProjectsTableBody = document.getElementById('myProjectsTableBody');
            const loadingMyProjects = document.getElementById('loadingMyProjects');
            const noMyProjects = document.getElementById('noMyProjects');

            if (myProjectsTableBody && loadingMyProjects && noMyProjects) {
                myProjectsTableBody.innerHTML = '';
                if (projectsToDisplay.length > 0) {
                    projectsToDisplay.sort((a,b) => (b.id || 0) - (a.id || 0)); 
                    projectsToDisplay.forEach(proyek => {
                        myProjectsTableBody.innerHTML += renderMyProjectTableRow(proyek);
                    });
                    if(loadingMyProjects.parentElement) loadingMyProjects.parentElement.removeChild(loadingMyProjects);
                    noMyProjects.classList.add('hidden');
                } else {
                     if(loadingMyProjects.parentElement) loadingMyProjects.parentElement.removeChild(loadingMyProjects);
                    noMyProjects.classList.remove('hidden');
                }
            }
            updateNotificationBadgeInSidebar();
        });