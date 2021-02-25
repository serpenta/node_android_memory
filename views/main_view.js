const { ipcRenderer } = require('electron');

const utils = require('../common/utilities');

ipcRenderer.on('results-display-init', (e) => {
    document.getElementById('results-status').innerHTML = 'NOT Running';
});

ipcRenderer.on('results-status-on', (e) => {
    document.getElementById('results-status').innerHTML = 'RUNNING';
});

ipcRenderer.on('results-status-off', (e) => {
    document.getElementById('results-status').innerHTML = 'NOT Running';
});

ipcRenderer.on('print-results', (e, currentVal, maxVal, tenSecAvg) => {
    document.getElementById('results-value_current').innerHTML = currentVal+' kB';
    document.getElementById('results-value_average').innerHTML = tenSecAvg+' mB';
    document.getElementById('results-value_max').innerHTML = maxVal+' mB';
});
    
document
    .getElementById('run-measurement')
    .addEventListener('click', () => 
        ipcRenderer.send('btn-run-measurement',
            utils.getInput('device-id'),
            utils.getInput('package-name')
        ));

document
    .getElementById('reset-max')
    .addEventListener('click', () => ipcRenderer.send('btn-reset-max'));

document
    .getElementById('reset-avg')
    .addEventListener('click', () => ipcRenderer.send('btn-reset-avg'));
    
document
    .getElementById('stop-measurement')
    .addEventListener('click', () => ipcRenderer.send('btn-stop-measurement'));