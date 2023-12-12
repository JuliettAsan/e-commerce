export default function CardGeneric({ data }) {
  const id = 1;
  return (
    <div className="item-box">
      <h3 className="item-box-title">PRODUCTS</h3>
      <div className="Container">
        {data &&
          data.map((item, i) => (
            <div className="cardGeneric" key={i}>
              <a>
                <div
                  style={{
                    backgroundImage:
                      "url(https://imgix.cosmicjs.com/d7ed4460-3ac6-11ed-adfd-ddb1795c6ac6-EXOPLANETAS-BANN.jpg?fit=crop&w=322&h=250)",
                  }}
                ></div>
              </a>

              <div className="cardGeneric-date">
                <p>{item?.price || "20"} USD</p>
              </div>

              <div className="cardGeneric-body">
                <h3 className="cardGeneric-body title">{item?.name}</h3>
                <p className="cardGeneric-body hour">{item?.description}</p>
                <a
                  href={`/products/${item?.id}`}
                  className="cardGeneric-body-btn"
                >
                  VER MÁS
                </a>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
