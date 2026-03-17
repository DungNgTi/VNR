import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import Layout from "../layout/Layout"
import Page from "../components/Page"

function resolveConfigSrc(pathname) {
    const clean = pathname.replace(/^\/|\/$/g, "") || "default"
    return `/config/${clean}.json`
}


function PageRenderer() {
    const location = useLocation()
    const src = resolveConfigSrc(location.pathname)
    return <Page src={src} />
}

function AppRoutes() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="*" element={<PageRenderer />} />
            </Route>
        </Routes>
    )
}

export default function AppRouter() {
    return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    )
}
