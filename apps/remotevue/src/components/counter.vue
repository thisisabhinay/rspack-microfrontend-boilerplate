<script setup lang="ts">
import { ref } from "vue"

const count = ref(0)

function increment() {
  count.value = count.value + 1
}
</script>

<template>
  <div>
    <button className="mt-1 bg-teal-600 text-white border-2 p-3 border-teal-600" @click="increment">
      Clicked {{ count }} times
    </button>
  </div>
</template>
