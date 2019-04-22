"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TestSysEntitieBase_1 = require("./TestSysEntitieBase");
const CommentableEntitieBase_1 = require("./CommentableEntitieBase");
const JobEntitie_1 = require("./JobEntitie");
const mongoose = require('mongoose');
const Types = mongoose.Schema.Types;
class ApplicantEntity extends TestSysEntitieBase_1.TestSysEntitieBase {
    constructor(name, age, studies, experiences, familyType, comment, rate, psycoRate, profRate, bisnesRate) {
        super(name, age, familyType, comment);
        this.Studies = studies;
        this.Experiences = experiences;
        this.Rate = rate;
        this.PsycoRate = psycoRate;
        this.ProfRate = profRate;
        this.BisnesRate = bisnesRate;
    }
    static GetSchemaInfo() {
        let base = TestSysEntitieBase_1.TestSysEntitieBase.GetSchemaInfo();
        base.Studies = [CommentableEntitieBase_1.CommentableEntitieBase.GetSchemaInfo("stud")];
        base.Experiences = [CommentableEntitieBase_1.CommentableEntitieBase.GetSchemaInfo("exp")];
        base.Jobs = [{ type: Types.ObjectId, ref: "job" }];
        base.Employment = Types.String;
        base.Rate = Types.Number;
        return base;
    }
    static Represent(entry) {
        let base = TestSysEntitieBase_1.TestSysEntitieBase.Represent(entry);
        base.Studies = entry.Studies.map(x => CommentableEntitieBase_1.CommentableEntitieBase.Represent(x));
        base.Experiences = entry.Experiences.map(x => CommentableEntitieBase_1.CommentableEntitieBase.Represent(x));
        base.Jobs = entry.Jobs.map(x => JobEntitie_1.JobEntitie.Represent(x));
        base.Rate = entry.Rate;
        return base;
    }
    static IncludeDependencies() {
        return [...TestSysEntitieBase_1.TestSysEntitieBase.IncludeDependencies(), { path: 'RatedEntitie' }];
    }
    ToDbEntry() {
        let base = super.ToDbEntry();
        base.Studies = this.Studies.map(x => x.ToDbEntry());
        base.Experiences = this.Experiences.map(x => x.ToDbEntry());
        base.Jobs = this.Jobs
            ? this.Jobs.map(x => mongoose.Types.ObjectId(x.Id))
            : [];
        base.Rate = this.Rate;
        return base;
    }
}
exports.ApplicantEntity = ApplicantEntity;
//# sourceMappingURL=ApplicantEntity.js.map