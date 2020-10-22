const childProcess = require('child_process');
const path = require('path');

const { ProgramState } = require(path.resolve('./classes/State'));

ProgramState.init();

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

async function memInfo(deviceIdString)
{
    return runCmd(`adb ${deviceIdString} shell "dumpsys meminfo com.artifexmundi.balefire | grep TOTAL"`)
    .then(value => 
        {
            const totalsArray = value.match(/(\d+)/);
            const totalVal = parseInt(totalsArray[0]);
            if (totalVal > ProgramState.getMaxValue()) ProgramState.setMaxValue(totalVal);
            console.log(`[memInfo]: MAX: ${ProgramState.getMaxValue()}, current: ${totalVal}`);
        });
}

/** procedures */

module.exports = {
    memInfo,
};
