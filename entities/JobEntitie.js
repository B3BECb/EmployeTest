"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TestSysEntitieBase_1 = require("./TestSysEntitieBase");
const mongoose = require('mongoose');
const Types = mongoose.Schema.Types;
class JobEntitie extends TestSysEntitieBase_1.TestSysEntitieBase {
    constructor(name, age, studie, experience, familyType, payment, comment, employment, minRate) {
        super(name, age, familyType, comment);
        this.Studie = studie;
        this.Experience = experience;
        this.Payment = payment;
        this.Employment = employment;
        this.MinRate = minRate;
    }
    static GetSchemaInfo() {
        let base = TestSysEntitieBase_1.TestSysEntitieBase.GetSchemaInfo();
        base.Studie = { type: Types.ObjectId, ref: "stud" };
        base.Experience = { type: Types.ObjectId, ref: "exp" };
        base.Payment = { type: Types.ObjectId, ref: "payment" };
        base.Employment = Types.String;
        base.MinRate = Types.Number;
        return base;
    }
    static Represent(entry) {
        let base = TestSysEntitieBase_1.TestSysEntitieBase.Represent(entry);
        base.Studie = entry.Studie;
        base.Experience = entry.Experience;
        base.Payment = entry.Payment;
        base.Employment = entry.Employment;
        base.MinRate = entry.MinRate;
        return base;
    }
    ToDbEntry() {
        let base = super.ToDbEntry();
        base.Studie = mongoose.Types.ObjectId(this.Studie.Id);
        base.Experience = mongoose.Types.ObjectId(this.Experience.Id);
        base.Payment = mongoose.Types.ObjectId(this.Payment.Id);
        base.Employment = this.Employment;
        base.MinRate = this.MinRate;
        return base;
    }
}
exports.JobEntitie = JobEntitie;
//# sourceMappingURL=JobEntitie.js.map