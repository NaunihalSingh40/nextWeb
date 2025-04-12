"use client";
import About from "components/portfolio/about";
import Awards from "components/portfolio/awards";
import Contact from "components/portfolio/contact";
import Experience from "components/portfolio/experience";
import Hero from "components/portfolio/hero";
import Projects from "components/portfolio/projects";
import Skills from "components/portfolio/skill";
// import LoginPage from "views/Login";
import React from "react";
// import SignupPage from "views/Signin";

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Awards />
      <Contact />
    </>
  );
};

export default Home;
