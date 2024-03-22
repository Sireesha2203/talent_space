import React, { useState } from 'react';
import './learning.css'; // Import custom CSS file for additional styling
import WebDevelopment from '../images/webdevelopment.jpg';
import DataScience from '../images/datascience.jpg';
import DataBase from '../images/databaseEngineering.jpg';
import sales from '../images/sales.jpg';
import Entrepreneur from '../images/e.jpg';
import SE from '../images/se.jpg';
import ST from '../images/st.jpg';
import threeD from '../images/3D.jpg';
import comm from '../images/communication.jpg';
import game from '../images/Game.jpg';
import In from '../images/In.jpg';
import PM from '../images/PM.jpg';
import ui from '../images/UI.jpg';
import wd from '../images/WD.jpg';
import paint from '../images/paint.jpg';
import write from '../images/write.jpg';
import pic from '../images/pic.jpg';
import poet from '../images/poetry.jpg';
import music from '../images/music.jpg';

const Learning = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Development', 'Business', 'Design', 'Arts'];

  const courses = {
    Development: [
      {
        title: 'Web Development',
        provider: 'Coursera',
        link: 'https://www.coursera.org/professional-certificates/ibm-full-stack-cloud-developer',
        image: WebDevelopment,
      },
      {
        title: 'Data Science',
        provider: 'Coursera',
        link: 'https://www.coursera.org/professional-certificates/ibm-data-science',
        image: DataScience,
      },
      {
        title: 'Database Engineering',
        provider: 'Coursera',
        link: 'https://www.coursera.org/professional-certificates/meta-database-engineer',
        image: DataBase,
      },
      {
        title: 'Software Testing',
        provider: 'Coursera',
        link: 'https://www.coursera.org/learn/foundations-of-software-testing-and-validation',
        image: ST,
      },
      {
        title: 'Software Engineering',
        provider: 'Coursera',
        link: 'https://www.coursera.org/learn/introduction-to-software-engineering',
        image: SE,
      },
    ],
    Business: [
      {
        title: 'Entrepreneurship',
        provider: 'Coursera',
        link: 'https://www.coursera.org/specializations/wharton-entrepreneurship',
        image: Entrepreneur,
      },
      {
        title: 'Sales',
        provider: 'Coursera',
        link: 'https://www.coursera.org/learn/negotiation',
        image: sales,
      },
      {
        title: 'Communication',
        provider: 'Coursera',
        link: 'https://www.coursera.org/learn/finding-your-professional-voice',
        image: comm,
      },
      {
        title: 'Project Management',
        provider: 'Coursera',
        link: 'https://www.coursera.org/professional-certificates/google-project-management',
        image: PM,
      },
    ],
    Design: [
      {
        title: 'Web Design',
        provider: 'Coursera',
        link: 'https://www.coursera.org/specializations/web-design',
        image: wd,
      },
      {
        title: 'UI/UX Design',
        provider: 'Coursera',
        link: 'https://www.coursera.org/learn/principles-of-ux-ui-design',
        image: ui,
      },
      {
        title: 'Game Design',
        provider: 'Coursera',
        link: 'https://www.coursera.org/specializations/game-design',
        image: game,
      },
      {
        title: '3D Modelling',
        provider: 'Coursera',
        link: 'https://www.coursera.org/learn/introduction-to-3d-modeling',
        image: threeD,
      },
      {
        title: 'Interior Design',
        provider: 'Coursera',
        link: 'https://www.coursera.org/learn/making-architecture',
        image: In,
      },
    ],
    Arts: [
      {
        title: 'Painting',
        provider: 'Coursera',
        link: 'https://www.coursera.org/learn/painting',
        image: paint,
      },
      {
        title: 'Music',
        provider: 'Coursera',
        link: 'https://www.coursera.org/specializations/music-production',
        image: music,
      },
      {
        title: 'Writing',
        provider: 'Coursera',
        link: 'https://www.coursera.org/learn/write-your-first-novel',
        image: write,
      },
      {
        title: 'Poetry',
        provider: 'Coursera',
        link: 'https://www.coursera.org/learn/poetry-workshop',
        image: poet,
      },
      {
        title: 'Photography',
        provider: 'Coursera',
        link: 'https://www.coursera.org/specializations/photography-basics',
        image: pic,
      },
    ],
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="learning-container container">
      <h1 className="text-center mb-5">Courses</h1>

      {/* Category Buttons */}
      <div className="category-buttons text-center mb-4">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`btn btn-outline-primary ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Course Display */}
      <div className="course-display row justify-content-center">
        <div className="col-md-8">
          {selectedCategory === 'All' || !courses[selectedCategory] ? (
            // If selectedCategory is 'All' or courses[selectedCategory] is undefined
            // Display all categories
            categories.map((category) => (
              <div key={category} className="mb-4">
                <div className="course-cards">
                 
                {courses[category] &&
                    courses[category].map((course, index) => (
                      <div className="card mb-3" key={index}>
                        <img
                          src={course.image}
                          className="card-img-top"
                          alt={course.title}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{course.title}</h5>
                          <p className="card-text">
                            Provider: {course.provider}
                          </p>
                          <a
                            href={course.link}
                            className="btn btn-primary"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Course
                          </a>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))
          ) : (
            // Otherwise, display courses of the selected category only
            courses[selectedCategory] &&
            courses[selectedCategory].map((course, index) => (
              <div key={index} className="mb-4">
                <div className="card mb-3">
                  <img
                    src={course.image}
                    className="card-img-top"
                    alt={course.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{course.title}</h5>
                    <p className="card-text">
                      Provider: {course.provider}
                    </p>
                    <a
                      href={course.link}
                      className="btn btn-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Course
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Learning;
