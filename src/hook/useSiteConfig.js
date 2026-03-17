import { useEffect, useState } from "react"

let cache = null
let promise = null

export function useSiteConfig() {
    const [config, setConfig] = useState(cache)
    const [loading, setLoading] = useState(!cache)

    useEffect(() => {
        if (cache) { setConfig(cache); setLoading(false); return }
        if (!promise) {
            promise = fetch("/general/site.json")
                .then(r => r.json())
                .then(json => { cache = json; return json })
                .catch(() => { cache = {}; return {} })
        }
        promise.then(json => { setConfig(json); setLoading(false) })
    }, [])

    return { config, loading }
}