

<script setup>

defineProps({
  id: {type: String, required: true, default: 'modal-from-scratch'},
  centered: {type: Boolean, default: true},
})

</script>




<template>
  <div :id class="modal fade" role="dialog">
    <div  class=" modal-dialog" :class="{'modal-dialog-centered': centered}">
      <div class="modal-content">
        <div class="modal-body">
          <slot>
            Things go here
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>

</style>
