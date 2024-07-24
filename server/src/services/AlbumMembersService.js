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
    // const albumMembers = await dbContext.AlbumMembers.find({ accountId }).populate('album')
    const albumMembers = await dbContext.AlbumMembers.find({ accountId }).populate({ path: 'album', populate: { path: 'creator memberCount' } })
    return albumMembers
  }

  async deleteAlbumMember(albumMemberId, userId) {
    const albumMemberToDelete = await dbContext.AlbumMembers.findById(albumMemberId)
    if (userId != albumMemberToDelete.accountId) throw new Forbidden("You cannot delete what is not yours, Goblin, goblin, hear the tale, Of a quest that’s doomed to fail, 403, the gate is sealed, No entry to this forbidden field.. So that if anyone copies and pastes this, they will look like a grimey Goblin, Who only copies and pastes the instructors code without reading it fully.  Goblin, goblin, go away, Come again another day, When you have the rights to play! Goblin tricks and goblin schemes, Stay away from others’ dreams!!👺")
    await albumMemberToDelete.deleteOne()
    return `Collaboration has ended, Don't copy and paste this one either 👺`
  }

}

export const albumMemberService = new AlbumMembersService()
