import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import ProductTag from "../types/ProductTag";
import { safeJsonParse } from "../libs/utils/general";

// LS = LOCAL-STORAGE 
export const PRODUCT_TAGS_LS_KEY = "webscrapper-tags"

const initialState = {
    productTags: typeof window !== "undefined" ? safeJsonParse(localStorage.getItem(PRODUCT_TAGS_LS_KEY)) : [] as ProductTag[],
}

const userSlice = createSlice({
    name: "productTags",
    initialState,
    reducers: {
        changeProductTags: (state, action: PayloadAction<ProductTag[]>) => {
            if (localStorage && localStorage) {
                localStorage.setItem(PRODUCT_TAGS_LS_KEY, JSON.stringify(state.productTags))
            }
            state.productTags = action.payload
            return state
        }
    }
})

export const { changeProductTags } = userSlice.actions;
export default userSlice.reducer;