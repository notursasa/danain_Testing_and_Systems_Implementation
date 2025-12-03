document.addEventListener('DOMContentLoaded', function() {
            const pendingProjectsTableBody = document.getElementById('pendingProjectsTableBody');
            const noPendingProjectsMessage = document.getElementById('noPendingProjectsMessage');
            const successMessageDiv = document.getElementById('successMessage');

            function formatRupiah(angka) {
                return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
            }

            function loadPendingProjects() {
                const myProjects = JSON.parse(localStorage.getItem('myProjects')) || [];
                const pendingProjects = myProjects.filter(p => p.status && p.status.toLowerCase() === 'menunggu persetujuan');

                pendingProjectsTableBody.innerHTML = ''; 

                if (pendingProjects.length > 0) {
                    noPendingProjectsMessage.classList.add('hidden');
                    pendingProjects.forEach(proyek => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${proyek.id}</td>
                            <td>${proyek.projectName || 'N/A'}</td>
                            <td>${proyek.pemilikProyek || 'N/A'}</td>
                            <td class="text-right">${formatRupiah(proyek.fundingTarget || 0)}</td>
                            <td><span class="status-review">${proyek.status}</span></td>
                            <td>
                                <button class="btn-approve" data-project-id="${proyek.id}">Setujui</button>
                                <button class="btn-reject" data-project-id="${proyek.id}">Tolak</button> 
                            </td>
                        `;
                        pendingProjectsTableBody.appendChild(row);
                    });
                } else {
                    noPendingProjectsMessage.classList.remove('hidden');
                }
            }

            function updateProjectStatus(projectId, newStatus) {
                let myProjects = JSON.parse(localStorage.getItem('myProjects')) || [];
                const projectIndex = myProjects.findIndex(p => p.id === projectId);

                if (projectIndex > -1) {
                    myProjects[projectIndex].status = newStatus;
                    localStorage.setItem('myProjects', JSON.stringify(myProjects));
                    
                    successMessageDiv.textContent = `Status proyek ID ${projectId} berhasil diubah menjadi "${newStatus}"!`;
                    successMessageDiv.style.display = 'block';
                    setTimeout(() => {
                        successMessageDiv.style.display = 'none';
                    }, 3000);
                    
                    loadPendingProjects();
                } else {
                    alert('Error: Proyek tidak ditemukan di localStorage.');
                }
            }

            pendingProjectsTableBody.addEventListener('click', function(event) {
                const target = event.target;
                const projectId = parseInt(target.dataset.projectId);

                if (target.classList.contains('btn-approve')) {
                    if (confirm(`Apakah Anda yakin ingin menyetujui proyek ID ${projectId}?`)) {
                        updateProjectStatus(projectId, 'Pendanaan Aktif');
                    }
                } else if (target.classList.contains('btn-reject')) {
                     if (confirm(`Apakah Anda yakin ingin menolak proyek ID ${projectId}?`)) {
                        updateProjectStatus(projectId, 'Ditolak');
                    }
                }
            });

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

            setupLogoutButton('adminLogoutButton');

            loadPendingProjects();
        });