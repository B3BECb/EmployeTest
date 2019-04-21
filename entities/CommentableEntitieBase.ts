import { RatedEntitieBase } from "./RatedEntitieBase";

const mongoose = require('mongoose');
const Types    = mongoose.Schema.Types;

class CommentableEntitieBase
{
	public RatedEntitie: RatedEntitieBase;
	public Comment: string;

	constructor(ratedEntitie: RatedEntitieBase, comment: string)
	{
		this.RatedEntitie = ratedEntitie;
		this.Comment = comment;
	}

	public static GetSchemaInfo(ref: string): any
	{
		return {
			RatedEntitie: { type: Types.ObjectId, ref: ref },
			Comment: Types.String
		};
	}

	public static Represent(entry: CommentableEntitieBase): CommentableEntitieBase
	{
		let ratedEntitie = RatedEntitieBase.Represent(entry.RatedEntitie) as RatedEntitieBase;

		return new CommentableEntitieBase(ratedEntitie, entry.Comment);
	}

	public static IncludeDependencies()
	{
		return [{ path: 'RatedEntitie' }];
	}

	public ToDbEntry(): any
	{
		return {
			RatedEntitie: mongoose.Types.ObjectId(this.RatedEntitie.Id),
			Comment: this.Comment,
		}
	}
}

export { CommentableEntitieBase };