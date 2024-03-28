const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  devServer: {
    port: 3000,
  },
  webpack: {
    plugins: [
      new ModuleFederationPlugin({
        name: "launcher",
        remotes: {
          app1: "app1@http://localhost:3001/remoteEntry.js",
          app2: "app2@http://localhost:3002/remoteEntry.js",
        },
        shared: {
          react: { singleton: true },
          "react-dom": { singleton: true },
        },
      }),
    ],
  },
};
