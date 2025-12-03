const demoProjects = [
            { id: 1, projectName: 'EduTech AI (Demo)', projectDescription: 'Platform pembelajaran adaptif...', fundingTarget: 250000000, danaTerkumpul: 162500000, projectImageURL: 'https://placehold.co/600x400/173A5E/64FFDA?text=EduTech+AI', projectCategory: 'Teknologi', pemilikProyek: 'Tim Inovasi Edu', campaignDuration: 30, projectLocation: 'Jakarta', status: 'Pendanaan Aktif' },
            { id: 2, projectName: 'Kopi Organik (Demo)', projectDescription: 'Memberdayakan petani lokal...', fundingTarget: 120000000, danaTerkumpul: 48000000, projectImageURL: 'https://placehold.co/600x400/173A5E/64FFDA?text=Kopi+Organik', projectCategory: 'Pertanian', pemilikProyek: 'Komunitas Desa Lestari', campaignDuration: 45, projectLocation: 'Bandung', status: 'Pendanaan Aktif' },
        ];
        let wishlistedProjects = JSON.parse(localStorage.getItem('wishlistedProjects')) || [];

        function formatRupiah(angka) { return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka); }

        function isProjectWishlisted(id) {
            return wishlistedProjects.includes(id);
        }

        function showSaveProjectPopup(message) {
            const popup = document.getElementById('saveProjectCardPopup');
            if (popup) {
                popup.textContent = message;
                popup.classList.add('show');
                setTimeout(() => { popup.classList.remove('show'); }, 2000);
            }
        }
        
        function toggleWishlistOnCard(buttonElement, projectId, projectName) {
            const isUserLoggedIn = localStorage.getItem('isUserLoggedIn');
            const userRole = localStorage.getItem('userRole');
            if (isUserLoggedIn !== 'true' || userRole !== 'investor') {
                alert('Anda harus login sebagai investor untuk menyimpan proyek.');
                window.location.href = `auth.html#login?redirect=daftar-proyek.html`;
                return;
            }
            const index = wishlistedProjects.indexOf(projectId);
            let message = "";
            if (index > -1) {
                wishlistedProjects.splice(index, 1);
                message = `Proyek "${projectName}" dihapus dari wishlist.`;
            } else {
                wishlistedProjects.push(projectId);
                message = `Proyek "${projectName}" disimpan ke wishlist!`;
            }
            localStorage.setItem('wishlistedProjects', JSON.stringify(wishlistedProjects));
            updateSaveButtonOnCardUI(buttonElement, projectId);
            showSaveProjectPopup(message);
        }

        function updateSaveButtonOnCardUI(buttonElement, projectId) {
            if (!buttonElement) return;
            if (isProjectWishlisted(projectId)) {
                buttonElement.classList.add('saved');
                buttonElement.innerHTML = `<i class="fas fa-bookmark mr-1"></i> Tersimpan`;
            } else {
                buttonElement.classList.remove('saved');
                buttonElement.innerHTML = `<i class="far fa-bookmark mr-1"></i> Simpan`;
            }
        }

        function renderProjectCard(proyek) {
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
            const isSaved = isProjectWishlisted(proyek.id);

            return `
                <div class="project-card rounded-lg overflow-hidden flex flex-col">
                    <div class="relative">
                        <a href="detail-proyek.html?id=${proyek.id}" class="block hover:opacity-90 transition-opacity">
                            <img src="${gambar}" alt="Gambar Proyek ${nama}" class="w-full h-48 object-cover" onerror="this.onerror=null;this.src='https://placehold.co/600x400/173A5E/64FFDA?text=Gambar+Error';">
                        </a>
                        <button 
                            class="btn-save-card absolute top-2 right-2 rounded-md z-10 ${isSaved ? 'saved' : ''}" 
                            data-project-id="${proyek.id}" 
                            data-project-name="${nama}"
                            title="${isSaved ? 'Hapus dari Wishlist' : 'Simpan ke Wishlist'}">
                            <i class="${isSaved ? 'fas' : 'far'} fa-bookmark mr-1"></i> ${isSaved ? 'Tersimpan' : 'Simpan'}
                        </button>
                    </div>
                    <div class="p-5 flex flex-col flex-grow">
                        <div class="flex justify-between items-start mb-2">
                            <h3 class="text-lg font-semibold text-gray-100 leading-tight">
                                <a href="detail-proyek.html?id=${proyek.id}" class="hover:text-gray-300 transition-colors">${nama}</a>
                            </h3>
                            <span class="category-tag whitespace-nowrap">${kategori}</span>
                        </div>
                        <p class="text-gray-400 text-sm mb-3 flex-grow">${deskripsi.substring(0, 100)}${deskripsi.length > 100 ? '...' : ''}</p>
                        <div class="text-xs text-gray-500 mb-1">Pemilik: ${pemilik} | Lokasi: ${lokasi}</div>
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
                            Lihat Detail & Investasi
                        </a>
                    </div>
                </div>
            `;
        }

        const projectListContainer = document.getElementById('project-list-container');
        const loadingMessage = document.getElementById('loadingMessage');
        const noResultsMessage = document.getElementById('noResultsMessage');

        function displayProjects(proyekArray) {
            projectListContainer.innerHTML = ''; 
            if (proyekArray.length === 0) {
                noResultsMessage.classList.remove('hidden');
            } else {
                noResultsMessage.classList.add('hidden');
                proyekArray.forEach(proyek => {
                    projectListContainer.innerHTML += renderProjectCard(proyek);
                });
                projectListContainer.querySelectorAll('.btn-save-card').forEach(button => {
                    button.addEventListener('click', function() {
                        const projectId = parseInt(this.dataset.projectId);
                        const projectName = this.dataset.projectName;
                        toggleWishlistOnCard(this, projectId, projectName);
                    });
                });
            }
        }
        
        const filterKategoriSelect = document.getElementById('filterKategori');
        const filterLokasiInput = document.getElementById('filterLokasi');
        const filterUrutkanSelect = document.getElementById('filterUrutkan');
        const terapkanFilterButton = document.getElementById('terapkanFilter');

        function filterAndSortProjects() {
            let sourceProjects = JSON.parse(localStorage.getItem('myProjects')) || [];
            if (sourceProjects.length === 0) {
                // sourceProjects = demoProjects; 
            }

            let publiclyVisibleProjects = sourceProjects.filter(p => 
                p.status && (p.status.toLowerCase() === 'pendanaan aktif' || p.status.toLowerCase() === 'terdanai')
            );


            const kategoriTerpilih = filterKategoriSelect.value;
            const lokasiTerpilih = filterLokasiInput.value.toLowerCase();
            const urutkanBerdasarkan = filterUrutkanSelect.value;
            
            let filteredProjects = publiclyVisibleProjects; 

            if (kategoriTerpilih) {
                filteredProjects = filteredProjects.filter(p => (p.projectCategory || p.kategori) === kategoriTerpilih);
            }
            if (lokasiTerpilih) {
                filteredProjects = filteredProjects.filter(p => (p.projectLocation || p.lokasi || '').toLowerCase().includes(lokasiTerpilih));
            }
            switch (urutkanBerdasarkan) {
                case 'terbaru': filteredProjects.sort((a, b) => (b.id || 0) - (a.id || 0)); break;
                case 'dana_terkumpul': filteredProjects.sort((a, b) => (parseFloat(b.danaTerkumpul) || 0) - (parseFloat(a.danaTerkumpul) || 0)); break;
                case 'target_dana': filteredProjects.sort((a, b) => (parseFloat(b.fundingTarget) || parseFloat(b.targetDana) || 0) - (parseFloat(a.fundingTarget) || parseFloat(a.targetDana) || 0)); break;
                case 'sisa_hari': filteredProjects.sort((a, b) => (parseInt(a.campaignDuration) || parseInt(a.sisaHari) || 0) - (parseInt(b.campaignDuration) || parseInt(b.sisaHari) || 0)); break;
            }
            
            loadingMessage.classList.add('hidden'); 
            displayProjects(filteredProjects);
        }

        terapkanFilterButton.addEventListener('click', filterAndSortProjects);

        document.addEventListener('DOMContentLoaded', function() {
            const isUserLoggedIn = localStorage.getItem('isUserLoggedIn');
            const loggedInUserName = localStorage.getItem('loggedInUserName') || "Pengguna";
            const userRole = localStorage.getItem('userRole') || 'startup';
            const navAuthLinksDesktop = document.getElementById('navAuthLinksDesktop');
            const navUserSectionDesktop = document.getElementById('navUserSectionDesktop');
            const navAuthLinksMobile = document.getElementById('navAuthLinksMobile');
            const navUserSectionMobile = document.getElementById('navUserSectionMobile');
            const dashboardUrl = userRole === 'investor' ? 'dashboard-investor.html' : 'dashboard-startup.html';

            if (isUserLoggedIn === 'true') {
                if(navAuthLinksDesktop) navAuthLinksDesktop.style.display = 'none';
                if(navUserSectionDesktop) {
                    navUserSectionDesktop.innerHTML = `<a href="${dashboardUrl}" class="nav-link mr-4 text-sm">Dashboard Saya</a><span class="nav-link mr-3 text-sm">Halo, ${loggedInUserName}!</span><a href="#" id="logoutButtonDesktop" class="btn-secondary px-3 py-1.5 rounded-md text-xs">Logout</a>`;
                    navUserSectionDesktop.classList.remove('hidden');
                    navUserSectionDesktop.classList.add('flex', 'items-center');
                }
                if(navAuthLinksMobile) navAuthLinksMobile.style.display = 'none';
                if(navUserSectionMobile) {
                    navUserSectionMobile.innerHTML = `<a href="${dashboardUrl}" class="block px-6 py-3 nav-link hover:bg-gray-700">Dashboard Saya</a><span class="block px-6 py-3 text-gray-300">Halo, ${loggedInUserName}!</span><a href="#" id="logoutButtonMobile" class="block mx-4 my-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-center rounded-md font-semibold">Logout</a>`;
                    navUserSectionMobile.classList.remove('hidden');
                    navUserSectionMobile.classList.add('border-t', 'border-gray-700', 'pt-2');
                }
            } else {
                if(navAuthLinksDesktop) navAuthLinksDesktop.style.display = 'flex';
                if(navUserSectionDesktop) navUserSectionDesktop.classList.add('hidden');
                if(navAuthLinksMobile) navAuthLinksMobile.style.display = 'block';
                if(navUserSectionMobile) navUserSectionMobile.classList.add('hidden');
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
                mobileMenuButton.addEventListener('click', () => { mobileMenu.classList.toggle('hidden'); });
            }
            const currentYearElement = document.getElementById('currentYear');
            if (currentYearElement) { currentYearElement.textContent = new Date().getFullYear(); }

            setTimeout(() => { filterAndSortProjects(); }, 200); 
        });