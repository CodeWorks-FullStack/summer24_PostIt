<script setup>
import { ref } from 'vue';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { picturesService } from '../services/PicturesService.js';
import { useRoute } from 'vue-router';
import { Modal } from 'bootstrap';

const route = useRoute()

const pictureData = ref({
  imgUrl: '',
  albumId: route.params.albumId
})

async function createPicture(){
  try {
    await picturesService.createPicture(pictureData.value)
    Pop.success("Image Added")
    Modal.getOrCreateInstance('#create-picture-modal').hide()
    resetForm()
  } catch (error) {
    Pop.toast("Could not add Picture to album", 'error', 'center-end')
    logger.error(error)
  }
}

function resetForm(){
  pictureData.value = {
  imgUrl: '',
  albumId: route.params.albumId
}
}
</script>


<template>
<form class="container-fluid" @submit.prevent="createPicture()">
  <section class="row">
    <h3>Add Picture</h3>
    <div class="col-12 mb-3">
      <label for="picture-image-url">Image Url</label>
      <input v-model="pictureData.imgUrl" class="form-control" type="url" name="picture-image-url" id="picture-image-url" required maxlength="1000">
    </div>
    <div class="col-12 text-center">
      <img v-if="pictureData.imgUrl" :src="pictureData.imgUrl" class="img-preview" alt="could not load image">
    </div>
    <div class="col-12 text-end">
      <button class="btn btn-primary"><i class="mdi mdi-plus"></i>Submit</button>
    </div>
  </section>
</form>
</template>


<style lang="scss" scoped>
.img-preview{
  max-height: 300px;
  width: 100%;
  object-fit: contain;
}
</style>
