import { create } from "zustand";

type Address = {
  details: string;
  phone: string;
  city: string;
  postalCode: string;
};

type Card = {
  cardNumber: string;
  expirDate: string;
  cvv: string;
};

type CheckoutState = {
  address: Address;
  paymentMethod: "card" | "cash";
  card: Card;

  setAddress: (data: Address) => void;
  setPaymentMethod: (method: "card" | "cash") => void;
  setCard: (data: Card) => void;

  reset: () => void;
};

export const useCheckoutStore = create<CheckoutState>((set) => ({
  address: {
    details: "",
    phone: "",
    city: "",
    postalCode: "",
  },

  paymentMethod: "card",

  card: {
    cardNumber: "",
    expirDate: "",
    cvv: "",
  },

  setAddress: (data) => set({ address: data }),
  setPaymentMethod: (method) => set({ paymentMethod: method }),
  setCard: (data) => set({ card: data }),

  reset: () =>
    set({
      address: {
        details: "",
        phone: "",
        city: "",
        postalCode: "",
      },
      paymentMethod: "card",
      card: {
        cardNumber: "",
        expirDate: "",
        cvv: "",
      },
    }),
}));
