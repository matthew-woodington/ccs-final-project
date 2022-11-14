import "../../../styles/ProfileDetail.css";
import Carousel from "react-bootstrap/Carousel";

function HeadlinePost({ headlinePost }) {
  return (
    <>
      <div>
        {headlinePost && (
          <Carousel className="headline-frame" key={headlinePost.id}>
            {headlinePost.post_image1 && (
              <Carousel.Item>
                <img
                  className="d-block w-100 headline-img"
                  src={headlinePost.post_image1}
                  alt="First slide"
                />
                <Carousel.Caption className="headline-text">
                  <h3>{headlinePost.post_title1}</h3>
                  <p>{headlinePost.post_caption1}</p>
                </Carousel.Caption>
              </Carousel.Item>
            )}
            {headlinePost.post_image2 && (
              <Carousel.Item>
                <img
                  className="d-block w-100 headline-img"
                  src={headlinePost.post_image2}
                  alt="First slide"
                />
                <Carousel.Caption className="headline-text">
                  <h3>{headlinePost.post_title2}</h3>
                  <p>{headlinePost.post_caption2}</p>
                </Carousel.Caption>
              </Carousel.Item>
            )}
            {headlinePost.post_image3 && (
              <Carousel.Item>
                <img
                  className="d-block w-100 headline-img"
                  src={headlinePost.post_image3}
                  alt="First slide"
                />
                <Carousel.Caption className="headline-text">
                  <h3>{headlinePost.post_title3}</h3>
                  <p>{headlinePost.post_caption3}</p>
                </Carousel.Caption>
              </Carousel.Item>
            )}
          </Carousel>
        )}
      </div>
    </>
  );
}

export default HeadlinePost;
