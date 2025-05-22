"use client";

import React from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";

const AdminDashboard: React.FC = () => {
  const router = useRouter();

  return (
    <PageWrapper>
      <Title>Admin Dashboard</Title>
      <ButtonGrid>
        <ActionCard onClick={() => router.push("/admin/register")}>
          <CardIcon>➕</CardIcon>
          <CardLabel>Register Admin/Vendor</CardLabel>
        </ActionCard>
        <ActionCard onClick={() => router.push("/admin/stakeholders/vendors")}>
          <CardIcon>👥</CardIcon>
          <CardLabel>Vendor List</CardLabel>
        </ActionCard>
        <ActionCard onClick={() => router.push("/admin/stakeholders/customers")}>
          <CardIcon>🧑‍🤝‍🧑</CardIcon>
          <CardLabel>Customer List</CardLabel>
        </ActionCard>
        <ActionCard onClick={() => router.push("/admin/stakeholders/admins")}>
          <CardIcon>🛡️</CardIcon>
          <CardLabel>Admin List</CardLabel>
        </ActionCard>
      </ButtonGrid>
    </PageWrapper>
  );
};

export default AdminDashboard;

// Styled components stay the same as you shared earlier:
const PageWrapper = styled.div`
  min-height: 100vh;
  padding: 4rem;
  background: #f4f6f8;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #142a6e;
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 800px;
`;

const ActionCard = styled.button`
  background: white;
  border: none;
  border-radius: 12px;
  padding: 2rem 1.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.1);
  }
`;

const CardIcon = styled.span`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const CardLabel = styled.span`
  font-size: 1.1rem;
  font-weight: 500;
  color: #333;
`;
