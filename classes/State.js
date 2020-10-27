const path = require('path');

let programState = null;

class ProgramState
{
    constructor()
    {
        this.jobDone = null;
        this.maxValue = null;
        this.tenSecVals = [];
    }

    static setJobDone()
    {
        programState.jobDone = true;
        return null;
    }

    static resetJobDone()
    {
        programState.jobDone = false;
        return null;
    }

    static setMaxValue(value)
    {
        programState.maxValue = Math.round(value / 1000);
        return null;
    }

    static getJobDone()
    {
        return programState.jobDone;
    }

    static getCurrentValue()
    {
        return programState.tenSecVals[programState.tenSecVals.length -1];
    }

    static getMaxValue()
    {
        return programState.maxValue;
    }

    static addMeasurementToAverage(value)
    {
        programState.tenSecVals.push(value);
        if (programState.tenSecVals.length > 20)
            programState.tenSecVals.splice(0,1);
    }

    static fetchTenSecAvg()
    {
        const average = (accumulator, current) => accumulator + current;
        return Math.round(programState.tenSecVals.reduce(average) / programState.tenSecVals.length / 1000);
    }

    static init()
    {
        programState = new ProgramState();
        programState.jobDone = false;
        console.log(`[ProgramState]: initialized!`);
        return null;
    }
}

module.exports = {
    ProgramState
};
