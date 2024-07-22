<script setup>
import { ref } from 'vue';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { albumsService } from '../services/AlbumsService.js';
import { Modal } from 'bootstrap';


const albumData = ref({
title: '',
coverImg: '',
description: undefined,
category: ''
})

async function createAlbum(){
  try {
    await albumsService.createAlbum(albumData.value)
    Pop.success('You did it yay! you created an album')
    resetForm()
    Modal.getOrCreateInstance('#create-album-modal').hide()
  } catch (error) {
    Pop.toast('Could not create album', 'error', 'center-start')
    logger.error(error)
  }
}

function resetForm(){
  albumData.value = {
title: '',
coverImg: '',
description: undefined,
category: ''
}
}

</script>


<template>
<form class="container-fluid" @submit.prevent="createAlbum()">
  <p class="fs-2">Create an Album</p>
  <section class="row">
    <div class="mb-2 col-6">
      <label for="album-title">Title</label>
      <input v-model="albumData.title" class="form-control" type="text" id="album-title" name="album-title" minlength="3" maxlength="25" required>
    </div>
    <div class="mb-2 col-6">
      <label for="album-cover-img">Cover Image</label>
      <input v-model="albumData.coverImg" class="form-control" type="url" id="album-cover-img" name="album-cover-img" required>
    </div>
    <div class="mb-2 col-12">
      <label for="album-description">Description</label>
      <textarea v-model="albumData.description" minlength="15" maxlength="250" class="form-control" name="album-description" id="album-description"></textarea>
    </div>
    <div class="mb-2 col-12">
      <label for="album-category">Category</label>
      <select v-model="albumData.category" required class="form-control" name="album-category" id="album-category">
        <option value="" disabled>Please Select A Category</option>
        <option value="animals">Animals</option>
        <option value="games">Games</option>
        <option value="misc">Miscellaneous</option>
      </select>
    </div>
    <div class="col-12 text-end">
      <button type="button" @click="resetForm()"> clear </button>
      <button class="btn btn-success">Submit</button>
    </div>
  </section>
</form>
</template>


<style lang="scss" scoped>

</style>
