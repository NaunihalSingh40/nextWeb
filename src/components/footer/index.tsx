'use client';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  padding: 2rem;
  text-align: center;
  background-color: ${({ theme }) => theme.card || '#f9f9f9'};
  color: ${({ theme }) => theme.text || '#666'};
  font-size: 0.9rem;
`;

export default function Footer() {
  return (
    <FooterWrapper>
      © {new Date().getFullYear()} CogentCreators. All rights reserved.
    </FooterWrapper>
  );
}
