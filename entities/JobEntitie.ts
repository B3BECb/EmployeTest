import { TestSysEntitieBase } from "./TestSysEntitieBase";
import { RatedEntitieBase } from "./RatedEntitieBase";

const mongoose = require('mongoose');
const Types    = mongoose.Schema.Types;

class JobEntitie
	extends TestSysEntitieBase
{
	public Studie: RatedEntitieBase;
	public Experience: RatedEntitieBase;
	public Payment: RatedEntitieBase;
	public Employment: string;
	public MinRate: number;

	constructor(name: string,
				age: RatedEntitieBase,
				studie: RatedEntitieBase,
				experience: RatedEntitieBase,
				familyType: RatedEntitieBase,
				payment: RatedEntitieBase,
				comment: string,
				employment: string,
				minRate: number)
	{
		super(name, age, familyType, comment);

		this.Studie     = studie;
		this.Experience = experience;
		this.Payment    = payment;
		this.Employment = employment;
		this.MinRate    = minRate;
	}

	public static GetSchemaInfo(): any
	{
		let base: any   = TestSysEntitieBase.GetSchemaInfo();
		base.Studie     = { type: Types.ObjectId, ref: "stud" };
		base.Experience = { type: Types.ObjectId, ref: "exp" };
		base.Payment    = { type: Types.ObjectId, ref: "payment" };
		base.Employment = Types.String;
		base.MinRate    = Types.Number;

		return base;
	}

	public static Represent(entry: JobEntitie): JobEntitie
	{
		let base        = TestSysEntitieBase.Represent(entry) as JobEntitie;
		base.Studie     = entry.Studie;
		base.Experience = entry.Experience;
		base.Payment    = entry.Payment;
		base.Employment = entry.Employment;
		base.MinRate    = entry.MinRate;
		return base;
	}

	public ToDbEntry(): any
	{
		let base        = super.ToDbEntry();
		base.Studie     = mongoose.Types.ObjectId(this.Studie.Id);
		base.Experience = mongoose.Types.ObjectId(this.Experience.Id);
		base.Payment    = mongoose.Types.ObjectId(this.Payment.Id);
		base.Employment = this.Employment;
		base.MinRate    = this.MinRate;
		return base;
	}
}

export { JobEntitie };