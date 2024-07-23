import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { albumMemberService } from "../services/AlbumMembersService.js";


export class AlbumMembersController extends BaseController {
  constructor() {
    super('api/collaborators')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createAlbumMember)
      .delete('/:albumMemberId', this.deleteAlbumMember)
  }

  async createAlbumMember(request, response, next) {
    try {
      const user = request.userInfo
      const albumMemberData = request.body
      albumMemberData.accountId = user.id
      const albumMember = await albumMemberService.createAlbumMember(albumMemberData)
      response.send(albumMember)
    } catch (error) {
      next(error)
    }
  }

  async deleteAlbumMember(request, response, next) {
    try {
      const albumMemberId = request.params.albumMemberId
      const userId = request.userInfo.id
      const message = await albumMemberService.deleteAlbumMember(albumMemberId, userId)
      response.send(message)
    } catch (error) {
      next(error)
    }
  }
}
