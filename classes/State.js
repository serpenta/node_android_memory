const path = require('path');

let programState = null;

class ProgramState
{
    constructor()
    {
        this.maxValue = null;
    }

    static setMaxValue(value)
    {
        programState.maxValue = value;
        return null;
    }

    static getMaxValue(value)
    {
        return programState.maxValue;
    }

    static init()
    {
        programState = new ProgramState();
        console.log(`[ProgramState]: initialized!`);
        return null;
    }
}

module.exports = {
    ProgramState
};
