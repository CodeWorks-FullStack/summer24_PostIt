import { Account } from "./Account.js"
import { Album } from "./Album.js"



export class AlbumMember {
  constructor(data) {
    this.id = data.id
    this.albumId = data.albumId
    this.accountId = data.accountId
    // TODO profile and album
    // this.profile = data.profile ? new Account(data.profile) : null
    // this.album = data.album ? new Album(data.album) : null
  }
}

export class AlbumMemberProfile extends AlbumMember {
  constructor(data) {
    super(data) // super call runs the constructor of the parent
    this.profile = new Account(data.profile)
  }
}

export class AlbumMemberAlbum extends AlbumMember {
  constructor(data) {
    super(data)
    this.album = new Album(data.album)
  }
}
