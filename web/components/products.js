import React, { useState } from "react";
import { useShoppingCart, formatCurrencyString } from "use-shopping-cart";
import styled from "styled-components";

const Products = ({ products, textcolor, backgroundColor }) => {
  const { addItem, decrementItem, cartCount, cartDetails } = useShoppingCart();
  const [itemQuantities, setItemQuantities] = useState({});

  const handleIncrement = (product) => {
    addItem(product);
    setItemQuantities((prevQuantities) => ({
      ...prevQuantities,
      [product.id]: (prevQuantities[product.id] || 0) + 1,
    }));
  };

  const handleDecrement = (product) => {
    decrementItem(product.id);
    setItemQuantities((prevQuantities) => ({
      ...prevQuantities,
      [product.id]: Math.max((prevQuantities[product.id] || 0) - 1, 0),
    }));
  };

  const getItemQuantity = (productId) => {
    return itemQuantities[productId] || 0;
  };

  let textcolorCheck;
  if (textcolor) {
    textcolorCheck = textcolor;
  } else {
    textcolorCheck = "var(--color-primary)";
  }

  console.log('cart count', cartCount, cartDetails)
  return (
    <Section>
      {products.map((product) => {
        return (<Ticket
          key={product.id}
          style={{
            color: textcolorCheck,
            // opacity: product.soldOut || !product.forSale ? 0.25 : 1,
          }}
        >
          <p
            style={{
              textDecoration:
                product.soldOut || !product.forSale ? "line-through" : "none",
            }}
          >
            {product.name} -{" "}
            {formatCurrencyString({
              value: product.price,
              currency: "cad",
            })}{" "}
            plus tax
          </p>
          {product.soldOut && !product.forSale ? (
            <p>sold out</p>
          ) : !product.soldOut && product.forSale ? (
            <p>available</p>
          ) : null}
          {!product.soldOut && product.forSale ? (
            <Options textcolor={textcolor}>
              quantity
              <div>
                <Button
                  textcolor={textcolor}
                  backgroundColor={backgroundColor}
                  onClick={() => handleDecrement(product)}
                  aria-label="Remove a ticket from the cart"
                  disabled={getItemQuantity(product.id) <= 0}
                >
                  -
                </Button>
                <span color={textcolorCheck}>{getItemQuantity(product.id)}</span>
                <Button
                  textcolor={textcolor}
                  backgroundColor={backgroundColor}
                  onClick={() => handleIncrement(product)}
                  aria-label="Add ticket to cart"
                  disabled={cartCount >= 6 || product.soldOut || !product.forSale}
                >
                  +
                </Button>
              </div>
            </Options>
          ) : null}
        </Ticket>)
      })}
    </Section>
  );
};
export default Products;

const Section = styled.section`
  margin: 2rem 0;
  h6 {
    margin-top: 0;
  }
`;

const Ticket = styled.div`
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;

  p {
    margin: 0;
  }
`;

const Options = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  margin-top: 0.5rem;
  margin-bottom: 0.5rem;

  color: ${(props) => props.textcolor || "var(--color-primary)"};
`;

const Button = styled.button`
  position: relative;
  margin: 0 0.5rem;
  width: 25px;
  background: ${(props) => props.backgroundColor || "var(--color-secondary)"};
  filter: brightness(92%);
  text-align: center;
  color: ${(props) => props.textcolor || "var(--color-primary)"};
  transition: 0.25 all ease;

  :disabled {
    cursor: not-allowed;
    opacity: 0.3;
  }

  :hover:not(:disabled) {
    background: ${(props) => props.textcolor || "var(--color-primary)"};
    color: ${(props) => props.backgroundColor || "var(--color-secondary)"};
  }
`;