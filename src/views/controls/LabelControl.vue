<template>
    <label
            :id="control.uniqueId"
            :for="control.forAttribute"
            :class="control.additionalLabelClass"
            v-html="control.label"
            v-show="control.show"
    ></label>
</template>

<script>
    import {CONTROL_FIELD_EXTEND_MIXIN} from "@/mixins/control-field-extend-mixin";

    /**
     * LabelControl
     * <label for='...'>...</label>
     */
    export default {
        name: "LabelControl",
        mixins: [CONTROL_FIELD_EXTEND_MIXIN]
    }
</script>