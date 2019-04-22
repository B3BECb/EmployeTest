"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TestSysDbEntry_1 = require("./TestSysDbEntry");
const mongoose = require('mongoose');
const Types = mongoose.Schema.Types;
class RatedEntitieBase extends TestSysDbEntry_1.TestSysDbEntry {
    constructor(value, rate) {
        super();
        this.Value = value;
        this.Rate = rate;
    }
    static GetSchemaInfo() {
        return {
            Value: Types.String,
            Rate: Types.Number,
        };
    }
    static Represent(entry) {
        let represented = new RatedEntitieBase(entry.Value, entry.Rate);
        represented.Id = entry._id.toString();
        return represented;
    }
}
exports.RatedEntitieBase = RatedEntitieBase;
//# sourceMappingURL=RatedEntitieBase.js.map