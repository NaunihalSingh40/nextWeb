import styled from "styled-components";
import { resumeData } from "app/data";

const Section = styled.div`
  padding: 4rem 2rem;
  background: #eef4ff;
  text-align: center;
`;

const Link = styled.a`
  display: inline-block;
  margin-top: 0.5rem;
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

export default function Contact() {
  return (
    <Section id="contact">
      <h2>Contact</h2>
      <p>
        Email:{" "}
        <Link href={`mailto:${resumeData.email}`}>{resumeData.email}</Link>
      </p>
      <p>
        LinkedIn:{" "}
        <Link href={resumeData.linkedin} target="_blank">
          {resumeData.linkedin}
        </Link>
      </p>
    </Section>
  );
}
