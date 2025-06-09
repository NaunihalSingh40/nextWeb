"use client";
import Image from "next/image";
import styled from "styled-components";
import { useGetProductQuery } from "services/NextWeb/GetProductsApi"; // <-- update this path if needed
import { useRouter } from "next/navigation";
import { useDeleteProductMutation } from "services/NextWeb/DeleteProductApi";

interface Rating {
  rate: number;
  count: number;
}

interface Product {
  _id: string;
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

const Dashboard = () => {
  const router = useRouter();
  const {
    data: products,
    isLoading,
    isError,
    refetch,
  } = useGetProductQuery(null);
  const [deleteProduct] = useDeleteProductMutation();

  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p>Failed to load products.</p>;

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      refetch();
    } catch (error) {
      console.error("Error deleting item", error);
    }
  };

  return (
    <Grid>
      {products?.map((item: Product) => (
        <ProductWrapper key={item?.id}>
          <Content>
            <Image
              src={item?.image}
              alt={item?.title}
              width={200}
              height={200}
              style={{ borderRadius: "10px" }}
              onClick={() => router.push(`/product/${item.id}`)}
            />
            <ProductTitle>{item?.title}</ProductTitle>
            <Rating>
              ⭐ {item?.rating?.rate ?? "N/A"} ({item.rating?.count ?? 0})
            </Rating>
            <Price>${item.price}</Price>
            <ButtonGroup>
              <DeleteButton
                onClick={() => {
                  handleDelete(item?._id);
                }}
              >
                Delete
              </DeleteButton>
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

const DeleteButton = styled.button`
  background: #e53e3e;
  color: white;
  border: none;
  width: 100%;
  padding: 0.6rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.8rem;
  &:hover {
    background: #c53030;
  }
`;

const Content = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  cursor: pointer;
`;
