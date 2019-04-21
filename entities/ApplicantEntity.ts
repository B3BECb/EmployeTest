import { TestSysEntitieBase } from "./TestSysEntitieBase";
import { RatedEntitieBase } from "./RatedEntitieBase";
import { CommentableEntitieBase } from "./CommentableEntitieBase";
import { JobEntitie } from "./JobEntitie";

const mongoose = require('mongoose');
const Types    = mongoose.Schema.Types;

class ApplicantEntity
	extends TestSysEntitieBase
{
	public Studies: CommentableEntitieBase[];
	public Experiences: CommentableEntitieBase[];
	public Jobs: JobEntitie[];
	public Rate: number;
	public PsycoRate: number;
	public ProfRate: number;
	public BisnesRate: number;

	constructor(name: string,
				age: RatedEntitieBase,
				studies: CommentableEntitieBase[],
				experiences: CommentableEntitieBase[],
				familyType: RatedEntitieBase,
				comment: string,
				rate: number,
				psycoRate: number,
				profRate: number,
				bisnesRate: number)
	{
		super(name, age, familyType, comment);

		this.Studies     = studies;
		this.Experiences = experiences;
		this.Rate        = rate;
		this.PsycoRate   = psycoRate;
		this.ProfRate    = profRate;
		this.BisnesRate  = bisnesRate;
	}

	public static GetSchemaInfo(): any
	{
		let base: any    = TestSysEntitieBase.GetSchemaInfo();
		base.Studies     = [CommentableEntitieBase.GetSchemaInfo("stud")];
		base.Experiences = [CommentableEntitieBase.GetSchemaInfo("exp")];
		base.Jobs        = [{ type: Types.ObjectId, ref: "job" }];
		base.Employment  = Types.String;
		base.Rate        = Types.Number;

		return base;
	}

	public static Represent(entry: ApplicantEntity): ApplicantEntity
	{
		let base         = TestSysEntitieBase.Represent(entry) as ApplicantEntity;
		base.Studies     = entry.Studies.map(x => CommentableEntitieBase.Represent(x));
		base.Experiences = entry.Experiences.map(x => CommentableEntitieBase.Represent(x));
		base.Jobs        = entry.Jobs.map(x => JobEntitie.Represent(x));
		base.Rate        = entry.Rate;
		return base;
	}

	public static IncludeDependencies()
	{
		return [...TestSysEntitieBase.IncludeDependencies(), { path: 'RatedEntitie' }];
	}

	public ToDbEntry(): any
	{
		let base         = super.ToDbEntry();
		base.Studies     = this.Studies.map(x => x.ToDbEntry());
		base.Experiences = this.Experiences.map(x => x.ToDbEntry());
		base.Jobs        = this.Jobs
						   ? this.Jobs.map(x => mongoose.Types.ObjectId(x.Id))
						   : [];
		base.Rate        = this.Rate;
		return base;
	}
}

export { ApplicantEntity };