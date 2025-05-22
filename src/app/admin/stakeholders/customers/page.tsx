"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { User } from "app/admin/stakeholders/vendors/page";


const CustomerListPage: React.FC = () => {
  const [customers, setCustomers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/user/customer")
      .then((res) => res.json())
      .then((data: User[]) => setCustomers(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Centered>Loading customers…</Centered>;
  if (customers.length === 0)
    return <Centered>No customers found.</Centered>;

  return (
    <PageWrapper>
      <Title>Customer List</Title>
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
            {customers.map((customer) => (
              <tr key={customer._id}>
                <Td>{customer._id}</Td>
                <Td>{customer.username}</Td>
                <Td>{customer.email}</Td>
                <Td>{customer.role}</Td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </TableWrapper>
    </PageWrapper>
  );
};

export default CustomerListPage;

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
