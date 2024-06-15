import { ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../store";
import { setCurrent } from "../../../slice/warranty.slice";
import toast from "react-hot-toast";

export const SearchWarranty = () => {
  const dispatch = useAppDispatch();
  const [id, setId] = useState<string>("");
  const warrantyList = useSelector((state: RootState) => state.warranty.list);
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const warrantyCard = warrantyList.find((item) => item.orderId === id);
    if (warrantyCard) dispatch(setCurrent(warrantyCard));
    else toast.error("Không tìm thấy phiếu bảo hành cho đơn hàng này!")
  };

  return (
    <form onSubmit={handleSearch} className="relative">
      <input
        id="search-product"
        type="text"
        value={id}
        onChange={(event) => setId(event.target.value)}
        className="input w-96 border-error pr-8"
        placeholder="Mã đơn hàng"
      ></input>
      <button>
        <ShieldCheck
          color="#F31260"
          className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer hover:opacity-75"
        />
      </button>
    </form>
  );
};
