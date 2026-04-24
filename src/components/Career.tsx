import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Java Full Stack Developer</h4>
                <h5>Koderz Technology</h5>
              </div>
              <h3>Mar 2026–NOW</h3>
            </div>
            <p>
              

* Design and develop scalable RESTful APIs using Java and Spring Boot <br />
* Implement complex business logic and manage backend application workflows <br />
* Handle database operations using MySQL with JPA/Hibernate <br />
* Build robust applications with proper validation, exception handling, and clean architecture <br />
* Debug and optimize performance to ensure reliability and efficiency <br />
* Collaborate using Git and maintain structured, production-ready codebases <br />
* Work towards full stack development by integrating frontend technologies like React

            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Java Full Stack Dev Intern</h4>
                <h5>Greateway Solution Pvt ltd</h5>
              </div>
              <h3>Feb–Aug 2024</h3>
            </div>
            <p>
              **Java Full Stack Developer Intern**

* Assisted in developing RESTful APIs using Java and Spring Boot <br />
* Implemented basic CRUD operations and supported backend feature development  <br />
* Worked with MySQL database and learned data persistence using JPA/Hibernate <br />
* Tested APIs using Postman and fixed bugs during development <br />
* Gained hands-on experience with Git and real-world development workflows <br />
* Learned clean coding practices and application architecture fundamentals <br />

            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
