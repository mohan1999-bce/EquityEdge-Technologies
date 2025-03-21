import React from 'react';
import '../styles/about.css';

function About() {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <div className="team">
        <div className="team-member">
          <img src="./src/assets/img.jpg" alt="Member" />
          <h3>Mohan</h3>
          <p>2 Line Description</p>
        </div>
        <div className="team-member">
          <img src="./src/assets/img.jpg" alt="Member" />
          <h3>Kaushik</h3>
          <p>2 Line Description</p>
        </div>
        <div className="team-member">
          <img src="./src/assets/img.jpg" alt="Member" />
          <h3>Rudra</h3>
          <p>2 Line Description</p>
        </div>
        <div className="team-member">
          <img src="./src/assets/img.jpg" alt="Member" />
          <h3>Viswa</h3>
          <p>2 Line Description</p>
        </div>
      </div>
    </div>
  );
}

export default About;
