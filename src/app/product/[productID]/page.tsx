"use client";
import Image from "next/image";
import React from "react";
import styled from "styled-components";

const page = () => {
  return (
    <>
      <ProductWrapper>
        <ImageContainer>
          <Image
            src="https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg"
            alt="t-shirt"
            width={430}
            height={500}
          />
        </ImageContainer>

        <DescriptionContainer>
          <Title>Mens Casual Slim Fit</Title>
          <Subtitle>Printed Pure Cotton T-shirt</Subtitle>
          <ItemContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
            nostrum vel, dicta ipsa corrupti facere totam, dolorum illum
            consequuntur{" "}
          </ItemContent>
          <Rating> ⭐4.5 | 17 Ratings</Rating>
          <Price>$49.00</Price>

          <ButtonContainer>
            <AddToBag>🛒 ADD TO BAG</AddToBag>
            <Wishlist>💗 WISHLIST</Wishlist>
          </ButtonContainer>
        </DescriptionContainer>
      </ProductWrapper>
    </>
  );
};

export default page;

const ProductWrapper = styled.div`
  color: black;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 40px;
  background-color: #f7f9fc;
  min-height: 100vh;
  gap: 80px;
  flex-direction: row;

  @media screen and (max-width: 525px) {
    flex-direction: column;
  }
`;
const ImageContainer = styled.div`
  @media screen and (max-width: 525px) {
    img {
      width: 350px;
      height: auto;
    }
  }
`;

const DescriptionContainer = styled.div`
  color: black;
`;
const Title = styled.h3`
  font-size: 35px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  color: black;
  font-size: 24px;
  margin-bottom: 10px;
`;
const ItemContent = styled.p`
  font-size: 15px;
`;

const Price = styled.div`
  color: black;
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const Rating = styled.div`
  color: black;
  margin-bottom: 10px;
  font-size: 16px;
  color: golden;
`;
const ButtonContainer = styled.div`
  color: black;
  display: flex;
  align-items: center;
  gap: 30px;
  margin: 20px;
`;
const AddToBag = styled.div`
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #6052528f;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
`;

const Wishlist = styled.div`
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #6052528f;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
`;
