<script setup>
defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  item: {
    type: Object,
    required: true,
  },
  deletingId: {
    type: [String, Number],
    required: false,
  },
  updatingId: {
    type: [String, Number],
    required: false,
  },
  onBlur: {
    type: Function,
    required: false,
  },
  updateMinus: {
    type: Function,
    required: false,
  },
  updatePlus: {
    type: Function,
    required: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

function onInput(e) {
  const val = e?.target?.value;
  emit("update:modelValue", val);
}
</script>

<template>
  <div class="flex items-center justify-center ps-6.25 pe-3.75">
    <div class="border-b-2 border-b-[#cccccc] pb-4">
      <button
        :disabled="deletingId === item.id || updatingId === item.id"
        @click="updateMinus"
        class="text-xl disabled:cursor-not-allowed!"
      >
        <span>-</span>
      </button>

      <input
        type="text"
        :value="modelValue"
        class="w-20 px-3.75 text-center focus:outline-0"
        @input="onInput"
        @blur="onBlur"
      />
      <button
        :disabled="deletingId === item.id || updatingId === item.id"
        class="w-5 text-xl disabled:cursor-not-allowed!"
        @click="updatePlus"
      >
        <span>+</span>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
