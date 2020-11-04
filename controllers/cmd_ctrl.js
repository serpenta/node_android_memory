const childProcess = require('child_process');

const { ProgramState } = require('../classes/State');

function runCmd(command)
{
    return new Promise((resolve, reject) => {
        childProcess.exec(command, { maxBuffer: 1024**3 }, (error, stdout, stderr) => {
            if (error) console.warn(error);
            resolve(stdout ? stdout : stderr);
        });
    });
}

/** basic functions */

async function memInfo(deviceIdString, packageName)
{
    return runCmd(`adb ${deviceIdString} shell "dumpsys meminfo ${packageName} | grep TOTAL"`)
    .then(value => 
        {
            const totalsArray = value.match(/(\d+)/);
            const totalVal = parseInt(totalsArray[0]);
            if (totalVal / 1000 > ProgramState.getMaxValue()) ProgramState.setMaxValue(totalVal);
            ProgramState.addMeasurementToAverage(totalVal);

            console.log(`[memInfo]:
            current: ${totalVal} kB
            rollingAvg: ${ProgramState.fetchTenSecAvg()} mB
            MAX: ${ProgramState.getMaxValue()} mB`);
        });
}

/** procedures */

module.exports = {
    memInfo,
};
