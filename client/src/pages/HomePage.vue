<script setup>
import { computed, onMounted } from 'vue';
import { albumsService } from '../services/AlbumsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';
import AlbumArticle from '../components/AlbumArticle.vue';
import ModalWrapper from '../components/ModalWrapper.vue';
import CreateAlbumForm from '../components/CreateAlbumForm.vue';

const albums = computed(()=> AppState.albums)

onMounted(()=>{
  getAllAlbums()
})

async function getAllAlbums(){
  try {
    await albumsService.getAllAlbums()
  } catch (error) {
    Pop.toast('Could not get Albums ☹️', 'error', 'center')
    logger.error(error)
  }
}

</script>


<template>
  <div class="container">


    <section class="row g-2 justify-content-end">
      <div class="col-12">
        <h2>Find your interest</h2>
        <hr/>
      </div>

      <!-- SECTION category buttons -->
       <!-- SECTION create Button -->
        <div data-bs-target="#create-album-modal" data-bs-toggle="modal" role="button" class="col-4 btn btn-success p-4 rounded text-center text-light fw-bold">
          Create +
        </div>

    </section>


    <section class="row">
      <div class="col-12">
        <h2>Popular Albums</h2>
        <hr>
        <section class="row g-2">
          <article v-for="album in albums" :key="album.id" class="col-12 col-md-4">
            <!-- {{ album.title }} -->
            <AlbumArticle :album="album"/>
          </article>
        </section>
      </div>
      <!-- SECTION album cards -->
    </section>
  </div>

  <ModalWrapper id="create-album-modal">
    <CreateAlbumForm/>
  </ModalWrapper>
  <button class="btn btn-danger" data-bs-target="#🤠" data-bs-toggle="modal">
    Open Cowboy
  </button>
  <!-- NOTE just an example -->
  <ModalWrapper id="🤠">🤠</ModalWrapper>
</template>

<style scoped lang="scss">

</style>
