"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("./schema");
const appConsts_1 = require("./appConsts");
const mongoModule_1 = require("./mongoModule");
var Pages;
(function (Pages) {
    var Index;
    (function (Index) {
        console.log('mongo use');
        let start = async () => {
            let percent = document.querySelector('[data-id="percent"]');
            let status = document.querySelector('[data-id="status"]');
            percent.textContent = "0%";
            status.textContent = "Подключение к БД...";
            let factory = new schema_1.MongoContextFactory(appConsts_1.AppConsts.dbName, appConsts_1.AppConsts.mongoPort);
            if (!await factory.TryConnectAsync()) {
                alert(`Не удалось подключиться к локальной БД ${appConsts_1.AppConsts.dbName} по порту ${appConsts_1.AppConsts.mongoPort}`);
                status.textContent = "Ошибка подключения к БД...";
            }
            percent.textContent = "10%";
            status.textContent = "Верификация данных БД...";
            if (!await mongoModule_1.DbCreator.IsDbInitialized(factory)) {
                percent.textContent = "11%";
                status.textContent = "Инициализация данных БД...";
                await mongoModule_1.DbCreator.InitializeDb(factory, percent, status);
            }
            percent.textContent = "100%";
            status.textContent = "Готово";
        };
        start();
    })(Index = Pages.Index || (Pages.Index = {}));
})(Pages || (Pages = {}));
//# sourceMappingURL=renderer.js.map