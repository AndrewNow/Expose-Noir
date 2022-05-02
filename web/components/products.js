import { useShoppingCart, formatCurrencyString } from "use-shopping-cart";
import styled from "styled-components";

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
            {product.name} -{" "}
            {formatCurrencyString({
              value: product.price,
              currency: "cad",
            })}{" "}
            plus tax
          </p>
          {product.soldOut ? <p>sold out</p> : null}
          {product.soldOut ? null : (
            <Options>
              quantity
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

  margin-top: 1rem;
`;

const Button = styled.button`
  margin: 0 0.5rem;
  width: 25px;
  background: white;
  color: black;
  transition: 0.25 all ease;
  :disabled {
    cursor: not-allowed;
  }
  :hover:not(:disabled) {
    background: whitesmoke;
  }
`;
