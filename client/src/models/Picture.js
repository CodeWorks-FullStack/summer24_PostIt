import { Account } from "./Account.js"


export class Picture {
  constructor(data) {
    this.id = data.id
    this.albumId = data.albumId
    this.creatorId = data.creatorId
    this.imgUrl = data.imgUrl
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
    this.creator = new Account(data.creator)
  }
}
