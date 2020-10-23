const path = require('path');

let programState = null;

class ProgramState
{
    constructor()
    {
        this.maxValue = null;
        this.tenSecVals = [];
    }

    static setMaxValue(value)
    {
        programState.maxValue = Math.round(value / 1000);
        return null;
    }

    static getMaxValue()
    {
        return programState.maxValue;
    }

    static addMeasurementToAverage(value)
    {
        programState.tenSecVals.push(Math.round(value / 1000));
        if (programState.tenSecVals.length > 20)
            programState.tenSecVals.splice(0,1);
    }

    static fetchTenSecAvg()
    {
        const average = (accumulator, current) => accumulator + current;
        return Math.round(programState.tenSecVals.reduce(average) / programState.tenSecVals.length);
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
