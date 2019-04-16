import { MongoContextFactory } from "./schema";
import { RatedEntitieBase } from "./entities/RatedEntitieBase";

class WindowsController
{
	private Factory: MongoContextFactory;

	private StateInput: HTMLSpanElement;

	private _cmbAges: HTMLSelectElement;
	private _cmbFams: HTMLSelectElement;
	private _cmbStuds: HTMLSelectElement;
	private _cmbExps: HTMLSelectElement;
	private _txtComment: HTMLTextAreaElement;
	private _txtStudComment: HTMLTextAreaElement;
	private _txtExpComment: HTMLTextAreaElement;
	private _txtFio: HTMLInputElement;
	private _lstStuds: HTMLDivElement;
	private _lstExps: HTMLDivElement;

	constructor(factory: MongoContextFactory)
	{
		this.Factory    = factory;
		this.StateInput = document.querySelector('[data-id="state"]');
	}

	public async ShowStartDialog()
	{
		let node = (document
			.querySelector("#startDialog") as HTMLTemplateElement)
			.content
			.cloneNode(true);

		this.StateInput.textContent = "Инициализация шаблона страницы...";
		this.SetPage(node);
		this.StateInput.textContent = "Привязка полей";
		this.BindFields();
		this.StateInput.textContent = "Привязка кнопок";
		this.BindButtons();

		try
		{
			this.StateInput.textContent = "Инициализация полей формы...";
			await this.FillInputs();
		}
		catch(exc)
		{
			console.error(exc);
			this.StateInput.textContent += " Ошибка";
		}

		this.StateInput.textContent = "Готово";
	}

	private SetPage(element: Node)
	{
		let body = document.querySelector("#mainContainer");
		while(body.firstChild)
		{
			body.removeChild(body.firstChild);
		}
		body.appendChild(element);
	}

	private BindFields()
	{
		this._cmbAges        = document.querySelector("#_cmbAge");
		this._cmbFams        = document.querySelector("#_cmbFam");
		this._cmbStuds       = document.querySelector("#_cmbStud");
		this._cmbExps        = document.querySelector("#_cmbExp");
		this._txtComment     = document.querySelector("#_txtComment");
		this._txtStudComment = document.querySelector("#_txtStudComment");
		this._txtExpComment  = document.querySelector("#_txtExpComment");
		this._txtFio         = document.querySelector("#_txtFio");
		this._lstStuds       = document.querySelector("#_lstStuds");
		this._lstExps        = document.querySelector("#_lstExps");
	}

	private BindButtons()
	{
		document.querySelector("#_btnNewStud").addEventListener('click',
			() => this.ShowDialog("_wndNewStud"));
		document.querySelector("#_btnNewExp").addEventListener('click',
			() => this.ShowDialog("_wndNewExp"));

		document.querySelectorAll("[data-action='cancel']").forEach(
			(x: HTMLElement) => x.addEventListener('click',
				() => this.CloseDialog(x.dataset.dialogId)));

		document.querySelector("#_wndNewExp [data-action='ok']").addEventListener('click',
			() => this.SaveExp("_wndNewExp"));
		document.querySelector("#_wndNewStud [data-action='ok']").addEventListener('click',
			() => this.SaveStud("_wndNewStud"));

		document.querySelector(".btn.next.fixed").addEventListener('click',
			() => this.OpenTest());
	}

	private async FillInputs()
	{
		this.StateInput.textContent = "Инициализация поля возрастов...";
		let ages                    = await this.Factory.SelectAsync<RatedEntitieBase>(
			this.Factory.AgeModel,
			RatedEntitieBase.Represent,
			{});

		ages.forEach(x =>
		{
			let element           = document.createElement('option');
			element.dataset.id    = x.Id;
			element.dataset.rate  = x.Rate.toString();
			element.dataset.value = x.Value;
			element.textContent   = x.Value;

			this._cmbAges.add(element);
		});

		this.StateInput.textContent = "Инициализация поля семейного положения...";
		let fams                    = await this.Factory.SelectAsync<RatedEntitieBase>(
			this.Factory.FamModel,
			RatedEntitieBase.Represent,
			{});

		fams.forEach(x =>
		{
			let element           = document.createElement('option');
			element.dataset.id    = x.Id;
			element.dataset.rate  = x.Rate.toString();
			element.dataset.value = x.Value;
			element.textContent   = x.Value;

			this._cmbFams.add(element);
		});

		this.StateInput.textContent = "Инициализация поля типов образования...";
		let studs                   = await this.Factory.SelectAsync<RatedEntitieBase>(
			this.Factory.StudModel,
			RatedEntitieBase.Represent,
			{});

		studs.forEach(x =>
		{
			let element           = document.createElement('option');
			element.dataset.id    = x.Id;
			element.dataset.rate  = x.Rate.toString();
			element.dataset.value = x.Value;
			element.textContent   = x.Value;

			this._cmbStuds.add(element);
		});

		this.StateInput.textContent = "Инициализация поля типов опыта...";
		let exps                    = await this.Factory.SelectAsync<RatedEntitieBase>(
			this.Factory.ExpModel,
			RatedEntitieBase.Represent,
			{});

		exps.forEach(x =>
		{
			let element           = document.createElement('option');
			element.dataset.id    = x.Id;
			element.dataset.rate  = x.Rate.toString();
			element.dataset.value = x.Value;
			element.textContent   = x.Value;

			this._cmbExps.add(element);
		});
	}

	private SaveStud(id: string)
	{
		this.StateInput.textContent = "Сохранение результата диалога...";
		let node                    = document.createElement('DIV');
		node.dataset.id             = this._cmbStuds.selectedOptions[0].dataset.id;
		node.dataset.rate           = this._cmbStuds.selectedOptions[0].dataset.rate;
		node.dataset.comment        = this._txtStudComment.value;
		node.textContent            = node.dataset.value = this._cmbStuds.selectedOptions[0].dataset.value;

		this._lstStuds.appendChild(node);
		this.CloseDialog(id);
	}

	private SaveExp(id: string)
	{
		this.StateInput.textContent = "Сохранение результата диалога...";
		let node                    = document.createElement('DIV');
		node.dataset.id             = this._cmbExps.selectedOptions[0].dataset.id;
		node.dataset.rate           = this._cmbExps.selectedOptions[0].dataset.rate;
		node.dataset.comment        = this._txtExpComment.value;
		node.textContent            = node.dataset.value = this._cmbExps.selectedOptions[0].dataset.value;

		this._lstExps.appendChild(node);
		this.CloseDialog(id);
	}

	private OpenTest()
	{

	}

	private ShowDialog(id: string)
	{
		this.StateInput.textContent = "Открытие диалога...";
		document.querySelector("body").classList.add("dialogMode");
		document.querySelector("#dialog").classList.remove("hidden");
		document.querySelector("#dialog #" + id).classList.remove("hidden");
		this.StateInput.textContent = "Готово";
	}

	private CloseDialog(id: string)
	{
		this.StateInput.textContent = "Закрытие диалога...";
		document.querySelector("body").classList.remove("dialogMode");
		document.querySelector("#dialog").classList.add("hidden");
		document.querySelector("#dialog #" + id).classList.add("hidden");
		this.StateInput.textContent = "Готово";
	}
}

export { WindowsController };