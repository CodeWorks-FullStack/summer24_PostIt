import { AppState } from "../AppState.js"
import { Album } from "../models/Album.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"



class AlbumsService {
  async createAlbum(albumData) {
    const response = await api.post('api/albums', albumData)
    logger.log('✨🖼️📡', response.data)
    const newAlbum = new Album(response.data)
    // AppState.albums.unshift(newAlbum) websocket is handling updating appstate
    return newAlbum
  }
  async getAlbumById(albumId) {
    AppState.activeAlbum = null
    const response = await api.get(`api/albums/${albumId}`)
    logger.log('🖼️📡🧌', response.data)
    const album = new Album(response.data)
    AppState.activeAlbum = album
  }
  async getAllAlbums() {
    const response = await api.get('api/albums')
    logger.log('🖼️📡🌚', response.data)
    const albums = response.data.map(albumData => new Album(albumData))
    AppState.albums = albums
  }

}

export const albumsService = new AlbumsService()
