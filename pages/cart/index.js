import MainLayout from "@/main/components/layouts/MainLayout";
import useSWR from "swr";
import { fetcher } from "@/main/lib/fetcher";
import Loading from "@/ui/Loading/Loading";
import Error from "next/error";
import CardGeneric from "@/ui/cards/CardGeneric";

const index = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  /*   if (isLoading) {
    return (
      <MainLayout>
        <Loading />
      </MainLayout>
    );
  } */

  /*   if (error || data.error) return <Error statusCode={data.status || 500} />;
   */
  return (
    <MainLayout
      meta={{
        title: "E-COMMERCE | JULIETT SANCHEZ ",
      }}
    >
      <div>Lista de compras</div>
      <CardGeneric />
    </MainLayout>
  );
};
export default index;
