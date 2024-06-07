import { useRef, useState } from "react";
import {
  BRANDS,
  TECH_SPECIFICATION,
  TYPE_DEVICE,
} from "../../../utils/constants.ts";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { NewProductType, initialProduct } from "../../../types/product.type.ts";
import axios from "../../../utils/customAxios.ts";
import toast from "react-hot-toast";
import { useAppDispatch } from "../../../store.ts";
import { getProducts } from "../../../slice/product.slice.ts";

export const AddProductModal = () => {
  const dispatch = useAppDispatch();
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [product, setProduct] = useState<NewProductType>(initialProduct);
  const [value, setValue] = useState("");
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const handleAddProductBtn = async () => {
    if (
      product.brand &&
      product.deviceCode &&
      value &&
      product.name &&
      product.typeDevice &&
      product.warranty &&
      product.year &&
      files.length !== 0
    )
      try {
        setIsDisabled(true);
        const data = new FormData();
        data.append("brand", product.brand);
        data.append("deviceCode", product.deviceCode);
        data.append("discount", product.discount.toString());
        data.append("information", value);
        data.append("name", product.name);
        data.append("price", product.price.toString());
        data.append("sold", product.sold.toString());
        data.append("stock", product.stock.toString());
        data.append("typeDevice", product.typeDevice);
        data.append("warranty", product.warranty);
        data.append("year", product.year.toString());
        data.append(
          "techSpecification",
          JSON.stringify(product.techSpecification)
        );
        if (files.length !== 0)
          for (let i = 0; i < files.length; i++) {
            data.append("image", files[i]);
          }
        await axios.post("/api/admin/product", data);
        toast.success("Thêm mới sản phẩm thành công!");
        dispatch(getProducts());
        handleCloseModal();
        setIsDisabled(false);
      } catch (error) {
        //
        toast.error("Có lỗi xin thử lại!");
        setIsDisabled(false);
      }
    else toast.error("Nhập thiếu thông tin");
  };
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles([...event.target.files]);
    }
  };
  const handleCloseModal = () => {
    setProduct(initialProduct);
    setValue("");
    setFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the input file
    }
    setIsShowModal(false);
  };
  const onChangeShadow = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
  };
  const onChangeDeep = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({
      ...product,
      techSpecification: {
        ...product.techSpecification,
        [event.target.name]: event.target.value,
      },
    });
  };
  return (
    <div>
      <label className="btn btn-error" htmlFor="add-product-banner">
        Thêm sản phẩm
      </label>
      <input
        className="modal-state"
        id="add-product-banner"
        type="checkbox"
        onChange={() => setIsShowModal(true)}
        // onClick={}
        checked={isShowModal}
      />
      <div className="modal">
        <label className="modal-overlay" htmlFor="add-product-banner"></label>
        <div className="modal-content flex flex-col gap-5 min-w-full">
          <label
            onClick={handleCloseModal}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </label>
          <h2 className="text-xl">Tạo sản phẩm mới</h2>
          <div className="modal-contents flex flex-col gap-4">
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col gap-2">
                <h1 className="font-medium text-error">Mã sản phẩm</h1>
                <input
                  type="text"
                  name="deviceCode"
                  value={product.deviceCode}
                  onChange={onChangeShadow}
                  className="input border-error w-full"
                  placeholder="Mã sản phẩm"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="font-medium text-error">Tên sản phẩm</h1>
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={onChangeShadow}
                  className="input border-error w-full"
                  placeholder="Tên sản phẩm"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="font-medium text-error">Số lượng</h1>
                <input
                  type="number"
                  name="stock"
                  value={product.stock}
                  onChange={onChangeShadow}
                  className="input border-error w-full"
                  placeholder="Số lượng"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="font-medium text-error">Thương hiệu</h1>
                <select
                  name="brand"
                  value={product.brand}
                  onChange={onChangeShadow}
                  className="select select-error"
                >
                  {BRANDS.map((item, index) => (
                    <option className="px-4 py-2" key={index}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="font-medium text-error">Loại sản phẩm</h1>
                <select
                  name="typeDevice"
                  value={product.typeDevice}
                  className="select select-error"
                  onChange={onChangeShadow}
                >
                  {TYPE_DEVICE.map((item, index) => (
                    <option className="px-4 py-2" key={index}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="font-medium text-error">Năm sản xuất</h1>
                <input
                  type="number"
                  name="year"
                  value={product.year}
                  onChange={onChangeShadow}
                  className="input border-error w-full"
                  placeholder="Năm sản xuất"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="font-medium text-error">Bảo hành</h1>
                <input
                  type="text"
                  name="warranty"
                  value={product.warranty}
                  onChange={onChangeShadow}
                  className="input border-error w-full"
                  placeholder="Bảo hành"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="font-medium text-error">Giá bán gốc</h1>
                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={onChangeShadow}
                  className="input border-error w-full"
                  placeholder="Giá bán gốc"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="font-medium text-error">Tỉ lệ giảm giá</h1>
                <input
                  type="number"
                  name="discount"
                  value={product.discount}
                  onChange={onChangeShadow}
                  className="input border-error w-full"
                  placeholder="Tỉ lệ giảm giá"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <h1 className="font-medium text-error col-span-3">
                Thông số kỹ thuật
              </h1>
              {TECH_SPECIFICATION.map((item, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <h1 className="font-medium text-error">
                    {item.toLocaleUpperCase()}
                  </h1>
                  <input
                    type="text"
                    name={item}
                    value={product?.techSpecification?.[item]}
                    onChange={onChangeDeep}
                    className="input border-error w-full"
                    placeholder={item}
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="font-medium text-error">Mô tả</h1>
              <ReactQuill
                theme="snow"
                className="h-[300px] mb-10"
                value={value}
                onChange={setValue}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="font-medium text-error">Ảnh sản phẩm</h1>
              <input
                type="file"
                multiple={true}
                ref={fileInputRef}
                onChange={handleFileChange}
                className="input-file input-file-error"
              />
              <div className="grid grid-cols-4 gap-3">
                {files.map((item, index) => (
                  <div key={index}>
                    <img src={URL.createObjectURL(item)} alt="" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              disabled={isDisabled}
              onClick={handleAddProductBtn}
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
