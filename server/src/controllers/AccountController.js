import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'
import { albumMemberService } from '../services/AlbumMembersService.js'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .put('', this.editUserAccount)
      .get('/collaborators', this.getAlbumMembersByAccountId)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async editUserAccount(req, res, next) {
    try {
      const accountId = req.userInfo.id
      req.body.id = accountId
      const account = await accountService.updateAccount(req.userInfo, req.body)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getAlbumMembersByAccountId(request, response, next) {
    try {
      const accountId = request.userInfo.id
      const albumMembers = await albumMemberService.getAlbumMembersByAccountId(accountId)
      response.send(albumMembers)
    } catch (error) {
      next(error)
    }
  }

}
