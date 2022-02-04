let curTester: Tester | null = null;

function reStart()
{
	curTester = new Tester(formulas);
}
function onOKButton()
{
	if (curTester != null) curTester.onOKButton();
}
function onNoButton()
{
	if (curTester != null) curTester.onNOButton();
}
function onFormulaCopy(e: ClipboardEvent)
{
	if (curTester != null)
	{
		if (e.clipboardData)
		{
			const text = allEls.answer.title;
			e.clipboardData.setData('text/plain', text);
			e.preventDefault();
		}
	}
}
function onQuestionCopy(e: ClipboardEvent)
{
	if (curTester != null)
	{
		if (e.clipboardData)
		{
			const text = allEls.question.title;
			e.clipboardData.setData('text/plain', text);
			e.preventDefault();
		}
	}
}

class Tester
{
	private formulas: Formula[];
	private curFormula = 0;
	private correct = 0;
	private state: "question" | "answer" | "result" | "none" = "none";
	constructor(formulas: Formula[])
	{
		this.formulas = formulas;
		this.init(formulas);
		this.showQuestion();
		this.checkAnswer();
	}
	private init(words: Formula[])
	{
		this.curFormula = 0;
		this.correct = 0;
		this.state = "none";
		this.formulas = words;
		shuffle(this.formulas);
	}
	private setLabels()
	{
		allEls.all.innerText = `${this.curFormula} / ${this.formulas.length}`
		allEls.correct.innerText = `Правильно: ${this.correct} / ${this.formulas.length}`
	}
	private showQuestion()
	{
		if (this.curFormula >= this.formulas.length)
		{
			this.showResult();
			return;
		}
		allEls.question.innerHTML = this.formulas[this.curFormula].question;
		allEls.question.title = this.formulas[this.curFormula].textQ;
		allEls.answer.innerHTML = "";
		allEls.button_no.classList.add("btn-hidden");
		this.setLabels();
		this.state = "question";
		allEls.button_ok.innerText = "Ответ";
		allEls.button_ok.focus();
	}
	private checkAnswer()
	{
		const curFormula = this.formulas[this.curFormula];
		this.curFormula += 1;
		allEls.answer.innerHTML = curFormula.formula;
		allEls.answer.title = curFormula.text;
		this.setLabels();
		this.state = "answer";
		allEls.button_no.classList.remove("btn-hidden");
		allEls.button_no.innerText = "Ошибся";
		allEls.button_ok.innerText = "Верно";
		allEls.button_ok.focus();
	}
	private showResult()
	{
		allEls.button_no.classList.add("btn-hidden");
		allEls.question.innerText = "Результат";
		allEls.answer.innerText = `Правильно: ${Math.round(this.correct / this.formulas.length * 100)}%`;
		allEls.button_ok.innerText = "Ещё раз";
		this.state = "result";
	}
	private restart()
	{
		this.init(this.formulas);
		this.showQuestion();
	}
	public onOKButton()
	{
		switch (this.state) {
			case "question": this.checkAnswer(); break;
			case "answer": this.correct += 1; this.showQuestion(); break;
			case "result": this.restart(); break;
			default: console.error("switch default"); break;
		}
	}
	public onNOButton()
	{
		if (this.state == "answer") this.showQuestion();
	}
}