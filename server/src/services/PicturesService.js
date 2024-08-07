import { dbContext } from "../db/DbContext.js"


class PicturesService {
  async getAlbumPictures(albumId) {
    const pictures = await dbContext.Pictures.find({ albumId: albumId }).populate('creator')
    return pictures
  }
  async createPicture(pictureData) {
    const picture = await dbContext.Pictures.create(pictureData)
    await picture.populate('creator album')
    return picture
  }

}

export const picturesService = new PicturesService()
