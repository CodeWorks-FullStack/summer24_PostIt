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
      <div class="col-12 album-header rounded d-flex align-items-end p-2 justify-content-center">
        <div class="bg-dark rounded p-2 w-75" style="--bs-bg-opacity: .75;">
          <h3 class="text-center">{{ album.title }}</h3>
          <p>{{ album.description }}</p>
          <div class="d-flex justify-content-between align-items-end">
            <div>
              <span class="bg-primary rounded-pill px-3 py-1 fw-bold">{{ album.category }}</span>
              <button class="btn btn-danger rounded-pill">Archive<i class="mdi mdi-close-circle"></i></button>
            </div>

            <div>
              <span>{{ album.creator.name }}</span>
              <img class="album-creator-profile ms-2" :src="album.creator.picture" alt="">
            </div>

          </div>
        </div>
      </div>
    </section>
    <section v-else class="text-center fs-3">
      🤵🫴🐚 Please Wait here sir or madam...
    </section>
  </div>
</template>


<style lang="scss" scoped>
.album-header{
  height: 40vh;
  background-image: v-bind('album?.backgroundImg');
  background-size: cover;
  background-position: center;
}

.album-creator-profile{
  height: 75px;
  aspect-ratio: 1/1;
  border-radius: 500px;
  object-fit: cover;
  object-position: center;
}
</style>
