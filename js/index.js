const demoFeaturedProjects = [
            { id: 1, namaProyek: 'EduTech AI (Demo Unggulan)', deskripsiSingkat: 'Platform AI untuk belajar...', targetDana: 250000000, danaTerkumpul: 162500000, gambarProyek: 'https://placehold.co/600x400/173A5E/64FFDA?text=EduTech+AI', kategori: 'Teknologi', pemilikProyek: 'Tim Inovasi Edu', sisaHari: 30, lokasi: 'Jakarta', status: 'Pendanaan Aktif' },
            { id: 2, namaProyek: 'Kopi Organik (Demo Unggulan)', deskripsiSingkat: 'Kopi berkualitas dari petani lokal...', targetDana: 120000000, danaTerkumpul: 48000000, gambarProyek: 'https://placehold.co/600x400/173A5E/64FFDA?text=Kopi+Organik', kategori: 'Pertanian', pemilikProyek: 'Komunitas Desa Lestari', sisaHari: 45, lokasi: 'Bandung', status: 'Pendanaan Aktif' },
            { id: 3, namaProyek: 'Eco Fashion (Demo Unggulan)', deskripsiSingkat: 'Fashion berkelanjutan dan etis.', targetDana: 300000000, danaTerkumpul: 225000000, gambarProyek: 'https://placehold.co/600x400/173A5E/64FFDA?text=Eco+Fashion', kategori: 'Fashion', pemilikProyek: 'GreenStyle Co.', sisaHari: 60, lokasi: 'Surabaya', status: 'Terdanai' },
            { id: 4, namaProyek: 'MindWell App (Demo Unggulan)', deskripsiSingkat: 'Akses mudah ke layanan kesehatan mental.', targetDana: 180000000, danaTerkumpul: 90000000, gambarProyek: 'https://placehold.co/600x400/173A5E/64FFDA?text=MindWell', kategori: 'Kesehatan', pemilikProyek: 'Sehat Jiwa ID', sisaHari: 25, lokasi: 'Yogyakarta', status: 'Pendanaan Aktif' }
        ];

        function formatRupiah(angka) {
            return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
        }

        function renderHomepageProjectCard(proyek) {
            const nama = proyek.projectName || proyek.namaProyek || 'Nama Proyek Tidak Ada';
            const deskripsi = proyek.projectDescription || proyek.deskripsiSingkat || 'Deskripsi tidak tersedia.';
            const target = parseFloat(proyek.fundingTarget) || parseFloat(proyek.targetDana) || 0;
            const terkumpul = parseFloat(proyek.danaTerkumpul) || 0;
            const gambar = proyek.projectImageURL || proyek.gambarProyek || 'https://placehold.co/600x400/173A5E/64FFDA?text=Gambar+Error';
            const kategori = proyek.projectCategory || proyek.kategori || 'Lainnya';
            const pemilik = proyek.pemilikProyek || 'Tim Proyek';
            const durasi = proyek.campaignDuration || proyek.sisaHari || 0;
            const lokasi = proyek.projectLocation || proyek.lokasi || 'N/A';

            const persentaseTerkumpul = target > 0 ? (terkumpul / target) * 100 : 0;
            return `
                <div class="recommendation-card rounded-lg overflow-hidden flex flex-col">
                    <a href="detail-proyek.html?id=${proyek.id}" class="block hover:opacity-90 transition-opacity">
                        <img src="${gambar}" alt="Gambar Proyek ${nama}" class="w-full h-48 object-cover" onerror="this.onerror=null;this.src='https://placehold.co/600x400/173A5E/64FFDA?text=Gambar+Error';">
                    </a>
                    <div class="p-5 flex flex-col flex-grow">
                        <div class="flex justify-between items-start mb-2">
                             <h3 class="text-lg font-semibold text-gray-100 leading-tight">
                                <a href="detail-proyek.html?id=${proyek.id}" class="hover:text-gray-300 transition-colors">${nama}</a>
                            </h3>
                            <span class="category-tag whitespace-nowrap">${kategori}</span>
                        </div>
                        <p class="text-gray-400 text-sm mb-3 flex-grow">${deskripsi.substring(0, 80)}${deskripsi.length > 80 ? '...' : ''}</p>
                        <div class="text-xs text-gray-500 mb-1">Lokasi: ${lokasi}</div>
                        <div class="mb-3 mt-auto">
                            <div class="flex justify-between text-xs text-gray-300 mb-1">
                                <span>${formatRupiah(terkumpul)}</span>
                                <span class="font-semibold">${formatRupiah(target)}</span>
                            </div>
                            <div class="w-full bg-gray-600 rounded-full h-2">
                                <div class="h-2 rounded-full" style="width: ${persentaseTerkumpul.toFixed(0)}%; background-color: #64FFDA;"></div>
                            </div>
                            <div class="flex justify-between text-xs text-gray-500 mt-1">
                                <span>${persentaseTerkumpul.toFixed(0)}% terkumpul</span>
                                <span>${durasi} hari lagi</span>
                            </div>
                        </div>
                        <a href="detail-proyek.html?id=${proyek.id}" class="btn-primary w-full text-center py-2 px-4 rounded-md text-sm font-semibold block mt-2">
                            Lihat Detail
                        </a>
                    </div>
                </div>
            `;
        }
        
        const homepageProjectListContainer = document.getElementById('homepageProjectList');
        const loadingHomepageProjectsMessage = document.getElementById('loadingHomepageProjects');

        function displayHomepageProjects() {
            if (homepageProjectListContainer && loadingHomepageProjectsMessage) {
                homepageProjectListContainer.innerHTML = ''; 
                
                let projectsToDisplay = [];
                const storedProjects = JSON.parse(localStorage.getItem('myProjects')) || [];
                const publiclyVisibleStoredProjects = storedProjects.filter(p => 
                    p.status && (p.status.toLowerCase() === 'pendanaan aktif' || p.status.toLowerCase() === 'terdanai')
                );

                if (publiclyVisibleStoredProjects.length > 0) {
                    projectsToDisplay = publiclyVisibleStoredProjects.sort((a,b) => (b.id || 0) - (a.id || 0)).slice(0, 4);
                } else if (demoFeaturedProjects.length > 0) {
                    projectsToDisplay = demoFeaturedProjects.slice(0, 4);
                }

                if (projectsToDisplay.length > 0) {
                    projectsToDisplay.forEach(proyek => {
                        homepageProjectListContainer.innerHTML += renderHomepageProjectCard(proyek);
                    });
                    loadingHomepageProjectsMessage.classList.add('hidden');
                } else {
                    loadingHomepageProjectsMessage.textContent = 'Tidak ada proyek unggulan untuk ditampilkan saat ini.';
                    loadingHomepageProjectsMessage.classList.remove('hidden'); 
                }
            }
        }

        document.addEventListener('DOMContentLoaded', function() {
            const isUserLoggedIn = localStorage.getItem('isUserLoggedIn');
            const loggedInUserName = localStorage.getItem('loggedInUserName') || "Pengguna";
            const userRole = localStorage.getItem('userRole') || 'startup'; 

            const navAuthLinksDesktop = document.getElementById('navAuthLinksDesktop');
            const navUserSectionDesktop = document.getElementById('navUserSectionDesktop');
            
            const navAuthLinksMobile = document.getElementById('navAuthLinksMobile');
            const navUserSectionMobile = document.getElementById('navUserSectionMobile');

            const heroAjukanPendanaanButton = document.getElementById('heroAjukanPendanaan');
            const dashboardLink = document.getElementById('dashboardLink'); 
            const mobileDashboardLink = document.getElementById('mobileDashboardLink'); 

            const dashboardUrl = userRole === 'investor' ? 'dashboard-investor.html' : 'dashboard-startup.html';
            if(dashboardLink) dashboardLink.href = dashboardUrl;
            if(mobileDashboardLink) mobileDashboardLink.href = dashboardUrl;

            if (isUserLoggedIn === 'true') {
                if(navAuthLinksDesktop) navAuthLinksDesktop.style.display = 'none';
                if(navUserSectionDesktop) {
                    navUserSectionDesktop.innerHTML = `
                        <a href="${dashboardUrl}" class="nav-link mr-4 text-sm">Dashboard Saya</a>
                        <span class="nav-link mr-3 text-sm">Halo, ${loggedInUserName}!</span>
                        <a href="#" id="logoutButtonDesktop" class="btn-secondary px-3 py-1.5 rounded-md text-xs">Logout</a>
                    `;
                    navUserSectionDesktop.classList.remove('hidden');
                    navUserSectionDesktop.classList.add('flex', 'items-center');
                }

                if(navAuthLinksMobile) navAuthLinksMobile.style.display = 'none';
                if(navUserSectionMobile) {
                    navUserSectionMobile.innerHTML = `
                        <a href="${dashboardUrl}" class="block px-6 py-3 nav-link hover:bg-gray-700">Dashboard Saya</a>
                        <span class="block px-6 py-3 text-gray-300">Halo, ${loggedInUserName}!</span>
                        <a href="#" id="logoutButtonMobile" class="block mx-4 my-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-center rounded-md font-semibold">Logout</a>
                    `;
                    navUserSectionMobile.classList.remove('hidden');
                    navUserSectionMobile.classList.add('border-t', 'border-gray-700', 'pt-2');
                }
                if(heroAjukanPendanaanButton) heroAjukanPendanaanButton.href = userRole === 'startup' ? 'buat-proyek.html' : 'auth.html#signup';
            } else {
                if(navAuthLinksDesktop) navAuthLinksDesktop.style.display = 'flex';
                if(navUserSectionDesktop) navUserSectionDesktop.classList.add('hidden');
                if(navAuthLinksMobile) navAuthLinksMobile.style.display = 'block'; 
                if(navUserSectionMobile) navUserSectionMobile.classList.add('hidden');
                if(heroAjukanPendanaanButton) heroAjukanPendanaanButton.href = 'auth.html#signup';
            }

            function handleLogout(e) {
                e.preventDefault();
                localStorage.removeItem('isUserLoggedIn');
                localStorage.removeItem('loggedInUserName');
                localStorage.removeItem('userRole');
                window.location.reload(); 
            }

            const logoutButtonDesktop = document.getElementById('logoutButtonDesktop');
            if(logoutButtonDesktop) logoutButtonDesktop.addEventListener('click', handleLogout);
            const logoutButtonMobile = document.getElementById('logoutButtonMobile');
            if(logoutButtonMobile) logoutButtonMobile.addEventListener('click', handleLogout);

            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenuButton && mobileMenu) {
                mobileMenuButton.addEventListener('click', () => {
                    mobileMenu.classList.toggle('hidden');
                });
            }

            const currentYearElement = document.getElementById('currentYear');
            if (currentYearElement) {
                currentYearElement.textContent = new Date().getFullYear();
            }
            
            const animatedTitleSpans = document.querySelectorAll('.animated-title span');
            animatedTitleSpans.forEach((span, index) => {
                span.style.animationDelay = `${index * 0.1 + 0.1}s`;
            });

            document.querySelectorAll('a[href^="#"]:not([href="#login"]):not([href="#signup"])').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    if(mobileMenu && !mobileMenu.classList.contains('hidden')){
                         mobileMenu.classList.add('hidden'); 
                    }
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                });
            });
            displayHomepageProjects();
        });