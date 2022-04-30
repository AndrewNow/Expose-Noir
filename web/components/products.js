import { useShoppingCart, formatCurrencyString } from "use-shopping-cart";
import styled, { keyframes } from "styled-components";

const Products = ({ products }) => {
  const { addItem, decrementItem, cartCount } = useShoppingCart();

  return (
    <Section>
      {products.map((product) => (
        <Ticket
          key={product.id}
          style={{ color: product.soldOut ? "grey" : "black" }}
        >
          <p
            style={{
              textDecoration: product.soldOut ? "line-through" : "none",
            }}
          >
            <strong>{product.name}</strong> -{" "}
            {formatCurrencyString({
              value: product.price,
              currency: "cad",
            })}{" "}
            CAD
          </p>
          {product.soldOut ? <p>sold out</p> : null}
          {product.soldOut ? null : (
            <Options>
              <strong>quantity: </strong>
              <div>
                <Button
                  onClick={() => addItem(product)}
                  aria-label="Add ticket to cart"
                  disabled={product.soldOut ? true : false}
                >
                  +
                </Button>
                {cartCount}
                <Button
                  onClick={() => decrementItem(product.id)}
                  aria-label="Remove a ticket from the cart"
                  disabled={product.soldOut ? true : false}
                >
                  -
                </Button>
              </div>
            </Options>
          )}
        </Ticket>
      ))}
    </Section>
  );
};

export default Products;

const blink = keyframes`
  from {
    opacity: 0;
  }
  
  to {
    opacity: 1;
  }
`;

const Section = styled.section`
  margin: 2rem 0;
  h6 {
    margin-top: 0;
  }
`;

const Ticket = styled.div`
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px dotted grey;

  p {
    margin: 0;
  }
`;

const Options = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  margin-top: 1rem;
`;

const Button = styled.button`
  margin: 0 0.5rem;
  width: 25px;
  :disabled {
    cursor: not-allowed;
    animation: none;
  }
  :hover:not(:disabled) {
    color: white;
    background: black;
    animation: ${blink} 0.5s linear infinite alternate;
  }
`;
