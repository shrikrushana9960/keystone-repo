import axios from "axios"
import fs from "fs"
export default  function downloadImage() {
  const apiUrl = `https://source.unsplash.com/random/?Cryptocurrency`;
  const imageName = Math.floor(Math.random() * 1000); // Generate a random name for the image
  const imagePath = `./images/${imageName}.jpg`;

  return axios.get(apiUrl, { responseType: 'stream' })
    .then((response:any) => {
      response.data.pipe(fs.createWriteStream(imagePath));
      return imagePath;
    })
    .catch((error:any) => {
    
      return `Failed to download image ${imageName}`;
    });
}
