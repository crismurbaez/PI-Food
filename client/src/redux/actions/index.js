import axios from 'axios';
export const GET_RECIPES = 'GET_RECIPES';
export const RECIPE_RESET = 'RECIPE_RESET';
export const RECIPES_RESET = 'RECIPES_RESET';
export const CHANGE_PAGE = 'CHANGE_PAGE';
export const RECIPE_NAME = 'RECIPE_NAME';
export const NAME_RESET = 'NAME_RESET';
export const CURRENT_PAGE_RESET = 'CURRENT_PAGE_RESET';
export const RECIPE_ORDEN = 'RECIPE_ORDEN';
export const RECIPE_ORDEN_SCORE = 'RECIPE_ORDEN_SCORE';
export const COPY_RECIPES = 'COPY_RECIPES';
export const VIEW_404 = 'VIEW_404';
export const GET_RECIPES_ID = 'GET_RECIPES_ID';
//instalé axios


export const getRecipes = () => {

    return (dispatch) => {
        axios.get('http://localhost:3001/recipes')
            .then(dataApi => {
                return dispatch({
                    type: GET_RECIPES,
                    payload: dataApi.data,
                })
            })
            .catch((error) => {
                console.log(error);
            })

    }

};

export const recipeReset = () => {

    return {
        type: RECIPE_RESET,
    }

};

export const recipesReset = () => {

    return {
        type: RECIPES_RESET,
    }

};

export const changePage = (page) => {

    return {
        type: CHANGE_PAGE,
        payload: page,
    }

};

export function nameRecipes(name) {
    return {
        type: RECIPE_NAME,
        payload: name,
    }
};

export const nameReset = () => {

    return {
        type: NAME_RESET,
    }

};

export const currentPageReset = () => {
    return {
        type: CURRENT_PAGE_RESET,
    }
}

export function ordenRecipe(orden) {
    return {
        type: RECIPE_ORDEN,
        payload: orden,
    }
};
export function ordenRecipeScore(orden) {
    return {
        type: RECIPE_ORDEN_SCORE,
        payload: orden,
    }
};

export const copyRecipes = () => {

    return {
        type: COPY_RECIPES,
    }

};
export function view404(image404) {
    return {
        type: VIEW_404,
        payload: image404,
    }
};

export const getRecipesId = (id) => {

    return (dispatch) => {
        axios.get(`http://localhost:3001/recipes/${id}`)
            .then(dataApi => {
                return dispatch({
                    type: GET_RECIPES_ID,
                    payload: dataApi.data[0],
                })
            })
            .catch((error) => {
                console.log(error);
            })

    }

};