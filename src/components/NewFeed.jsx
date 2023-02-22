import React, { useEffect, useState } from 'react'
import { Carousel, Col, Container, Pagination, PaginationItem, PaginationLink, Row,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption,
    CardBody,
    CardTitle,
    CardSubtitle,
    Card,
    CardText,
    Button, } from 'reactstrap'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import userContext from '../context/userContext'

const NewFeed= (args) => {



    const items = [
        {
          src: 'https://i.ytimg.com/vi/ZcUqc7R0Sh8/maxresdefault.jpg',
          key: 1,
        },
        {
          src: 'https://bollywoodmascot.com/wp-content/uploads/2022/03/Upcoming-Movies-Bollywood-2022.png',
          key: 2,

        },
        {
          src: 'https://i.ytimg.com/vi/wsJgz15l9Q8/maxresdefault.jpg',
          key: 3,
        },
      ];
      const [activeIndex, setActiveIndex] = useState(0);
      const [animating, setAnimating] = useState(false);
    
      const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
      };
    
      const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
      };
    
      const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
      };
    
      const slides = items.map((item) => {
        return (
          <CarouselItem
            onExiting={() => setAnimating(true)}
            onExited={() => setAnimating(false)}
            key={item.src}
          >
            <img src={item.src} alt={item.altText} />
            <CarouselCaption
              captionText={item.caption}
              captionHeader={item.caption}
            />
          </CarouselItem>
        );
      });
    
    const [currentPage,setCurrentPage] = useState(0)

    const userContextData = useContext(userContext)

    const [user, setUser] = useState(null)
  
    const [login, setLogin] = useState(null)

   
  return (
    <div className='container-fluid'>
        <Row>
            <Col md={
                {
                    size:12
                }
            }>
    <div style={{
          backgroundColor: 'blueviolet',
          textAlign: 'center',
          marginBottom: 20
        }}>
            <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
      {...args}
    >
      <CarouselIndicators
        items={items}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>
    </div>
    <div>
        <Row>
<Card
 style={{
    textAlign: 'center',
    marginBottom: 20,
    width:'18rem'
  }}
>
  <img
    alt="Sample"
    src="https://i0.wp.com/kathmandutribune.com/wp-content/uploads/2020/11/aamanepalimovie.jpg?w=1280&ssl=1"
  />
  <CardBody>
    <CardTitle tag="h5">
      Aama
    </CardTitle>
    <CardSubtitle
      className="mb-2 text-muted"
      tag="h6"
    >
      Nepali Movie
    </CardSubtitle>
    <CardText>
    Aama is a 2020 Nepali drama film, directed and written by Dipendra K. Khanal. The film is produced by Sharmila Pandey under the banner of DS Digital.    </CardText>
    <div>
        <Link className='btn btn-secondary border-0' to={'/user/seats'}>Book Now</Link>
       </div>
  </CardBody>
</Card>
<Card
 style={{
    textAlign: 'center',
    marginBottom: 20,
    width:'18rem'
  }}
>
  <img
    alt="Sample"
    src="https://i0.wp.com/www.nepallivetoday.com/wp-content/uploads/2022/06/Nepali-movie-Prakash-trailer.jpg?w=1280&ssl=1"
  />
  <CardBody>
    <CardTitle tag="h5">
      Prakash
    </CardTitle>
    <CardSubtitle
      className="mb-2 text-muted"
      tag="h6"
    >
      Nepali Movie
    </CardSubtitle>
    <CardText>
    Nepali movie ‘Prakash’ starring Pradeep Khadka and Deeya Maskey recently released its trailer. The teaser has generated a huge interest in the movie with it garnering almost 650,000 views on YouTube.    </CardText>
    <div>
        <Link className='btn btn-secondary border-0' to={'/user/seats'}>Book Now</Link>
        </div>
  </CardBody>
</Card>
</Row>
</div>
            </Col>
            
        </Row>
        
        </div>
  )
}

export default NewFeed