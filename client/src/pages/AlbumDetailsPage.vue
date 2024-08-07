<script setup>
import { computed, onMounted } from 'vue';
import { albumsService } from '../services/AlbumsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { onBeforeRouteLeave, useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import CreatePictureForm from '../components/CreatePictureForm.vue';
import ModalWrapper from '../components/ModalWrapper.vue';
import { picturesService } from '../services/PicturesService.js';
import { albumMembersService } from '../services/AlbumMembersService.js';
import { roomHandler } from '../handlers/RoomHandler.js';

const route = useRoute()

const album = computed(() => AppState.activeAlbum)
const albumPictures = computed(() => AppState.albumPictures)
const albumMemberProfiles = computed(() => AppState.albumProfiles)
const identity = computed(() => AppState.identity)

const isAMember = computed(() => AppState.albumProfiles.find(amp => amp.accountId == AppState.account?.id))

onMounted(() => {
  getAlbumById()
  getAlbumPictures()
  getAlbumMembersForAlbum()

  roomHandler.emit('JOIN_ROOM', `album-${route.params.albumId}`)
})

onBeforeRouteLeave(() => {
  roomHandler.emit('LEAVE_ROOM', `album-${route.params.albumId}`)
})


async function getAlbumById() {
  try {
    await albumsService.getAlbumById(route.params.albumId)
  } catch (error) {
    Pop.toast("Could not get Album 🌚", 'error', 'bottom-start')
    logger.error(error)
  }
}

async function getAlbumPictures() {
  try {
    await picturesService.getAlbumPictures(route.params.albumId)
  } catch (error) {
    Pop.toast("Could not get album pictures 👺", 'error', 'bottom')
    logger.error(error)
  }
}

async function getAlbumMembersForAlbum() {
  try {
    await albumMembersService.getAlbumMembersForAlbum(route.params.albumId)
  } catch (error) {
    Pop.toast("Could not get album members 👺", 'error', 'center')
    logger.error(error)
  }
}

async function joinAsAlbumMember() {
  try {
    const memberData = { albumId: route.params.albumId }
    await albumMembersService.joinAsAlbumMember(memberData)
  } catch (error) {
    Pop.toast("Could NOT join Album 👺", 'error', 'center')
    logger.error(error)
  }
}
</script>


<template>
  <div class="container">
    <section v-if="album" class="row mb-3">
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

    <section class="row">
      <div class="col-md-3">
        <section v-if="album" class="row g-2">
          <div v-if="isAMember" class="col-12 text-info fw-bold">You're already a member!</div>
          <div class="col-7">
            Member Count {{ album.memberCount }}
          </div>
          <button :disabled="!identity || isAMember != undefined" @click="joinAsAlbumMember()"
            class="col-5 btn btn-warning">
            <i class="mdi mdi-heart"></i> join
          </button>

          <!-- SECTION album member profile pictures -->
          <div class="col-4" v-for="albumMember in albumMemberProfiles" :key="albumMember.id">
            <img class="img-fluid" :src="albumMember.profile.picture" alt="it's a face">
          </div>

        </section>
      </div>
      <div class="col-md-9">
        <section class="masonry">

          <img v-for="picture in albumPictures" :key="picture.id" :src="picture.imgUrl" :alt="picture.imgUrl"
            class="rounded img-fluid" :title="`posted by ${picture.creator.name}`">

        </section>
      </div>
    </section>

    <ModalWrapper id="create-picture-modal">
      <CreatePictureForm />
    </ModalWrapper>
    <button data-bs-target="#create-picture-modal" data-bs-toggle="modal" class="btn btn-info add-image-fab"><i
        class="mdi mdi-plus"></i>Add <i class="mdi mdi-image"></i></button>
  </div>
</template>


<style lang="scss" scoped>
.album-header {
  height: 40vh;
  background-image: v-bind('album?.backgroundImg');
  background-size: cover;
  background-position: center;
}

.album-creator-profile {
  height: 75px;
  aspect-ratio: 1/1;
  border-radius: 500px;
  object-fit: cover;
  object-position: center;
}

.add-image-fab {
  position: fixed;
  bottom: 2em;
  right: 2em;
}

.masonry {
  columns: 150px;
  column-gap: 1em;
  column-fill: balance;

  img {
    margin-bottom: 1em;
  }
}
</style>
