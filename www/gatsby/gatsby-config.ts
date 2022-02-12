import { GatsbyConfig } from "gatsby";

const plugins: GatsbyConfig["plugins"] = [
  {
    resolve: `@chakra-ui/gatsby-plugin`,
    options: {
      resetCSS: true,
    },
  },
];

const config: GatsbyConfig = {
  plugins,
};

export default config;
