import { serverConfig} from '../server/config'
import RainbowWebsocket from '../../dist/esm'

// class IOption {
//   url: string
// }

export class BackendApi {
  protected _url:string
  protected _rainbowWebsocket: RainbowWebsocket

  constructor(option: any) {
    this._url = option.url
    this._rainbowWebsocket = new RainbowWebsocket({
      url: this._url
    })
  }

  version () {
    return this._rainbowWebsocket.request({
      data: {
        method: 'version',
        params: {
          latest: true
        }
      }
    })
  }
}

window.backendApi = new BackendApi({
  url: `${serverConfig.host}:${serverConfig.port}`
})




const api = new BackendApi({
  url: serverConfig.host + ':' + serverConfig.port
})



