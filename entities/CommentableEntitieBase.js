"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RatedEntitieBase_1 = require("./RatedEntitieBase");
const mongoose = require('mongoose');
const Types = mongoose.Schema.Types;
class CommentableEntitieBase extends RatedEntitieBase_1.RatedEntitieBase {
    constructor(value, rate, comment) {
        super(value, rate);
        this.Comment = comment;
    }
    static GetSchemaInfo() {
        let base = RatedEntitieBase_1.RatedEntitieBase.GetSchemaInfo();
        base.Comment = Types.String;
        return base;
    }
    static Represent(entry) {
        let base = RatedEntitieBase_1.RatedEntitieBase.Represent(entry);
        base.Comment = entry.Comment;
        return base;
    }
}
exports.CommentableEntitieBase = CommentableEntitieBase;
//# sourceMappingURL=CommentableEntitieBase.js.map