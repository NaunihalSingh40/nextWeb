"use client";
import styled from "styled-components";
import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import { selectDistinctItemCount } from "slices/cartSlice";
import { useRouter } from "next/navigation";

const Nav = styled.nav`
  background: ${({ theme }) => theme.card || "#fff"};
  padding: 0rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  color: ${({ theme }) => theme.text || "#142A6E"};
`;

const Cart = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Badge = styled.span`
  position: absolute;
  top: -6px;
  right: -8px;
  background-color: #ff4d4d;
  color: white;
  font-size: 0.7rem;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 50%;
`;

export default function Navbar() {
  const distinctItemCount = useSelector(selectDistinctItemCount);
  const router = useRouter();
  return (
    <Nav id="navbar">
      <Logo onClick={() => router.push("/dashboard")}>ShopSmart</Logo>
      <Cart onClick={() => router.push("/cart")}>
        <ShoppingCart size={24} />
        {distinctItemCount > 0 && <Badge>{distinctItemCount}</Badge>}
      </Cart>
    </Nav>
  );
}
