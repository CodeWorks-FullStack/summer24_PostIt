import { Account } from "./Account.js"



export class Album {
  constructor(data) {
    this.id = data.id
    this.creatorId = data.creatorId
    this.title = data.title
    this.description = data.description || 'No description provided'
    this.coverImg = data.coverImg
    this.archived = data.archived
    this.category = data.category
    this.creator = data.creator ? new Account(data.creator) : null
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
    // TODO added
    this.memberCount = data.memberCount
  }

  get backgroundImg() {
    return `url(${this.coverImg})`
  }
}
