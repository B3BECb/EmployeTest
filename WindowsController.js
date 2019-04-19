"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RatedEntitieBase_1 = require("./entities/RatedEntitieBase");
const ApplicantEntity_1 = require("./entities/ApplicantEntity");
const CommentableEntitieBase_1 = require("./entities/CommentableEntitieBase");
class WindowsController {
    constructor(factory) {
        this.Factory = factory;
        this.StateInput = document.querySelector('[data-id="state"]');
    }
    async ShowStartDialog() {
        let node = document
            .querySelector("#startDialog")
            .content
            .cloneNode(true);
        this.StateInput.textContent = "Инициализация шаблона страницы...";
        this.SetPage(node);
        this.StateInput.textContent = "Привязка полей";
        this.BindFields();
        this.StateInput.textContent = "Привязка кнопок";
        this.BindButtons();
        try {
            this.StateInput.textContent = "Инициализация полей формы...";
            await this.FillInputs();
        }
        catch (exc) {
            console.error(exc);
            this.StateInput.textContent += " Ошибка";
        }
        this.StateInput.textContent = "Готово";
    }
    SetPage(element) {
        let body = document.querySelector("#mainContainer");
        while (body.firstChild) {
            body.removeChild(body.firstChild);
        }
        body.appendChild(element);
    }
    BindFields() {
        this._cmbAges = document.querySelector("#_cmbAge");
        this._cmbFams = document.querySelector("#_cmbFam");
        this._cmbStuds = document.querySelector("#_cmbStud");
        this._cmbExps = document.querySelector("#_cmbExp");
        this._txtComment = document.querySelector("#_txtComment");
        this._txtStudComment = document.querySelector("#_txtStudComment");
        this._txtExpComment = document.querySelector("#_txtExpComment");
        this._txtFio = document.querySelector("#_txtFio");
        this._lstStuds = document.querySelector("#_lstStuds");
        this._lstExps = document.querySelector("#_lstExps");
    }
    BindButtons() {
        document.querySelector("#_btnNewStud").addEventListener('click', () => this.ShowDialog("_wndNewStud"));
        document.querySelector("#_btnNewExp").addEventListener('click', () => this.ShowDialog("_wndNewExp"));
        document.querySelectorAll("[data-action='cancel']").forEach((x) => x.addEventListener('click', () => this.CloseDialog(x.dataset.dialogId)));
        document.querySelector("#_wndNewExp [data-action='ok']").addEventListener('click', () => this.SaveExp("_wndNewExp"));
        document.querySelector("#_wndNewStud [data-action='ok']").addEventListener('click', () => this.SaveStud("_wndNewStud"));
        document.querySelector(".btn.next.fixed").addEventListener('click', () => this.OpenTest());
    }
    async FillInputs() {
        this.StateInput.textContent = "Инициализация поля возрастов...";
        let ages = await this.Factory.SelectAsync(this.Factory.AgeModel, RatedEntitieBase_1.RatedEntitieBase.Represent, {});
        ages.forEach(x => {
            let element = document.createElement('option');
            element.dataset.id = x.Id;
            element.dataset.rate = x.Rate.toString();
            element.dataset.value = x.Value;
            element.textContent = x.Value;
            this._cmbAges.add(element);
        });
        this.StateInput.textContent = "Инициализация поля семейного положения...";
        let fams = await this.Factory.SelectAsync(this.Factory.FamModel, RatedEntitieBase_1.RatedEntitieBase.Represent, {});
        fams.forEach(x => {
            let element = document.createElement('option');
            element.dataset.id = x.Id;
            element.dataset.rate = x.Rate.toString();
            element.dataset.value = x.Value;
            element.textContent = x.Value;
            this._cmbFams.add(element);
        });
        this.StateInput.textContent = "Инициализация поля типов образования...";
        let studs = await this.Factory.SelectAsync(this.Factory.StudModel, RatedEntitieBase_1.RatedEntitieBase.Represent, {});
        studs.forEach(x => {
            let element = document.createElement('option');
            element.dataset.id = x.Id;
            element.dataset.rate = x.Rate.toString();
            element.dataset.value = x.Value;
            element.textContent = x.Value;
            this._cmbStuds.add(element);
        });
        this.StateInput.textContent = "Инициализация поля типов опыта...";
        let exps = await this.Factory.SelectAsync(this.Factory.ExpModel, RatedEntitieBase_1.RatedEntitieBase.Represent, {});
        exps.forEach(x => {
            let element = document.createElement('option');
            element.dataset.id = x.Id;
            element.dataset.rate = x.Rate.toString();
            element.dataset.value = x.Value;
            element.textContent = x.Value;
            this._cmbExps.add(element);
        });
    }
    SaveStud(id) {
        this.StateInput.textContent = "Сохранение результата диалога...";
        let node = document.createElement('DIV');
        node.dataset.id = this._cmbStuds.selectedOptions[0].dataset.id;
        node.dataset.rate = this._cmbStuds.selectedOptions[0].dataset.rate;
        node.dataset.comment = this._txtStudComment.value;
        node.textContent = node.dataset.value = this._cmbStuds.selectedOptions[0].dataset.value;
        this._lstStuds.appendChild(node);
        this.CloseDialog(id);
    }
    SaveExp(id) {
        this.StateInput.textContent = "Сохранение результата диалога...";
        let node = document.createElement('DIV');
        node.dataset.id = this._cmbExps.selectedOptions[0].dataset.id;
        node.dataset.rate = this._cmbExps.selectedOptions[0].dataset.rate;
        node.dataset.comment = this._txtExpComment.value;
        node.textContent = node.dataset.value = this._cmbExps.selectedOptions[0].dataset.value;
        this._lstExps.appendChild(node);
        this.CloseDialog(id);
    }
    async OpenTest() {
        let studies = [...this._lstStuds
                .children]
            .map((x) => {
            let stud = new RatedEntitieBase_1.RatedEntitieBase(x.textContent, Number.parseInt(x.dataset.rate));
            stud.Id = x.dataset.id;
            return new CommentableEntitieBase_1.CommentableEntitieBase(stud, x.dataset.comment);
        });
        let exps = [...this._lstExps
                .children]
            .map((x) => {
            let stud = new RatedEntitieBase_1.RatedEntitieBase(x.textContent, Number.parseInt(x.dataset.rate));
            stud.Id = x.dataset.id;
            return new CommentableEntitieBase_1.CommentableEntitieBase(stud, x.dataset.comment);
        });
        let option = this._cmbAges.selectedOptions[0];
        let age = new RatedEntitieBase_1.RatedEntitieBase(option.textContent, Number.parseInt(option.dataset.rate));
        age.Id = option.dataset.id;
        option = this._cmbFams.selectedOptions[0];
        let fam = new RatedEntitieBase_1.RatedEntitieBase(option.textContent, Number.parseInt(option.dataset.rate));
        age.Id = option.dataset.id;
        this.Applecant = new ApplicantEntity_1.ApplicantEntity(this._txtFio.value, age, studies, exps, fam, this._txtComment.value, this.CalcInitialRate(age, fam, studies, exps), 0, 0, 0);
        let testPage = document.querySelector("#testDialog")
            .content
            .cloneNode(true);
        this.SetPage(testPage);
        //let applicantModel = new this.Factory.ApplicantModel(applicant.ToDbEntry());
        //let dbApplicant = await this.Factory.SaveAsync(applicantModel, ApplicantEntity.Represent);
    }
    CalcInitialRate(age, fam, studs, exps) {
        let values = [age.Rate,
            fam.Rate,
            ...studs.map(x => x.RatedEntitie.Rate),
            ...exps.map(x => x.RatedEntitie.Rate)];
        return Math.max.apply(null, values);
    }
    ShowDialog(id) {
        this.StateInput.textContent = "Открытие диалога...";
        document.querySelector("body").classList.add("dialogMode");
        document.querySelector("#dialog").classList.remove("hidden");
        document.querySelector("#dialog #" + id).classList.remove("hidden");
        this.StateInput.textContent = "Готово";
    }
    CloseDialog(id) {
        this.StateInput.textContent = "Закрытие диалога...";
        document.querySelector("body").classList.remove("dialogMode");
        document.querySelector("#dialog").classList.add("hidden");
        document.querySelector("#dialog #" + id).classList.add("hidden");
        this.StateInput.textContent = "Готово";
    }
}
exports.WindowsController = WindowsController;
//# sourceMappingURL=WindowsController.js.map