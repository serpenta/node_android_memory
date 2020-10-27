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

ipcRenderer.on('print-results', (e, currentVal, maxVal, tenSecAvg) => {
    document.getElementById('results-value_current').innerHTML = currentVal+' kB';
    document.getElementById('results-value_average').innerHTML = tenSecAvg+' mB';
    document.getElementById('results-value_max').innerHTML = maxVal+' mB';
});
    