
export default function isIn(
    fieldSelected,
    valuesContainer,
    compareTo
) {
    return valuesContainer[fieldSelected].includes(compareTo);
}