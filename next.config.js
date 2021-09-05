const { getThemeVariables } = require("antd/dist/theme");
const withPlugins = require("next-compose-plugins");
const withAntdLess = require("next-plugin-antd-less");

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";

const plugins = [
  withAntdLess({
    modifyVars: {
      ...getThemeVariables({
        dark: true, // Enable dark mode
        compact: true, // Enable compact mode
      }),
      "@body-background": "#0f0d0f",
      "@primary-color": "#cab44a",
      "@text-color": "#f8fabb",
      "@heading-color": "#cab44a",
      "@font-family": '"Nunito", sans-serif',
    },
    reactStrictMode: true,
    target: "serverless",
  }),
];

module.exports = withPlugins(plugins, {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${BACKEND_URL}/api/:path*`, // Proxy to Backend
      },
    ];
  },
});
