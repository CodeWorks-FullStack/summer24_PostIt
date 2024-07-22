import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"



class AlbumsService {



  async createAlbum(albumData) {
    const album = await dbContext.Albums.create(albumData)
    await album.populate('creator')
    return album
  }

  async getAllAlbums() {
    const albums = await dbContext.Albums.find().populate('creator')
    return albums
  }

  async getAlbumById(albumId) {
    const album = await dbContext.Albums.findById(albumId).populate('creator')
    if (album == null) throw new Error(`No album with id ${albumId}`)

    return album
  }

  async archiveAlbumById(albumId, userId) {
    const albumToArchive = await this.getAlbumById(albumId)
    if (userId != albumToArchive.creatorId) throw new Forbidden(`You shall not pass!, this is not yours!`)

    // await albumToArchive.deleteOne()
    // return `Deleted ${albumToArchive.title}`
    // albumToArchive.archived = true
    albumToArchive.archived = !albumToArchive.archived // flips the bool
    await albumToArchive.save()
    return `${albumToArchive.title} was archived`
  }

}

export const albumsService = new AlbumsService()
