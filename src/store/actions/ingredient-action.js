import actionsEnum from "./action-types";
import axiosInstance from "../../axios-orders";


export const addIngredient = (ingredientName) => {
    return {
        type: actionsEnum.ADD_INGREDIENT,
        ingredientName,
    }
};

export const removeIngredient = (ingredientName) => {
    return {
        type: actionsEnum.REMOVE_INGREDIENT,
        ingredientName,
    }
};

export const setIngredient = (ingredients) => {
    return {
        type: actionsEnum.SET_INGREDIENTS,
        ingredients
    }
};

export const setError = () => {
    return {
        type: actionsEnum.SET_ERROR,
    }
};

export const initIngredient = () => {
    return dispatch => {
        axiosInstance.get("/ingredients.json", {
            headers: {
                "key": "Access-Control-Allow-Origin",
                "value": "*"
            }
        })
            .then((response) => {
                dispatch(setIngredient(response.data))
            }).catch(() =>{  dispatch(setError())});
    };
};

