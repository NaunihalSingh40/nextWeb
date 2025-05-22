"use client";

import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";

export interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
}

const VendorsPage: React.FC = () => {
  const [vendors, setVendors] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVendors = useCallback(() => {
    setLoading(true);
    fetch("/api/user/vendor")
      .then((res) => res.json())
      .then((data: User[]) => setVendors(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchVendors();
  }, [fetchVendors]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this vendor?")) return;
    try {
      const res = await fetch(`/api/user/vendor/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(await res.text());
      // refresh list
      fetchVendors();
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete vendor.");
    }
  };

  if (loading) return <Centered>Loading vendors…</Centered>;
  if (vendors.length === 0)
    return <Centered>No vendors registered yet.</Centered>;

  return (
    <PageWrapper>
      <Title>Vendor List</Title>
      <TableWrapper>
        <StyledTable>
          <thead>
            <tr>
              <Th>ID</Th>
              <Th>Username</Th>
              <Th>Email</Th>
              <Th>Role</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((v) => (
              <tr key={v._id}>
                <Td>{v._id}</Td>
                <Td>{v.username}</Td>
                <Td>{v.email}</Td>
                <Td>{v.role}</Td>
                <Td>
                  <DeleteButton onClick={() => handleDelete(v._id)}>
                    Delete
                  </DeleteButton>
                </Td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </TableWrapper>
    </PageWrapper>
  );
};

export default VendorsPage;

// --- Styled Components ---
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

const DeleteButton = styled.button`
  background: #e53e3e;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.8rem;
  &:hover {
    background: #c53030;
  }
`;

const Centered = styled.div`
  padding: 4rem;
  text-align: center;
  color: #666;
`;
