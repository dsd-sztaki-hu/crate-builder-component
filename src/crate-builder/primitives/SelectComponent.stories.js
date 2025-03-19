import SelectComponent from "./Select.component.vue";

export default {
    component: SelectComponent,
    argTypes: {
        value: {
            options: ["a", "b", "c"],
            control: { type: "select" },
        },
        "save:property": { action: "saveProperty" },
    },
};

const Template = {
    render: (args, { argTypes }) => ({
        components: { SelectComponent },
        setup() {
            return { args };
        },
        template: '<SelectComponent v-bind="args" v-on="args" />',
    }),
};

export const DefaultSelect = {
    ...Template,
    args: {
        property: "select",
        value: "a",
        definition: {
            values: ["a", "b", "c"]
            // no style, defaults to dropdown
        },
    },
};

export const DropdownSelect = {
    ...Template,
    args: {
        property: "select",
        value: "a",
        definition: {
            values: ["a", "b", "c"],
            style: "dropdown"
        },
    },
};

export const RadioSelect = {
    ...Template,
    args: {
        property: "select",
        value: "a",
        definition: {
            values: ["a", "b", "c"],
            style: "radio"
        },
    },
};

export const CheckboxSelect = {
    ...Template,
    args: {
        property: "select",
        value: ["a"],
        definition: {
            values: ["a", "b", "c"],
            style: "checkbox"
        },
    },
};

export const InvalidSelect = {
    ...Template,
    args: {
        property: "select",
        value: "a",
        definition: {
            values: [{ name: "a" }, { name: "b" }, { name: "c" }],
        },
    },
};
