import blackWatch from "@/public/assets/black.png";
import blueWatch from "@/public/assets/blue.png";
import skyWatch from "@/public/assets/sky.png";
import cyanWatch from "@/public/assets/cyan.png";

export const productList = [
  {
    product_name: "Classy Modern Smart watch",
    product_rating: 4,
    total_reviews: [
      {
        review: "Great product",
        rating: 5,
      },
      {
        review: "Good product",
        rating: 5,
      },
    ],
    main_price: 100,
    discount_price: 80,
    description:
      "I must explain to you how all this mistaken idea of denoun cing ple praising pain was born and I will give you a complete account of the system, and expound the actual teaching.",
    product_type: "Watch",
    product_model: "Forerunner 290XT",
    available_colors: [
      {
        color: "Blue",
        code: "#816BFF",
        img: blueWatch,
      },

      {
        color: "Sky",
        code: "#1FCEC9",
        img: skyWatch,
      },
      {
        color: "Cyan",
        code: "#4B97D3",
        img: cyanWatch,
      },
      {
        color: "Black",
        code: "#3B4747",
        img: blackWatch,
      },
    ],
    available_sizes: [
      {
        size: "S",
        price: 80,
      },
      {
        size: "M",
        price: 69,
      },
      {
        size: "L",
        price: 89,
      },
      {
        size: "XL",
        price: 99,
      },
    ],
  },
];
