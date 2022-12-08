import "./styles.css";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";

const UnsplashImage = ({ url, key }) => (
  <div className="image-item" key={key}>
    <img src={url} alt="img" />
  </div>
);

function MyComponent() {
  const [images, setImages] = React.useState([]);
  const [loaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = (count = 10) => {
    const apiRoot = "https://api.unsplash.com";
    const accessKey =
      "a22f61e98da4efa25d8860e77a91a596867dd335ecdf7feb12e086943db9565a";

    // https://unsplash.com/documentation#search-photos
    axios
      .get(
        `${apiRoot}/search/photos?query=planet&client_id=${accessKey}&count=${count}`
      )
      .then((res) => {
        setImages([...images, ...res.data]);
        setIsLoaded(true);

        console.log(images);
      });
  };

  return (
    <div className="hero is-fullheight is-bold is-info">
      <div className="hero-body">
        <div className="container">
          <div className="header content">
            <h2 className="subtitle is-6">Code Challenge #16</h2>
            <h1 className="title is-1">
              Infinite Scroll Unsplash Code Challenge
            </h1>
          </div>

          <InfiniteScroll
            dataLength={images}
            next={() => fetchImages(5)}
            hasMore={true}
            loader={
              <img
                src="https://res.cloudinary.com/chuloo/image/upload/v1550093026/scotch-logo-gif_jq4tgr.gif"
                alt="loading"
              />
            }
          >
            <div className="image-grid" style={{ marginTop: "30px" }}>
              {loaded
                ? images.map((image, index) => (
                    <UnsplashImage url={image.urls.regular} key={index} />
                  ))
                : ""}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="App">
      <div id="root">
        <MyComponent />
      </div>
    </div>
  );
}
