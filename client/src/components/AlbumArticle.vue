<script setup>
import { RouterLink } from 'vue-router';
import { Album } from '../models/Album.js';

defineProps({album: Album})
</script>

<template>
  <RouterLink :to="{name: 'Album Details', params: {albumId: album.id}}">
    <section class="card justify-content-end p-1 selectable text-info">
      <!-- <img class="card-img" :src="album.coverImg" alt=""> -->
   <div>
     <div class="card-body bg-dark rounded " style="--bs-bg-opacity: .5">
       <div class="border-start border-2 border-primary ps-2">
         <h4 class="text-light">{{ album.title }}</h4>
        <div class="text-secondary">
          <img class="album-creator-picture me-1" :src="album.creator.picture" alt="">
          <span>{{ album.creator.name }}</span>
        </div>
      </div>
    </div>
  </div>
</section>
</RouterLink>
</template>


<style lang="scss" scoped>
.card{
height: 33vh;
background-image: v-bind('album.backgroundImg');
background-size: cover;
background-position: center;
}

.album-creator-picture{
  height: 40px;
  aspect-ratio: 1/1;
  border-radius: 500px;
  object-fit: cover;
  object-position: center;
}
</style>
