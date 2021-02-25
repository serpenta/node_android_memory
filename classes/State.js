// let programState = null;

class ProgramState
{
    static jobDone = null;
    static maxValue = null;
    static tenSecVals = [];

    static setJobDone()
    {
        this.jobDone = true;
        return null;
    }

    static resetJobDone()
    {
        this.jobDone = false;
        return null;
    }

    static resetAverage()
    {
        this.tenSecVals = [];
        return null;
    }

    static setMaxValue(value)
    {
        this.maxValue = Math.round(value / 1000);
        return null;
    }

    static getJobDone()
    {
        return this.jobDone;
    }

    static getCurrentValue()
    {
        return this.tenSecVals[this.tenSecVals.length -1];
    }

    static getMaxValue()
    {
        return this.maxValue;
    }

    static addMeasurementToAverage(value)
    {
        this.tenSecVals.push(value);
        if (this.tenSecVals.length > 20)
            this.tenSecVals.splice(0,1);
    }

    static fetchTenSecAvg()
    {
        const average = (accumulator, current) => accumulator + current;
        return Math.round(this.tenSecVals.reduce(average) / this.tenSecVals.length / 1000);
    }

    static init()
    {
        this.jobDone = false;
        console.log(`[ProgramState]: initialized!`);
        return null;
    }
}

module.exports = {
    ProgramState
};
