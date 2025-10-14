import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import bg from "./images/bg.jpg";
import CEO from "./images/CEO.png";
import Kabiru from "./images/Kabiru.png";
import Sandra from "./images/Sandra.png";
import History from "./images/History.jpeg";
import Beginning from "./images/Beginning.png";
import Milestone from "./images/Milestone.png";

const teamMembers = [
  {
    name: "Madam Akwelley",
    position: "Chief Executive Officer",
    image: CEO,
    bio: "Madam Akwelley is the visionary leader driving our company forward, with years of experience in the industry.",
    social: {
      linkedin: "#",
      twitter: "#",
      facebook: "#",
    },
  },
  {
    name: "Sandra",
    position: "Shop Manager",
    image: Sandra,
    bio: "Sandra manages our shop with a focus on customer satisfaction and operational excellence.",
    social: {
      linkedin: "#",
      twitter: "#",
      facebook: "#",
    },
  },
  {
    name: "Kabiru",
    position: "Stock Manager",
    image: Kabiru,
    bio: "Kabiru oversees our inventory, making sure everything is stocked and organized.",
    social: {
      linkedin: "#",
      twitter: "#",
      facebook: "#",
    },
  },
];

const AboutUs = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Hero Section */}
      <section
        className="w-full bg-cover bg-center h-96"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="flex items-center justify-center h-full bg-black bg-opacity-60">
          <h1 className="text-5xl text-white font-bold tracking-wide">
            About Us
          </h1>
        </div>
      </section>

      {/* Company Overview */}
      <section className="w-full py-16 px-4 md:px-20 text-center">
        <h2 className="text-3xl font-semibold mb-6 text-pink-600">Who We Are</h2>
        <p className="text-white leading-relaxed max-w-3xl mx-auto">
          At Kimimi, fashion is more than just clothing—it's a reflection of who
          you are. We began with a passion for style and a mission to empower
          people to feel confident and authentic.
          <br />
          <br />
          Our collections merge timeless elegance with modern trends, offering
          pieces that are both stylish and comfortable. We focus on quality and
          craftsmanship to ensure you always look and feel your best.
          <br />
          <br />
          Kimimi is more than a brand; it's a lifestyle that celebrates
          individuality and creativity. Welcome to where fashion meets passion.
        </p>
      </section>

      {/* Mission and Vision */}
      <section className="w-full py-16 px-4 md:px-20 bg-pink-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex flex-col items-center text-center">
            <h3 className="text-2xl font-semibold mb-4 text-pink-600">
              Our Mission
            </h3>
            <p className="text-gray-700 leading-relaxed">
              To inspire confidence and creativity through fashion, offering
              timeless and innovative designs that empower individuals to
              express their unique style.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <h3 className="text-2xl font-semibold mb-4 text-pink-600">
              Our Vision
            </h3>
            <p className="text-gray-700 leading-relaxed">
              To be a global fashion leader, setting trends and shaping the
              future of style with a focus on sustainability, inclusivity, and
              excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
<section className="w-full py-16 px-4 md:px-20">
  <h2 className="text-3xl font-semibold text-center text-pink-600 mb-10">
    Meet Our Team
  </h2>

  {/* Use grid-cols-1 for mobile and grid-cols-3 for desktop */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
    {teamMembers.map((member, index) => (
      <div
        key={index}
        className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center border-t-4 border-pink-600 h-full"
      >
        <img
          src={member.image}
          alt={member.name}
          className="w-32 h-32 object-cover rounded-full mb-4 border-4 border-pink-200"
        />
        <h4 className="text-xl font-semibold text-pink-600 mb-1">
          {member.name}
        </h4>
        <p className="text-gray-500 mb-3">{member.position}</p>
        <p className="text-gray-700 text-center mb-4">{member.bio}</p>

        <div className="flex space-x-4">
          {member.social.linkedin && (
            <a
              href={member.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 hover:text-pink-700"
            >
              <FaLinkedinIn size={20} />
            </a>
          )}
          {member.social.twitter && (
            <a
              href={member.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 hover:text-pink-700"
            >
              <FaTwitter size={20} />
            </a>
          )}
          {member.social.facebook && (
            <a
              href={member.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 hover:text-pink-700"
            >
              <FaFacebookF size={20} />
            </a>
          )}
        </div>
      </div>
    ))}
  </div>
</section>


      {/* Our History */}
      <section className="w-full py-16 px-4 md:px-20 bg-white">
        <h2 className="text-3xl font-semibold text-center text-pink-600 mb-10">
          Our History
        </h2>
        <div className="space-y-8 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 mb-4 md:mb-0">
              <img
                src={Beginning}
                alt="Our Beginning"
                className="rounded-lg shadow-md"
              />
            </div>
            <div className="md:w-2/3 md:pl-10">
              <h4 className="text-2xl font-semibold text-pink-600 mb-2">
                Our Beginning
              </h4>
              <p className="text-gray-700 leading-relaxed">
                Established in 2018, Kimimi began as a small startup with a big
                dream. Since then, we've grown into a prominent name in the
                fashion industry, known for our innovative designs and
                commitment to quality.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 mb-4 md:mb-0 md:order-2">
              <img
                src={Milestone}
                alt="Major Milestone"
                className="rounded-lg shadow-md"
              />
            </div>
            <div className="md:w-2/3 md:pr-10 md:order-1">
              <h4 className="text-2xl font-semibold text-pink-600 mb-2">
                Major Milestone
              </h4>
              <p className="text-gray-700 leading-relaxed">
                In 2020, Kimimi reached a pivotal moment when our designs were
                showcased at a major international fashion event. This
                recognition fueled our global expansion and solidified our place
                as a trendsetter in the industry.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 mb-4 md:mb-0">
              <img
                src={History}
                alt="Today"
                className="rounded-lg shadow-md"
              />
            </div>
            <div className="md:w-2/3 md:pl-10">
              <h4 className="text-2xl font-semibold text-pink-600 mb-2">
                Today
              </h4>
              <p className="text-gray-700 leading-relaxed">
                Today, Kimimi continues to push the boundaries of fashion,
                offering innovative collections that resonate with a global
                audience. We remain committed to sustainability, inclusivity,
                and setting trends that inspire.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="w-full py-16 px-4 md:px-20 bg-pink-50">
        <h2 className="text-3xl font-semibold text-center text-pink-600 mb-10">
          Get in Touch
        </h2>
        <div className="flex flex-col md:flex-row md:justify-center md:space-x-20">
          <div className="flex items-center mb-6 md:mb-0">
            <FaMapMarkerAlt className="text-2xl text-pink-600 mr-4" />
            <div>
              <h4 className="text-xl font-semibold text-pink-700">Address</h4>
              <p className="text-gray-700">11 Angelica Street, Dansoman, Accra</p>
            </div>
          </div>
          <div className="flex items-center mb-6 md:mb-0">
            <FaPhoneAlt className="text-2xl text-pink-600 mr-4" />
            <div>
              <h4 className="text-xl font-semibold text-pink-700">Phone</h4>
              <p className="text-gray-700">+233 (55) 594-5959</p>
            </div>
          </div>
          <div className="flex items-center">
            <FaEnvelope className="text-2xl text-pink-600 mr-4" />
            <div>
              <h4 className="text-xl font-semibold text-pink-700">Email</h4>
              <p className="text-gray-700">kimimiluv@gmail.com</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
