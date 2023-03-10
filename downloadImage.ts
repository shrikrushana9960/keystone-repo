import axios from "axios"
import fs from "fs"
export default  function downloadImage(context:any) {
  const apiUrl = `https://source.unsplash.com/random/?Cryptocurrency`;
  import sizeOf from 'image-size'
  const imageName = Math.floor(Math.random() * 1000); // Generate a random name for the image
  const imagePath = `./images/${imageName}.jpg`;

  return axios.get(apiUrl, { responseType: 'blob' })
    .then(async(response:any) => {
      
      response.data.pipe(fs.createWriteStream(imagePath));
      let data= await fs.createWriteStream(imagePath)
      await context.db.Post.createOne({
        data:{
          title:"test",
            image:{upload:new  File([response.data], imagePath, { type:  "image/png" })}
        }
      })
  
      return imagePath;
    })
    .catch((error:any) => {
    console.log(error)
      return `Failed to download image ${imageName}`;
    });
}
