import { AppState } from "../AppState.js";
import { Picture } from "../models/Picture.js";
import { logger } from "../utils/Logger.js";
import { SocketHandler } from "../utils/SocketHandler.js";

class PictureHandler extends SocketHandler {
  constructor() {
    super()
    this
      .on('CREATED_PICTURE', this.onCreatedPicture)
  }
  onCreatedPicture(payload) {
    logger.log('created picture payload', payload)
    const picture = new Picture(payload)
    AppState.albumPictures.push(picture)
  }
}

export const pictureHandler = new PictureHandler()