import { RainbowWebsocket} from '../../RainbowWebsocket'
const JSON_RPC_VERSION = '2.0'
import { config } from '../server'

interface IOption {
  url: string
}

export class BackendApi {
  protected _url:string
  protected _rainbowWebsocket: RainbowWebsocket

  constructor(option: IOption) {
    this._url = option.url
    this._rainbowWebsocket = new RainbowWebsocket({
      url: this._url
    })
  }

  version () {
    return this._rainbowWebsocket.request({
      data: null
    })
  }
}

const backendApi = new BackendApi({
  url: `${config.host}:${config.port}`
})



