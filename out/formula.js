"use strict";
class Formula {
    question;
    formula;
    text = "";
    textQ = "";
    constructor(question, formula) {
        if (question instanceof FormulaBuilder) {
            this.question = question.html();
            this.textQ = question.text;
        }
        else {
            this.question = question;
            this.textQ = question;
        }
        if (formula instanceof FormulaBuilder) {
            this.formula = formula.html();
            this.text = formula.text;
        }
        else {
            this.formula = formula;
            this.text = formula;
        }
    }
}
class FormulaBuilder {
    body = Div("formula");
    text = "";
    prevEl = null;
    a(fb) {
        this.prevEl = fb.body;
        this.body.appendChild(fb.body);
        this.text += fb.text;
        return this;
    }
    t(text) {
        this.prevEl = Span([], [], text);
        this.body.appendChild(this.prevEl);
        this.text += text;
        return this;
    }
    f(top, bottom) {
        const f = Table("formula-fraction", [
            TR([], [TD([], [top.body])]),
            TR([], [TD([], [bottom.body])]),
        ]);
        this.prevEl = f;
        this.body.appendChild(f);
        this.text += `(${top.text})/(${bottom.text})`;
        return this;
    }
    l(letter) {
        const letterEl = formulaLetters[letter];
        if (!letterEl) {
            this.t(letter);
            return this;
        }
        if (letterEl.d && letterEl.vb) {
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.classList.add("formula-letter");
            svg.style.transform = `translateY(${letterEl.dy}em)`;
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", letterEl.d);
            path.setAttribute("fill", "none");
            path.setAttribute("stroke", "black");
            path.setAttribute("stroke-width", "0.4");
            path.setAttribute("stroke-linecap", "round");
            svg.setAttribute("viewBox", letterEl.vb);
            svg.appendChild(path);
            this.prevEl = svg;
            this.body.appendChild(svg);
            this.text += letterEl.ch;
        }
        else {
            this.t(letterEl.ch);
        }
        return this;
    }
    up(fb) {
        if (this.prevEl?.classList.contains("formula-lower")) {
            this.prevEl.classList.remove("formula-lower");
            this.prevEl.classList.add("formula-upper-lower");
            this.prevEl.prepend(fb.body);
        }
        else {
            this.prevEl = Span("formula-upper", [fb.body]);
            this.body.appendChild(this.prevEl);
        }
        if (fb.text.length == 1)
            this.text += "^" + fb.text;
        else
            this.text += "^(" + fb.text + ")";
        return this;
    }
    lw(fb) {
        if (this.prevEl?.classList.contains("formula-upper")) {
            this.prevEl.classList.remove("formula-upper");
            this.prevEl.classList.add("formula-upper-lower");
            this.prevEl.appendChild(fb.body);
        }
        else {
            this.prevEl = Span("formula-lower", [fb.body]);
            this.body.appendChild(this.prevEl);
        }
        if (fb.text.length == 1)
            this.text += "_" + fb.text;
        else
            this.text += "_(" + fb.text + ")";
        return this;
    }
    sq(fb) {
        this.prevEl = Span("formula-sqrt", [fb.body]);
        this.body.appendChild(this.prevEl);
        this.text += "sqrt(" + fb.text + ")";
        return this;
    }
    vec(fb) {
        this.prevEl = Span("formula-vec", [fb.body]);
        this.body.appendChild(this.prevEl);
        if (fb.text.length == 1)
            this.text += "→" + fb.text;
        else
            this.text += "→(" + fb.text + ")";
        return this;
    }
    hat(fb) {
        this.prevEl = Span("formula-hat", [fb.body]);
        this.body.appendChild(this.prevEl);
        if (fb.text.length == 1)
            this.text += "‾" + fb.text;
        else
            this.text += "‾(" + fb.text + ")";
        return this;
    }
    sum(fb) {
        const bottom = Span("formula-sum-bottom", [fb.body]);
        this.prevEl = Span("formula-sum", [Span([], [], "Σ"), bottom]);
        this.body.appendChild(this.prevEl);
        this.text += "Σ(" + fb.text + ")";
        return this;
    }
    br() {
        this.prevEl = document.createElement("br");
        this.body.appendChild(this.prevEl);
    }
    table(rows) {
        const f = Table("formula-table");
        this.prevEl = f;
        this.body.appendChild(f);
        for (const el of rows) {
            f.appendChild(TR([], [TD([], [el.body])]));
            this.text += el.text + "\n";
        }
        return this;
    }
    html() {
        return this.body.outerHTML;
    }
}
function FB(text) {
    if (text)
        return new FormulaBuilder().t(text);
    return new FormulaBuilder();
}
const formulaLetters = {
    "V": { ch: "ν", dy: 0, vb: "-3 -5 6 5", d: "M-2.718-3.761C-2.392-4.783-1.907-4.804-1.528-3.993L0 0 1.526-3.982C1.884-4.741 2.41-4.709 2.715-3.719" },
    "p": { ch: "ρ", dy: 0, vb: "0 -5 5 5", d: "M.283-1.392C.43-.444 1.294-.065 1.82-1.234L2.663-3.961A1 1 0 112.705-3.256" },
    "m": { ch: "μ", dy: 0.1, vb: "0 -4.5 5 4.5", d: "M.256-.799C.272-.085.878.16 1.308-1.26L1.957-3.772C1.993-3.92 2.039-3.914 2.053-3.826L2.513-1.92Q2.69-1.114 2.982-1.789L3.925-3.855C4.024-4.039 4.029-3.891 4.032-3.856L4.202-1.805Q4.294-1.037 4.862-1.582" },
    "n": { ch: "η", dy: 0, vb: "0 -5.5 5 5.6", d: "M.3-2C.2 0 2.3 1.1 2.8-2 2.9-2.5 3-5.1 2.1-5.3" },
    "a": { ch: "ⲁ", dy: 0, vb: "-0.3 -4.5 5 5.1", d: "M3.5-3.7C3.5-2.3 2.3-1.3 1.3-.3.7.3-.2-.5.4-1.1 1.1-1.6 1.2-.7 1.8-.4 2.6.1 3.6 0 3.9-.4" },
    "d": { ch: "Δ", dy: 0, vb: null, d: null },
    "P": { ch: "π", dy: 0, vb: null, d: null },
    "l": { ch: "λ", dy: 0, vb: null, d: null },
    "w": { ch: "ω", dy: 0, vb: null, d: null },
    "b": { ch: "β", dy: 0, vb: null, d: null },
    "t": { ch: "τ", dy: 0, vb: null, d: null },
    "s": { ch: "ϭ", dy: 0, vb: null, d: null },
    "e": { ch: "ϵ", dy: 0, vb: null, d: null },
    "E": { ch: "ε", dy: 0, vb: null, d: null },
    "f": { ch: "φ", dy: 0, vb: null, d: null },
    "O": { ch: "Ω", dy: 0, vb: null, d: null },
};
function createFormula(formula) {
    const fb = new FormulaBuilder();
    let bracketsOpen = 0;
    let bracketsStart = 0;
    let fractionTop = null;
    for (let i = 0; i < formula.length; i++) {
        const ch = formula[i];
        if (ch == "{") {
            if (bracketsOpen == 0)
                bracketsStart = i;
            bracketsOpen += 1;
        }
        else if (ch == "}") {
            bracketsOpen -= 1;
            if (bracketsOpen == 0) {
                const inBrackets = formula.slice(bracketsStart + 1, i);
                if (i + 1 < formula.length && formula[i + 1] == "/") {
                    fractionTop = createFormula(inBrackets);
                    i++;
                }
                else if (fractionTop) {
                    const fractionBottom = createFormula(inBrackets);
                    fb.f(fractionTop, fractionBottom);
                    fractionTop = null;
                }
                else {
                    if (bracketsStart - 1 >= 0) {
                        if (formula[bracketsStart - 1] == "_")
                            fb.lw(createFormula(inBrackets));
                        else if (formula[bracketsStart - 1] == "^")
                            fb.up(createFormula(inBrackets));
                        else if (formula[bracketsStart - 1] == "\\")
                            fb.sq(createFormula(inBrackets));
                        else if (formula[bracketsStart - 1] == "&")
                            fb.vec(createFormula(inBrackets));
                        else if (formula[bracketsStart - 1] == "#")
                            fb.hat(createFormula(inBrackets));
                        else
                            fb.a(createFormula(inBrackets));
                    }
                    else {
                        fb.a(createFormula(inBrackets));
                    }
                }
            }
        }
        if (bracketsOpen > 0 || ch == "{" || ch == "}" || ch == "\\")
            continue;
        if (ch == "_") {
            if (formula[i + 1] != "{")
                fb.lw(FB(formula[++i]));
        }
        else if (ch == "^") {
            if (formula[i + 1] != "{")
                fb.up(FB(formula[++i]));
        }
        else if (ch == "&") {
            if (formula[i + 1] != "{")
                fb.vec(FB(formula[++i]));
        }
        else if (ch == "#") {
            if (formula[i + 1] != "{")
                fb.hat(FB(formula[++i]));
        }
        else if (ch == "'") {
            if (formulaLetters.hasOwnProperty(formula[i + 1]))
                fb.l(formula[++i]);
            else
                fb.t(ch);
        }
        else if (ch == "\n") {
            fb.br();
        }
        else if (ch == "*") {
            fb.t("×");
        }
        else if (ch == "!" && formula[i + 1] == "=") {
            fb.t("≠");
            i++;
        }
        else if (ch == ">" && formula[i + 1] == "=") {
            fb.t("≥");
            i++;
        }
        else if (ch == "<" && formula[i + 1] == "=") {
            fb.t("≤");
            i++;
        }
        else {
            fb.t(ch);
        }
    }
    return fb;
}
