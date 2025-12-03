document.addEventListener('DOMContentLoaded', function() {
    const statusMessageDiv = document.getElementById('statusMessage');
    const currentProjectsListDiv = document.getElementById('currentProjectsList');

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

    displayCurrentProjects();
});
