import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Loading from "../../../components/shared/loading";
import { useOrder } from "../hooks/useOrder";
import Actions from "./Actions";
import Calculations from "./Calculations";
import Products from "./Products";
import OrderDetails from "./OrderDetails";

export default function OrderComponent() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const paymobId = searchParams.get("order");
  const {
    getOrder,
    order,
    handleCashClick,
    handlePaymobClick,
    isCashLoading,
    isPaymobLoading,loading
  } = useOrder();
  useEffect(() => {
    if (id && id !== "paid") {
      getOrder(id);
    } else if (paymobId && id == "paid") {
      getOrder(undefined, paymobId);
    }
  }, [getOrder, id, paymobId]);

  if(loading)return <Loading/>
  return (
    <>
      {!order ? (
        <Loading />
      ) : (
        <div className="max-w-4xl mx-auto px-4 py-8 text-gray-800 dark:text-gray-100 transition-colors dir-rtl">
          <OrderDetails order={order} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <Products order={order} />

            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 shadow-sm sticky top-6">
                <h3 className="text-lg font-bold pb-3 border-b border-gray-100 dark:border-gray-800 mb-4">
                  Account Summary
                </h3>

          
                <Calculations order={order} />

                <Actions
                  isCashLoading={isCashLoading}
                  isPaymobLoading={isPaymobLoading}
                  order={order}
                  id={id}
                  handleCashClick={handleCashClick}
                  handlePaymobClick={handlePaymobClick}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
