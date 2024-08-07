import { AppState } from "../AppState.js"
import { Picture } from "../models/Picture.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"




class PicturesService {
  async getAlbumPictures(albumId) {
    AppState.albumPictures = []
    const response = await api.get(`api/albums/${albumId}/pictures`)
    logger.log('🖼️🤠📡', response.data)
    const pictures = response.data.map(pictureData => new Picture(pictureData))
    AppState.albumPictures = pictures
  }
  async createPicture(pictureData) {
    const response = await api.post('api/pictures', pictureData)
    logger.log('✨🤠📡', response.data)
    // const newPicture = new Picture(response.data)
    // AppState.albumPictures.push(newPicture) websocket handles this now
  }

}

export const picturesService = new PicturesService()
