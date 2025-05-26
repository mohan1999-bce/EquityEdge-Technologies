import React from 'react';
import '../styles/about.css';
 
function About() {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <p>Equity Edge Technology aims to deliver quantitatively built portfolios with superior returns.</p> 
      <div className="team">
        <div className="team-member">
          <img src="./src/assets/mohan.jpg" alt="Member" /> 
          <h3>Mohan</h3>
          <p>Seasoned software developer and certified cloud data engineer</p>
        </div>
        <div className="team-member">
          <img src="./src/assets/kash.jpg" alt="Member" />
          <h3>Kaushik</h3>
          <p>Experienced fund accountant and financial analyst </p>
        </div>
        <div className="team-member">
          <img src="./src/assets/rud.jpg" alt="Member" />
          <h3>Rudra</h3>
          <p>Machine Learning Enthusiast with expertise in predictive modelling</p>
        </div>
        <div className="team-member">
          <img src="./src/assets/viswa.jpg" alt="Member" />
          <h3>Viswa</h3>
          <p>Passionate data scientist, proficient in data processing and analysis</p>
        </div>
      </div>
    </div>
  );
}
 
export default About;
