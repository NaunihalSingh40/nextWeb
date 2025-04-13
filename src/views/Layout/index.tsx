'use client';
import Footer from 'components/footer';
import Navbar from 'components/Navbar';
import { ReactNode } from 'react';
import styled from 'styled-components';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <Main>{children}</Main>
      <Footer />
    </>
  );
}

const Main = styled.main`
  padding: 2rem;
  background: ${({ theme }) => theme.background || '#f4f6fa'};
  min-height: 80vh;
`;
