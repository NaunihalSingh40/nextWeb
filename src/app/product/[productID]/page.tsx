"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import { useGetSingleProductQuery } from "services/NextWeb/GetProductsApi";
import styled from "styled-components";

const ProductPage = () => {
  const params = useParams();
  const productID = params && params.productID ? String(params.productID) : "";
  const { data: product } = useGetSingleProductQuery(productID);

  return (
    <>
      {product && (
        <>
          <ProductWrapper>
            <ImageContainer>
              <Image
                src={product.image}
                alt={product.title}
                width={430}
                height={500}
              />
            </ImageContainer>

            <DescriptionContainer>
              <Title>{product.title}</Title>
              <Subtitle>{product.category}</Subtitle>
              <ItemContent>{product.description}</ItemContent>
              <Rating>
                {" "}
                ⭐{product.rating?.rate} | {product.rating?.count} Ratings
              </Rating>
              <Price>${product.price}</Price>

              <ButtonContainer>
                <AddToBag>🛒 ADD TO BAG</AddToBag>
                <Wishlist>💗 WISHLIST</Wishlist>
              </ButtonContainer>
            </DescriptionContainer>
          </ProductWrapper>
        </>
      )}
    </>
  );
};

export default ProductPage;

const ProductWrapper = styled.div`
  color: black;
  display: flex;
  /* align-items: center; */
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
