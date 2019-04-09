import { RatedEntitieBase } from "./RatedEntitieBase";
import { TestSysDbEntry } from "./TestSysDbEntry";

const mongoose = require('mongoose');
const Types    = mongoose.Schema.Types;

class TestSysEntitieBase
	extends TestSysDbEntry
{
	public Id: string;
	public Name: string;
	public Age: RatedEntitieBase;
	public Family: RatedEntitieBase;
	public Comment: string;

	constructor(name: string,
				age: RatedEntitieBase,
				familyType: RatedEntitieBase,
				comment: string)
	{
		super();

		this.Age     = age;
		this.Comment = comment;
		this.Family  = familyType;
		this.Name    = name;
	}

	public static GetSchemaInfo(): any
	{
		return {
			Name:    Types.String,
			Comment: Types.String,
			Age:     { type: Types.ObjectId, ref: "age" },
			Family:  { type: Types.ObjectId, ref: "fam" },
		};
	}

	public static Represent(entry: TestSysEntitieBase): TestSysEntitieBase
	{
		let represented = new TestSysEntitieBase(entry.Name,
			entry.Age,
			entry.Family,
			entry.Comment);
		represented.Id  = (entry as any)._id.toString();
		return represented;
	}

	public ToDbEntry(): any
	{
		return {
			Age:     mongoose.Types.ObjectId(this.Age.Id),
			Comment: this.Comment,
			Family:  mongoose.Types.ObjectId(this.Family.Id),
			Name:    this.Name,
		};
	}
}

export { TestSysEntitieBase };