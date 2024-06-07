import { useEffect } from "react";
import { useAppDispatch } from "../../../store";
import { getProducts } from "../../../slice/product.slice";

export const GetProducts = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const action = dispatch(getProducts());
    return () => {
      action.abort();
    };
  }, [dispatch]);
  return <></>;
};
