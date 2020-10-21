const childProcess = require('child_process');
const path = require('path');

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
    .then(value => console.log(`[memInfo]: ${value}`));
}

/** procedures */

module.exports = {
    memInfo,
};
