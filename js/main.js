addButtonEvents()

function addButtonEvents() {
    const buttons = document.querySelectorAll("button");
    buttons.forEach(button => button.addEventListener("click", getEvent))
}

function getEvent() {
    const button = this.textContent;
    if (getDisplay()[2] === "Error") {
        clear()
    } else {
        switch (button) {
            case "AC":
                clear();
                break;
            case "+/-":
                positiveOrNegative();
                break;
            case "%":
                percentage();
                break;
            case "/":
            case "x":
            case "-":
            case "+":
                operator(this);
                break;
            case "=":
                equals();
                break;
            case ".":
                decimal();
                break;
            default:
                setDisplay(...getDisplay(), this);
                break;
        }
    }
}

function equals() {
    let expression = getDisplay();

    if (expression[2] !== "" && expression[0] !== "") {
        calculate(expression[1], +expression[0], +expression[2]);
    }
}

function clear() {
    setDisplay("", "", "0");
}

function getDisplay() {
    const spans = document.querySelectorAll("#display span");
    return Array.from(spans).map(span => span.textContent);
}

function setDisplay(opd1 = "", opr = "", opd2 = "", e = null) {
    const spans = document.querySelectorAll("#display span");

    if (e !== null) {
        spans[2].textContent = (spans[2].textContent === "0") ? e.textContent : spans[2].textContent += e.textContent;
    } else {
        spans[0].textContent = opd1;
        spans[1].textContent = opr;
        spans[2].textContent = opd2;
    }
}

function operator(e) {
    const op = e.textContent;
    let display = getDisplay();
    if (display.every(d => d !== "")) {
        equals();
    }
    display = getDisplay();
    if (display[1] === "") {
        setDisplay(display[2], op, "")
    }
}

function calculate(op, op1, op2) {
    let result;
    if (op === "/") {
        result = divide(op1, op2);
    } else if (op === "x") {
        result = multiply(op1, op2);
    } else if (op === "-") {
        result = subtract(op1, op2);
    } else if (op === "+") {
        result = add(op1, op2);
    }
    if (result === Infinity || result === -Infinity) {
        setDisplay("", "", "Error")
    } else {
        setDisplay("", "", +(result.toFixed(3)));
    }
}

function divide(a, b) {
    return (a / b);
}

function multiply(a, b) {
    return (a * b);
}

function subtract(a, b) {
    return (a - b);
}

function add(a, b) {
    return (a + b);
}

function percentage() {
    let display = getDisplay();
    if (display[1] === "") {
        setDisplay("", "", divide(display[2], 100));
    }
}

function positiveOrNegative() {
    let display = getDisplay();
    if (display[2] !== "") {
        display[2] = -(+display[2]);
        setDisplay(...display);
    }
}

function decimal() {
    let display = getDisplay();
    if (display[2] !== "" && !(display[2].includes("."))) {
        display[2] += ".";
        setDisplay(...display);
    }
}