import {apiUrl} from "./backend-config.json"

export const BackendApi = {
    hello: async () => {
        const r = await fetch(apiUrl)
        return r.text()
    }
}
