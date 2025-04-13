"use client";
import styled from "styled-components";
import { ShoppingCart } from "lucide-react";
import type { RootState } from "store";
import { useSelector } from "react-redux";

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
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const total = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Nav id="navbar">
      <Logo>ShopSmart</Logo>
      <Cart>
        <ShoppingCart size={24} />
        {total > 0 && <Badge>{total}</Badge>}
      </Cart>
    </Nav>
  );
}
