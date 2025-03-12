export class EvaluateConfig {
    client = {
        schoolID: "39xxx",
        citizenID: "150xxxxxxxxxx"
    }

    configuration = {
        sdq: false,
        apitude: false,
        teacher: false,
        teacherStatistic: new Array(20).fill(undefined).map((_, i) => {
            return {
                index: i,

                good_probability: 50,
                fair_probability: 35,
                poor_probability: 15
            }
        }),
    
        evaluateDelay: 500
    }

    constructor({
        _schoolID,
        _citizenID,
        _evaluateType,
        _evaluateDelay = 500
    }) {

        if (String(_evaluateType).toLowerCase() == "sdq") this.configuration.sdq = true;
        if (String(_evaluateType).toLowerCase() == "apitude") this.configuration.apitude = true;
        if (String(_evaluateType).toLowerCase() == "teacher") this.configuration.teacher = true;

        this.configuration.evaluateDelay = _evaluateDelay;
        this.client.citizenID = _citizenID;
        this.client.schoolID = _schoolID;
    }
}