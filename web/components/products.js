import { useShoppingCart, formatCurrencyString } from "use-shopping-cart";
import urlFor from "../lib/sanity/urlFor";
import styled, { keyframes } from "styled-components";
import BlockContent from "@sanity/block-content-to-react";

const Products = ({ products }) => {
  const { addItem, decrementItem, cartCount } = useShoppingCart();

  return (
    <Section>
      {products.map((product) => (
        <div key={product.id}>
          {console.log(product)}
          <h6>{product.name}</h6>
          <p>
            <strong>location: </strong>
            {product.location}
          </p>
          {product.description && (
            <p>
              <strong>lineup: </strong>
              <BlockContent blocks={product.description} />
            </p>
          )}
          {product.image && (
            <img src={urlFor(product.image).width(200)} alt={product.name} />
          )}
          <p>
            {formatCurrencyString({
              value: product.price,
              currency: "cad",
            })}{" "}
            CAD
          </p>
          <Options>
            <strong>quantity: </strong>
            <div>
              <Button
                onClick={() => addItem(product)}
                aria-label="Add ticket to cart"
              >
                +
              </Button>
              {cartCount}
              <Button
                onClick={() => decrementItem(product.id)}
                aria-label="Remove a ticket from the cart"
              >
                -
              </Button>
            </div>
          </Options>
        </div>
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
  padding: 1rem 0;
  border-top: 1px dotted grey;
  border-bottom: 1px dotted grey;

  h6 {
    margin-top: 0;
  }
`;

const Options = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Button = styled.button`
  margin: 0 0.5rem;
  width: 35px;

  :hover,
  :focus {
    color: white;
    background: black;
    animation: ${blink} 0.5s linear infinite alternate;
  }
`;
