import { reactive } from 'vue'
import { Album } from './models/Album.js'
import { Picture } from './models/Picture.js'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,

  /** @type {Album[]} */
  albums: [],

  /** @type {Album} */
  activeAlbum: null,

  /** @type {Picture[]} */
  albumPictures: []
})

// NOTE be very careful of built in class types like the following
// IMAGE
// COMMENT
// EVENT
// ELEMENT
