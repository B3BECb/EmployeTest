class WindowsController
{
	public ShowStartDialog()
	{
		let node = (document
			.querySelector("#startDialog") as HTMLTemplateElement)
			.content
			.cloneNode(true);

		this.SetPage(node);
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
}

export { WindowsController };