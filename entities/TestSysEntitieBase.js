"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TestSysDbEntry_1 = require("./TestSysDbEntry");
const mongoose = require('mongoose');
const Types = mongoose.Schema.Types;
class TestSysEntitieBase extends TestSysDbEntry_1.TestSysDbEntry {
    constructor(name, age, familyType, comment) {
        super();
        this.Age = age;
        this.Comment = comment;
        this.Family = familyType;
        this.Name = name;
    }
    static GetSchemaInfo() {
        return {
            Name: Types.String,
            Comment: Types.String,
            Age: { type: Types.ObjectId, ref: "age" },
            Family: { type: Types.ObjectId, ref: "fam" },
        };
    }
    static Represent(entry) {
        let represented = new TestSysEntitieBase(entry.Name, entry.Age, entry.Family, entry.Comment);
        represented.Id = entry._id.toString();
        return represented;
    }
    ToDbEntry() {
        return {
            Age: mongoose.Types.ObjectId(this.Age.Id),
            Comment: this.Comment,
            Family: mongoose.Types.ObjectId(this.Family.Id),
            Name: this.Name,
        };
    }
}
exports.TestSysEntitieBase = TestSysEntitieBase;
//# sourceMappingURL=TestSysEntitieBase.js.map