<script setup>
import { Icon } from "@iconify/vue"
import { computed } from "vue"

const props = defineProps({
  title: String,
  description: String,
  id: [String, Number],
  curOpen: [String, Number, null],
})

const emit = defineEmits(["update:curOpen"])

const isOpen = computed(() => props.id === props.curOpen)

function handleIsOpen() {
  emit("update:curOpen", isOpen.value ? null : props.id)
}
</script>

<template>
  <div>
    <button class="flex w-full cursor-pointer items-center justify-between" @click="handleIsOpen">
      <span class="text-2xl">
        {{ title }}
      </span>

      <!-- <span
        class="flex size-6 items-center justify-center rounded-full transition-all duration-300 md:size-9 lg:size-12"
        :class="
          isOpen
            ? 'bg-project-blue1 text-white'
            : 'text-project-blue1 bg-white shadow-[0px_5px_16px_0px_#080F340F]'
        "
      > -->
      <Icon
        icon="ion:chevron-down-outline"
        class="size-6 transition-all duration-500 ease-out"
        :class="isOpen ? 'rotate-180' : ''"
      />
      <!-- </span> -->
    </button>

    <div
      class="grid overflow-hidden transition-all duration-500 ease-in-out"
      :class="isOpen ? 'mt-7.5 grid-rows-[1fr] opacity-100' : 'mt-0 grid-rows-[0fr] opacity-0'"
    >
      <p class="overflow-hidden text-base text-[#6F6C90]">
        {{ description }}
      </p>
    </div>
  </div>
</template>
