import React from "react";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      return {};
    case CART_REMOVE_ITEM:
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          cartItems: [
            state.cartItems.map((x) =>
              x.product === existItem.product ? product : x
            ),
          ],
        };
      } else return { ...state, cartItems: [...state.cartItems, item] };

    default:
      return state;
  }
};
