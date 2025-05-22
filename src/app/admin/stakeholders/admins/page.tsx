"use client";

import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { User } from "app/admin/stakeholders/vendors/page";

const AdminListPage: React.FC = () => {
  const [admins, setAdmins] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAdmins = useCallback(() => {
    setLoading(true);
    fetch("/api/user/admin")
      .then((res) => res.json())
      .then((data: User[]) => setAdmins(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchAdmins();
  }, [fetchAdmins]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this admin?")) return;
    try {
      const res = await fetch(`/api/user/admin/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(await res.text());
      fetchAdmins(); // Refresh list
    } catch (err) {
      console.error(err);
      alert("Failed to delete admin.");
    }
  };

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
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin._id}>
                <Td>{admin._id}</Td>
                <Td>{admin.username}</Td>
                <Td>{admin.email}</Td>
                <Td>{admin.role}</Td>
                <Td>
                  <DeleteButton onClick={() => handleDelete(admin._id)}>
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

export default AdminListPage;

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
