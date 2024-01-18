import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./LandingPage.css";
import medical from "../assets/medical.jpg";
import banner from "../assets/banner.jpg";
import medical1 from "../assets/medical1.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserDoctor } from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import feedbackImage1 from "../assets/images/picture1.jpg";
import feedbackImage2 from "../assets/images/picture2.jpg";
import feedbackImage3 from "../assets/images/picture3.jpg";
import feedbackImage4 from "../assets/images/picture4.jpg";
import TestimonialSlider from "./Testimonials";
interface FormData {
  name: string;
  phone: string;
  age: string;
  city: string;
  company: string;
  chiefComplaints: string;
  experience: string;
}

interface Doctor {
  name: string;
  expertise: string;
  city: string;
}
const items = [
  {
    image: feedbackImage1,
    description:
      "very nice doctors interaction experience. Doctors were so kind and helpful and knowledgeable, gave the right treatment",
  },
  {
    image: feedbackImage2,
    description:
      "Doctors were very friendly and experienced. Provided accurate assistance with patience. Highly recommended",
  },

  {
    image: feedbackImage3,
    description:
      "medicines prescribed by doctors worked well,  We had follow-up sessions as well, and the experience was equally good!",
  },

  {
    image: feedbackImage4,
    description: "Overall good experience with the doctors",
  },
];

const LandingPage: React.FC = () => {
  const [urlCity, setUrlCity] = useState<string>("");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [showErrorState, setShowErrorState] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    age: "",
    city: "",
    company: "",
    chiefComplaints: "",
    experience: "",
  });

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    if (Object.fromEntries(urlSearchParams.entries()).city) {
      setUrlCity(Object.fromEntries(urlSearchParams.entries()).city);
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, type } = e.target;

    if (type === "checkbox") {
      // Type assertion to HTMLInputElement for checkbox
      const checkboxValue = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checkboxValue });
    } else {
      setFormData({ ...formData, [name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setShowErrorState(false);
    e.preventDefault();
    if (urlCity) {
      formData.city = urlCity;
    }
    try {
      const response = await fetch(
        // `http://localhost:4000/`
        `https://health-api-git-master-manishas-projects-2a92089f.vercel.app/api/get-doctors/${formData.city.toLocaleLowerCase()}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log("Result", result);
      setFormData({
        name: "",
        phone: "",
        age: "",
        city: "",
        company: "",
        chiefComplaints: "",
        experience: "",
      });
      setDoctors(result.doctors);
      if (result.message) {
        setShowErrorState(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    console.log(formData);
  };

  return (
    <div className="container">
      <header className="header">
        <img
          src="https://ik.imagekit.io/tcfp7i31d/logo_with_yp_white_6p2ZETYLi.svg"
          alt=""
        />
      </header>
      <div className="hero">
        <img src={banner} alt="Hero Image" />

        {doctors.length === 0 ? (
          !showErrorState ? (
            <div className="form-container">
              <div>
                <h2>Book a Consultation</h2>
                <form onSubmit={handleSubmit}>
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <input
                      type="number"
                      name="age"
                      placeholder="Age"
                      value={formData.age}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="text"
                      name="company"
                      placeholder="Company"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <textarea
                      name="chiefComplaints"
                      placeholder="Chief Complaints"
                      value={formData.chiefComplaints}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {parseInt(formData.age, 10) >= 40 && (
                    <div className="checkbox-container">
                      <input
                        type="checkbox"
                        name="experience"
                        id="experienceCheckbox"
                        checked={formData.experience ? true : false}
                        onChange={(event) => {
                          handleChange(event);
                        }}
                      />
                      <label htmlFor="experienceCheckbox">
                        Previous physiotherapy experience
                      </label>
                    </div>
                  )}

                  <button type="submit" className="submit-button">
                    Find Best Available Doctors
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <>
              <div className="doctor-container">
                <h2 className="doctor-list-heading">
                  Oops! No doctors available in this area.
                </h2>
              </div>
            </>
          )
        ) : (
          <>
            <div className="doctor-container">
              <h2 className="doctor-list-heading">
                We found the best doctors for you!
              </h2>
              {doctors.map((doctor) => (
                <div className="card" key={doctor.name}>
                  <FontAwesomeIcon
                    icon={faUserDoctor}
                    style={{ fontSize: "2em" }}
                  />
                  <div className="doctor-name">{doctor.name}</div>
                  <div className="doctor-expertise">{doctor.expertise}</div>
                  <div className="doctor-city">{doctor.city}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="feedback">
        <h2>Real stories, real results</h2>
        <TestimonialSlider />
      </div>
    </div>
  );
};

export default LandingPage;
