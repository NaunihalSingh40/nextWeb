import styled from "styled-components";
import resumeData from "app/data";
import { motion } from "framer-motion";

const Section = styled(motion.section)`
  padding: 4rem 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const Box = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  text-align: center;
`;

export default function Skills() {
  return (
    <Section id="skills">
      <h2>Skills</h2>
      <h3>Technical</h3>
      <Grid>
        {resumeData.skills.technical.map((skill, i) => (
          <Box key={i}>{skill}</Box>
        ))}
      </Grid>
      <h3>Soft Skills</h3>
      <Grid>
        {resumeData.skills.soft.map((skill, i) => (
          <Box key={i}>{skill}</Box>
        ))}
      </Grid>
    </Section>
  );
}
