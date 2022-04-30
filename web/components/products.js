import { useShoppingCart, formatCurrencyString } from "use-shopping-cart";
import styled, { keyframes } from "styled-components";

const Products = ({ products }) => {
  const { addItem, decrementItem, cartCount } = useShoppingCart();

  return (
    <Section>
      {products.map((product) => (
        <Ticket
          key={product.id}
          style={{ color: product.soldOut ? "black" : "grey" }}
        >
          <p
            style={{
              textDecoration: product.soldOut ? "none" : "line-through",
            }}
          >
            <strong>{product.name}</strong> -{" "}
            {formatCurrencyString({
              value: product.price,
              currency: "cad",
            })}{" "}
            CAD
          </p>
          {product.soldOut ? null : <p>sold out</p>}
          {product.soldOut ? (
            <Options>
              <strong>quantity: </strong>
              <div>
                <Button
                  onClick={() => addItem(product)}
                  aria-label="Add ticket to cart"
                  disabled={product.soldOut ? false : true}
                >
                  +
                </Button>
                {cartCount}
                <Button
                  onClick={() => decrementItem(product.id)}
                  aria-label="Remove a ticket from the cart"
                  disabled={product.soldOut ? false : true}
                >
                  -
                </Button>
              </div>
            </Options>
          ) : null}
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
  :hover:not(:disabled),
  :focus:not(:disabled) {
    color: white;
    background: black;
    animation: ${blink} 0.5s linear infinite alternate;
  }
`;
