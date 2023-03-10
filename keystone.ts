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

const download = async (context: any) => {
  const downloadPromises = [];
  for (let i = 0; i < 5; i++) {
    downloadPromises.push(downloadImage());
  }

  Promise.all(downloadPromises).then(async (results) => {
    await Promise.all(
      results.map(async(item: any) => {
        await context.db.Post.createOne({
          data:{
            title:"test2",
            image:item
          }
        })
        console.log(item);
      })
    );
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
  })
);
