import { AppState } from "../AppState.js"
import { AlbumMember, AlbumMemberAlbum, AlbumMemberProfile } from "../models/AlbumMember.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"




class AlbumMembersService {
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

}

export const albumMembersService = new AlbumMembersService()
