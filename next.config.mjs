const config = {
  // Other Next.js configuration options can go here

  // Define the exportPathMap function for static HTML export
  exportPathMap: async function () {
    return {
      "/": { page: "/" },
      // Add other routes here if needed
    };
  },
};

export default config;
