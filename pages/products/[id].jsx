import MainLayout from "@/main/components/layouts/MainLayout";
import { fetcher } from "@/main/lib/fetcher";
import Error from "next/error";
import ProductDetails from "../../main/components/modules/Products/ProductDetails";
import { useEffect, useState } from "react";

const getData = async (id) => {
  try {
    const res = await fetcher(`/api/products/${id}`, "GET");
    return res;
  } catch (error) {
    return error;
  }
};

export const getServerSideProps = ({ params }) => {
  const { id } = params;
  return { props: { id } };
};

const Index = ({ id }) => {
  const [requestState, setrequestState] = useState({
    error: false,
    status: "",
  });
  const [data, setData] = useState(false);

  useEffect(() => {
    const get = async () => {
      let data = await getData(id);
      setrequestState(data);
      setData(data?.data);
    };
    get();
  }, [id]);

  if (requestState?.error) {
    <MainLayout>
      <Error statusCode={data.status || 500} />;
    </MainLayout>;
  }

  return (
    <MainLayout
      meta={{
        title: "E-COMMERCE | JULIETT SANCHEZ ",
      }}
    >
      <ProductDetails data={data} id={id} />
    </MainLayout>
  );
};
export default Index;
