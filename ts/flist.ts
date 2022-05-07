function setupFlist()
{
	const table = Div("table");
	allEls.flist_content.appendChild(table);
	const rows: { a: HTMLDivElement, q: HTMLDivElement }[] = [];
	for (let i = 0; i < formulas.length; i++)
	{
		const formula = formulas[i];
		const row = Div("row");
		const q = Div("cell");
		q.innerHTML = formula.question;
		q.title = formula.textQ;
		const a = Div("cell");
		a.innerHTML = formula.formula;
		a.title = formula.text;
		row.appendChild(q);
		row.appendChild(a);
		table.appendChild(row);
		rows.push({ a, q });
	}
	allEls.flist.addEventListener("click", e =>
	{
		if (e.target == allEls.flist) onFlistClose();
	});
	allEls.flist.addEventListener('copy', e =>
	{
		e.preventDefault();
		const selection = document.getSelection();
		if (!e.clipboardData || !selection) return;
		if (selection.anchorNode && selection.focusNode)
		{
			const cell = getCell(selection.anchorNode, rows)
			const cellEnd = getCell(selection.focusNode, rows)
			if (cell && cell == cellEnd)
			{
				e.clipboardData.setData('text/plain', cell.title);
				return;
			}
		}
		switchContent();
		e.clipboardData.setData('text/plain', selection.toString());
		switchContent();
	});
	function switchContent()
	{

		for (let i = 0; i < rows.length; i++)
		{
			const row = rows[i];
			const a = row.a.innerHTML;
			const q = row.q.innerHTML;
			row.a.innerHTML = row.a.title;
			row.q.innerHTML = row.q.title;
			row.a.title = a;
			row.q.title = q;
		}
	}
}
function getCell(el: Node, rows: { a: HTMLDivElement, q: HTMLDivElement }[])
{
	while (el.parentElement)
	{
		el = el.parentElement;
		if (el instanceof HTMLDivElement)
		{
			for (let i = 0; i < rows.length; i++)
			{
				const row = rows[i];
				if (el == row.q) return row.q;
				if (el == row.a) return row.a;
			}
		}
	}
	return null;
}

function onFlistClose()
{
	allEls.flist.classList.remove("flist-active")
}
function onFlistOpen()
{
	allEls.flist.classList.add("flist-active")
}