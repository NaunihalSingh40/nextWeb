import styled from "styled-components";
import { resumeData } from "app/data";

const Section = styled.div`
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
