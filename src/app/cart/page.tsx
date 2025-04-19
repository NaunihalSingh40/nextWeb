"use client";
import React from "react";
import styled from "styled-components";
import Image from "next/image";
import {
  useGetCartItemsQuery,
  useUpdateCartItemMutation,
  useDeleteCartItemMutation,
} from "services/NextWeb/GetCartApi";

interface CartItems {
  _id: string;
  userId: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  __v: number;
}

const Cart = () => {
  const {
    data: cart,
    isLoading,
    isError,
    refetch,
  } = useGetCartItemsQuery(null);
  const [updateCartItem] = useUpdateCartItemMutation();
  const [deleteCartItem] = useDeleteCartItemMutation();

  const handleQuantity = async (item: CartItems, change: number) => {
    const newQty = item.quantity + change;
    if (newQty > 5 || newQty < 1) return;
    try {
      await updateCartItem({
        id: item.productId,
        quantity: newQty,
      });
      refetch();
    } catch (error) {
      console.error("Error updating quantity", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCartItem(id);
      refetch();
    } catch (error) {
      console.error("Error deleting item", error);
    }
  };

  if (isLoading) return <p>Loading cart...</p>;
  if (isError || !cart) return <p>Failed to load cart.</p>;

  const totalAmount = cart.reduce(
    (sum: number, item: CartItems) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartWrapper>
      <CartTitle>Your Shopping Cart</CartTitle>
      {cart.length === 0 ? (
        <EmptyMessage>Your cart is empty.</EmptyMessage>
      ) : (
        <>
          <CartGrid>
            {cart.map((item: CartItems) => (
              <CartItem key={item._id}>
                <ImageWrapper>
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={100}
                    height={100}
                    style={{ borderRadius: "10px" }}
                  />
                </ImageWrapper>
                <ItemInfo>
                  <Name>{item.name}</Name>
                  <Detail>Price: ${item.price}</Detail>
                  <Detail>
                    Quantity:
                    <QuantityControls>
                      <QtyBtn
                        onClick={() => handleQuantity(item, -1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </QtyBtn>
                      <QtyValue>{item.quantity}</QtyValue>
                      <QtyBtn
                        onClick={() => handleQuantity(item, 1)}
                        disabled={item.quantity >= 5}
                      >
                        +
                      </QtyBtn>
                    </QuantityControls>
                  </Detail>
                  <Detail>
                    Total: ${(item.price * item.quantity).toFixed(2)}
                  </Detail>
                  <DeleteBtn onClick={() => handleDelete(item.productId)}>
                    Remove
                  </DeleteBtn>
                </ItemInfo>
              </CartItem>
            ))}
          </CartGrid>
          <TotalAmount>Total Amount: ${totalAmount.toFixed(2)}</TotalAmount>
        </>
      )}
    </CartWrapper>
  );
};

export default Cart;

const CartWrapper = styled.div`
  padding: 2rem;
  background-color: ${({ theme }) => theme.background || "#f9f9f9"};
`;

const CartTitle = styled.h1`
  font-size: 1.7rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.text || "#142A6E"};
  text-align: center;
`;

const EmptyMessage = styled.p`
  font-size: 1rem;
  color: #666;
  text-align: center;
`;

const CartGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

const CartItem = styled.div`
  background: ${({ theme }) => theme.card || "#fff"};
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 1rem;
  transition: transform 0.2s ease;
  &:hover {
    transform: translateY(-3px);
  }
`;

const ImageWrapper = styled.div`
  flex-shrink: 0;
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`;

const Name = styled.h2`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.text || "#142A6E"};
`;

const Detail = styled.p`
  font-size: 0.9rem;
  color: #444;
  margin: 0.25rem 0;
`;

const QuantityControls = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.25rem;
`;

const QtyBtn = styled.button`
  padding: 0.3rem 0.6rem;
  font-size: 1rem;
  border: none;
  background: #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover:not(:disabled) {
    background: #bbb;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const QtyValue = styled.span`
  font-size: 1rem;
  width: 2rem;
  text-align: center;
`;

const DeleteBtn = styled.button`
  background: #ff6666;
  color: #fff;
  border: none;
  padding: 0.4rem 0.8rem;
  margin-top: 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  align-self: flex-start;
  transition: background 0.3s ease;

  &:hover {
    background: #cc0000;
  }
`;

const TotalAmount = styled.h2`
  font-size: 1.3rem;
  margin-top: 2rem;
  color: #111;
  text-align: right;
`;
