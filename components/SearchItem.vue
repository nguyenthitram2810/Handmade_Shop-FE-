<template>
  <div>
      <a-input-search
        :placeholder=placeholder
        :size=size
        style="width: 100%;"
        :value="value"
        @change="change"
        @submit="search"
      />
  </div>
</template>

<script>
export default {
  props: ["placeholder", "size", "value"],
  methods: {
    search() {
      this.$emit("search")
    },
    change() {
      this.$emit("change")
    }
  }
}
</script>