import { MongoContextFactory } from "./schema";
import { AppConsts } from "./appConsts";

import {DbCreator} from "./mongoModule";
import { WindowsController } from "./WindowsController";

namespace Pages.Index
{
	console.log('mongo use');

	class Main
	{
		Factory: MongoContextFactory;

		constructor()
		{
			this.Factory = new MongoContextFactory(AppConsts.dbName, AppConsts.mongoPort);
		}

		async Start()
		{
			let percent = document.querySelector('[data-id="percent"]');
			let status = document.querySelector('[data-id="status"]');

			percent.textContent = "0%";
			status.textContent = "Подключение к БД...";

			if(!await this.Factory.TryConnectAsync())
			{
				alert(`Не удалось подключиться к локальной БД ${AppConsts.dbName} по порту ${AppConsts.mongoPort}`)
				status.textContent = "Ошибка подключения к БД...";
			}

			percent.textContent = "10%";
			status.textContent = "Верификация данных БД...";

			try
			{
				if(!await DbCreator.IsDbInitialized(this.Factory))
				{
					percent.textContent = "11%";
					status.textContent  = "Инициализация данных БД...";
					await DbCreator.InitializeDb(this.Factory, percent, status);
				}

				percent.textContent = "100%";
				status.textContent  = "Готово";
			}
			catch(exc)
			{
				console.error(exc);
			}
		}
	}

	let main = new Main();
	let wndController = new WindowsController();

	let initialize = async () =>
	{
		await main.Start();
		wndController.ShowStartDialog();
	};

	initialize();
}