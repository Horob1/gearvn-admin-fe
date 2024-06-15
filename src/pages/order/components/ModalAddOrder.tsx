import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../store";
import { AddProductToCart } from "./AddProductToCart";
import { clearCart } from "../../../slice/cart.slice";
import axios from "./../../../utils/customAxios.ts";
import toast from "react-hot-toast";

export const ModalAddOrder = () => {
  const dispatch = useAppDispatch();
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const cart = useSelector((state: RootState) => state.cart.cart);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const getTotalAmount = () => {
    let total = 0;
    cart.forEach((item) => {
      total +=
        ((item.product.price * (100 - (item.product.discount ?? 0))) / 100) *
        item.quantity;
    });
    return total;
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddBannerBtn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (
        formData.name &&
        formData.email &&
        formData.phone &&
        formData.address &&
        cart.length > 0
      ) {
        const body = {
          userId: "",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          cart: cart,
          totalAmount: getTotalAmount(),
        };
        await axios.post("/api/order", body);

        dispatch(clearCart());
        toast.success("Đặt hàng thành công");
        handleCloseModal();
      } else {
        // TODO: toast error
        toast.error("Chưa nhập đủ thông tin");
      }
    } catch (error) {
      // TODO: toast error
    }
  };
  const handleCloseModal = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
    });
    dispatch(clearCart());
    setIsShowModal(false);
    setIsDisabled(false);
  };
  return (
    <div>
      <label className="btn btn-error" htmlFor="add-modal-order">
        Thêm đơn hàng
      </label>
      <input
        className="modal-state"
        id="add-modal-order"
        type="checkbox"
        onChange={() => setIsShowModal(true)}
        // onClick={}
        checked={isShowModal}
      />
      <div className="modal">
        <label className="modal-overlay" htmlFor="add-modal-order"></label>
        <div className="modal-content flex flex-col gap-5 min-w-[900px]">
          <label
            onClick={handleCloseModal}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </label>
          <h2 className="text-xl">Tạo order</h2>
          <div className="modal-contents flex flex-col gap-4">
            <div className="gap-4 grid md:grid-cols-5">
              <div className="col-span-3">
                <form onSubmit={handleAddBannerBtn}>
                  <div className="mb-4">
                    <label className="block text-gray-700">Họ và tên</label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Số điện thoại</label>
                    <input
                      required
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700">Địa Chỉ</label>
                    <input
                      required
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <AddProductToCart />
                </form>
              </div>
              <div className="col-span-2 px-4 bg-red-50 rounded-md">
                <h4 className="text-center pt-4">Chi tiết đơn hàng:</h4>
                <div className="mt-4 h-80 overflow-auto rounded-md">
                  {cart.map((item) => (
                    <div
                      key={item.product._id}
                      className="grid grid-cols-5 w-full gap-4 pb-2 border-t-2"
                    >
                      <div className="col-span-2 h-16 w-full">
                        <img
                          src={item.product?.imageList?.[0] ?? ""}
                          className="h-full m-auto aspect-square"
                          alt=""
                        />
                      </div>
                      <div className="col-span-2 ">
                        <h6 className="text-sm line-clamp-1">
                          {item.product?.name}
                        </h6>

                        <div>
                          <h4 className="text-red-600 text-sm">
                            {new Intl.NumberFormat("de-DE").format(
                              ((item.product?.price ?? 0) *
                                (100 - (item.product?.discount ?? 0))) /
                                100
                            )}
                            đ
                          </h4>
                        </div>
                      </div>
                      <div className="h-full flex">
                        <span className="my-auto">x{item.quantity}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <h4 className="text-center mt-4">Tổng tiền:</h4>
                <h2 className="text-red-500 text-center">
                  {new Intl.NumberFormat("de-DE").format(getTotalAmount())}đ
                </h2>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              disabled={isDisabled}
              onClick={handleAddBannerBtn}
              className="btn btn-error btn-block"
            >
              Lưu
            </button>

            <label onClick={handleCloseModal} className="btn btn-block">
              Huỷ
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
