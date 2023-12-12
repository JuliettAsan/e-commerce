import MainLayout from "@/main/components/layouts/MainLayout";
import useSWR from "swr";
import { fetcher } from "@/main/lib/fetcher";
import Loading from "@/ui/Loading/Loading";
import Error from "next/error";
import CardGeneric from "@/ui/cards/CardGeneric";

const index = () => {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, error, isLoading } = useSWR(`/api/products`, fetcher);

  if (isLoading) {
    return (
      <MainLayout>
        <Loading />
      </MainLayout>
    );
  }

  if (error || data.error) return <Error statusCode={data.status || 500} />;

  return (
    <MainLayout
      meta={{
        title: "E-COMMERCE | JULIETT SANCHEZ ",
      }}
    >
      <CardGeneric data={data?.data} />
    </MainLayout>
  );
};
export default index;
