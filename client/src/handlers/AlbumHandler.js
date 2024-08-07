import { AppState } from "../AppState.js";
import { Album } from "../models/Album.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { SocketHandler } from "../utils/SocketHandler.js";

class AlbumHandler extends SocketHandler {
  constructor() {
    super()
    this
      .on('CREATED_ALBUM', this.onCreatedAlbum)
  }
  onCreatedAlbum(payload) {
    logger.log('payload from server', payload)
    Pop.toast(`New album with the name of ${payload.title} was created!`)
    const album = new Album(payload)
    AppState.albums.unshift(album)
  }
}

export const albumHandler = new AlbumHandler()