<template>
  <div class="d-flex flex-column">
    <BaseHeaderCart/>
      <nuxt/>
    <BaseFooter />
  </div>
</template>

<script>
import BaseHeaderCart from '~/components/v-layout/BaseHeader/cart'
import BaseFooter from '~/components/v-layout/BaseFooter'

export default {
  name: 'CartLayout',
  components: {
    BaseHeaderCart,
    BaseFooter
  }
}
</script>
