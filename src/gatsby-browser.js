import sa from './index'

exports.onRouteUpdate = ({ location }, pluginOptions) => {
  if (pluginOptions.trackPageViews) {
    const ignore = pluginOptions.ignorePages || []
    const { pathname } = location
    const page = pathname.replace(/\//g, '') || 'home'
    if (!ignore.includes(page)) {
      const event = `view-${page}`
      sa(event)
    }
  }
}
