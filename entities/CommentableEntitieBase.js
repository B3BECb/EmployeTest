"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RatedEntitieBase_1 = require("./RatedEntitieBase");
const mongoose = require('mongoose');
const Types = mongoose.Schema.Types;
class CommentableEntitieBase {
    constructor(ratedEntitie, comment) {
        this.RatedEntitie = ratedEntitie;
        this.Comment = comment;
    }
    static GetSchemaInfo(ref) {
        return {
            RatedEntitie: { type: Types.ObjectId, ref: ref },
            Comment: Types.String
        };
    }
    static Represent(entry) {
        let ratedEntitie = RatedEntitieBase_1.RatedEntitieBase.Represent(entry.RatedEntitie);
        return new CommentableEntitieBase(ratedEntitie, entry.Comment);
    }
    static IncludeDependencies() {
        return [{ path: 'RatedEntitie' }];
    }
    ToDbEntry() {
        return {
            RatedEntitie: mongoose.Types.ObjectId(this.RatedEntitie.Id),
            Comment: this.Comment,
        };
    }
}
exports.CommentableEntitieBase = CommentableEntitieBase;
//# sourceMappingURL=CommentableEntitieBase.js.map