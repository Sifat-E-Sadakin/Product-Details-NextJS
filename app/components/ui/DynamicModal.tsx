import Image from "next/image";
import React from "react";

interface DynamicModalProps {
  modalData: any;
  isOpen: boolean;
  onClose: () => void;
}

const DynamicModal = ({ modalData, isOpen, onClose }: DynamicModalProps) => {
  const handleOutsideClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`
        fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50
        flex justify-center items-center
        ${isOpen ? "" : "hidden"}
      `}
      onClick={handleOutsideClick}>
      <div
        className={`
          bg-white w-full sm:w-3/4 lg:w-1/2 h-[75vh] rounded-lg p-5 sm:p-11
          ${isOpen ? "" : "hidden"}
        `}>
        <div>
          <h1 className="font-bold text-2xl text-[#364A63] mb-5">Your Cart</h1>
          <div className="overflow-auto max-h-[50vh] mb-5">
            <table className="w-full">
              <thead className="font-normal text-sm text-[#8091A7] border-b border-[#DBDFEA]">
                <tr className="text-left">
                  <th>Item</th>
                  <th>Color</th>
                  <th>Size</th>
                  <th>Qnt</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody className="border-b border-[#DBDFEA]">
                {modalData.map((item: any, index: number) => (
                  <tr key={index} className="border-b border-[#DBDFEA]">
                    <td className="py-5 flex gap-3 items-center font-normal text-sm text-[#364A63]">
                      <Image
                        className="rounded-lg"
                        src={item.img.src}
                        alt={item.name}
                        width={50}
                        height={50}
                      />
                      {item.name}
                    </td>
                    <td className="py-5 font-normal text-sm text-[#364A63]">
                      {item.color}
                    </td>
                    <td className="py-5 font-normal text-sm text-[#364A63]">
                      {item.size}
                    </td>
                    <td className="py-5 font-normal text-sm text-[#364A63]">
                      {item.quantity}
                    </td>
                    <td className="py-5 font-normal text-sm text-[#364A63]">
                      {item.price}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td
                    colSpan={3}
                    className="py-5 font-bold text-base text-[#364A63]">
                    Total
                  </td>
                  <td className="py-5 font-bold text-sm text-[#364A63]">
                    {modalData.reduce(
                      (acc: number, item: any) => acc + item.quantity,
                      0
                    )}
                  </td>
                  <td className="py-5 font-bold text-lg text-[#364A63]">
                    $
                    {modalData.reduce(
                      (acc: number, item: any) =>
                        acc + item.quantity * item.price,
                      0
                    )}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="flex justify-end mt-5">
            <button
              className="border border-[#DBDFEA] font-bold text-sm flex items-center justify-center text-[#364A63] px-4 py-2 rounded-lg mr-2"
              onClick={onClose}>
              Continue Shopping
            </button>
            <button
              className="bg-[#6576FF] font-bold text-sm flex items-center justify-center text-white px-4 py-2 rounded-lg"
              onClick={onClose}>
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicModal;
