import { fetcher } from "@/main/lib/fetcher";
import Notify from "@/ui/Notify/Notify";
import { createNotify } from "main/redux/actions/notify";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";

export const getServerSideProps = ({ params }) => {
  const { id } = params;
  return { props: { id } };
};

export default function ProductDetails({ data, id }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [quantity, setQuantity] = useState(1);
  const [formState, setFormState] = useState({
    name: data.name,
    description: data.description,
    price: data.price,
  });
  const [disabled, setDisabled] = useState(true);

  const handleClick = () => {
    setDisabled(!disabled);
  };

  const decreaseQty = () => {
    if (quantity <= 0) {
      setQuantity(0);
    } else {
      setQuantity(quantity - 1);
    }
  };

  const increaseQty = () => {
    // Assuming quota is defined somewhere
    if (quantity >= quota) {
      setQuantity(quota);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const onChangeQuantity = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 0 && value <= quota) {
      setQuantity(value);
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    try {
      let requestBody = JSON.stringify(formState);
      const res = await fetcher(`/api/products/${id}`, "PUT", requestBody);
      console.log(res, "resp updated");
      dispatch(createNotify({ success: "Successfully edited product" }));
      setTimeout(() => {
        dispatch(createNotify({}));
      }, 5000);
    } catch (error) {
      console.error("Error:", error);
      dispatch(
        createNotify({ error: "There was an error editing the product" })
      );
      setTimeout(() => {
        dispatch(createNotify({}));
      }, 5000);
    }
  };

  const onDelete = async () => {
    try {
      const res = await fetcher(`/api/products/${id}`, "DELETE");
      console.log(res, "resp updated");
      dispatch(createNotify({ success: "Product successfully removed" }));
      setTimeout(() => {
        dispatch(createNotify({}));
      }, 5000);
    } catch (error) {
      console.error("Error:", error);
      dispatch(createNotify({ error: "Error deleting product" }));
      setTimeout(() => {
        dispatch(createNotify({}));
        router.push("/products");
      }, 5000);
    }
  };
  return (
    <>
      <div className="item-box">
        <h3 className="item-box-title">{data?.name}</h3>
        <div className="two-columns-container">
          <Image
            className="Col1"
            src={
              data?.picture ||
              "https://imgix.cosmicjs.com/d7ed4460-3ac6-11ed-adfd-ddb1795c6ac6-EXOPLANETAS-BANN.jpg?fit=crop&w=322&h=250"
            }
            width={500}
            height={500}
            alt="Logo parque explora"
          />
          <div className="Col2">
            <h3 className="Col2-Title ">
              <input
                type="text"
                name="name"
                className=""
                value={formState.name}
                placeholder={data.name}
                onChange={handleChange}
                disabled={disabled}
              />
            </h3>
            <textarea
              rows="5"
              cols="33"
              type="textArea"
              name="description"
              className=""
              placeholder={data.description}
              value={formState.description}
              onChange={handleChange}
              disabled={disabled}
            />
            <p className="Col2-Price">
              <input
                type="number"
                name="price"
                value={formState.price}
                placeholder={`${data.price} USD`}
                onChange={handleChange}
                disabled={disabled}
              />
            </p>

            <div className="input-quantity">
              <Image
                src={"/assets/icons/arrowDownQuantity.svg"}
                alt="Flecha hacia abajo"
                width={20}
                height={10}
                /* onClick={decreaseQty} */
              />
              <input
                type="text"
                className="input-quantityEditable"
                onChange={onChangeQuantity}
                value={quantity}
              />
              <Image
                src={"/assets/icons/arrowTopQuantity.svg"}
                alt="Flecha hacia arriba"
                width={20}
                height={10}
                /* onClick={increaseQty} */
              />
              <div className="content-button">
                {disabled && (
                  <button className="btn" onClick={handleClick}>
                    Edit
                  </button>
                )}
                {!disabled && (
                  <button className="btn" onClick={onSubmit}>
                    Update
                  </button>
                )}
                <button className="btn">Add to cart</button>
                <button className="btn">Buy now</button>
                <a href={"/products"} className="btn">
                  Back
                </a>
                <button className="btn" onClick={onDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        <Notify />
      </div>
    </>
  );
}
