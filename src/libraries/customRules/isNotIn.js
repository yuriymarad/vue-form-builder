
export default function isNotIn(
    fieldSelected,
    valuesContainer,
    compareTo
) {
    return !valuesContainer[fieldSelected].includes(compareTo);
}