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
export const GET_DIETS = 'GET_DIETS';
export const FILTER_DIETS = 'FILTER_DIETS';
export const RESULT_DIET_RESET = 'RESULT_DIET_RESET';
export const POST_RECIPES = 'POST_RECIPES';


//instalé axios


export const getRecipes = () => {

    return (dispatch) => {
        axios.get('/recipes')
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



export const getDiets = () => {
    return (dispatch) => {
        axios.get('/diets')
            .then(dataApi => {
                return dispatch({
                    type: GET_DIETS,
                    payload: dataApi.data,
                })
            })
            .catch((error) => {
                console.log(error);
            })

    }
};

export const postRecipe = (payload) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(
                "/recipe",
                payload
            );
            return dispatch({
                type: POST_RECIPES,
                payload: response,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const filterDiets = (diet) => {

    return {
        type: FILTER_DIETS,
        payload: diet,
    }
};

export const getRecipesId = (id) => {

    return (dispatch) => {
        axios.get(`/recipes/${id}`)
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

export function nameRecipes(name) {
    //si hago el filtro en el back
    return (dispatch) => {
        axios.get(`/recipes?name=${name}`)
            .then(dataApi => {
                return dispatch({
                    type: RECIPE_NAME,
                    payload: dataApi.data,
                })
            })
            .catch((error) => {
                console.log(error);
            })

    }
    //si hago el filtro en el front 
    // return {
    //     type: RECIPE_NAME,
    //     payload: name,
    // }
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
export const resultDietReset = () => {

    return {
        type: RESULT_DIET_RESET,
    }

};

export const changePage = (page) => {

    return {
        type: CHANGE_PAGE,
        payload: page,
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

