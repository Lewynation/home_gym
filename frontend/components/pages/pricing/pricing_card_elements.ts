import dumbellIcon from "@/assets/icons/dumbbellicon.jpg";
import cardioIcon from "@/assets/icons/cardioicon.jpg";
import buildIcon from "@/assets/icons/buildicon.jpg";

export const pricingCardElements = [
  {
    title: "Master",
    price: "Ksh 2,000",
    prefered: false,
    image: dumbellIcon,
    items: [
      {
        item: "5 Days In A Week",
        active: true,
      },
      {
        item: "01 Sweatshirt",
        active: true,
      },
      {
        item: "01 Bottle Of Protein",
        active: false,
      },
      {
        item: "Access To Videos",
        active: false,
      },
      {
        item: "Muscle Stretching",
        active: false,
      },
    ],
  },
  {
    title: "Kiongoss",
    price: "Ksh 5,000",
    image: cardioIcon,
    prefered: true,
    items: [
      {
        item: "5 Days In A Week",
        active: true,
      },
      {
        item: "01 Sweatshirt",
        active: true,
      },
      {
        item: "01 Bottle Of Protein",
        active: true,
      },
      {
        item: "Access To Videos",
        active: false,
      },
      {
        item: "Muscle Stretching",
        active: false,
      },
    ],
  },
  {
    title: "Bazuu",
    price: "Ksh 10,000",
    image: buildIcon,
    prefered: false,
    items: [
      {
        item: "5 Days In A Week",
        active: true,
      },
      {
        item: "01 Sweatshirt",
        active: true,
      },
      {
        item: "01 Bottle Of Protein",
        active: true,
      },
      {
        item: "Access To Videos",
        active: true,
      },
      {
        item: "Muscle Stretching",
        active: true,
      },
    ],
  },
];
