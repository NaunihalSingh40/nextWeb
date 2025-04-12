import styled from "styled-components";
import resumeData from "app/data";
import { motion } from "framer-motion";

const HeroSection = styled(motion.section)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #dfe9f3, #ffffff);
  text-align: center;
  padding: 4rem 2rem;
`;

const Name = styled.h1`
  font-size: 3rem;
  color: #142a6e;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-top: 1rem;
  color: #555;
`;

export default function Hero() {
  return (
    <HeroSection id="hero">
      <Name>{resumeData.name}</Name>
      <Title>{resumeData.title}</Title>
    </HeroSection>
  );
}
