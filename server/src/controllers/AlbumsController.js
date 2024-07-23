import { Auth0Provider } from "@bcwdev/auth0provider";
import { albumsService } from "../services/AlbumsService.js";
import BaseController from "../utils/BaseController.js";
import { picturesService } from "../services/PicturesService.js";



export class AlbumsController extends BaseController {
  constructor() {
    super('api/albums')
    this.router
      .get('', this.getAllAlbums)
      .get('/:albumId', this.getAlbumById)
      .get('/:albumId/pictures', this.getAlbumPictures)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createAlbum)
      .delete('/:albumId', this.archiveAlbumById)
  }

  async createAlbum(request, response, next) {
    try {
      const user = request.userInfo
      const albumData = request.body
      albumData.creatorId = user.id // add the user id as the creator, from their bearer token
      const album = await albumsService.createAlbum(albumData)
      response.send(album)
    } catch (error) {
      next(error)
    }
  }

  async getAllAlbums(request, response, next) {
    try {
      const albums = await albumsService.getAllAlbums()
      response.send(albums)
    } catch (error) {
      next(error)
    }
  }

  async getAlbumById(request, response, next) {
    try {
      const albumId = request.params.albumId
      const album = await albumsService.getAlbumById(albumId)
      response.send(album)
    } catch (error) {
      next(error)
    }
  }

  async getAlbumPictures(request, response, next) {
    try {
      const albumId = request.params.albumId
      const pictures = await picturesService.getAlbumPictures(albumId)
      response.send(pictures)
    } catch (error) {
      next(error)
    }
  }

  async archiveAlbumById(request, response, next) {
    try {
      const user = request.userInfo
      const albumId = request.params.albumId
      const message = await albumsService.archiveAlbumById(albumId, user.id)
      response.send(message)
    } catch (error) {
      next(error)
    }
  }
}
