const { app, ipcMain, BrowserWindow } = require('electron');

const cmdController = require('./controllers/cmd_ctrl');
const { ProgramState } = require('./classes/State');

ProgramState.init();

app.on('ready', () => {
    let win = new BrowserWindow({
        width: 1280,
        heigth: 860,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadFile('./windows/main_window.html');
    win.webContents.on('did-finish-load', () => {
        win.webContents.send('results-display-init');
    });
});

app.on('window-all-closed', () => app.quit());

ipcMain.on('btn-run-measurement', (event) => {
    ProgramState.resetJobDone();
    event.sender.send('results-status-on');

    const interval  = setInterval(measureMemory, 500, deviceID="");

    async function measureMemory(deviceID)
    {
        if (ProgramState.getJobDone()) clearInterval(interval);

        const deviceIdString = deviceID === "" ? deviceID : `-s ${deviceID}`;

        await cmdController.memInfo(deviceIdString);

        event.sender.send('print-results',
            ProgramState.getCurrentValue(),
            ProgramState.getMaxValue(),
            ProgramState.fetchTenSecAvg());
    }
});

ipcMain.on('btn-reset-max', (e) => {
    ProgramState.setMaxValue(0);
});

ipcMain.on('btn-stop-measurement', (event) => {
    ProgramState.setJobDone();
    event.sender.send('results-status-off');
});
