import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"



class AlbumMembersService {

  async createAlbumMember(albumMemberData) {
    const albumMember = await dbContext.AlbumMembers.create(albumMemberData)
    await albumMember.populate('profile')
    return albumMember
  }
  async getAlbumMembersByAlbumId(albumId) {
    const albumMembers = await dbContext.AlbumMembers.find({ albumId }).populate('profile')
    return albumMembers
  }
  async getAlbumMembersByAccountId(accountId) {
    const albumMembers = await dbContext.AlbumMembers.find({ accountId }).populate('album')
    return albumMembers
  }

  async deleteAlbumMember(albumMemberId, userId) {
    const albumMemberToDelete = await dbContext.AlbumMembers.findById(albumMemberId)
    if (userId != albumMemberToDelete.accountId) throw new Forbidden("You cannot delete what is not yours, I am going to make this error message really long. So that if anyone copies and pastes this, they will look like a grimey Goblin, Who only copies and pastes the instructors code without reading it fully. Goblin, Goblin, Get Gobbed!👺")
    await albumMemberToDelete.deleteOne()
    return `Collaboration has ended, Don't copy and paste this one either 👺`
  }

}

export const albumMemberService = new AlbumMembersService()
