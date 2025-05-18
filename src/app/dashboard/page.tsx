"use client";
import Image from "next/image";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addToCart } from "slices/cartSlice";
import { useGetProductQuery } from "services/NextWeb/GetProductsApi"; // <-- update this path if needed
import { useAddCartItemMutation } from "services/NextWeb/GetCartApi";
import { getUserFromToken } from "helper";
import { useRouter } from "next/navigation";

interface Rating {
  rate: number;
  count: number;
}

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

const Dashboard = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: products, isLoading, isError } = useGetProductQuery(null);
  const [addCartItem] = useAddCartItemMutation();

  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p>Failed to load products.</p>;

  return (
    <Grid>
      {products?.map((item: Product) => (
        <ProductWrapper
          key={item.id}
          onClick={() => router.push(`/product/${item.id}`)}
        >
          <Content>
            <Image
              src={item.image}
              alt={item.title}
              width={200}
              height={200}
              style={{ borderRadius: "10px" }}
            />
            <ProductTitle>{item.title}</ProductTitle>
            <Rating>
              ⭐ {item.rating?.rate ?? "N/A"} ({item.rating?.count ?? 0})
            </Rating>
            <Price>${item.price}</Price>
            <ButtonGroup>
              <BuyNowBtn onClick={() => alert(`Buying ${item.title}`)}>
                Buy Now
              </BuyNowBtn>
              <AddToCartBtn
                onClick={() => {
                  dispatch(
                    addToCart({
                      ...item,
                      id: item.id.toString(),
                      name: item.title,
                    })
                  );
                  addCartItem({
                    userId: getUserFromToken()?.id,
                    productId: item.id.toString(),
                    name: item.title,
                    price: item.price,
                    quantity: 1,
                    image: item.image,
                  });
                }}
              >
                Add to Cart
              </AddToCartBtn>
            </ButtonGroup>
          </Content>
        </ProductWrapper>
      ))}
    </Grid>
  );
};

export default Dashboard;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 4rem;
`;

const ProductWrapper = styled.div`
  background-color: ${({ theme }) => theme.card || "#fff"};
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    align-self: center;
    margin-bottom: 0.75rem;
  }
`;

const ProductTitle = styled.h1`
  font-size: 0.95rem;
  margin: 0.25rem 0;
  color: ${({ theme }) => theme.text || "#142A6E"};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Rating = styled.h3`
  font-size: 0.85rem;
  font-weight: 400;
  color: #666;
  margin: 0.25rem 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Price = styled.h2`
  font-size: 1.05rem;
  font-weight: 600;
  color: #333;
  margin: 0.5rem 0;
`;

const ButtonGroup = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  flex-wrap: wrap;
`;

const BuyNowBtn = styled.button`
  background-color: #0070f3;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #005bb5;
  }
`;

const AddToCartBtn = styled.button`
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const Content = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;
