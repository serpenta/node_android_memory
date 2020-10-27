const { app, ipcMain, ipc, BrowserWindow } = require('electron');

const cmdController = require('./controllers/cmd_ctrl');
const { ProgramState } = require('./classes/State');

ProgramState.init();

const createWindow = () =>
{
    let win = new BrowserWindow
    ({
        width: 1280,
        height: 860,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadFile('./windows/main_window.html');
    return null;
}

app.on('ready', createWindow);
app.on('window-all-closed', () => app.quit());

ipcMain.on('btn-run-measurement', (event) => {
    ProgramState.resetJobDone();

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

ipcMain.on('btn-stop-measurement', (e) => {
    ProgramState.setJobDone();
});
