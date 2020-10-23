const path = require('path');

let programState = null;

class ProgramState
{
    constructor()
    {
        this.maxValue = null;
        this.fiveSecVals = [];
    }

    static setMaxValue(value)
    {
        programState.maxValue = value;
        return null;
    }

    static getMaxValue()
    {
        return programState.maxValue;
    }

    static addMeasurementToAverage(value)
    {
        programState.fiveSecVals.push(value);
        if (programState.fiveSecVals.length > 10)
            programState.fiveSecVals.splice(0,1);
    }

    static fetchTenSecAvg()
    {
        const average = (accumulator, current) => accumulator + current;
        return Math.round(programState.fiveSecVals.reduce(average) / programState.fiveSecVals.length);
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
