"use client";
import styled from "styled-components";
import { ShoppingCart } from "lucide-react";
import { useEffect } from "react";

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
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

export default function Navbar() {
  useEffect(() => {
    let prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
      const currentScrollPos = window.pageYOffset;
      const navbar = document.getElementById("navbar");
      if (prevScrollpos > currentScrollPos) {
        if (navbar) {
          navbar.style.top = "0px";
        }
      } else {
        if (navbar) {
          navbar.style.top = "-50px";
        }
      }
      prevScrollpos = currentScrollPos;
    };
  });

  return (
    <Nav id="navbar">
      <Logo>ShopSmart</Logo>
      <Cart>
        <ShoppingCart size={24} />
        <span>Cart (0)</span>
      </Cart>
    </Nav>
  );
}
