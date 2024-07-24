import { Schema } from "mongoose";


export const AlbumSchema = new Schema({
  creatorId: { type: Schema.ObjectId, ref: 'Account', required: true },
  title: { type: String, minLength: 3, maxLength: 25, required: true, default: 'Lightning Mcqueens Trophies' },
  description: { type: String, minLength: 15, maxLength: 250 },
  coverImg: { type: String, maxLength: 1000, required: true },
  archived: { type: Boolean, required: true, default: false },
  category: { type: String, enum: ['aesthetics', 'food', 'games', 'animals', 'misc'], required: true, default: 'misc', lowercase: true }
}, { timestamps: true, toJSON: { virtuals: true } })


AlbumSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

// NOTE this virtual looks the other way, and counts them
AlbumSchema.virtual('memberCount', { // must also be populated
  localField: '_id',
  ref: 'AlbumMember',
  foreignField: 'albumId',
  count: true
})
