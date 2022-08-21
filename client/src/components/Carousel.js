import Carousel from 'react-bootstrap/Carousel';

const CarouselHeader = () => {
  return (
    <Carousel fade className="carousel-style">
      <Carousel.Item>
        <img
          className="d-block w-60"
          src="https://images.pexels.com/photos/1460321/pexels-photo-1460321.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="First slide"
        />
        <Carousel.Caption className="caption">
          <h3>First blog</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
            fugit sunt quidem dicta laborum et animi perferendis ex autem
            delectus repellat magni impedit excepturi, provident ad tempore quos
            possimus magnam commodi molestias unde obcaecati. Dolorum?
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-60"
          src="https://images.pexels.com/photos/326182/pexels-photo-326182.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Second slide"
        />

        <Carousel.Caption className="caption">
          <h3>Second blog</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
            fugit sunt quidem dicta laborum et animi perferendis ex autem
            delectus repellat magni impedit excepturi, provident ad tempore quos
            possimus magnam commodi molestias unde obcaecati. Dolorum?
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-60"
          src="https://images.pexels.com/photos/2634702/pexels-photo-2634702.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Third slide"
        />

        <Carousel.Caption className="caption">
          <h3>Third blog</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
            fugit sunt quidem dicta laborum et animi perferendis ex autem
            delectus repellat magni impedit excepturi, provident ad tempore quos
            possimus magnam commodi molestias unde obcaecati. Dolorum?
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselHeader;
