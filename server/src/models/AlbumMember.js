import { Schema } from "mongoose";



export const AlbumMemberSchema = new Schema({
  accountId: { type: Schema.ObjectId, ref: 'Account', required: true },
  albumId: { type: Schema.ObjectId, ref: 'Album', required: true },
}, { toJSON: { virtuals: true } })

AlbumMemberSchema.virtual('profile', {
  localField: 'accountId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

AlbumMemberSchema.virtual('album', {
  localField: 'albumId',
  ref: 'Album',
  foreignField: '_id',
  justOne: true
})
