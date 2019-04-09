"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RatedEntitieBase_1 = require("./entities/RatedEntitieBase");
const CommentableEntitieBase_1 = require("./entities/CommentableEntitieBase");
const JobEntitie_1 = require("./entities/JobEntitie");
const mongoose = require('mongoose');
class MongoContextFactory {
    constructor(dbName, port) {
        this.url = `mongodb://localhost:${port}/${dbName}`;
    }
    async TryConnectAsync() {
        console.log("try connect to ", this.url);
        let db = mongoose.connection;
        let isConnected = await new Promise((resolve) => {
            mongoose.connect(this.url, { useNewUrlParser: true });
            db.on('error', () => {
                console.error.bind(console, 'connection error:');
                resolve(false);
            });
            db.once('open', () => {
                console.log("connected to ", this.url);
                resolve(true);
            });
        });
        if (isConnected) {
            let ratedEntitiesSchema = new mongoose.Schema(RatedEntitieBase_1.RatedEntitieBase.GetSchemaInfo());
            let commendableEntitiesSchema = new mongoose.Schema(CommentableEntitieBase_1.CommentableEntitieBase.GetSchemaInfo());
            this.AgeModel = mongoose.model("age", ratedEntitiesSchema);
            this.ApExpModel = mongoose.model("apExp", commendableEntitiesSchema);
            this.ApStudModel = mongoose.model("apStud", commendableEntitiesSchema);
            this.ExpModel = mongoose.model("exp", ratedEntitiesSchema);
            this.StudModel = mongoose.model("stud", ratedEntitiesSchema);
            this.FamModel = mongoose.model("fam", ratedEntitiesSchema);
            this.PaymentModel = mongoose.model("payment", ratedEntitiesSchema);
            let jobSchema = new mongoose.Schema(JobEntitie_1.JobEntitie.GetSchemaInfo());
            this.JobModel = mongoose.model("job", jobSchema);
        }
        return isConnected;
    }
}
exports.MongoContextFactory = MongoContextFactory;
//# sourceMappingURL=schema.js.map