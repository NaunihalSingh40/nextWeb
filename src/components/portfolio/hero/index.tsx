import styled from "styled-components";
import { resumeData } from "app/data";

const HeroSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: linear-gradient(135deg, #364c65, #ffffff);
  padding: 1rem 1rem;
`;

const Name = styled.h1`
  font-size: 2.5rem;
  color: #142a6e;
  text-transform: uppercase;
  background-image: linear-gradient(
    -225deg,
    #000000 0%,
    #323232 29%,
    #565656 67%,
    #ffffff 100%
  );
  background-size: 200% auto;
  color: #fff;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: textclip 2s linear infinite;
  display: inline-block;
  margin: 0;
  @keyframes textclip {
    to {
      background-position: 200% center;
    }
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-top: 1rem;
  color: #eeeeee;
`;

export default function Hero() {
  return (
    <HeroSection id="hero">
      <Name>{resumeData.name}</Name>
      <Title>{resumeData.title}</Title>
    </HeroSection>
  );
}
