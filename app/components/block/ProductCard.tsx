"use client";
import { productList } from "@/public/data/productList";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Rating, RatingView } from "react-simple-star-rating";
import DynamicModal from "../ui/DynamicModal";
import toast, { Toaster } from "react-hot-toast";

const ProductCard = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState<any>([]);
  const [thumbImage, setThumbImage] = useState(
    productList[0].available_colors[0].img
  );
  const [brandColor, setBrandColor] = useState(
    productList[0].available_colors[0].code
  );
  const [checkoutCount, setCheckoutCount] = useState(0);
  const [checkoutBtnVisibility, setCheckoutBtnVisibility] = useState(false);
  const [shakeCounter, setShakeCounter] = useState(false);
  const [selectedSize, setSelectedSize] = useState(
    productList[0].available_sizes[0].size
  );
  const [selectedColor, setSelectedColor] = useState(
    productList[0].available_colors[0].color
  );
  const [addedItems, setAddedItems] = useState<any[]>([]);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(
    productList[0].available_sizes[0].price
  );

  const handleImageChange = (img: any, code: string, color: string) => {
    setThumbImage(img);
    setBrandColor(code);
    setSelectedColor(color);
  };
  const increaseCheckoutCount = () => {
    setCheckoutCount(checkoutCount + 1);
  };
  const decreaseCheckoutCount = () => {
    if (checkoutCount > 0) {
      setCheckoutCount(checkoutCount - 1);
    }
  };
  const handelAddToCart = () => {
    if (checkoutCount > 0) {
      setCheckoutBtnVisibility(true);

      const newItem = {
        name: productList[0].product_name,
        price: finalPrice,
        size: selectedSize,
        color: selectedColor,
        img: thumbImage,
      };

      setAddedItems((prevItems: any[]) => {
        const existingItemIndex = prevItems.findIndex(
          item =>
            item.name === newItem.name &&
            item.price === newItem.price &&
            item.size === newItem.size &&
            item.color === newItem.color
        );

        if (existingItemIndex > -1) {
          const updatedItems = [...prevItems];

          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            color: newItem.color,
            price: finalPrice,
            quantity: updatedItems[existingItemIndex].quantity + checkoutCount,
          };
          return updatedItems;
        } else {
          return [...prevItems, { ...newItem, quantity: checkoutCount }];
        }
      });
      setCheckoutCount(0);
      toast.success("Item added to cart");
    } else {
      setShakeCounter(true);
      toast.error("Please select quantity");
      setTimeout(() => {
        setShakeCounter(false);
      }, 500);
    }
  };

  const handleCheckout = () => {
    setOpenModal(true);
    setModalData(addedItems);
  };

  useEffect(() => {
    const totalCount = addedItems.reduce(
      (acc: number, item: any) => acc + item.quantity,
      0
    );
    setTotalItemCount(totalCount);
  }, [addedItems]);
  console.log(addedItems);
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-center">
        <div className="w-full md:w-[45%] mb-4 md:mb-0">
          <Image src={thumbImage} alt="watch" priority />
        </div>
        <div className="w-full md:w-[55%] md:ps-16">
          <h1 className="font-bold text-4xl text-[#364A63] mb-3">
            {productList[0].product_name}
          </h1>
          <p className="mb-5 flex items-center gap-2">
            <RatingView
              ratingValue={productList[0].product_rating} /* RatingView Props */
            />
            <span className="font-normal text-sm text-[#8091A7] -translate-y-[2px]">
              ( {productList[0].total_reviews.length} Reviews)
            </span>
          </p>
          <div className="flex items-center gap-2 mb-5">
            <p className="font-normal text-xl text-[#8091A7] line-through ">
              ${productList[0].main_price}
            </p>
            <p
              style={{ color: brandColor }}
              className={`font-bold text-2xl text-[#6576FF] -translate-y-[2px]`}>
              ${finalPrice}
            </p>
          </div>
          <div className="text-lg font-normal text-[#8091A7] mb-5">
            <p>{productList[0].description}</p>
          </div>
          <div className="flex gap-10 mb-5">
            <div>
              <h6 className="text-sm font-normal text-[#8091A7]">Type</h6>
              <p className="font-bold text-base text-[#364A63]">
                {productList[0].product_type}
              </p>
            </div>
            <div>
              <h6 className="text-sm font-normal text-[#8091A7]">Model</h6>
              <p className="font-bold text-base text-[#364A63]">
                {productList[0].product_model}
              </p>
            </div>
          </div>
          <div className="mb-5">
            <h2 className="text-lg font-bold text-[#364A63] mb-3">
              Brand Color
            </h2>
            <div className="flex gap-3">
              {productList[0].available_colors.map((color, index) => (
                <label key={index} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="color"
                    className="hidden"
                    onChange={() =>
                      handleImageChange(color.img, color.code, color.color)
                    }
                  />
                  <div
                    className="w-6 h-6 rounded-full border-2 cursor-pointer"
                    style={{
                      backgroundColor: color.code,
                      boxShadow:
                        thumbImage === color.img
                          ? `0 0 0 2px ${color.code}`
                          : "none",
                    }}></div>
                </label>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#364A63] mb-3">
              Wrist Sizes
            </h2>
            <div className="flex gap-3 mb-5">
              {productList[0].available_sizes.map((size, index) => (
                <label
                  key={index}
                  className={`flex items-center gap-2 border rounded px-5 py-2 cursor-pointer ${
                    selectedSize === size.size
                      ? "border-[#6576FF] bg-[#F3F8FF]"
                      : "border-[#DBDFEA]"
                  }`}>
                  <input
                    type="radio"
                    name="size"
                    className="hidden"
                    onChange={() => {
                      setSelectedSize(size.size);
                      setFinalPrice(size.price);
                    }}
                  />
                  <p className="font-bold text-base text-[#364A63]">
                    {size.size}
                  </p>
                  <p className="text-sm font-normal text-[#8091A7]">
                    ${size.price}
                  </p>
                </label>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3 mb-5">
            <div className={`h-9 ${shakeCounter ? "shake" : ""}`}>
              <button
                className="border w-9 h-full"
                onClick={() => decreaseCheckoutCount()}>
                -
              </button>
              <input
                type="text"
                value={checkoutCount}
                className="border w-14 h-full ps-5"
                readOnly
              />
              <button
                className="border w-9 h-full"
                onClick={() => increaseCheckoutCount()}>
                +
              </button>
            </div>
            <button
              style={{
                backgroundColor: brandColor,
              }}
              className="bg-[#6576FF] text-white py-2 px-5 h-9 flex justify-center items-center rounded font-bold text-sm"
              onClick={() => handelAddToCart()}>
              Add to Cart
            </button>
            <div className="heart-Emo">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-heart"
                viewBox="0 0 16 16"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className="mt-10 flex justify-center duration-300 ease-in-out"
        style={{ opacity: checkoutBtnVisibility ? 1 : 0 }}>
        <button
          className="bg-[#FFBB5A] py-3 px-6 flex justify-center items-center rounded-3xl"
          onClick={() => handleCheckout()}>
          <span className="font-bold text-sm text-[#364A63]">Checkout</span>{" "}
          <span className="inline-block bg-white py-1 px-2 rounded-md font-bold text-xs text-[#364A63] ms-4">
            {totalItemCount}
          </span>
        </button>
      </div>
      <DynamicModal
        modalData={modalData}
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />
      <Toaster />
    </div>
  );
};

export default ProductCard;
