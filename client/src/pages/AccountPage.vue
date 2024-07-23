<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { albumMembersService } from '../services/AlbumMembersService.js';
import AlbumArticle from '../components/AlbumArticle.vue';

const account = computed(() => AppState.account)
const accountAlbums = computed(()=> AppState.accountAlbums)

onMounted(()=>{
  getAccountAlbumMemberAlbums()
})

async function getAccountAlbumMemberAlbums(){
  try {
    await albumMembersService.getAccountAlbumMemberAlbums()
  } catch (error) {
    Pop.toast("could not get account album members", 'error')
    logger.error(error)
  }
}

</script>

<template>
  <div class="about text-center">
    <div v-if="account">
      <h1>Welcome {{ account.name }}</h1>
      <img class="rounded" :src="account.picture" alt="" />
      <p>{{ account.email }}</p>
      <div class="container">
        <section class="row">

          <div v-for="accountAlbum in accountAlbums" :key="accountAlbum.id" class="col-md-4">
            {{ accountAlbum.album.title }}
            <AlbumArticle :album="accountAlbum.album"/>
          </div>

        </section>
      </div>
    </div>
    <div v-else>
      <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
    </div>
  </div>
</template>

<style scoped lang="scss">
img {
  max-width: 100px;
}
</style>
