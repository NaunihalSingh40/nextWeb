import styled from "styled-components";
import { resumeData } from "app/data";

const Section = styled.div`
  padding: 4rem 2rem;
`;

const ProjectCard = styled.div`
  background: ${({ theme }) => theme.card};
  padding: 1rem;
  margin-bottom: 1rem;
  border-left: 5px solid #142a6e;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
`;

export default function Projects() {
  return (
    <Section id="projects">
      <h2>Projects</h2>
      {resumeData.projects.map((project, i) => (
        <ProjectCard key={i}>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </ProjectCard>
      ))}
    </Section>
  );
}
