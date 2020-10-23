/**
 * Same-As check (field must be same as another field in the form)
 * @param {any} fieldValue
 * @param {any} fieldToCheck
 * @param {Object} valuesContainer
 * @return {boolean}
 */
export default function sameAsRule(fieldValue, fieldToCheck, valuesContainer) {
    return fieldValue == fieldToCheck
}