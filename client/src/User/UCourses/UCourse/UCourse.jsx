import React, { useEffect } from "react";
import { RiPlayCircleFill } from "react-icons/ri";
import "./UCourse.css";
import { Link } from "react-router-dom";
import { videoData } from "./videosData";
import USidebar from "../../USidebar/USidebar";
import UNavbar from "../../UNavbar/ANavbar";

const UCourse = () => {
  function ScrollToTopOnMount() {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    return null;
  }

  return (
    <>
      <div className="uDashboard">
        <div className="uNavbar">
          <UNavbar />
        </div>
        <div className="uMain">
          <div className="UCourse">
            <div className="UCourseHead">
              <ScrollToTopOnMount />

              <h4>React.Js Course</h4>
            </div>
            <div className="UCourseContainer">
              <div className="UCourseVideoTab1">
                <div className="UCourseVideo">
                  <iframe
                    src={`https://drive.google.com/file/d/1Okb8CaBGKFTqd7v6BHN0zzE_uO_5riPG/preview`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
                  />
                </div>
                <div className="UCourseVideoContent">
                  <div className="UCourseVideoCBtns">
                    <div>
                      <Link to="/user-course">
                        Next{" "}
                        <RiPlayCircleFill className="UCourseVideoCBtnsIcon" />
                      </Link>
                    </div>
                    <div>
                      <Link to="/user-course">
                        Previous{" "}
                        <RiPlayCircleFill className="UCourseVideoCBtnsIcon" />
                      </Link>
                    </div>
                  </div>
                  <h4>ReactJS Tutorial - 1 - Introduction</h4>

                  <details>
                    <summary>React.js Introduction</summary>
                    <p>
                      ReactJS is a declarative, efficient, and flexible
                      JavaScript library for building reusable UI components. It
                      is an open-source, component-based front end library
                      responsible only for the view layer of the application. It
                      was created by Jordan Walke, who was a software engineer
                      at Facebook. It was initially developed and maintained by
                      Facebook and was later used in its products like WhatsApp
                      & Instagram. Facebook developed ReactJS in 2011 in its
                      newsfeed section, but it was released to the public in the
                      month of May 2013.
                    </p>
                    <p>
                      Today, most of the websites are built using MVC (model
                      view controller) architecture. In MVC architecture, React
                      is the 'V' which stands for view, whereas the architecture
                      is provided by the Redux or Flux.
                    </p>
                    <p>
                      A ReactJS application is made up of multiple components,
                      each component responsible for outputting a small,
                      reusable piece of HTML code. The components are the heart
                      of all React applications. These Components can be nested
                      with other components to allow complex applications to be
                      built of simple building blocks. ReactJS uses virtual DOM
                      based mechanism to fill data in HTML DOM. The virtual DOM
                      works fast as it only changes individual DOM elements
                      instead of reloading complete DOM every time.
                    </p>
                  </details>
                  <details>
                    <summary>Why we use ReactJS?</summary>
                    <p>
                      Today, many JavaScript frameworks are available in the
                      market(like angular, node), but still, React came into the
                      market and gained popularity amongst them. The previous
                      frameworks follow the traditional data flow structure,
                      which uses the DOM (Document Object Model). DOM is an
                      object which is created by the browser each time a web
                      page is loaded. It dynamically adds or removes the data at
                      the back end and when any modifications were done, then
                      each time a new DOM is created for the same page. This
                      repeated creation of DOM makes unnecessary memory wastage
                      and reduces the performance of the application.
                    </p>
                  </details>
                  <details>
                    <summary>React create-react-app</summary>
                    <p>
                      Starting a new React project is very complicated, with so
                      many build tools. It uses many dependencies, configuration
                      files, and other requirements such as Babel, Webpack,
                      ESLint before writing a single line of React code. Create
                      React App CLI tool removes all that complexities and makes
                      React app simple. For this, you need to install the
                      package using NPM, and then run a few simple commands to
                      get a new React project.
                    </p>
                    <p>
                      The create-react-app is an excellent tool for beginners,
                      which allows you to create and run React project very
                      quickly. It does not take any configuration manually. This
                      tool is wrapping all of the required dependencies like
                      Webpack, Babel for React project itself and then you need
                      to focus on writing React code only. This tool sets up the
                      development environment, provides an excellent developer
                      experience, and optimizes the app for production.
                    </p>
                  </details>
                  <details>
                    <summary>React Features</summary>
                    <p>
                      Currently, ReactJS gaining quick popularity as the best
                      JavaScript framework among web developers. It is playing
                      an essential role in the front-end ecosystem. The
                      important features of ReactJS are as following.
                    </p>
                    <ul>
                      <li>JSX</li>
                      <li>Components</li>
                      <li>One-way Data Binding</li>
                      <li>Virtual DOM</li>
                      <li>Simplicity</li>
                      <li>Performance</li>
                    </ul>
                  </details>
                </div>
              </div>

              {/* ---------- */}

              <div className="UCourseVideosTab2">
                <div className="UCourseVideosHead">
                  <h4>Course Videos</h4>
                </div>
                <div className="UCourseVideosParent">
                  {videoData.map((data, key) => {
                    return (
                      <div className="UCourseVideos">
                        <div className="UCoursePlayListVideo">
                          <iframe
                            src={data.src}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Embedded youtube"
                          />
                        </div>
                        <div className="UCoursePlayListContent">
                          <h4>{data.title}</h4>
                          <p>{data.summary}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="uSidebar">
          <USidebar />
        </div>
      </div>
      {/*  */}
    </>
  );
};

export default UCourse;
