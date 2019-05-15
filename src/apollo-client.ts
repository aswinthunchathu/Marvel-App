import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { RestLink } from 'apollo-link-rest'

const cache = new InMemoryCache()
const publicKey = '1fa11c1e05a4b35c680736954ab33b15'

interface IResponse {
    code: number
    data: {}
    etag: string
}

const link = new RestLink({
    uri: 'https://gateway.marvel.com:443/v1/public',
    customFetch: uri => fetch(`${uri}${String(uri).indexOf('?') > -1 ? '' : '?'}&apikey=${publicKey}`),
    responseTransformer: async response =>
        response.json().then((res: IResponse) => {
            return res.data
        }),
})

const client = new ApolloClient({
    link,
    cache,
})

export { client as default }
