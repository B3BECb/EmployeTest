import { RatedEntitieBase } from "./RatedEntitieBase";

const mongoose = require('mongoose');
const Types    = mongoose.Schema.Types;

class CommentableEntitieBase
	extends RatedEntitieBase
{
	public Comment: string;

	constructor(value: string, rate: number, comment: string)
	{
		super(value, rate);
		this.Comment = comment;
	}

	public static GetSchemaInfo(): any
	{
		let base: any = RatedEntitieBase.GetSchemaInfo();
		base.Comment  = Types.String;

		return base;
	}

	public static Represent(entry: CommentableEntitieBase): CommentableEntitieBase
	{
		let base     = RatedEntitieBase.Represent(entry) as CommentableEntitieBase;
		base.Comment = entry.Comment;
		return base;
	}
}

export { CommentableEntitieBase };