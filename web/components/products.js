import { useShoppingCart, formatCurrencyString } from "use-shopping-cart";
import urlFor from "../lib/sanity/urlFor";
import styled, { keyframes } from "styled-components";

const Products = ({ products }) => {
  const { addItem, removeItem } = useShoppingCart();

  return (
    <Section>
      {products.map((product) => (
        <div key={product.id}>
          <h6>{product.name}</h6>
          {/* {product.description} */}
          <p>
            <strong>Location: </strong>
            {product.location}
          </p>
          <img src={urlFor(product.image).width(200)} alt={product.name} />
          <p>
            {formatCurrencyString({
              value: product.price,
              currency: "cad",
            })}{" "}
            CAD
          </p>
          <Options>
            <strong>Options:</strong>
            <Button onClick={() => addItem(product)}>Add to cart</Button>
            {" | "}
            <Button onClick={() => removeItem(product.id)}>Remove</Button>
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

  :hover,
  :focus {
    color: white;
    background: black;
    animation: ${blink} 0.5s linear infinite alternate;
  }
`;
