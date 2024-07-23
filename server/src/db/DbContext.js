import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { AlbumSchema } from '../models/Album.js';
import { PictureSchema } from '../models/Picture.js';
import { AlbumMemberSchema } from '../models/AlbumMember.js';

class DbContext {
  Account = mongoose.model('Account', AccountSchema);

  Albums = mongoose.model('Album', AlbumSchema)

  Pictures = mongoose.model('Picture', PictureSchema)

  AlbumMembers = mongoose.model('AlbumMember', AlbumMemberSchema)
}

export const dbContext = new DbContext()
