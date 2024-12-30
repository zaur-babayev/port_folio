export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Serve static assets from the build output
    if (url.pathname.startsWith('/static/')) {
      return env.ASSETS.fetch(request);
    }

    // Let Next.js handle everything else
    return env.ASSETS.fetch(request);
  },
};
