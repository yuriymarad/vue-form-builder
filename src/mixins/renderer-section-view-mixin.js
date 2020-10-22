import ControlView from "@/views/renderer/ControlView";
import {STYLE_INJECTION_MIXIN} from "@/mixins/style-injection-mixin";
import isBlank from "@/libraries/customRules/isBlank";
import isPresent from "@/libraries/customRules/isPresent";
import checkIfPassed from "@/libraries/customRules/checkIfPassed";
import isEqual from "@/libraries/customRules/isEqual";
import isNotEqual from "@/libraries/customRules/isNotEqual";
import isIn from "@/libraries/customRules/isIn";
import isNotIn from "@/libraries/customRules/isNotIn";
import startsWith from "@/libraries/customRules/startWith";
import endsWith from "@/libraries/customRules/endsWith";

const RENDERER_SECTION_VIEW_MIXIN = {
    components: {
        ControlView // Show Control
    },

    mixins: [STYLE_INJECTION_MIXIN],

    props: {
        section: Object,
        rows: Object,
        controls: Object,
        valueContainer: Object,
        validationErrors: Object,
        customRules: Object,
    },

    data: () => ({

    }),

    methods: {
        runRules(formData) {
            // if (!this.customRules.length) {
            //     return;
            // }
            for (let key in this.customRules) {
                let currentRule = this.customRules[key];
                if (!currentRule.enabled) {
                    continue;
                }

                let conditionPassed = [];
                for (let conditionKey in currentRule.conditions) {
                    let selectedCondition = currentRule.conditions[conditionKey];
                    switch (selectedCondition.conditionSelected) {
                        case 'isBlank':
                            conditionPassed.push(
                                isBlank(this.controls[selectedCondition.fieldSelected].name, this.valueContainer)
                            );
                            break;
                        case 'isPresent':
                            conditionPassed.push(
                                isPresent(this.controls[selectedCondition.fieldSelected].name, this.valueContainer)
                            );
                            break;
                        case 'equalTo':
                            conditionPassed.push(
                                isEqual(this.controls[selectedCondition.fieldSelected].name, this.valueContainer, selectedCondition.conditionInput)
                            );
                            break;
                        case 'notEqualTo':
                            conditionPassed.push(
                                isNotEqual(this.controls[selectedCondition.fieldSelected].name, this.valueContainer, selectedCondition.conditionInput)
                            );
                            break;
                        case 'isIn':
                            conditionPassed.push(
                                isIn(this.controls[selectedCondition.fieldSelected].name, this.valueContainer, selectedCondition.conditionInput)
                            );
                            break;
                        case 'isNotIn':
                            conditionPassed.push(
                                isNotIn(this.controls[selectedCondition.fieldSelected].name, this.valueContainer, selectedCondition.conditionInput)
                            );
                            break;
                        case 'startsWith':
                            conditionPassed.push(
                                startsWith(this.controls[selectedCondition.fieldSelected].name, this.valueContainer, selectedCondition.conditionInput)
                            );
                            break;
                        case 'endsWith':
                            conditionPassed.push(
                                endsWith(this.controls[selectedCondition.fieldSelected].name, this.valueContainer, selectedCondition.conditionInput)
                            );
                            break;
                        default:
                            break;
                    }
                }

                if (checkIfPassed(conditionPassed, currentRule.typeSelected)) {
                    for (let actionnKey in currentRule.actions) {
                        let selectedAction = currentRule.actions[actionnKey];
                        switch (selectedAction.actionSelected) {
                            case 'toShow':
                            case 'toHide':
                                this.controls[selectedAction.fieldSelected].show = selectedAction.actionSelected !== 'toHide';
                                this.controls[selectedAction.fieldSelected].isShowLabel = selectedAction.actionSelected !== 'toHide';
                                break;
                            case 'toEnable':
                            case 'toDisable':
                                this.controls[selectedAction.fieldSelected].disabled = selectedAction.actionSelected !== 'toEnable';
                                break;
                            default:
                                break;
                        }
                    }
                } else {
                    for (let actionnKey in currentRule.actions) {
                        let selectedAction = currentRule.actions[actionnKey];
                        switch (selectedAction.actionSelected) {
                            case 'toShow':
                            case 'toHide':
                                this.controls[selectedAction.fieldSelected].show = selectedAction.actionSelected === 'toHide';
                                this.controls[selectedAction.fieldSelected].isShowLabel = selectedAction.actionSelected === 'toHide';
                                break;
                            case 'toEnable':
                            case 'toDisable':
                                this.controls[selectedAction.fieldSelected].disabled = selectedAction.actionSelected === 'toEnable';
                                break;
                            case 'copy':
                                // this.controls[selectedAction.fieldSelected].disabled = selectedAction.actionSelected === 'toEnable';
                                break;
                            default:
                                break;
                        }
                    }
                }
            }

            return;
        }
    },

    computed: {
        /**
         * Classes for draggable
         * @returns {(string|string)[]}
         */
        containerClasses() {
            return [
                this.styles.ROW,
                'control-list-container'
            ]
        }
    },
    created() {
        this.$formEvent.$on('valueChanged', value => {
            this.runRules(value);
        })
    }
};

export {
    RENDERER_SECTION_VIEW_MIXIN
}