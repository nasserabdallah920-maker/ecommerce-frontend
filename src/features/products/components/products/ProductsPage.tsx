import { useEffect } from "react";
import Products from "../../../../components/shared/Products";
import { useHomeData } from "../../../../hooks/useHomeData";
import Loading from "../../../../components/shared/loading";

export default function ProductsPage() {
  const { fetchProducts, productsLoading } = useHomeData();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  return (
    <>
      {productsLoading ? <Loading /> : <Products loading={productsLoading} />}
    </>
  );
}
