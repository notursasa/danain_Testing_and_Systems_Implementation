document.addEventListener('DOMContentLoaded', function() {
            const addDummyProjectsButton = document.getElementById('addDummyProjectsButton');
            const clearDummyProjectsButton = document.getElementById('clearDummyProjectsButton');
            const clearAllLocalStorageButton = document.getElementById('clearAllLocalStorageButton');
            const statusMessageDiv = document.getElementById('statusMessage');
            const currentProjectsListDiv = document.getElementById('currentProjectsList');

            const dummyProjectData = [
                {
                    projectName: "Inovasi Edukasi Digital (Dummy)",
                    projectTagline: "Belajar tanpa batas, kapan saja, di mana saja.",
                    projectCategory: "Pendidikan",
                    projectLocation: "Jakarta",
                    projectImageURL: "https://placehold.co/600x400/1abc9c/ffffff?text=EduDigital",
                    projectVideoURL: "",
                    projectDescription: "Platform e-learning interaktif dengan kurikulum terkini dan tutor berpengalaman untuk meningkatkan kualitas pendidikan di Indonesia.",
                    fundingTarget: "150000000",
                    campaignDuration: "60",
                    investmentScheme: "Investor akan mendapatkan bagian keuntungan sebesar 15% per tahun selama 3 tahun pertama.",
                    projectRisks: "Persaingan ketat dengan platform serupa dan adopsi teknologi oleh target pasar.",
                    teamInfo: "Tim terdiri dari ahli pendidikan, developer, dan desainer UI/UX.",
                    proposalLink: "#",
                    presentationLink: "#",
                    id: Date.now() + Math.random(), status: "Pendanaan Aktif", danaTerkumpul: 75000000, pemilikProyek: "Tim EduDigital"
                },
                {
                    projectName: "Kebun Hidroponik Perkotaan (Dummy)",
                    projectTagline: "Sayuran segar dari tengah kota.",
                    projectCategory: "Pertanian",
                    projectLocation: "Surabaya",
                    projectImageURL: "https://placehold.co/600x400/2ecc71/ffffff?text=Hidroponik",
                    projectVideoURL: "",
                    projectDescription: "Mengembangkan sistem kebun hidroponik vertikal di area perkotaan untuk menyediakan sayuran segar, sehat, dan bebas pestisida bagi masyarakat.",
                    fundingTarget: "80000000",
                    campaignDuration: "45",
                    investmentScheme: "Bagi hasil dari penjualan produk sayuran hidroponik.",
                    projectRisks: "Fluktuasi harga jual sayuran dan biaya operasional (listrik, air).",
                    teamInfo: "Penggiat pertanian modern dengan latar belakang agroteknologi.",
                    proposalLink: "#",
                    presentationLink: "#",
                    id: Date.now() + Math.random(), status: "Pendanaan Aktif", danaTerkumpul: 20000000, pemilikProyek: "UrbanFarm ID"
                },
                {
                    projectName: "Aplikasi Kesehatan Telemedicine (Dummy)",
                    projectTagline: "Konsultasi dokter di ujung jari Anda.",
                    projectCategory: "Kesehatan",
                    projectLocation: "Bandung",
                    projectImageURL: "https://placehold.co/600x400/3498db/ffffff?text=Telemedicine",
                    projectVideoURL: "",
                    projectDescription: "Aplikasi mobile yang menghubungkan pasien dengan dokter umum dan spesialis untuk konsultasi jarak jauh, resep digital, dan pengantaran obat.",
                    fundingTarget: "200000000",
                    campaignDuration: "75",
                    investmentScheme: "Ekuitas saham perusahaan sebesar 10% untuk total pendanaan.",
                    projectRisks: "Regulasi telemedicine yang masih berkembang dan keamanan data pasien.",
                    teamInfo: "Dokter, developer aplikasi, dan ahli hukum kesehatan.",
                    proposalLink: "#",
                    presentationLink: "#",
                    id: Date.now() + Math.random(), status: "Terdanai", danaTerkumpul: 200000000, pemilikProyek: "SehatSelalu App"
                },
                {
                    projectName: "Marketplace UMKM Kreatif (Dummy)",
                    projectTagline: "Wadah produk unik karya anak bangsa.",
                    projectCategory: "Sosial", 
                    projectLocation: "Yogyakarta",
                    projectImageURL: "https://placehold.co/600x400/9b59b6/ffffff?text=UMKM+Kreatif",
                    projectVideoURL: "",
                    projectDescription: "Platform e-commerce yang didedikasikan untuk produk-produk kreatif dari UMKM di seluruh Indonesia, membantu mereka menjangkau pasar yang lebih luas.",
                    fundingTarget: "120000000",
                    campaignDuration: "50",
                    investmentScheme: "Komisi dari setiap transaksi yang berhasil di platform.",
                    projectRisks: "Logistik pengiriman dan persaingan dengan marketplace besar.",
                    teamInfo: "Tim dengan pengalaman di e-commerce dan pemberdayaan UMKM.",
                    proposalLink: "#",
                    presentationLink: "#",
                    id: Date.now() + Math.random(), status: "Pendanaan Aktif", danaTerkumpul: 60000000, pemilikProyek: "KreasiLokal"
                },
                {
                    projectName: "Game Edukasi Anak Nusantara (Dummy)",
                    projectTagline: "Belajar sambil bermain, kenali budaya Indonesia.",
                    projectCategory: "Teknologi", 
                    projectLocation: "Denpasar",
                    projectImageURL: "https://placehold.co/600x400/e74c3c/ffffff?text=Game+Nusantara",
                    projectVideoURL: "",
                    projectDescription: "Game mobile edukatif yang memperkenalkan anak-anak pada budaya, sejarah, dan keanekaragaman hayati Indonesia melalui gameplay yang seru dan interaktif.",
                    fundingTarget: "90000000",
                    campaignDuration: "40",
                    investmentScheme: "Pembagian keuntungan dari penjualan game dan item in-app.",
                    projectRisks: "Tantangan dalam pemasaran game dan monetisasi yang efektif.",
                    teamInfo: "Game developer, ilustrator, dan ahli konten pendidikan anak.",
                    proposalLink: "#",
                    presentationLink: "#",
                    id: Date.now() + Math.random(), status: "Menunggu Persetujuan", danaTerkumpul: 0, pemilikProyek: "StudioAnakBangsa"
                }
            ];

            function showStatusMessage(message, type = 'info') {
                statusMessageDiv.textContent = message;
                statusMessageDiv.className = `status-message ${type === 'success' ? 'status-success' : 'status-info'}`;
                statusMessageDiv.classList.remove('hidden');
                setTimeout(() => {
                    statusMessageDiv.classList.add('hidden');
                }, 3000);
            }

            function displayCurrentProjects() {
                const myProjects = JSON.parse(localStorage.getItem('myProjects')) || [];
                currentProjectsListDiv.innerHTML = '';
                if (myProjects.length > 0) {
                    myProjects.forEach(p => {
                        const item = document.createElement('div');
                        item.className = 'project-list-item';
                        item.innerHTML = `<strong>${p.projectName || p.namaProyek}</strong> (ID: ${p.id}) - Status: ${p.status}`;
                        currentProjectsListDiv.appendChild(item);
                    });
                } else {
                    currentProjectsListDiv.innerHTML = '<p class="text-gray-500">Tidak ada proyek di localStorage saat ini.</p>';
                }
            }

            if (addDummyProjectsButton) {
                addDummyProjectsButton.addEventListener('click', function() {
                    let myProjects = JSON.parse(localStorage.getItem('myProjects')) || [];
                    dummyProjectData.forEach(dummy => {
                        if (!myProjects.find(p => p.id === dummy.id)) {
                            myProjects.push(dummy);
                        }
                    });
                    localStorage.setItem('myProjects', JSON.stringify(myProjects));
                    showStatusMessage('5 Proyek dummy berhasil ditambahkan ke localStorage!', 'success');
                    displayCurrentProjects();
                });
            }

            if (clearDummyProjectsButton) {
                clearDummyProjectsButton.addEventListener('click', function() {
                    if (confirm("Apakah Anda yakin ingin menghapus semua proyek dari key 'myProjects' di localStorage?")) {
                        localStorage.removeItem('myProjects');
                        showStatusMessage("'myProjects' berhasil dihapus dari localStorage.", 'success');
                        displayCurrentProjects();
                    }
                });
            }
            
            if (clearAllLocalStorageButton) {
                clearAllLocalStorageButton.addEventListener('click', function() {
                    if (confirm("PERINGATAN: Ini akan menghapus SEMUA DATA dari localStorage untuk domain ini (termasuk status login, peran, wishlist, dll). Apakah Anda yakin?")) {
                        localStorage.clear();
                        showStatusMessage("Semua data localStorage berhasil dihapus! Halaman akan dimuat ulang.", 'success');
                        setTimeout(() => { window.location.reload(); }, 2000);
                    }
                });
            }

            displayCurrentProjects();
        });