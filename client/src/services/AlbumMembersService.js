import { AppState } from "../AppState.js"
import { AlbumMember, AlbumMemberAlbum, AlbumMemberProfile } from "../models/AlbumMember.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"




class AlbumMembersService {

  async joinAsAlbumMember(memberData) {
    const response = await api.post('api/collaborators', memberData)
    logger.log('✨👺📡', response.data)
    const newProfile = new AlbumMemberProfile(response.data)
    AppState.albumProfiles.push(newProfile)
    AppState.activeAlbum.memberCount++
  }
  async getAccountAlbumMemberAlbums() {
    const response = await api.get('account/collaborators')
    logger.log('👺🤠📡', response.data)
    const albumMemberAlbums = response.data.map(albumMemberData => new AlbumMemberAlbum(albumMemberData))
    AppState.accountAlbums = albumMemberAlbums
  }
  async getAlbumMembersForAlbum(albumId) {
    const response = await api.get(`api/albums/${albumId}/collaborators`)
    logger.log('👺👺📡', response.data)
    const albumMemberProfiles = response.data.map(albumMemberData => new AlbumMemberProfile(albumMemberData))
    AppState.albumProfiles = albumMemberProfiles
  }

  async deleteAlbumMember(albumMemberId) {
    const response = await api.delete(`api/collaborators/${albumMemberId}`)
    logger.log('💣👺📡', response.data)
    const albumMemberIndexToRemove = AppState.accountAlbums.findIndex(aam => aam.id == albumMemberId)
    AppState.accountAlbums.splice(albumMemberIndexToRemove, 1)
  }

}

export const albumMembersService = new AlbumMembersService()
