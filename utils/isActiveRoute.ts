export default function isActiveRoute(targetRoute: string) {
  if (typeof window === "undefined") {
    // On build (where window is undefined), they all get set to
    // inactive

    return false
  }

  const currentRoute = window.location.pathname.replace(/^\/|\/$/g, '')

  return currentRoute === targetRoute?.replace(/^\/|\/$/g, '')
}
