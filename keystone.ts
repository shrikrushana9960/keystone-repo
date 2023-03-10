// Welcome to Keystone!
//
// This file is what Keystone uses as the entry-point to your headless backend
//
// Keystone imports the default export of this file, expecting a Keystone configuration object
//   you can find out more at https://keystonejs.com/docs/apis/config

import { config } from "@keystone-6/core";
import fs from "fs";
import axios from "axios";
import { lists } from "./schema";
import downloadImage from "./downloadImage";

import { withAuth, session } from "./auth";
let  baseUrl = 'http://localhost:3000';
const download = async (context: any) => {
  const downloadPromises = [];
  for (let i = 0; i < 5; i++) {
    downloadPromises.push(downloadImage(context));
  }

  Promise.all(downloadPromises).then(async (results) => {
console.log(results)
  });
};

export default withAuth(
  config({
    db: {
      // we're using sqlite for the fastest startup experience
      //   for more information on what database might be appropriate for you
      //   see https://keystonejs.com/docs/guides/choosing-a-database#title
      provider: "sqlite",
      url: "file:./keystone.db",
      onConnect: download,
    },
    lists,
    session,
    storage:{
      // The key here will be what is referenced in the image field
      my_local_images: {
        // Images that use this store will be stored on the local machine
        kind: 'local',
        // This store is used for the image field type
        type: 'image',
        // The URL that is returned in the Keystone GraphQL API
        generateUrl: path => `${baseUrl}/images${path}`,
        // The route that will be created in Keystone's backend to serve the images
        serverRoute: {
          path: '/images',
        },
        storagePath: 'public/images',
      }}
  })
);
