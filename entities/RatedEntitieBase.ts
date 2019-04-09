import { TestSysDbEntry } from "./TestSysDbEntry";

const mongoose = require('mongoose');
const Types    = mongoose.Schema.Types;

class RatedEntitieBase
	extends TestSysDbEntry
{
	Id: string;
	Value: string;
	Rate: number;

	constructor(value: string, rate: number)
	{
		super();

		this.Value = value;
		this.Rate  = rate;
	}

	public static GetSchemaInfo(): any
	{
		return {
			Value: Types.String,
			Rate:  Types.Number,
		};
	}

	public static Represent(entry: RatedEntitieBase): RatedEntitieBase
	{
		let represented = new RatedEntitieBase(entry.Value, entry.Rate);
		represented.Id = (entry as any)._id.toString();
		return represented;
	}
}

export { RatedEntitieBase };