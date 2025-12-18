import React from "react";
import Home1 from "../Home1/Home1";
import Home2 from "../Home2/Home2";
import Mentors from "../Mentors/Mentors";
import Testimonials from "../Testimonials/Testimonials";
import LearningExp from "../LearningExp/LearningExp";
import CategoryBrowser from "../Categories/Coursecards";
import UpcomingEvents from "../Learning/Benifits";
import InfiniteLogoScroll from "../Trusted By/CompiniesTrusted";
import FaqPage from "../FAQ/FaqPage";

const Home = () => {
  return (
    <div>
      <Home1 />
      <Home2 />
      <LearningExp />
      <CategoryBrowser />
      <InfiniteLogoScroll />
      <UpcomingEvents />
      {/* <CoursesSection /> */}
      <Testimonials />
      <Mentors />
      <FaqPage />
      
     
    </div>
  );
};

export default Home;

