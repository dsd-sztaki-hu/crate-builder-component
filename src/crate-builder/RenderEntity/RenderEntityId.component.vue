<template>
    <div class="flex flex-row">
        <div class="min-w-32 w-1/3 xl:w-1/5 flex flex-col describo-property-name">@id</div>

        <div
            class="w-2/3 xl:w-4/5 flex flex-row describo-property-value"
            v-if="!state.configuration.readonly"
        >
            <button
                v-if="isURL(props.entity['@id'])"
                class="text-[--el-color-primary] hover:text-[--el-color-primary-light-3] active:text-[--el-color-primary-dark-2] mr-2 flex items-center"
                @click="openInNewTab(props.entity['@id'])"
                title="Open in new tab"
            >
                <FontAwesomeIcon :icon="faArrowUpRightFromSquare" />
            </button>
            <div
                v-if="
                    props.entity['@id'] === './' ||
                    ['Dataset', 'File'].includes(props.entity['@type'])
                "
                class=""
            >
                {{ props.entity["@id"] }}
            </div>
            <div v-else class="flex-grow">
                <text-component
                    class="w-full"
                    type="text"
                    :property="data.property"
                    :value="props.entity['@id']"
                    @save:property="save"
                />
            </div>
        </div>
        <div class="w-2/3 xl:w-4/5 flex flex-row describo-property-value" v-else>
            <div v-if="isURL(props.entity['@id'])">
                <a class="text-blue-800" :href="props.entity['@id']" target="_blank">{{
                    props.entity["@id"]
                }}</a>
                &nbsp;
                <FontAwesomeIcon :icon="faArrowUpRightFromSquare"></FontAwesomeIcon>
            </div>
            <div v-else>{{ props.entity["@id"] }}</div>
        </div>
    </div>
</template>

<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import TextComponent from "../primitives/Text.component.vue";
import { reactive, inject } from "vue";
import { isURL } from "../CrateManager/lib";
import { useStateStore } from "../store.js";
const state = useStateStore();

const props = defineProps({
    entity: {
        type: Object,
        required: true,
    },
});
const emit = defineEmits(["update:entity"]);

let data = reactive({
    property: "@id",
});
async function save(data) {
    emit("update:entity", data);
}

function openInNewTab(url) {
    window.open(url, '_blank');
}
</script>
