// --- Fungsi Notifikasi Global (Duplikat dari notifikasi.html atau utils.js) ---
        function addNotification(type, message, projectId = null, projectName = null) {
            let notifications = JSON.parse(localStorage.getItem('userNotifications')) || [];
            const newNotification = {
                id: Date.now(), type: type, message: message, projectId: projectId,
                projectName: projectName, timestamp: new Date().toISOString(), isRead: false
            };
            notifications.unshift(newNotification);
            localStorage.setItem('userNotifications', JSON.stringify(notifications));
            console.log("Notifikasi ditambahkan (dari detail-proyek):", newNotification);
        }


        // Data Proyek Detail (Sama seperti sebelumnya)
        const semuaProyekDetail = [
            { id: 1, namaProyek: 'EduTech AI Masa Depan', tagline: 'Revolusi Belajar AI', deskripsiLengkap: 'Deskripsi lengkap EduTech...', targetDana: 250000000, danaTerkumpul: 162500000, gambarUtama: 'https://placehold.co/800x450/173A5E/64FFDA?text=EduTech+AI+Detail', videoPitchUrl: 'https://www.youtube.com/embed/9', kategori: 'Teknologi', pemilikProyek: { nama: 'Tim EduSpark', profil: 'Tim ahli pendidikan dan AI.', avatar: 'https://placehold.co/100x100/0A192F/64FFDA?text=ES', website: '#' }, sisaHari: 30, lokasi: 'Jakarta', dokumen: [{nama:'Proposal.pdf',url:'#'}], updates:[], skemaInvestasi:'Ekuitas 10%', risikoTantangan:'Pasar kompetitif.'},
            { id: 2, namaProyek: 'Kopi Organik Desa Lestari', tagline: 'Kopi berkualitas dari petani', deskripsiLengkap: 'Deskripsi lengkap Kopi Lestari...', targetDana: 120000000, danaTerkumpul: 48000000, gambarUtama: 'https://placehold.co/800x450/173A5E/64FFDA?text=Kopi+Detail', videoPitchUrl: '', kategori: 'Pertanian', pemilikProyek: { nama: 'Komunitas Desa Lestari', profil: 'Petani kopi berpengalaman.', avatar: 'https://placehold.co/100x100/0A192F/64FFDA?text=KL', website: '#' }, sisaHari: 45, lokasi: 'Bandung', dokumen: [], updates:[], skemaInvestasi:'Bagi hasil 15%', risikoTantangan:'Cuaca.'},
            { id: 3, namaProyek: 'Fashion Ramah Lingkungan "EcoThread"', tagline: 'Gaya Bertanggung Jawab', deskripsiLengkap: 'Deskripsi lengkap EcoThread...', targetDana: 300000000, danaTerkumpul: 225000000, gambarUtama: 'https://placehold.co/800x450/173A5E/64FFDA?text=EcoThread+Detail', videoPitchUrl: '', kategori: 'Fashion', pemilikProyek: { nama: 'GreenStyle Collective', profil: 'Desainer fashion berkelanjutan.', avatar: 'https://placehold.co/100x100/0A192F/64FFDA?text=GC', website: '#' }, sisaHari: 60, lokasi: 'Surabaya', dokumen: [], updates:[], skemaInvestasi:'Saham preferen', risikoTantangan:'Bahan baku.'},
            { id: 4, namaProyek: 'Aplikasi Kesehatan Mental "MindWell"', tagline: 'Kesejahteraan Mental Anda', deskripsiLengkap: 'Deskripsi lengkap MindWell...', targetDana: 180000000, danaTerkumpul: 90000000, gambarUtama: 'https://placehold.co/800x450/173A5E/64FFDA?text=MindWell+Detail', videoPitchUrl: 'https://www.youtube.com/embed/VIDEO_ID_MINDWELL0', kategori: 'Kesehatan', pemilikProyek: { nama: 'Sehat Jiwa Foundation', profil: 'Ahli kesehatan mental.', avatar: 'https://placehold.co/100x100/0A192F/64FFDA?text=SJ', website: '#' }, sisaHari: 25, lokasi: 'Yogyakarta', dokumen: [], updates:[], skemaInvestasi:'Donasi dengan reward', risikoTantangan:'Stigma masyarakat.'},
            { id: 5, namaProyek: 'Rumah Belajar Anak Pesisir "Cahaya Ilmu"', tagline: 'Pendidikan untuk Semua', deskripsiLengkap: 'Deskripsi lengkap Cahaya Ilmu...', targetDana: 80000000, danaTerkumpul: 72000000, gambarUtama: 'https://placehold.co/800x450/173A5E/64FFDA?text=Cahaya+Ilmu+Detail', videoPitchUrl: '', kategori: 'Pendidikan', pemilikProyek: { nama: 'Yayasan Cahaya Pesisir', profil: 'Pegiat pendidikan anak.', avatar: 'https://placehold.co/100x100/0A192F/64FFDA?text=CP', website: '#' }, sisaHari: 15, lokasi: 'Semarang', dokumen: [], updates:[], skemaInvestasi:'Donasi murni', risikoTantangan:'Keberlanjutan dana.'},
            { id: 6, namaProyek: 'Energi Terbarukan Komunitas "Sinar Desa"', tagline: 'Menerangi Desa', deskripsiLengkap: 'Deskripsi lengkap Sinar Desa...', targetDana: 500000000, danaTerkumpul: 200000000, gambarUtama: 'https://placehold.co/800x450/173A5E/64FFDA?text=Sinar+Desa+Detail', videoPitchUrl: 'https://www.youtube.com/embed/VIDEO_ID_MINDWELL1', kategori: 'Sosial', pemilikProyek: { nama: 'Desa Mandiri Energi', profil: 'Penggerak energi terbarukan.', avatar: 'https://placehold.co/100x100/0A192F/64FFDA?text=DM', website: '#' }, sisaHari: 90, lokasi: 'Papua', dokumen: [], updates:[], skemaInvestasi:'Investasi dampak sosial', risikoTantangan:'Logistik.'},
            { id: 7, namaProyek: 'Startup Agrikultur Cerdas "AgroSmart"', tagline: 'Pertanian Presisi', deskripsiLengkap: 'Deskripsi lengkap AgroSmart...', targetDana: 220000000, danaTerkumpul: 110000000, gambarUtama: 'https://placehold.co/800x450/173A5E/64FFDA?text=AgroSmart+Detail', videoPitchUrl: '', kategori: 'Teknologi', pemilikProyek: { nama: 'AgroTech Solutions', profil: 'Inovator teknologi pertanian.', avatar: 'https://placehold.co/100x100/0A192F/64FFDA?text=AS', website: '#' }, sisaHari: 50, lokasi: 'Malang', dokumen: [], updates:[], skemaInvestasi:'Ekuitas', risikoTantangan:'Adopsi petani.'},
            { id: 8, namaProyek: 'Pengembangan Properti Hijau "EcoResidences Bali"', tagline: 'Hunian Berkelanjutan', deskripsiLengkap: 'Deskripsi lengkap EcoResidences...', targetDana: 1200000000, danaTerkumpul: 300000000, gambarUtama: 'https://placehold.co/800x450/173A5E/64FFDA?text=EcoBali+Detail', videoPitchUrl: 'https://www.youtube.com/embed/VIDEO_ID_MINDWELL2', kategori: 'Properti', pemilikProyek: { nama: 'EcoLiving Developments', profil: 'Pengembang properti hijau.', avatar: 'https://placehold.co/100x100/0A192F/64FFDA?text=EL', website: '#' }, sisaHari: 120, lokasi: 'Bali', dokumen: [], updates:[], skemaInvestasi:'Pembelian unit', risikoTantangan:'Pasar properti.'}
        ];

        function formatRupiah(angka) { return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka); }

        document.addEventListener('DOMContentLoaded', function() {
            const projectDetailContainer = document.getElementById('projectDetailContainer');
            const projectNotFoundDiv = document.getElementById('projectNotFound');
            const successInvestmentPopup = document.getElementById('successInvestmentPopup');
            const successSaveProjectPopup = document.getElementById('successSaveProjectPopup');
            
            const isUserLoggedIn = localStorage.getItem('isUserLoggedIn');
            const loggedInUserName = localStorage.getItem('loggedInUserName') || "Pengguna";
            const userRole = localStorage.getItem('userRole');
            const navAuthLinksDesktop = document.getElementById('navAuthLinksDesktop');
            const navUserSectionDesktop = document.getElementById('navUserSectionDesktop');
            const navAuthLinksMobile = document.getElementById('navAuthLinksMobile');
            const navUserSectionMobile = document.getElementById('navUserSectionMobile');
            const dashboardUrl = userRole === 'investor' ? 'dashboard-investor.html' : 'dashboard-startup.html';

            if (isUserLoggedIn === 'true') {
                if(navAuthLinksDesktop) navAuthLinksDesktop.style.display = 'none';
                if(navUserSectionDesktop) {
                    navUserSectionDesktop.innerHTML = `<a href="${dashboardUrl}" class="hover:text-gray-300 mr-4 text-sm">Dashboard Saya</a> <span class="text-gray-300 mr-3 text-sm">Halo, ${loggedInUserName}!</span><a href="#" id="logoutButtonDesktop" class="btn-secondary px-3 py-1.5 rounded-md text-xs">Logout</a>`;
                    navUserSectionDesktop.classList.remove('hidden');
                    navUserSectionDesktop.classList.add('flex', 'items-center');
                }
                if(navAuthLinksMobile) navAuthLinksMobile.style.display = 'none';
                if(navUserSectionMobile) {
                    navUserSectionMobile.innerHTML = `<a href="${dashboardUrl}" class="block px-6 py-3 hover:bg-gray-700">Dashboard Saya</a> <span class="block px-6 py-3 text-gray-300">Halo, ${loggedInUserName}!</span><a href="#" id="logoutButtonMobile" class="block mx-4 my-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-center rounded-md font-semibold">Logout</a>`;
                    navUserSectionMobile.classList.remove('hidden');
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
                window.location.href = 'index.html';
            }
            const logoutButtonDesktop = document.getElementById('logoutButtonDesktop');
            if(logoutButtonDesktop) logoutButtonDesktop.addEventListener('click', handleLogout);
            const logoutButtonMobile = document.getElementById('logoutButtonMobile');
            if(logoutButtonMobile) logoutButtonMobile.addEventListener('click', handleLogout);
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenuButton && mobileMenu) {
                mobileMenuButton.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
            }
            const currentYearFooter = document.getElementById('currentYearFooter');
            if(currentYearFooter) currentYearFooter.textContent = new Date().getFullYear();

            const urlParams = new URLSearchParams(window.location.search);
            const projectId = parseInt(urlParams.get('id'));
            
            let myProjectsFromStorage = JSON.parse(localStorage.getItem('myProjects')) || [];
            let proyek = myProjectsFromStorage.find(p => p.id === projectId);
            if (!proyek) {
                proyek = semuaProyekDetail.find(p => p.id === projectId);
            }

            const investmentModal = document.getElementById('investmentModal');
            const investButton = document.getElementById('investButton');
            const closeInvestmentModalButton = document.getElementById('closeInvestmentModal');
            const cancelInvestmentButton = document.getElementById('cancelInvestmentButton');
            const investmentForm = document.getElementById('investmentForm');
            const modalProjectName = document.getElementById('modalProjectName');
            const investmentAmountInput = document.getElementById('investmentAmount');
            const confirmTermsCheckbox = document.getElementById('confirmTerms');
            const investmentAmountError = document.getElementById('investmentAmountError');
            const confirmTermsError = document.getElementById('confirmTermsError');
            const saveProjectButton = document.getElementById('saveProjectButton'); 

            let wishlistedProjects = JSON.parse(localStorage.getItem('wishlistedProjects')) || [];

            function isProjectWishlisted(id) { return wishlistedProjects.includes(id); }

            function updateSaveButtonUI(currentProjectId) {
                if (!saveProjectButton) return;
                if (isProjectWishlisted(currentProjectId)) {
                    saveProjectButton.classList.add('saved');
                    saveProjectButton.innerHTML = `<i class="fas fa-bookmark mr-2"></i> <span>Tersimpan</span>`;
                } else {
                    saveProjectButton.classList.remove('saved');
                    saveProjectButton.innerHTML = `<i class="far fa-bookmark mr-2"></i> <span>Simpan Proyek</span>`;
                }
            }

            function toggleWishlist(currentProjectId, currentProjectName) {
                if (isUserLoggedIn !== 'true' || userRole !== 'investor') {
                    alert('Anda harus login sebagai investor untuk menyimpan proyek.');
                    window.location.href = `auth.html#login?redirect=detail-proyek.html?id=${currentProjectId}`;
                    return;
                }
                const index = wishlistedProjects.indexOf(currentProjectId);
                let message = "";
                if (index > -1) {
                    wishlistedProjects.splice(index, 1); 
                    message = `Proyek "${currentProjectName}" dihapus dari wishlist.`;
                } else {
                    wishlistedProjects.push(currentProjectId); 
                    message = `Proyek "${currentProjectName}" berhasil disimpan ke wishlist!`;
                }
                localStorage.setItem('wishlistedProjects', JSON.stringify(wishlistedProjects));
                updateSaveButtonUI(currentProjectId);
                if(successSaveProjectPopup){
                    successSaveProjectPopup.textContent = message;
                    successSaveProjectPopup.classList.add('show');
                    setTimeout(() => { successSaveProjectPopup.classList.remove('show'); }, 2500);
                }
            }

            if (proyek) {
                projectDetailContainer.classList.remove('opacity-0');
                projectDetailContainer.style.opacity = '1';
                projectNotFoundDiv.classList.add('hidden');
                const projectName = proyek.namaProyek || proyek.projectName;
                document.title = `${projectName} - DANAIN`;
                document.getElementById('breadcrumbProjectName').textContent = projectName;
                document.getElementById('projectTitle').textContent = projectName;
                document.getElementById('projectCategory').textContent = proyek.kategori || proyek.projectCategory;
                document.getElementById('projectTagline').textContent = proyek.tagline || proyek.projectTagline || 'Tagline proyek...';
                
                const projectImage = document.getElementById('projectImage');
                const projectVideoDiv = document.getElementById('projectVideo');
                const videoUrl = proyek.videoPitchUrl || proyek.projectVideoURL;
                const imageUrl = proyek.gambarUtama || proyek.projectImageURL;

                if (videoUrl && videoUrl.includes('embed')) {
                    projectImage.classList.add('hidden');
                    projectVideoDiv.classList.remove('hidden');
                    projectVideoDiv.innerHTML = `<iframe src="${videoUrl}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
                } else if (imageUrl) {
                    projectImage.src = imageUrl;
                    projectImage.alt = `Gambar ${projectName}`;
                    projectImage.classList.remove('hidden');
                    projectVideoDiv.classList.add('hidden');
                } else {
                    projectImage.src = 'https://placehold.co/800x450/102A43/1E2D3D?text=Gambar+Tidak+Tersedia';
                    projectImage.classList.remove('hidden');
                    projectVideoDiv.classList.add('hidden');
                }
                
                document.getElementById('projectDescription').textContent = proyek.deskripsiLengkap || proyek.projectDescription || 'Deskripsi tidak tersedia.';
                document.getElementById('projectRisks').textContent = proyek.risikoTantangan || proyek.projectRisks || 'Informasi risiko dan tantangan belum tersedia.';

                const updatesList = document.getElementById('projectUpdatesList');
                updatesList.innerHTML = ''; 
                const projectUpdates = proyek.updates || [];
                if (projectUpdates.length > 0) {
                    projectUpdates.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
                    projectUpdates.forEach(update => {
                        updatesList.innerHTML += `<div class="update-item-detail"><p class="text-xs text-gray-500 mb-1">${new Date(update.tanggal).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p><h4 class="font-semibold text-gray-200 mb-1">${update.judul}</h4><p class="text-sm text-gray-300 whitespace-pre-line">${update.deskripsi}</p></div>`;
                    });
                } else {
                    updatesList.innerHTML = '<p class="text-gray-400">Belum ada update untuk proyek ini.</p>';
                }

                const documentsList = document.getElementById('projectDocumentsList');
                documentsList.innerHTML = '';
                 const projectDocuments = proyek.dokumen || [];
                 if (projectDocuments.length > 0) {
                    projectDocuments.forEach(doc => {
                        documentsList.innerHTML += `<li><a href="${doc.url}" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:text-blue-300 hover:underline">${doc.nama}</a></li>`;
                    });
                } else {
                    let hasDocsFromLocalStorage = false;
                    if (proyek.proposalLink) {
                        documentsList.innerHTML += `<li><a href="${proyek.proposalLink}" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:text-blue-300 hover:underline">Proposal Proyek</a></li>`;
                        hasDocsFromLocalStorage = true;
                    }
                    if (proyek.presentationLink) {
                        documentsList.innerHTML += `<li><a href="${proyek.presentationLink}" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:text-blue-300 hover:underline">Presentasi Proyek</a></li>`;
                        hasDocsFromLocalStorage = true;
                    }
                    if (!hasDocsFromLocalStorage) {
                        documentsList.innerHTML = '<li class="text-gray-400">Tidak ada dokumen pendukung yang tersedia.</li>';
                    }
                }

                const danaTerkumpulVal = parseFloat(proyek.danaTerkumpul) || 0;
                const targetDanaVal = parseFloat(proyek.targetDana) || parseFloat(proyek.fundingTarget) || 0;

                document.getElementById('danaTerkumpul').textContent = formatRupiah(danaTerkumpulVal);
                document.getElementById('targetDana').textContent = formatRupiah(targetDanaVal);
                const persentase = targetDanaVal > 0 ? (danaTerkumpulVal / targetDanaVal) * 100 : 0;
                document.getElementById('progressBar').style.width = `${Math.min(persentase, 100).toFixed(0)}%`;
                document.getElementById('persentaseTerkumpul').textContent = `${persentase.toFixed(0)}% terkumpul`;
                document.getElementById('sisaHari').textContent = `${proyek.sisaHari || proyek.campaignDuration || 0} hari lagi`;
                document.getElementById('skemaInvestasi').textContent = proyek.skemaInvestasi || proyek.investmentScheme || 'Informasi skema investasi belum tersedia.';
                
                const pemilik = proyek.pemilikProyek || { nama: proyek.teamInfo ? 'Tim Proyek' : 'Pengelola Tidak Diketahui', profil: proyek.teamInfo || '', avatar: 'https://placehold.co/100x100/0A192F/64FFDA?text=P', website: '#'};
                document.getElementById('pemilikAvatar').src = pemilik.avatar;
                document.getElementById('pemilikAvatar').alt = `Avatar ${pemilik.nama}`;
                document.getElementById('pemilikNama').textContent = pemilik.nama;
                const pemilikWebsiteLink = document.getElementById('pemilikWebsite');
                if (pemilik.website && pemilik.website !== '#') {
                    pemilikWebsiteLink.href = pemilik.website;
                    pemilikWebsiteLink.classList.remove('hidden');
                } else {
                    pemilikWebsiteLink.classList.add('hidden');
                }
                document.getElementById('pemilikProfil').textContent = pemilik.profil;

                updateSaveButtonUI(proyek.id);
                if (saveProjectButton) {
                    saveProjectButton.addEventListener('click', function() {
                        toggleWishlist(proyek.id, projectName);
                    });
                }

                if (investButton) {
                    investButton.addEventListener('click', function() {
                         if (isUserLoggedIn === 'true') {
                            if (userRole === 'investor') {
                                if(modalProjectName) modalProjectName.textContent = projectName;
                                if(investmentModal) investmentModal.classList.add('show');
                            } else {
                                alert('Hanya investor yang dapat melakukan investasi.');
                            }
                        } else {
                            alert('Anda harus login terlebih dahulu untuk berinvestasi.');
                            window.location.href = `auth.html#login?redirect=detail-proyek.html?id=${proyek.id}`;
                        }
                    });
                }
                const contactButton = document.getElementById('contactButton');
                if(contactButton) {
                    contactButton.addEventListener('click', function() {
                        alert(`Untuk menghubungi pengelola proyek "${projectName}", silakan kirim email ke info@danain.com (Contoh).`);
                    });
                }

            } else {
                projectDetailContainer.classList.add('hidden');
                projectDetailContainer.style.opacity = '0';
                projectNotFoundDiv.classList.remove('hidden');
                document.title = "Proyek Tidak Ditemukan - DANAIN";
            }

            if (closeInvestmentModalButton && investmentModal) {
                closeInvestmentModalButton.addEventListener('click', () => investmentModal.classList.remove('show'));
            }
            if (cancelInvestmentButton && investmentModal) {
                cancelInvestmentButton.addEventListener('click', () => investmentModal.classList.remove('show'));
            }
            if (investmentModal) {
                investmentModal.addEventListener('click', function(event) { 
                    if (event.target === investmentModal) {
                        investmentModal.classList.remove('show');
                    }
                });
            }

            if (investmentForm && proyek) { 
                investmentForm.addEventListener('submit', function(event) {
                    event.preventDefault();
                    let isValid = true;
                    investmentAmountError.style.display = 'none';
                    if (!investmentAmountInput.value || parseFloat(investmentAmountInput.value) < 100000) {
                        investmentAmountError.textContent = "Jumlah investasi minimal Rp 100.000.";
                        investmentAmountError.style.display = 'block';
                        isValid = false;
                    }
                    confirmTermsError.style.display = 'none';
                    if (!confirmTermsCheckbox.checked) {
                        confirmTermsError.textContent = "Anda harus menyetujui syarat & ketentuan.";
                        confirmTermsError.style.display = 'block';
                        isValid = false;
                    }

                    if (isValid) {
                        const amount = parseFloat(investmentAmountInput.value);
                        const currentProjectName = proyek.namaProyek || proyek.projectName;
                        const investmentData = {
                            projectId: proyek.id,
                            projectName: currentProjectName,
                            amountInvested: amount,
                            investmentDate: new Date().toISOString().split('T')[0],
                            statusProyekSaatInvestasi: proyek.status || 'Pendanaan Aktif'
                        };

                        let myInvestments = JSON.parse(localStorage.getItem('myInvestments')) || [];
                        myInvestments.push(investmentData);
                        localStorage.setItem('myInvestments', JSON.stringify(myInvestments));
                        addNotification('new_investment', `Anda berhasil berinvestasi sebesar ${formatRupiah(amount)} pada proyek "${currentProjectName}".`, proyek.id, currentProjectName);
                        addNotification('new_investment_startup', `Ada investasi baru sebesar ${formatRupiah(amount)} untuk proyek Anda "${currentProjectName}" dari ${loggedInUserName}.`, proyek.id, currentProjectName);


                        if(investmentModal) investmentModal.classList.remove('show');
                        investmentForm.reset(); 

                        if(successInvestmentPopup) {
                            successInvestmentPopup.textContent = `Investasi Anda sebesar ${formatRupiah(amount)} pada proyek "${currentProjectName}" berhasil dicatat!`;
                            successInvestmentPopup.classList.add('show');
                            setTimeout(() => {
                                successInvestmentPopup.classList.remove('show');
                            }, 3500);
                        }
                        
                        let currentProjectData = myProjectsFromStorage.find(p => p.id === projectId);
                        if (currentProjectData) {
                            currentProjectData.danaTerkumpul = (parseFloat(currentProjectData.danaTerkumpul) || 0) + amount;
                            const projectIndex = myProjectsFromStorage.findIndex(p => p.id === projectId);
                            myProjectsFromStorage[projectIndex] = currentProjectData;
                            localStorage.setItem('myProjects', JSON.stringify(myProjectsFromStorage)); 

                            document.getElementById('danaTerkumpul').textContent = formatRupiah(currentProjectData.danaTerkumpul);
                            const newPersentase = (currentProjectData.danaTerkumpul / (parseFloat(currentProjectData.targetDana) || parseFloat(currentProjectData.fundingTarget) || 1)) * 100;
                            document.getElementById('progressBar').style.width = `${Math.min(newPersentase, 100).toFixed(0)}%`;
                            document.getElementById('persentaseTerkumpul').textContent = `${newPersentase.toFixed(0)}% terkumpul`;
                        } else {
                             proyek.danaTerkumpul = (parseFloat(proyek.danaTerkumpul) || 0) + amount;
                             document.getElementById('danaTerkumpul').textContent = formatRupiah(proyek.danaTerkumpul);
                             const newPersentase = (proyek.danaTerkumpul / (parseFloat(proyek.targetDana) || parseFloat(proyek.fundingTarget) || 1)) * 100;
                             document.getElementById('progressBar').style.width = `${Math.min(newPersentase, 100).toFixed(0)}%`;
                             document.getElementById('persentaseTerkumpul').textContent = `${newPersentase.toFixed(0)}% terkumpul`;
                        }
                    }
                });
            }

            const tabButtons = document.querySelectorAll('.tab-button');
            const tabContents = document.querySelectorAll('.tab-content');
            tabButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const targetTab = button.dataset.tab;
                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    tabContents.forEach(content => {
                        content.classList.toggle('active', content.id === `${targetTab}Content`);
                    });
                });
            });
        });