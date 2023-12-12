import { Amplify } from "aws-amplify";
import config from "./src/aws-exports.js";

const updatedconfig = {
  ...config,
  oauth: {
    ...config.oauth,
    redirectSignIn: process.env.NEXT_PUBLIC_URL_AUTH,
    redirectSignOut: process.env.NEXT_PUBLIC_URL_AUTH,
  },
};
Amplify.configure(updatedconfig);
