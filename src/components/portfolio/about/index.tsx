import styled from "styled-components";
import resumeData from "app/data";
import { motion } from "framer-motion";

const Section = styled(motion.section)`
  padding: 4rem 2rem;
  background: #f9f9ff;
`;

const List = styled.ul`
  margin-top: 1rem;
  padding-left: 1.5rem;
  line-height: 1.6;
`;

export default function About() {
  return (
    <Section id="about">
      <h2>About</h2>
      <p>{resumeData.about}</p>
      <h3>Education</h3>
      <List>
        {resumeData.education.map((edu, i) => (
          <li key={i}>
            <strong>{edu.degree}</strong> - {edu.institution} ({edu.year})
          </li>
        ))}
      </List>
    </Section>
  );
}
