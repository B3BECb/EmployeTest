import { MongoContextFactory } from "./schema";
import { AppConsts } from "./appConsts";

import {DbCreator} from "./mongoModule";

namespace Pages.Index
{
	console.log('mongo use');

	let start = async () =>
	{
		let percent = document.querySelector('[data-id="percent"]');
		let status = document.querySelector('[data-id="status"]');

		percent.textContent = "0%";
		status.textContent = "Подключение к БД...";

		let factory = new MongoContextFactory(AppConsts.dbName, AppConsts.mongoPort);
		if(!await factory.TryConnectAsync())
		{
			alert(`Не удалось подключиться к локальной БД ${AppConsts.dbName} по порту ${AppConsts.mongoPort}`)
			status.textContent = "Ошибка подключения к БД...";
		}

		percent.textContent = "10%";
		status.textContent = "Верификация данных БД...";

		if(!await DbCreator.IsDbInitialized(factory))
		{
			percent.textContent = "11%";
			status.textContent = "Инициализация данных БД...";
			await DbCreator.InitializeDb(factory, percent, status);
		}

		percent.textContent = "100%";
		status.textContent = "Готово";
	};

	start();
}