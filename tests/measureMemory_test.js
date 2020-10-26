const path = require('path');
const cmdController = require(path.resolve('./controllers/cmd_ctrl'));
const { ProgramState } = require(path.resolve('./classes/State'));

ProgramState.init();

const interval  = setInterval(measureMemory, 500, deviceID="");

async function measureMemory(deviceID)
{
    if (ProgramState.getJobDone()) clearInterval(interval);

    const deviceIdString = deviceID === "" ? deviceID : `-s ${deviceID}`;

    cmdController.memInfo(deviceIdString);
}

// FFY5T17C21001655 - Huawei
// bc5afd11 - Xiaomi