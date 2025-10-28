// next.config.mjs
import NextFederationPlugin from '@module-federation/nextjs-mf'

/** @type {import('next').NextConfig} */
const config = {
  output: 'standalone',
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'nextRemote',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './hello/mount': './components/hello/mount.tsx',
        },
      })
    )
    
    // Mark consul as external since it uses Node.js built-in modules
    config.externals.push('consul')
    
    return config
  },
  async rewrites() {
    return [{ source: '/nextapi/:path*', destination: '/api/nextapi/:path*' }]
  },
}
export default config