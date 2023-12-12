import MainLayout from "@/main/components/layouts/MainLayout";
import useSWR from "swr";
import { fetcher } from "@/main/lib/fetcher";
import Loading from "@/ui/Loading/Loading";
import Error from "next/error";
import CardGeneric from "@/ui/cards/CardGeneric";
import ProductDetails from "@/modules/Products/productDetails";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const getData = async (id) => {
  try {
    const res = await fetcher(`/api/products/${id}`, "GET");
    return res;
  } catch (error) {
    return error;
  }
};

const updateData = async (id, body) => {
  try {
    let requestBody = JSON.stringify(body);
    const res = await fetcher(`/api/products/${id}`, "PUT", requestBody);
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
  const { push } = useRouter();

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
