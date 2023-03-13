import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client';
import axios from 'axios';
import fetch from 'cross-fetch';

const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:3000/api/graphql',
    fetch
  }),
  cache: new InMemoryCache(),
});

const apiUrl = `https://source.unsplash.com/random/?Cryptocurrency`;

const blobcahc = async () => {
  try {
    const response = await axios.get(apiUrl, {
      responseType: 'arraybuffer',
      maxContentLength: Infinity,
      maxBodyLength: Infinity
    });

    const file = new Blob([response.data], { type: response.data.type });
    const fileBuffer = await file.arrayBuffer();

    const { data } = await apolloClient.mutate({
      mutation: gql`
        mutation UploadImage($file: Upload!) {
          uploadImage(file: $file) {
            id
            filesize
            width
            height
            extension
            ref
            url
          }
        }
      `,
      variables: { file: new Uint8Array(fileBuffer) },
    });
    const imageUrl = data.uploadImage.url;
    console.log(imageUrl);
  } catch (error) {
    console.log(error);
  }
};

export default blobcahc;
