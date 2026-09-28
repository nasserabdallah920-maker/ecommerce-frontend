import Products from "../../../../components/shared/Products";
import { useHomeData } from "../../../../hooks/useHomeData";
import Loading from "../../../../components/shared/loading";

export default function ProductsPage() {
  const { productsLoading } = useHomeData();
  return (
    <>
      {productsLoading ? <Loading /> : <Products loading={productsLoading} />}
    </>
  );
}
