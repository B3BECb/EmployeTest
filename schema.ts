import { Model } from "mongoose";
import { RatedEntitieBase } from "./entities/RatedEntitieBase";
import { CommentableEntitieBase } from "./entities/CommentableEntitieBase";
import { JobEntitie } from "./entities/JobEntitie";
import { ApplicantEntity } from "./entities/ApplicantEntity";

const mongoose = require('mongoose');

export class MongoContextFactory
{
	public AgeModel: Model<any>;
	// public ApExpModel: Model<any>;
	// public ApStudModel: Model<any>;
	public ExpModel: Model<any>;
	public StudModel: Model<any>;
	public FamModel: Model<any>;
	public PaymentModel: Model<any>;

	public JobModel: Model<any>;
	public ApplicantModel: Model<any>;

	private readonly url: string;

	constructor(dbName, port)
	{
		this.url = `mongodb://localhost:${ port }/${ dbName }`;
	}

	async TryConnectAsync(): Promise<boolean>
	{
		console.log("try connect to ", this.url);

		let db = mongoose.connection;

		let isConnected: boolean = await new Promise((resolve) =>
		{
			mongoose.connect(this.url, { useNewUrlParser: true });

			db.on('error', () =>
			{
				console.error.bind(console, 'connection error:');
				resolve(false);
			});

			db.once('open', () =>
			{
				console.log("connected to ", this.url);
				resolve(true);
			});
		});

		if(isConnected)
		{
			let ratedEntitiesSchema       = new mongoose.Schema(RatedEntitieBase.GetSchemaInfo());
			// let commendableEntitiesSchema = new mongoose.Schema(CommentableEntitieBase.GetSchemaInfo());

			this.AgeModel     = mongoose.model("age", ratedEntitiesSchema);
			// this.ApExpModel   = mongoose.model("apExp", commendableEntitiesSchema);
			// this.ApStudModel  = mongoose.model("apStud", commendableEntitiesSchema);
			this.ExpModel     = mongoose.model("exp", ratedEntitiesSchema);
			this.StudModel    = mongoose.model("stud", ratedEntitiesSchema);
			this.FamModel     = mongoose.model("fam", ratedEntitiesSchema);
			this.PaymentModel = mongoose.model("payment", ratedEntitiesSchema);

			let jobSchema = new mongoose.Schema(JobEntitie.GetSchemaInfo());
			this.JobModel = mongoose.model("job", jobSchema);

			let applicantSchema = new mongoose.Schema(ApplicantEntity.GetSchemaInfo());
			this.ApplicantModel = mongoose.model("applicant", applicantSchema);
		}

		return isConnected;
	}

	public async SelectAsync<T>(model: Model<any>, represent: Function, filter: object): Promise<T[]>
	{
		return await new Promise((resolve, reject) =>
		{
			model.find(filter, (err, res) =>
			{
				if(err)
				{
					console.error(err);
					reject();
				}

				let represented: T[] = res.map(x => represent(x));

				resolve(represented);
			});
		});
	}

	public async SaveAsync<T>(dbEntry: any, represent: Function): Promise<T>
	{
		return new Promise((resolve, reject) =>
		{
			dbEntry.save(function(err, dbEntry)
			{
				if(err)
				{
					console.error(err);
					reject();
				}

				resolve(represent(dbEntry));
			});
		});
	}
}