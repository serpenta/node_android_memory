const { ipcRenderer } = require('electron');

document
    .getElementById('run-measurement')
    .addEventListener('click', () => ipcRenderer.send('btn-run-measurement'));

document
    .getElementById('reset-max')
    .addEventListener('click', () => ipcRenderer.send('btn-reset-max'));
    
document
    .getElementById('stop-measurement')
    .addEventListener('click', () => ipcRenderer.send('btn-stop-measurement'));
    