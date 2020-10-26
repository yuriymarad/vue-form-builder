
export default function isEqual(
    fieldSelected,
    valuesContainer,
    compareTo
) {
    return valuesContainer[fieldSelected] === compareTo;
}