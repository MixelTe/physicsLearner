"use strict";
const SVGs = {
    settings: {
        viewBox: "0 0 24 24", paths: [
            "m13.12 24h-2.24c-.757 0-1.396-.567-1.486-1.32l-.239-1.876c-.477-.155-.937-.346-1.374-.569l-1.494 1.161c-.606.469-1.459.415-1.985-.126l-1.575-1.575c-.537-.521-.591-1.374-.122-1.979l1.161-1.495c-.224-.437-.415-.897-.569-1.374l-1.88-.239c-.75-.092-1.317-.731-1.317-1.488v-2.24c0-.757.567-1.396 1.32-1.486l1.876-.239c.155-.477.346-.937.569-1.374l-1.16-1.494c-.47-.606-.415-1.46.127-1.986l1.575-1.575c.521-.537 1.375-.59 1.979-.122l1.494 1.162c.437-.223.897-.414 1.375-.569l.239-1.88c.09-.75.729-1.317 1.486-1.317h2.24c.757 0 1.396.567 1.486 1.32l.239 1.876c.478.155.938.346 1.375.569l1.494-1.161c.607-.469 1.459-.415 1.985.127l1.575 1.575c.537.521.591 1.374.122 1.979l-1.161 1.495c.224.437.415.897.569 1.374l1.88.239c.749.091 1.316.73 1.316 1.487v2.24c0 .757-.567 1.396-1.32 1.486l-1.876.239c-.155.477-.346.937-.569 1.374l1.161 1.494c.47.606.415 1.459-.127 1.985l-1.575 1.575c-.521.537-1.375.592-1.979.122l-1.495-1.161c-.437.224-.897.415-1.374.569l-.239 1.88c-.091.75-.73 1.317-1.487 1.317zm-5.39-4.86c.083 0 .168.021.244.063.551.308 1.148.556 1.774.736.192.055.333.219.358.417l.28 2.2c.03.251.247.444.494.444h2.24c.247 0 .464-.193.493-.439l.281-2.204c.025-.198.166-.362.358-.417.626-.18 1.223-.428 1.774-.736.175-.098.393-.081.55.042l1.75 1.36c.201.156.483.143.655-.034l1.585-1.585c.181-.176.195-.458.039-.66l-1.36-1.75c-.123-.158-.14-.375-.042-.55.308-.551.556-1.148.736-1.774.055-.192.219-.333.417-.358l2.2-.28c.251-.031.444-.248.444-.495v-2.24c0-.247-.193-.464-.439-.493l-2.204-.281c-.198-.025-.362-.166-.417-.358-.18-.626-.428-1.223-.736-1.774-.098-.175-.082-.392.042-.55l1.36-1.75c.157-.202.143-.484-.033-.654l-1.585-1.585c-.175-.182-.458-.196-.66-.039l-1.75 1.36c-.159.123-.376.14-.551.042-.549-.308-1.146-.555-1.774-.736-.192-.055-.333-.219-.358-.417l-.28-2.2c-.031-.252-.248-.445-.495-.445h-2.24c-.247 0-.464.193-.493.439l-.281 2.204c-.025.198-.166.362-.358.418-.628.18-1.225.428-1.774.735-.175.099-.392.081-.551-.041l-1.75-1.36c-.202-.157-.483-.143-.654.033l-1.585 1.586c-.181.176-.195.458-.039.66l1.36 1.75c.123.158.14.375.042.55-.309.551-.556 1.148-.736 1.774-.055.192-.219.333-.417.358l-2.2.28c-.251.03-.444.247-.444.494v2.24c0 .247.193.464.439.493l2.204.281c.198.025.362.166.417.358.18.626.428 1.223.736 1.774.098.175.082.392-.042.55l-1.36 1.75c-.157.202-.143.484.033.654l1.585 1.585c.175.181.456.195.66.039l1.75-1.36c.091-.068.199-.104.308-.104z",
            "m12 17c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5zm0-9c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4z"
        ]
    },
    backArrow: {
        viewBox: "0 0 459 459", paths: [
            "M178.5,140.25v-102L0,216.75l178.5,178.5V290.7c127.5,0,216.75,40.8,280.5,130.05C433.5,293.25,357,165.75,178.5,140.25z"
        ]
    },
};
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        var el = array[i];
        array[i] = array[j];
        array[j] = el;
    }
}
function normalizeString(str) {
    return str.toLowerCase().replace(/  +/g, ' ').trim();
}
function Body(children) {
    children.forEach(ch => document.body.appendChild(ch));
}
function Svg(classes, viewBox, paths, clickListener) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", viewBox);
    paths.forEach(d => {
        const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
        p.setAttribute("d", d);
        svg.appendChild(p);
    });
    const div = Div(classes);
    div.appendChild(svg);
    svg.style.width = "100%";
    svg.style.height = "100%";
    if (clickListener)
        svg.addEventListener("click", clickListener);
    return div;
}
function Label(classes, children, innerText, storeArray, index, fo) {
    const label = initEl("label", classes, children, innerText, storeArray, index);
    if (fo)
        label.setAttribute("for", fo);
    return label;
}
function Select_Option(classes, innerText, value, storeArray, index) {
    const option = initEl("option", classes, undefined, innerText, storeArray, index);
    if (value != undefined)
        option.value = value;
    return option;
}
function Select(classes, children, storeArray, index) {
    return initEl("select", classes, children, undefined, storeArray, index);
}
function Div(classes, children, innerText, storeArray, index) {
    return initEl("div", classes, children, innerText, storeArray, index);
}
function Table(classes, children, storeArray, index) {
    return initEl("table", classes, children, undefined, storeArray, index);
}
function TR(classes, children, storeArray, index) {
    return initEl("tr", classes, children, undefined, storeArray, index);
}
function TD(classes, children, storeArray, index) {
    return initEl("td", classes, children, undefined, storeArray, index);
}
function Span(classes, children, innerText, storeArray, index) {
    return initEl("span", classes, children, innerText, storeArray, index);
}
function H1(classes, children, innerText, storeArray, index) {
    return initEl("h1", classes, children, innerText, storeArray, index);
}
function CheckBox(classes, checked, storeArray, index, id, onChange) {
    const input = initEl("input", classes, undefined, undefined, storeArray, index);
    input.type = "checkbox";
    if (checked)
        input.checked = checked;
    if (id)
        input.setAttribute("id", id);
    if (onChange)
        input.addEventListener("change", onChange.bind(undefined, input));
    return input;
}
function Input(classes, type, placeholder, storeArray, index, id, onChange) {
    const input = initEl("input", classes, undefined, undefined, storeArray, index);
    if (type)
        input.type = type;
    if (placeholder)
        input.placeholder = placeholder;
    if (id)
        input.setAttribute("id", id);
    if (onChange)
        input.addEventListener("change", onChange.bind(undefined, input));
    return input;
}
function Button(classes, innerText, clickListener, storeArray, index) {
    const button = initEl("button", classes, undefined, innerText, storeArray, index);
    if (clickListener)
        button.addEventListener("click", clickListener.bind(undefined, button));
    return button;
}
function initEl(tagName, classes, children, innerText, storeArray, index) {
    const el = document.createElement(tagName);
    if (classes) {
        if (typeof classes == "string")
            el.classList.add(classes);
        else
            classes.forEach(cs => el.classList.add(cs));
    }
    if (innerText)
        el.innerText = innerText;
    if (children)
        children.forEach(ch => el.appendChild(ch));
    if (storeArray)
        storeArray[index || 0] = el;
    return el;
}
