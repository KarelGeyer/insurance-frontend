import { useEffect } from "react";
import { AppDispatch, RootState } from "../state/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { IOrderDeleteRequest } from "../models/interfaces";
import AccordionTable from "../components/AccordionTable";
import CustomAccordion from "../components/Accordion";
import Loading from "../components/Loading";
import { deleteOrder } from "../helpers/axios/orders";
import { formatDate } from "../helpers/functions";
import { fetchOrders, setLoading } from "../state/redux/reducers/ordersReducer";

const Orders = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, loading, shouldUpdate } = useSelector(
    (state: RootState) => state.orders
  );

  const fetchData = async () => {
    const response = await dispatch(fetchOrders())
      .then((res: any) => res.payload)
      .catch((error: any) => {
        console.error("Error fetching orders", error);
      });
    return response;
  };

  const cancelOrder = (id: string, email: string) => {
    const data: IOrderDeleteRequest = {
      orderId: id,
      email,
    };
    dispatch(setLoading(true));
    deleteOrder(data).then(() => fetchData());
  };

  useEffect(() => {
    if (shouldUpdate) fetchData();
  }, [shouldUpdate]);

  return (
    <AccordionTable type="orders">
      {!loading ? (
        orders.map((order) => {
          return (
            <CustomAccordion
              key={order.id}
              id={order.id}
              name={order.productName}
              usersName={`${order.name} ${order.surname}`}
              category={order.category}
              date={formatDate(order.date)}
              yearlyPrice={order.yearlyPrice}
              productId={order.productId}
              isProduct={false}
              onButtonClick={cancelOrder}
            ></CustomAccordion>
          );
        })
      ) : (
        <Loading />
      )}
    </AccordionTable>
  );
};

export default Orders;
