import { MongoContextFactory } from "./schema";
import { RatedEntitieBase } from "./entities/RatedEntitieBase";
import { CommentableEntitieBase } from "./entities/CommentableEntitieBase";
import { Model } from "mongoose";
import { JobEntitie } from "./entities/JobEntitie";

class DbCreator
{
	static async IsDbInitialized(factory: MongoContextFactory): Promise<boolean>
	{
		return await new Promise((resolve) =>
		{
			factory.AgeModel.countDocuments("*", function(err, count)
			{
				if(err)
				{
					console.error(err);
					resolve(false);
				}
				if(count)
				{
					resolve(true);
				}
				else
				{
					resolve(false);
				}
			});
		});
	}

	static async InitializeDb(factory: MongoContextFactory,
							  percent: Node,
							  status: Node): Promise<void>
	{
		let dbDataImplementor = new DbDataImpl();
		try
		{
			console.log("creating age data");
			percent.textContent = "12%";
			status.textContent  = "Заполнение коллекции возрастов...";
			await dbDataImplementor.ImplAgeData(factory.AgeModel);

			console.log("creating experience data");
			percent.textContent = "16%";
			status.textContent  = "Заполнение коллекции опыта работы...";
			await dbDataImplementor.ImplExpData(factory.ExpModel);

			console.log("creating family type data");
			percent.textContent = "20%";
			status.textContent  = "Заполнение коллекции типа семьи...";
			await dbDataImplementor.ImplFamData(factory.FamModel);

			console.log("creating studied data");
			percent.textContent = "22%";
			status.textContent  = "Заполнение коллекции типа образования...";
			await dbDataImplementor.ImplStudData(factory.StudModel);

			console.log("creating payment data");
			percent.textContent = "27%";
			status.textContent  = "Заполнение коллекции оплаты труда...";
			await dbDataImplementor.ImplPaymentData(factory.PaymentModel);

			console.log("creating jobs");
			percent.textContent = "29%";
			status.textContent  = "Заполнение коллекции вакансий...";
			await dbDataImplementor.ImplJobsData(factory.JobModel);
		}
		catch(exc)
		{
			status.textContent += " Ошибка";
			throw exc;
		}
	}
}

class DbDataImpl
{
	_ages: RatedEntitieBase[];
	_fams: RatedEntitieBase[];
	_exps: RatedEntitieBase[];
	_pays: RatedEntitieBase[];
	_studs: RatedEntitieBase[];

	_jobs: JobEntitie[];

	constructor()
	{
		this._ages  = [];
		this._fams  = [];
		this._exps  = [];
		this._pays  = [];
		this._studs = [];

		this._jobs = [];
	}

	public async ImplAgeData(ageModel: Model<any>)
	{
		let entry   = new ageModel(new RatedEntitieBase("< 18", 5));
		let dbEntry = await this.Save(entry, RatedEntitieBase.Represent);
		this._ages.push(dbEntry as RatedEntitieBase);

		entry   = new ageModel(new RatedEntitieBase("18-20", 10));
		dbEntry = await this.Save(entry, RatedEntitieBase.Represent);
		this._ages.push(dbEntry as RatedEntitieBase);

		entry   = new ageModel(new RatedEntitieBase("21-40", 30));
		dbEntry = await this.Save(entry, RatedEntitieBase.Represent);
		this._ages.push(dbEntry as RatedEntitieBase);

		entry   = new ageModel(new RatedEntitieBase("41-50", 20));
		dbEntry = await this.Save(entry, RatedEntitieBase.Represent);
		this._ages.push(dbEntry as RatedEntitieBase);

		entry   = new ageModel(new RatedEntitieBase("> 51", 5));
		dbEntry = await this.Save(entry, RatedEntitieBase.Represent);
		this._ages.push(dbEntry as RatedEntitieBase);
	}

	public async ImplFamData(famModel: Model<any>)
	{
		let entry   = new famModel(new RatedEntitieBase("Холост/не замужем", 30));
		let dbEntry = await this.Save(entry, RatedEntitieBase.Represent);
		this._fams.push(dbEntry as RatedEntitieBase);

		entry   = new famModel(new RatedEntitieBase("Женат/замужем", 30));
		dbEntry = await this.Save(entry, RatedEntitieBase.Represent);
		this._fams.push(dbEntry as RatedEntitieBase);

		entry   = new famModel(new RatedEntitieBase("Есть ребёнок", 20));
		dbEntry = await this.Save(entry, RatedEntitieBase.Represent);
		this._fams.push(dbEntry as RatedEntitieBase);

		entry   = new famModel(new RatedEntitieBase("Есть дети", 10));
		dbEntry = await this.Save(entry, RatedEntitieBase.Represent);
		this._fams.push(dbEntry as RatedEntitieBase);
	}

	public async ImplExpData(famModel: Model<any>)
	{
		let entry   = new famModel(new RatedEntitieBase("Нет", 0));
		let dbEntry = await this.Save(entry, RatedEntitieBase.Represent);
		this._exps.push(dbEntry as RatedEntitieBase);

		entry   = new famModel(new RatedEntitieBase("< 1 года", 5));
		dbEntry = await this.Save(entry, RatedEntitieBase.Represent);
		this._exps.push(dbEntry as RatedEntitieBase);

		entry   = new famModel(new RatedEntitieBase("1 год", 10));
		dbEntry = await this.Save(entry, RatedEntitieBase.Represent);
		this._exps.push(dbEntry as RatedEntitieBase);

		entry   = new famModel(new RatedEntitieBase("2 года", 15));
		dbEntry = await this.Save(entry, RatedEntitieBase.Represent);
		this._exps.push(dbEntry as RatedEntitieBase);

		entry   = new famModel(new RatedEntitieBase("более 2 лет", 20));
		dbEntry = await this.Save(entry, RatedEntitieBase.Represent);
		this._exps.push(dbEntry as RatedEntitieBase);
	}

	public async ImplStudData(famModel: Model<any>)
	{
		let entry   = new famModel(new RatedEntitieBase("Нет", 0));
		let dbEntry = await this.Save(entry, RatedEntitieBase.Represent);
		this._studs.push(dbEntry as RatedEntitieBase);

		entry   = new famModel(new RatedEntitieBase("Не оконченное среднее", 0));
		dbEntry = await this.Save(entry, RatedEntitieBase.Represent);
		this._studs.push(dbEntry as RatedEntitieBase);

		entry   = new famModel(new RatedEntitieBase("Среднее", 1));
		dbEntry = await this.Save(entry, RatedEntitieBase.Represent);
		this._studs.push(dbEntry as RatedEntitieBase);

		entry   = new famModel(new RatedEntitieBase("Среднее специальное", 3));
		dbEntry = await this.Save(entry, RatedEntitieBase.Represent);
		this._studs.push(dbEntry as RatedEntitieBase);

		entry   = new famModel(new RatedEntitieBase("IT-курсы", 5));
		dbEntry = await this.Save(entry, RatedEntitieBase.Represent);
		this._studs.push(dbEntry as RatedEntitieBase);

		entry   = new famModel(new RatedEntitieBase("Среднее специальное IT-направление", 10));
		dbEntry = await this.Save(entry, RatedEntitieBase.Represent);
		this._studs.push(dbEntry as RatedEntitieBase);

		entry   = new famModel(new RatedEntitieBase("Не полное высшее", 10));
		dbEntry = await this.Save(entry, RatedEntitieBase.Represent);
		this._studs.push(dbEntry as RatedEntitieBase);

		entry   = new famModel(new RatedEntitieBase("Не полное высшее IT-направление", 15));
		dbEntry = await this.Save(entry, RatedEntitieBase.Represent);
		this._studs.push(dbEntry as RatedEntitieBase);

		entry   = new famModel(new RatedEntitieBase("Высшее", 15));
		dbEntry = await this.Save(entry, RatedEntitieBase.Represent);
		this._studs.push(dbEntry as RatedEntitieBase);

		entry   = new famModel(new RatedEntitieBase("Высшее IT-направление", 20));
		dbEntry = await this.Save(entry, RatedEntitieBase.Represent);
		this._studs.push(dbEntry as RatedEntitieBase);

		entry   = new famModel(new RatedEntitieBase("Кандидат наук", 30));
		dbEntry = await this.Save(entry, RatedEntitieBase.Represent);
		this._studs.push(dbEntry as RatedEntitieBase);

		entry   = new famModel(new RatedEntitieBase("Кандидат технических наук", 40));
		dbEntry = await this.Save(entry, RatedEntitieBase.Represent);
		this._studs.push(dbEntry as RatedEntitieBase);
	}

	public async ImplPaymentData(paymentModel: Model<any>)
	{
		let entry   = new paymentModel(new RatedEntitieBase("10000", 10));
		let dbEntry = await this.Save(entry, RatedEntitieBase.Represent);
		this._pays.push(dbEntry as RatedEntitieBase);

		entry   = new paymentModel(new RatedEntitieBase("15000", 12));
		dbEntry = await this.Save(entry, RatedEntitieBase.Represent);
		this._pays.push(dbEntry as RatedEntitieBase);

		entry   = new paymentModel(new RatedEntitieBase("30000", 25));
		dbEntry = await this.Save(entry, RatedEntitieBase.Represent);
		this._pays.push(dbEntry as RatedEntitieBase);

		entry   = new paymentModel(new RatedEntitieBase("50000", 40));
		dbEntry = await this.Save(entry, RatedEntitieBase.Represent);
		this._pays.push(dbEntry as RatedEntitieBase);

		entry   = new paymentModel(new RatedEntitieBase("60000", 50));
		dbEntry = await this.Save(entry, RatedEntitieBase.Represent);
		this._pays.push(dbEntry as RatedEntitieBase);
	}

	public async ImplJobsData(jobModel: Model<any>)
	{
		let job     = new JobEntitie("Тестировщик",
			this._ages[0],
			this._studs[2],
			this._exps[0],
			this._fams[3],
			this._pays[0],
			"Тесирование приложений",
			"Рабочая неделя",
			0);
		let entry   = new jobModel(job.ToDbEntry());
		let dbEntry = await this.Save(entry, RatedEntitieBase.Represent);
		this._jobs.push(dbEntry as JobEntitie);

		job     = new JobEntitie("Системный администратор",
			this._ages[2],
			this._studs[5],
			this._exps[1],
			this._fams[1],
			this._pays[1],
			"Системный администратор",
			"Рабочая неделя",
			30);
		entry   = new jobModel(job.ToDbEntry());
		dbEntry = await this.Save(entry, RatedEntitieBase.Represent);
		this._jobs.push(dbEntry as JobEntitie);

		job     = new JobEntitie("Программист",
			this._ages[2],
			this._studs[7],
			this._exps[2],
			this._fams[1],
			this._pays[2],
			"Системный администратор",
			"Рабочая неделя",
			35);
		entry   = new jobModel(job.ToDbEntry());
		dbEntry = await this.Save(entry, RatedEntitieBase.Represent);
		this._jobs.push(dbEntry as JobEntitie);

		job     = new JobEntitie("Менеджер направления",
			this._ages[3],
			this._studs[9],
			this._exps[4],
			this._fams[2],
			this._pays[3],
			"Менеджер направления разработки ПО",
			"Рабочая неделя",
			40);
		entry   = new jobModel(job.ToDbEntry());
		dbEntry = await this.Save(entry, RatedEntitieBase.Represent);
		this._jobs.push(dbEntry as JobEntitie);
	}

	private async Save<T>(dbEntry: any, represent: Function): Promise<T>
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

export { DbCreator };