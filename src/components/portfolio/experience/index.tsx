import styled from "styled-components";
import {resumeData} from "app/data";

const Section = styled.div`
  padding: 4rem 2rem;
  background: #f0f4ff;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.card};
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export default function Experience() {
  return (
    <Section id="experience">
      <h2>Experience</h2>
      {resumeData.experience.map((exp, i) => (
        <Card key={i}>
          <h3>
            {exp.role} at {exp.company}
          </h3>
          <p>
            <em>{exp.date}</em>
          </p>
          <p>{exp.description}</p>
        </Card>
      ))}
    </Section>
  );
}
