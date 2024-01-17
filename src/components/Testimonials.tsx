// App.jsx

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Testimonials.css"; // Import the CSS file
import boy from "../assets/boy.jpg";

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {data.map((d, index) => (
        <div className="main-div">
          <div key={index} className="testimonial-card">
            <h3>{d.name}</h3>
            <img
              src={require(`../assets${d.img}`)}
              //   src={require(d.img)}
              alt={d.name}
              width="100px"
              height="100px"
              className="testimonial-img"
            />
            <p>{d.review}</p>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Testimonials;

const data = [
  {
    name: `Rahul Kapoor`,
    img: `/images/picture1.jpg`,
    review: `I am extremely satisfied with the services. The therapist was knowledgeable and helped me recover quickly. I highly recommend this service.`,
  },
  {
    name: `Priya Sharma`,
    img: `/images/picture2.jpg`,
    review: `The physiotherapy sessions were excellent. The therapist was dedicated and provided personalized care, which significantly improved my condition.`,
  },
  {
    name: `Aarav Singh`,
    img: `/images/picture3.jpg`,
    review: `I had a positive experience with the physiotherapy team. They were professional, and the exercises recommended were effective.`,
  },
  {
    name: `Kavita Patel`,
    img: `/images/picture4.jpg`,
    review: `The physiotherapy services exceeded my expectations. The therapist was very understanding, and the treatment made a huge difference in my recovery.`,
  },
  {
    name: `Rajesh Kumar`,
    img: `/images/picture5.jpg`,
    review: `I am grateful for the physiotherapy services I received. The therapist was skilled, and the exercises prescribed were tailored to my needs.`,
  },
  {
    name: `Neha Desai`,
    img: `/images/picture6.jpg`,
    review: `The physiotherapy team was fantastic! They not only helped me recover from my injury but also provided valuable advice for long-term health.`,
  },
  {
    name: `Aniket Malhotra`,
    img: `/images/picture7.jpg`,
    review: `I had a great experience with the physiotherapy services. The therapist was attentive, and the rehabilitation exercises were effective.`,
  },
  {
    name: `Shreya Joshi`,
    img: `/images/picture8.jpg`,
    review: `The physiotherapy sessions were a game-changer for my recovery. The therapist was patient, and the holistic approach made a significant impact.`,
  },
];

// export default Testimonials;
