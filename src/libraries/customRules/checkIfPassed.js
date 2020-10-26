
export default function checkIfPassed(
    conditionPassed,
    conditionType
) {
    let result = false;
    switch (conditionType) {
        case 'all':
            result = conditionPassed.every((val) => val === true);
            break;
        case 'any':
            result = conditionPassed.some((val) => val === true);
            break;
        case 'none':
            result = conditionPassed.every((val) => val !== true);
            break;
        default:
            break;

    }

    return result;
}