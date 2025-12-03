const topPlatformProjectsData = [ 
            { id: 2, namaProyek: 'Kopi Organik Desa Lestari', targetDana: 120000000, gambarProyek: 'https://placehold.co/80x80/0F2138/64FFDA?text=Kopi' },
            { id: 4, namaProyek: 'MindWell App', targetDana: 180000000, gambarProyek: 'https://placehold.co/80x80/0F2138/64FFDA?text=Mind' },
            { id: 8, namaProyek: 'EcoResidences Bali', targetDana: 1200000000, gambarProyek: 'https://placehold.co/80x80/0F2138/64FFDA?text=Bali' }
        ];
        const semuaProyekDataUntukWishlist = [ 
            { id: 1, namaProyek: 'EduTech AI Masa Depan', gambarProyek: 'https://placehold.co/60x60/0F2138/64FFDA?text=Edu', kategori: 'Teknologi' },
            { id: 2, namaProyek: 'Kopi Organik Desa Lestari', gambarProyek: 'https://placehold.co/60x60/0F2138/64FFDA?text=Kopi', kategori: 'Pertanian' },
            { id: 3, namaProyek: 'Fashion Ramah Lingkungan', gambarProyek: 'https://placehold.co/60x60/0F2138/64FFDA?text=Eco', kategori: 'Fashion' },
            { id: 4, namaProyek: 'Aplikasi Kesehatan Mental Terpadu', gambarProyek: 'https://placehold.co/60x60/0F2138/64FFDA?text=Mind', kategori: 'Kesehatan' },
            { id: 5, namaProyek: 'Rumah Belajar Anak Pesisir', gambarProyek: 'https://placehold.co/60x60/0F2138/64FFDA?text=Edu2', kategori: 'Pendidikan' },
            { id: 6, namaProyek: 'Energi Terbarukan Komunitas', gambarProyek: 'https://placehold.co/60x60/0F2138/64FFDA?text=Energi', kategori: 'Sosial' },
            { id: 7, namaProyek: 'Startup Agrikultur Cerdas', gambarProyek: 'https://placehold.co/60x60/0F2138/64FFDA?text=Agro', kategori: 'Teknologi' },
            { id: 8, namaProyek: 'Pengembangan Properti Hijau', gambarProyek: 'https://placehold.co/60x60/0F2138/64FFDA?text=Prop', kategori: 'Properti' }
        ];

        function formatRupiah(angka) { return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka); }
        function getStatusBadgeClass(status) {
            if (!status) return 'status-draf';
            switch (status.toLowerCase()) {
                case 'pendanaan aktif': return 'status-aktif';
                case 'terdanai': return 'status-terdanai';
                case 'selesai': return 'status-selesai';
                default: return 'status-draf';
            }
        }

        function renderInvestmentRow(investasi) {
            const statusBadgeClass = getStatusBadgeClass(investasi.statusProyekSaatInvestasi);
            return `
                <tr class="table-row-investor hover:bg-gray-800 transition-colors">
                    <td class="table-cell-investor"><a href="detail-proyek.html?id=${investasi.projectId}" class="hover:text-gray-300 font-medium">${investasi.projectName}</a></td>
                    <td class="table-cell-investor text-right">${formatRupiah(investasi.amountInvested)}</td>
                    <td class="table-cell-investor"><span class="status-badge ${statusBadgeClass}">${investasi.statusProyekSaatInvestasi}</span></td>
                    <td class="table-cell-investor">${new Date(investasi.investmentDate).toLocaleDateString('id-ID', {day:'2-digit', month:'short', year:'numeric'})}</td>
                    <td class="table-cell-investor text-center"><a href="detail-proyek.html?id=${investasi.projectId}" title="Lihat Detail Proyek" class="text-blue-400 hover:text-blue-300"><i class="fas fa-eye"></i></a></td>
                </tr>
            `;
        }
        function renderTopProjectCardInvestor(proyek) {
            return `
                <a href="detail-proyek.html?id=${proyek.id}" class="top-project-card block">
                    <img src="${proyek.gambarProyek}" alt="${proyek.namaProyek}" onerror="this.onerror=null;this.src='https://placehold.co/80x80/0F2138/1E2D3D?text=Error';">
                    <div><h4 class="font-medium text-gray-200 text-sm leading-tight">${proyek.namaProyek}</h4><p class="text-xs text-gray-400">Target: ${formatRupiah(proyek.targetDana)}</p></div>
                </a>
            `;
        }
        function renderWishlistedProjectCard(proyek) {
            return `
                <div class="wishlist-item-card">
                    <div class="flex items-center gap-3">
                        <img src="${proyek.gambarProyek || 'https://placehold.co/60x60/0F2138/1E2D3D?text=Img'}" alt="${proyek.namaProyek}" class="w-12 h-12 object-cover rounded-md">
                        <div>
                            <a href="detail-proyek.html?id=${proyek.id}" class="font-semibold text-gray-100 hover:text-gray-300 text-sm leading-tight">${proyek.namaProyek}</a>
                            <p class="text-xs text-gray-400">${proyek.kategori || 'N/A'}</p>
                        </div>
                    </div>
                    <button class="btn-remove-wishlist" data-project-id="${proyek.id}" title="Hapus dari Wishlist">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
        }
        
        function updateNotificationBadgeInSidebarInvestor() {
            const sidebarNotificationBadge = document.getElementById('sidebarNotificationBadgeInvestor');
            if (!sidebarNotificationBadge) return;

            const notifications = JSON.parse(localStorage.getItem('userNotifications')) || [];
            const investorNotifications = notifications.filter(n => 
                n.type === 'new_update' ||
                n.type === 'new_investment_startup' || 
                n.type === 'general' || 
                (n.type === 'project_funded' && wishlistedProjectIds.includes(n.projectId)) 
            );
            const unreadCount = investorNotifications.filter(n => !n.isRead).length;

            if (unreadCount > 0) {
                sidebarNotificationBadge.textContent = unreadCount;
                sidebarNotificationBadge.classList.remove('hidden');
            } else {
                sidebarNotificationBadge.classList.add('hidden');
            }
        }


        document.addEventListener('DOMContentLoaded', function() {
            const dashboardContent = document.getElementById('dashboardContentInvestor');
            const welcomeMessage = document.getElementById('welcomeMessageInvestor');
            const sidebar = document.getElementById('sidebar');
            const sidebarToggle = document.getElementById('sidebarToggle');

            const isUserLoggedIn = localStorage.getItem('isUserLoggedIn');
            const loggedInUserName = localStorage.getItem('loggedInUserName') || "Investor Hebat"; 
            const userRole = localStorage.getItem('userRole');

            if (isUserLoggedIn !== 'true' || userRole !== 'investor') {
                const redirectParam = userRole !== 'investor' && isUserLoggedIn === 'true' 
                                    ? (userRole === 'startup' ? 'dashboard-startup.html' : 'index.html') 
                                    : `auth.html#login?redirect=${encodeURIComponent(window.location.pathname + window.location.search)}`;
                if (userRole !== 'investor' && isUserLoggedIn === 'true') {
                    alert("Hanya investor yang dapat mengakses dashboard ini. Anda akan diarahkan.");
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

            const myInvestments = JSON.parse(localStorage.getItem('myInvestments')) || [];

            const totalInvestmentAmountEl = document.getElementById('totalInvestmentAmount');
            const totalInvestedProjectsSummaryEl = document.getElementById('totalInvestedProjectsSummary');
            let totalInvestedVal = 0;
            myInvestments.forEach(inv => totalInvestedVal += inv.amountInvested);
            if(totalInvestmentAmountEl) totalInvestmentAmountEl.textContent = formatRupiah(totalInvestedVal);
            if(totalInvestedProjectsSummaryEl) totalInvestedProjectsSummaryEl.textContent = myInvestments.length;

            const statTotalInvestedEl = document.getElementById('statTotalInvested');
            const statAvgFundProgressEl = document.getElementById('statAvgFundProgress');
            if(statTotalInvestedEl) statTotalInvestedEl.textContent = myInvestments.length;
            if(statAvgFundProgressEl) statAvgFundProgressEl.textContent = `${myInvestments.length > 0 ? Math.floor(Math.random() * 40) + 30 : 0}%`; 
            if(document.getElementById('statTotalInvestedChange')) document.getElementById('statTotalInvestedChange').innerHTML = `<i class="fas fa-history text-blue-400 mr-1"></i> Berdasarkan investasi Anda`;
            if(document.getElementById('statAvgFundProgressChange')) document.getElementById('statAvgFundProgressChange').innerHTML = `<i class="fas fa-info-circle text-gray-500 mr-1"></i> Estimasi platform`;

            const topProjectsListEl = document.getElementById('topProjectsListInvestor');
            if(topProjectsListEl) {
                topProjectsListEl.innerHTML = '';
                if(topPlatformProjectsData.length > 0){
                    topPlatformProjectsData.slice(0,3).forEach(proj => {
                        topProjectsListEl.innerHTML += renderTopProjectCardInvestor(proj);
                    });
                } else {
                    topProjectsListEl.innerHTML = '<p class="text-gray-400 text-sm">Tidak ada proyek unggulan.</p>';
                }
            }

            const myInvestmentsTableBodyEl = document.getElementById('myInvestmentsTableBody');
            const loadingMyInvestmentsEl = document.getElementById('loadingMyInvestments');
            const noMyInvestmentsEl = document.getElementById('noMyInvestments');

            if (myInvestmentsTableBodyEl && loadingMyInvestmentsEl && noMyInvestmentsEl) {
                myInvestmentsTableBodyEl.innerHTML = '';
                if (myInvestments.length > 0) {
                    myInvestments.forEach(inv => {
                        myInvestmentsTableBodyEl.innerHTML += renderInvestmentRow(inv);
                    });
                    if(loadingMyInvestmentsEl.parentElement) loadingMyInvestmentsEl.parentElement.removeChild(loadingMyInvestmentsEl);
                    noMyInvestmentsEl.classList.add('hidden');
                } else {
                    if(loadingMyInvestmentsEl.parentElement) loadingMyInvestmentsEl.parentElement.removeChild(loadingMyInvestmentsEl);
                    noMyInvestmentsEl.classList.remove('hidden');
                }
            }
            
            const wishlistedProjectsContainer = document.getElementById('wishlistedProjectsContainer');
            const loadingWishlist = document.getElementById('loadingWishlist');
            const noWishlistedProjects = document.getElementById('noWishlistedProjects');
            let wishlistedProjectIds = JSON.parse(localStorage.getItem('wishlistedProjects')) || [];

            function loadWishlistedProjects() {
                if (!wishlistedProjectsContainer || !loadingWishlist || !noWishlistedProjects) return;
                wishlistedProjectsContainer.innerHTML = ''; 
                const wishlistedProjectDetails = [];
                if (wishlistedProjectIds.length > 0) {
                    wishlistedProjectIds.forEach(id => {
                        const projectDetail = semuaProyekDataUntukWishlist.find(p => p.id === id) || (JSON.parse(localStorage.getItem('myProjects')) || []).find(p => p.id === id);
                        if (projectDetail) { wishlistedProjectDetails.push(projectDetail); }
                    });
                }
                if (wishlistedProjectDetails.length > 0) {
                    wishlistedProjectDetails.forEach(proj => { wishlistedProjectsContainer.innerHTML += renderWishlistedProjectCard(proj); });
                    loadingWishlist.classList.add('hidden');
                    noWishlistedProjects.classList.add('hidden');
                } else {
                    loadingWishlist.classList.add('hidden');
                    noWishlistedProjects.classList.remove('hidden');
                }
                wishlistedProjectsContainer.querySelectorAll('.btn-remove-wishlist').forEach(button => {
                    button.addEventListener('click', function() {
                        const projectIdToRemove = parseInt(this.dataset.projectId);
                        wishlistedProjectIds = wishlistedProjectIds.filter(id => id !== projectIdToRemove);
                        localStorage.setItem('wishlistedProjects', JSON.stringify(wishlistedProjectIds));
                        loadWishlistedProjects(); 
                        alert(`Proyek ID ${projectIdToRemove} dihapus dari wishlist.`);
                    });
                });
            }
            loadWishlistedProjects();

            document.querySelectorAll('.category-filter-btn').forEach(button => {
                button.addEventListener('click', function() {
                    document.querySelectorAll('.category-filter-btn').forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                });
            });
            updateNotificationBadgeInSidebarInvestor();
        });