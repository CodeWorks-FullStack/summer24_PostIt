import { Auth0Provider } from "@bcwdev/auth0provider";
import { picturesService } from "../services/PicturesService.js";
import BaseController from "../utils/BaseController.js";
import { socketProvider } from "../SocketProvider.js";
import { logger } from "../utils/Logger.js";


export class PicturesController extends BaseController {
  constructor() {
    super('api/pictures')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createPicture)
  }

  async createPicture(request, response, next) {
    try {
      const user = request.userInfo
      const pictureData = request.body
      pictureData.creatorId = user.id
      const picture = await picturesService.createPicture(pictureData)
      response.send(picture)

      socketProvider.messageRoom(`album-${picture.albumId}`, 'CREATED_PICTURE', picture)

      // @ts-ignore
      if (user.id == picture.album.creatorId) return

      // @ts-ignore
      socketProvider.messageUser(picture.album.creatorId.toString(), 'ADDED_PICTURE', picture)
    } catch (error) {
      next(error)
    }
  }
}
