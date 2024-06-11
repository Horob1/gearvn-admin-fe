import { useEffect } from "react";
import { useAppDispatch } from "../../../store";
import { getOrders } from "../../../slice/order.slice";

export const GetOrders = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const action = dispatch(getOrders());
    return () => {
      action.abort();
    };
  }, [dispatch]);
  return <></>;
};
