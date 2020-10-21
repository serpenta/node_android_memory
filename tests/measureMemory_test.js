const path = require('path');
const cmdController = require(path.resolve('./controllers/cmd_ctrl.js'));

async function measureMemory(deviceID)
{
    const deviceIdString = deviceID === "" ? deviceID : `-s ${deviceID}`;

    cmdController.memInfo(deviceIdString);
}

setInterval(measureMemory, 500, deviceID="");

// FFY5T17C21001655 - Huawei
// bc5afd11 - Xiaomi