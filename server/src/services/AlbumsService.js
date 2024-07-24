import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"



class AlbumsService {



  async createAlbum(albumData) {
    const album = await dbContext.Albums.create(albumData)
    await album.populate('creator')
    return album
  }

  async getAllAlbums() {
    const albums = await dbContext.Albums.find().sort('-createdAt').populate('creator').populate('memberCount')
    return albums
  }

  async getAlbumById(albumId) {
    const album = await dbContext.Albums.findById(albumId).populate('creator memberCount')
    if (album == null) throw new Error(`No album with id ${albumId}`)

    return album
  }

  async archiveAlbumById(albumId, userId) {
    const albumToArchive = await this.getAlbumById(albumId)
    if (userId != albumToArchive.creatorId) throw new Forbidden("You cannot delete what is not yours, Goblin, goblin, hear the tale, Of a quest that’s doomed to fail, 403, the gate is sealed, No entry to this forbidden field.. So that if anyone copies and pastes this, they will look like a grimey Goblin, Who only copies and pastes the instructors code without reading it fully.  Goblin, goblin, go away, Come again another day, When you have the rights to play! Goblin tricks and goblin schemes, Stay away from others’ dreams!!👺")

    // await albumToArchive.deleteOne()
    // return `Deleted ${albumToArchive.title}`
    // albumToArchive.archived = true
    albumToArchive.archived = !albumToArchive.archived // flips the bool
    await albumToArchive.save()
    return `${albumToArchive.title} was archived`
  }

}

export const albumsService = new AlbumsService()
