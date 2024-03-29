import { useShoppingCart, formatCurrencyString } from "use-shopping-cart";
import styled from "styled-components";

const Products = ({ products, textcolor, backgroundColor }) => {
  const { addItem, decrementItem, cartCount } = useShoppingCart();

  let textcolorCheck;
  if (textcolor) {
    textcolorCheck = textcolor;
  } else {
    textcolorCheck = "var(--color-primary)";
  }

  return (
    <Section>
      {products.map((product) => (
        <Ticket
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
          {/* If a product is sold out and NOT for sale, say sold out.*/}
          {/* If a product is NOT available and NOT sold out, write nothing*/}
          {product.soldOut && !product.forSale ? (
            <p>sold out</p>
          ) : !product.soldOut && product.forSale ? (
            <p>available</p>
          ) : null}
          {/* If product is sold out or not for sale, don't show the cart buttons */}
          {product.soldOut || !product.forSale ? null : (
            <Options textcolor={textcolor}>
              quantity
              <div>
                <Button
                  textcolor={textcolor}
                  backgroundColor={backgroundColor}
                  onClick={() => decrementItem(product.id)}
                  aria-label="Remove a ticket from the cart"
                  disabled={product.soldOut || !product.forSale ? true : false}
                >
                  -
                </Button>
                <span color={textcolorCheck}>{cartCount}</span>
                <Button
                  textcolor={textcolor}
                  backgroundColor={backgroundColor}
                  onClick={() => addItem(product)}
                  aria-label="Add ticket to cart"
                  disabled={
                    product.soldOut || !product.forSale
                      ? true
                      : false || cartCount >= 6
                  }
                >
                  +
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

  margin-top: 0.5rem;
  margin-bottom: 0.5rem;

  color: ${(props) => props.textcolor || "var(--color-primary)"};
`;

const Button = styled.button`
  position: relative;
  margin: 0 0.5rem;
  width: 25px;
  /* background: whitesmoke; */
  background: ${(props) => props.backgroundColor || "var(--color-secondary)"};
  filter: brightness(92%);
  text-align: center;
  color: ${(props) => props.textcolor || "var(--color-primary)"};
  transition: 0.25 all ease;
  :disabled {
    cursor: not-allowed;
    opacity: 30%;
    animation: none;
    :hover {
      animation: none;
      transition: none !important;
    }
  }
  :hover:not(:disabled) {
    background: ${(props) => props.textcolor || "var(--color-primary)"};
    color: ${(props) => props.backgroundColor || "var(--color-secondary)"};
  }
`;
