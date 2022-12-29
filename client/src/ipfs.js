import { Buffer as Buff } from 'buffer';
import { create } from 'ipfs-http-client'

const INFURA_ID = process.env.REACT_APP_INFURA_ID
const INFURA_SECRET_KEY = process.env.REACT_APP_INFURA_SECRET_KEY
const auth = 'Basic ' + Buff.from(INFURA_ID + ':' + INFURA_SECRET_KEY).toString('base64')
export const ipfs = create({
  host: 'ipfs.infura.io', port: 5001, protocol: 'https', headers: {
    authorization: auth,
  },
})
