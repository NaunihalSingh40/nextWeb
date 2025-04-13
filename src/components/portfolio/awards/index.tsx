import styled from "styled-components";
import resumeData from "app/data";
import { motion } from "framer-motion";

const Section = styled(motion.section)`
  padding: 4rem 2rem;
  background: #f9f9f9;
`;

export default function Awards() {
  return (
    <Section id="awards">
      <h2>Awards</h2>
      <ul>
        {resumeData.awards.map((award, i) => (
          <li key={i}>{award}</li>
        ))}
      </ul>
    </Section>
  );
}
