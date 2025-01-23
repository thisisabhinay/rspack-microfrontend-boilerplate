<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { GlobalStateCommonFacade, type GlobalState } from "@repo/global-store"

const count = ref(0);
const globalStore = new GlobalStateCommonFacade();
let unsubscribe: (() => void) | null = null;

function increment() {
  return globalStore.increment()
}

function decrement() {
  return globalStore.decrement()
}

function reset() {
  return globalStore.reset()
}

onMounted(() => {
  count.value = globalStore.count;
  unsubscribe = globalStore.subscribe((state: GlobalState) => {
    count.value = state.example.count;
  });
});

onUnmounted(() => {
  if (unsubscribe) {
    unsubscribe();
  }
});
</script>

<template>
<div
  data-comp="Counter"
  data-stack="vue"
  className="p-10 border-2 border-teal-400 shadow-teal-100 shadow-lg rounded-2xl flex items-center justify-between"
>
  <h2 className="text-xl font-semibold">Vue Counter: {{count}}</h2>
  <div className="flex items-center gap-4 font-normal text-base">
    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
    <button @click="reset">Reset</button>
  </div>
</div>
</template>
