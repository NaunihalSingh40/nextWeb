"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { User } from "app/admin/stakeholders/vendors/page";

const AdminListPage: React.FC = () => {
  const [admins, setAdmins] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/user/admin")
      .then((res) => res.json())
      .then((data: User[]) => setAdmins(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Centered>Loading admins…</Centered>;
  if (admins.length === 0) return <Centered>No admins found.</Centered>;

  return (
    <PageWrapper>
      <Title>Admin List</Title>
      <TableWrapper>
        <StyledTable>
          <thead>
            <tr>
              <Th>ID</Th>
              <Th>Username</Th>
              <Th>Email</Th>
              <Th>Role</Th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin._id}>
                <Td>{admin._id}</Td>
                <Td>{admin.username}</Td>
                <Td>{admin.email}</Td>
                <Td>{admin.role}</Td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </TableWrapper>
    </PageWrapper>
  );
};

export default AdminListPage;

// -- Same styled-components as below --
const PageWrapper = styled.div`
  padding: 2rem;
  background: #f5f7fa;
  min-height: 100vh;
`;

const Title = styled.h1`
  margin-bottom: 1.5rem;
  color: #142a6e;
  font-size: 2rem;
  text-align: center;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  padding: 0.75rem 1rem;
  background: #142a6e;
  color: white;
  text-align: left;
  font-size: 0.9rem;
`;

const Td = styled.td`
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #eee;
  font-size: 0.875rem;
  color: #333;
`;

const Centered = styled.div`
  padding: 4rem;
  text-align: center;
  color: #666;
`;
