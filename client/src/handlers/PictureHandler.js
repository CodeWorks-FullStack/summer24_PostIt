import { AppState } from "../AppState.js";
import { Picture } from "../models/Picture.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { SocketHandler } from "../utils/SocketHandler.js";

class PictureHandler extends SocketHandler {
  constructor() {
    super()
    this
      .on('CREATED_PICTURE', this.onCreatedPicture)
      .on('ADDED_PICTURE', this.notifyAlbumCreator)
  }
  onCreatedPicture(payload) {
    logger.log('created picture payload', payload)
    const picture = new Picture(payload)
    AppState.albumPictures.push(picture)
  }
  notifyAlbumCreator(payload) {
    logger.log('notifying creator', payload)
    Pop.toast(`<div>${payload.creator.name} just added a picture to ${payload.album.title}!</div> <img src="${payload.imgUrl}" height="100">`)
  }
}

export const pictureHandler = new PictureHandler()