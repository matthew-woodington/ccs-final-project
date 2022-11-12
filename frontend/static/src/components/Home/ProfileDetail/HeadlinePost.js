import Carousel from "react-bootstrap/Carousel";

function HeadlinePost({ headlinePost }) {
  return (
    <>
      <div>
        {headlinePost && (
            headlinePost.map((post) => (
            <Carousel key={post.id}>
            {post.post_image1 && (
              <Carousel.Item>
                <img className="d-block w-100" src={post.post_image1} alt="First slide" />
                <Carousel.Caption>
                  <h3>{post.post_title1}</h3>
                  <p>{post.post_caption1}</p>
                </Carousel.Caption>
              </Carousel.Item>
            )}
            {post.post_image2 && (
              <Carousel.Item>
                <img className="d-block w-100" src={post.post_image2} alt="First slide" />
                <Carousel.Caption>
                  <h3>{post.post_title2}</h3>
                  <p>{post.post_caption2}</p>
                </Carousel.Caption>
              </Carousel.Item>
            )}
            {post.post_image3 && (
              <Carousel.Item>
                <img className="d-block w-100" src={post.post_image3} alt="First slide" />
                <Carousel.Caption>
                  <h3>{post.post_title3}</h3>
                  <p>{post.post_caption3}</p>
                </Carousel.Caption>
              </Carousel.Item>
            )}
          </Carousel>
            ))
         )}
      </div>
    </>
  );
}

export default HeadlinePost;
