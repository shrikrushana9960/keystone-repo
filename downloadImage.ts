
import axios from "axios"
import fs from "fs"
export default  function downloadImage(context:any) {
  const apiUrl = `./image/925.jpg`;

  const imageName = Math.floor(Math.random() * 1000); // Generate a random name for the image
  const imagePath = `./public/images/${imageName}.jpg`;

  return axios.get(apiUrl, { responseType: 'stream' })
    .then(async(response:any) => {
      
      // response.data.pipe(fs.createWriteStream(imagePath));

      await context.db.Post.createOne({
        data:{
          title:"test",
            image:{upload:"340.jpg"}
        }
      })
  
      return imagePath;
    })
    .catch((error:any) => {
    console.log(error)
      return `Failed to download image ${imageName}`;
    });
}