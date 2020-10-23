
export default function isBlank(
    fieldSelected,
    valuesContainer
) {
    if (Array.isArray(valuesContainer[fieldSelected])) {
        return valuesContainer[fieldSelected].length === 0;
    }

    return valuesContainer[fieldSelected] === '';
}