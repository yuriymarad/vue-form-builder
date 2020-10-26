
export default function performArithmeticOperations(
    operator,
    mathTo,
    valuesContainer,
) {
    let mathToValues = [];
    mathTo.forEach(function (el) {
        mathToValues.push(parseInt(valuesContainer[el]));
    });

    let reducer;
    switch (operator) {
        case '+':
            reducer = (accumulation, currentValue) => accumulation + currentValue;
            break;
        case '-':
            reducer = (accumulation, currentValue) => accumulation - currentValue;
            break;
        case '*':
            reducer = (accumulation, currentValue) => accumulation * currentValue;
            break;
        case '/':
            reducer = (accumulation, currentValue) => accumulation / currentValue;
            break;
        case '%':
            reducer = (accumulation, currentValue) => accumulation % currentValue;
            break;
    }

    return mathToValues.reduce(reducer);
}