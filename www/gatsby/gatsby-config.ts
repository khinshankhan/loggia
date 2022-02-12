import path from "path";
import { GatsbyConfig } from "gatsby";

const baseDir = path.join(__dirname, `..`);

const plugins: GatsbyConfig["plugins"] = [
  {
    resolve: `gatsby-plugin-root-import`,
    options: {
      resolveModules: [baseDir],
    },
  },
  {
    resolve: `@chakra-ui/gatsby-plugin`,
    options: {
      resetCSS: true,
    },
  },
  `gatsby-plugin-remove-trailing-slashes`,
];

const config: GatsbyConfig = {
  plugins,
};

export default config;
