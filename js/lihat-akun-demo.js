document.addEventListener('DOMContentLoaded', function() {
            const accountDataContainer = document.getElementById('accountDataContainer');
            const clearLocalStorageButton = document.getElementById('clearLocalStorageButton');

            function displayAccountData() {
                const isLoggedIn = localStorage.getItem('isUserLoggedIn');
                const userName = localStorage.getItem('loggedInUserName');
                const userRole = localStorage.getItem('userRole');
                const userPasswordDemo = localStorage.getItem('demoUserPassword') || "(Password tidak disimpan/ditampilkan untuk demo ini)";

                accountDataContainer.innerHTML = ''; 

                if (isLoggedIn === 'true') {
                    accountDataContainer.innerHTML += `
                        <div class="data-item">
                            <span class="data-label">Status Login:</span>
                            <span class="data-value text-green-400">Logged In</span>
                        </div>
                        <div class="data-item">
                            <span class="data-label">Nama Pengguna:</span>
                            <span class="data-value">${userName || 'Tidak ada data'}</span>
                        </div>
                        <div class="data-item">
                            <span class="data-label">Peran Pengguna:</span>
                            <span class="data-value">${userRole || 'Tidak ada data'}</span>
                        </div>
                        <div class="data-item">
                            <span class="data-label">Password (Demo - JANGAN DILAKUKAN DI PRODUKSI!):</span>
                            <span class="data-value">${userPasswordDemo}</span>
                        </div>
                    `;
                } else {
                    accountDataContainer.innerHTML = '<p class="text-center text-gray-400">Tidak ada pengguna yang sedang login (localStorage kosong atau isUserLoggedIn bukan true).</p>';
                }
                let allStorageHTML = '<h2 class="text-lg font-semibold mt-6 mb-3 text-gray-300 border-t border-gray-700 pt-3">Semua Data di localStorage:</h2>';
                if (localStorage.length > 0) {
                    allStorageHTML += '<ul class="list-disc list-inside text-sm">';
                    for (let i = 0; i < localStorage.length; i++) {
                        const key = localStorage.key(i);
                        const value = localStorage.getItem(key);
                        allStorageHTML += `<li class="mb-1"><strong class="text-gray-400">${key}:</strong> ${value}</li>`;
                    }
                    allStorageHTML += '</ul>';
                } else {
                    allStorageHTML += '<p class="text-gray-400">localStorage kosong.</p>';
                }
                accountDataContainer.innerHTML += allStorageHTML;
            }

            // localStorage.setItem('demoUserPassword', signupPasswordInput.value);

            if (clearLocalStorageButton) {
                clearLocalStorageButton.addEventListener('click', function() {
                    if (confirm('Apakah Anda yakin ingin menghapus semua data akun demo dari localStorage? Ini akan me-logout Anda dan menghapus peran serta nama pengguna yang tersimpan.')) {
                        localStorage.removeItem('isUserLoggedIn');
                        localStorage.removeItem('loggedInUserName');
                        localStorage.removeItem('userRole');
                        localStorage.removeItem('demoUserPassword'); 
                        alert('Data akun demo telah dihapus dari localStorage.');
                        displayAccountData(); 
                    }
                });
            }

            displayAccountData();
        });