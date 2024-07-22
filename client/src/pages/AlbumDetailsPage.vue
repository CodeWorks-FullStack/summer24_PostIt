<script setup>
import { computed, onMounted } from 'vue';
import { albumsService } from '../services/AlbumsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';

const route = useRoute()

const album = computed(()=> AppState.activeAlbum)

onMounted(()=>{
  getAlbumById()
})


async function getAlbumById(){
  try {
    await albumsService.getAlbumById(route.params.albumId)
  } catch (error) {
    Pop.toast("Could not get Album 🌚", 'error', 'bottom-start')
    logger.error(error)
  }
}
</script>


<template>
  <div class="container">
    <section v-if="album" class="row">
      This is the album Details page
      <img class="img-fluid" :src="album.coverImg" alt="">
      {{ album.title }}
    </section>
    <section v-else class="text-center fs-3">
      🤵🫴🐚 Please Wait here sir or madam...
    </section>
  </div>
</template>


<style lang="scss" scoped>

</style>
