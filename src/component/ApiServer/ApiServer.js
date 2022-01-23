const BASE = "https://pixabay.com/api/";
const KEY = "24061129-288dc6abfa1f4d8fd1e3dc1ee";

function FetchApi(value, page) {
  const url =
    BASE +
    `?q=${value}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  return fetch(url).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Oops, something went wrong.`));
  });
}
export default FetchApi;
