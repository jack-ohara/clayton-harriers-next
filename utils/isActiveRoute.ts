export default function isActiveRoute(targetRoute: string) {
  if (typeof window === "undefined") {
    // On build (where window is undefined), they all get set to
    // inactive, so this sets the home page to active by default
    // and ensures it's orange on the first load

    return targetRoute === "/"
  }

  const currentRoute = window.location.pathname.replace(/(^.+)(\/)$/, "$1")

  return currentRoute === targetRoute?.replace(/(^.+)(\/)$/, "$1")
}
