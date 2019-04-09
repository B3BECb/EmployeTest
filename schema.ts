import { Model } from "mongoose";
import { RatedEntitieBase } from "./entities/RatedEntitieBase";
import { CommentableEntitieBase } from "./entities/CommentableEntitieBase";
import { JobEntitie } from "./entities/JobEntitie";

const mongoose = require('mongoose');

export class MongoContextFactory
{
	public AgeModel: Model<any>;
	public ApExpModel: Model<any>;
	public ApStudModel: Model<any>;
	public ExpModel: Model<any>;
	public StudModel: Model<any>;
	public FamModel: Model<any>;
	public PaymentModel: Model<any>;

	public JobModel: Model<any>;

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
			let commendableEntitiesSchema = new mongoose.Schema(CommentableEntitieBase.GetSchemaInfo());

			this.AgeModel     = mongoose.model("age", ratedEntitiesSchema);
			this.ApExpModel   = mongoose.model("apExp", commendableEntitiesSchema);
			this.ApStudModel  = mongoose.model("apStud", commendableEntitiesSchema);
			this.ExpModel     = mongoose.model("exp", ratedEntitiesSchema);
			this.StudModel    = mongoose.model("stud", ratedEntitiesSchema);
			this.FamModel     = mongoose.model("fam", ratedEntitiesSchema);
			this.PaymentModel = mongoose.model("payment", ratedEntitiesSchema);

			let jobSchema = new mongoose.Schema(JobEntitie.GetSchemaInfo());
			this.JobModel = mongoose.model("job", jobSchema);
		}

		return isConnected;
	}
}