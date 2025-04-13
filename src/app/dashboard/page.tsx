"use client";
import { itemData } from "app/data";
import Image from "next/image";
import styled from "styled-components";

const Dashboard = () => {
  return (
    <Grid>
      {itemData.map((item) => (
        <ProductWrapper key={item.id}>
          <Image
            src={item.image}
            alt={item.title}
            width={200}
            height={200}
            style={{ borderRadius: "10px" }}
          />
          <ProductTitle>{item.title}</ProductTitle>
          <Rating>⭐ {item.rating.rate} ({item.rating.count})</Rating>
          <Price>${item.price}</Price>
        </ProductWrapper>
      ))}
    </Grid>
  );
};

export default Dashboard;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 2rem;
  padding: 2rem;
`;

const ProductWrapper = styled.div`
  background-color: ${({ theme }) => theme.card || "#fff"};
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ProductTitle = styled.h1`
  font-size: 1rem;
  margin: 0.5rem 0;
  color: ${({ theme }) => theme.text || "#142A6E"};
`;

const Rating = styled.h3`
  font-size: 0.9rem;
  font-weight: 400;
  color: #666;
`;

const Price = styled.h2`
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin-top: 0.5rem;
`;
