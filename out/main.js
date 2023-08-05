"use strict";
const allEls = init();
allEls.answer.addEventListener("copy", onFormulaCopy);
allEls.question.addEventListener("copy", onQuestionCopy);
setupFlist();
reStart();
function init() {
    const els = [];
    document.body.innerHTML = "";
    Body([
        Div(["page", "page-1"], [
            Div("testBlock", [
                Div("testBlock-title1-block", [
                    Div("testBlock-title1", [], "Some text", els, 0),
                ]),
                Div("testBlock-title2-block", [
                    Div("testBlock-title2", [], "Some text", els, 1),
                ]),
                Div("testBlock-controls", [
                    Button("testBlock-NObutton", "NO", onNoButton, els, 2),
                    Button("testBlock-OKbutton", "OK", onOKButton, els, 3),
                ]),
                Div(["testBlock-lbl", "testBlock-lbl-correct"], [], "Correct: ## / ##", els, 4),
                Div(["testBlock-lbl", "testBlock-lbl-all"], [], "## / ##", els, 5),
            ]),
            Button("btn-list", "", onFlistOpen),
            Div("flist", [
                Div("flist-body", [
                    Button("flist-close", "✖", onFlistClose),
                    Div("flist-content", [], undefined, els, 7),
                ])
            ], undefined, els, 6)
        ]),
    ]);
    return {
        question: els[0],
        answer: els[1],
        button_no: els[2],
        button_ok: els[3],
        correct: els[4],
        all: els[5],
        flist: els[6],
        flist_content: els[7],
    };
}
