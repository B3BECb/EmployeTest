"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("./schema");
const appConsts_1 = require("./appConsts");
const mongoModule_1 = require("./mongoModule");
const WindowsController_1 = require("./WindowsController");
var Pages;
(function (Pages) {
    var Index;
    (function (Index) {
        console.log('mongo use');
        class Main {
            constructor() {
                this.Factory = new schema_1.MongoContextFactory(appConsts_1.AppConsts.dbName, appConsts_1.AppConsts.mongoPort);
            }
            async Start() {
                let percent = document.querySelector('[data-id="percent"]');
                let status = document.querySelector('[data-id="status"]');
                let state = document.querySelector('[data-id="state"]');
                percent.textContent = "0%";
                status.textContent = "Подключение к БД...";
                if (!await this.Factory.TryConnectAsync()) {
                    alert(`Не удалось подключиться к локальной БД ${appConsts_1.AppConsts.dbName} по порту ${appConsts_1.AppConsts.mongoPort}`);
                    status.textContent = "Ошибка подключения к БД...";
                }
                percent.textContent = "10%";
                status.textContent = "Верификация данных БД...";
                try {
                    if (!await mongoModule_1.DbCreator.IsDbInitialized(this.Factory)) {
                        percent.textContent = "11%";
                        status.textContent = "Инициализация данных БД...";
                        await mongoModule_1.DbCreator.InitializeDb(this.Factory, percent, status);
                    }
                    percent.textContent = "100%";
                    status.textContent = "Готово";
                    state.textContent = "Готово";
                }
                catch (exc) {
                    console.error(exc);
                }
            }
        }
        let main = new Main();
        let wndController;
        let initialize = async () => {
            await main.Start();
            wndController = new WindowsController_1.WindowsController(main.Factory);
            wndController.ShowStartDialog();
        };
        initialize();
    })(Index = Pages.Index || (Pages.Index = {}));
})(Pages || (Pages = {}));
//# sourceMappingURL=renderer.js.map