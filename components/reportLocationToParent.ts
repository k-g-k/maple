import Router from "next/router"
import { useEffect } from "react"

/**
 * When the site is loaded inside an iframe, tell the parent page where the
 * visitor is. The redesign comparison page (/learn/comparison) listens for
 * these messages to keep the original and redesigned sites on matching pages.
 *
 * The comparison page replies with the pages it showcases. Links to anything
 * else are disabled, so visitors stay on those pages. Links within the current
 * page, such as section anchors, keep working.
 *
 * Outside an iframe this does nothing.
 */
export function useReportLocationToParent() {
  useEffect(() => {
    if (window.parent === window) return

    let allowed: string[] | null = null

    const report = () =>
      window.parent.postMessage(
        {
          type: "maple-location",
          path: window.location.pathname + window.location.hash
        },
        "*"
      )

    const onMessage = (event: MessageEvent) => {
      if (event.source !== window.parent) return
      if (event.data?.type === "maple-allowed") allowed = event.data.paths
    }

    const isAllowed = (url: URL) => {
      if (url.origin !== window.location.origin) return false
      const path = url.pathname.replace(/\/+$/, "") || "/"
      if (path === window.location.pathname) return true
      return (allowed ?? []).some(p => path === p || path.startsWith(p + "/"))
    }

    // Capture phase, so this runs before Next's own link handling.
    const onClick = (event: MouseEvent) => {
      if (!allowed) return
      const link = (event.target as Element).closest?.("a[href]")
      if (!link) return
      if (isAllowed(new URL((link as HTMLAnchorElement).href))) return
      event.preventDefault()
      event.stopPropagation()
    }

    report()
    window.addEventListener("message", onMessage)
    document.addEventListener("click", onClick, true)
    Router.events.on("routeChangeComplete", report)
    Router.events.on("hashChangeComplete", report)
    window.addEventListener("hashchange", report)
    return () => {
      window.removeEventListener("message", onMessage)
      document.removeEventListener("click", onClick, true)
      Router.events.off("routeChangeComplete", report)
      Router.events.off("hashChangeComplete", report)
      window.removeEventListener("hashchange", report)
    }
  }, [])
}
