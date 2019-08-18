import sa from './index'

exports.onRouteUpdate = ({ location }, pluginOptions) => {
  if (pluginOptions.trackPageViews) {
    const ignore = pluginOptions.ignorePages || []
    const { pathname } = location
    if (!ignore.includes(pathname)) {
      sa(pathname)
    }
  }
}
