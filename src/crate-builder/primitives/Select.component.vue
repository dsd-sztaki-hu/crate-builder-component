<template>
    <div class="flex flex-col describo-property-type-select">
        <div v-if="data.hasValidValues && (!props.definition.style || props.definition.style === 'dropdown')">
            <el-select
                v-if="data.hasValidValues"
                class="w-full"
                v-model="data.internalValue"
                :placeholder="$t('select')"
                filterable
                @change="save"
            >
                <el-option
                    v-for="(value, idx) in props.definition.values"
                    :key="idx"
                    :label="value"
                    :value="value"
                >
                </el-option>
            </el-select>
            <div v-else class="text-xs text-gray-700">
                {{ $t('invalid_select_value') }}
            </div>
        </div>

        <div v-else-if="data.hasValidValues && props.definition.style === 'checkbox'" class="bg-gray-50 p-4">
            <el-checkbox-group
                v-model="data.internalValue"
                @change="save"
            >
                <div v-for="(value, idx) in props.definition.values" :key="idx" class="flex items-center">
                    <el-checkbox
                        :value="value"
                    >
                        {{ value }}
                    </el-checkbox>
                </div>
            </el-checkbox-group>
        </div>

        <div v-else-if="data.hasValidValues && props.definition.style === 'radio'" class="bg-gray-50 p-4">
            <el-radio-group
                v-model="data.internalValue"
                @change="save"
            >
                <el-radio
                    v-for="(value, idx) in props.definition.values"
                    :key="idx"
                    :value="value"
                    class="w-full"
                >
                    {{ value }}
                </el-radio>
            </el-radio-group>
        </div>

        <div v-else class="text-xs text-gray-700">
            {{ $t('invalid_select_value') }}
        </div>
    </div>
</template>

<script setup>
import {
    ElSelect,
    ElOption,
    ElRadio,
    ElRadioGroup,
    ElCheckbox,
    ElCheckboxGroup,
} from "element-plus";
import { reactive, watch } from "vue";
import isArray from "lodash-es/isArray";
import isString from "lodash-es/isString";
import uniq from "lodash-es/uniq";
import {$t} from '../i18n'

const props = defineProps({
    property: {
        type: String,
        required: true,
    },
    value: {
        type: [String, Array],
    },
    definition: {
        type: Object,
        required: true,
    },
});
const $emit = defineEmits(["save:property"]);
const data = reactive({
    internalValue: props.value,
    hasValidValues: verifySelectValuesAreStrings(props.definition.values),
});

watch(
    () => props.value,
    () => {
        data.internalValue = props.value;
        data.hasValidValues = verifySelectValuesAreStrings(props.definition.values);
    }
);
watch(
    () => props.definition.values,
    () => {
        data.items = [...props.definition.values];
        data.hasValidValues = verifySelectValuesAreStrings(props.definition.values);
    }
);

function save() {
    // For checkbox style input (handlesMultipleValues == true) the value is an array
    if (props.definition.style === 'checkbox' && !isArray(data.internalValue)) {
        data.internalValue = [data.internalValue];
    }
    $emit("save:property", {
        property: props.property,
        value: data.internalValue,
    });
}
function verifySelectValuesAreStrings(values) {
    if (!isArray(values)) return false;
    values = values.map((v) => isString(v));
    values = uniq(values);
    return values.length === 1 && values[0] === true ? true : false;
}
</script>
