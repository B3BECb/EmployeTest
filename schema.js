"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RatedEntitieBase_1 = require("./entities/RatedEntitieBase");
const JobEntitie_1 = require("./entities/JobEntitie");
const ApplicantEntity_1 = require("./entities/ApplicantEntity");
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
            this.AgeModel = mongoose.model("age", ratedEntitiesSchema);
            this.ExpModel = mongoose.model("exp", ratedEntitiesSchema);
            this.StudModel = mongoose.model("stud", ratedEntitiesSchema);
            this.FamModel = mongoose.model("fam", ratedEntitiesSchema);
            this.PaymentModel = mongoose.model("payment", ratedEntitiesSchema);
            let jobSchema = new mongoose.Schema(JobEntitie_1.JobEntitie.GetSchemaInfo());
            this.JobModel = mongoose.model("job", jobSchema);
            let applicantSchema = new mongoose.Schema(ApplicantEntity_1.ApplicantEntity.GetSchemaInfo());
            this.ApplicantModel = mongoose.model("applicant", applicantSchema);
        }
        return isConnected;
    }
    async SelectAsync(model, object, filter) {
        return await new Promise((resolve, reject) => {
            let dependencies = object.IncludeDependencies();
            model.find(filter)
                .populate(dependencies)
                .exec((err, res) => {
                if (err) {
                    console.error(err);
                    reject();
                }
                let represented = res.map(x => object.Represent(x));
                resolve(represented);
            });
        });
    }
    async SaveAsync(dbEntry, represent) {
        return new Promise((resolve, reject) => {
            dbEntry.save(function (err, dbEntry) {
                if (err) {
                    console.error(err);
                    reject();
                }
                resolve(represent(dbEntry));
            });
        });
    }
}
exports.MongoContextFactory = MongoContextFactory;
//# sourceMappingURL=schema.js.map