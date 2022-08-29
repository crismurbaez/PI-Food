import {
    GET_RECIPES,
    RECIPE_RESET,
    RECIPES_RESET,
    CHANGE_PAGE,
    RECIPE_NAME,
    NAME_RESET,
    CURRENT_PAGE_RESET,
    RECIPE_ORDEN,
    RECIPE_ORDEN_SCORE,
    COPY_RECIPES,
    VIEW_404,
    GET_RECIPES_ID,
} from '../actions/index'


const initialState = {
    alldataMemory: [],
    recipes: [],
    recipe: [],
    name: '',
    resultName: [],
    orden: '',
    currentPage: 1,
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                alldataMemory: action.payload,
            }
        case RECIPE_RESET:
            return {
                ...state,
                recipe: [],
            }
        case RECIPES_RESET:
            return {
                ...state,
                recipes: [],
            }
        case CHANGE_PAGE:
            return {
                ...state,
                currentPage: action.payload,
            }
        case RECIPE_NAME:
            const filterNames = state.recipes.filter((e) => {
                return (e.name.toUpperCase().includes(action.payload.toUpperCase()))
            });
            const result = (filterNames.length) ? [filterNames, `Se encontraron ${filterNames.length} resultados para: ${action.payload}`, 'e'] : [state.recipes, `No se encontró ningún resultado para ${action.payload}`, 'f'];
            //guardo el name de búsqueda en name. En resultName[1] el éxito o fracaso, y en resultName[0] el array filtrado.
            return {
                ...state,
                name: action.payload,
                resultName: [result[1], result[2]],
                recipes: result[0],
            }
        case NAME_RESET:

            return {
                ...state,
                name: [],
                resultName: [],
            }
        case CURRENT_PAGE_RESET:
            return {
                ...state,
                currentPage: 1,
            }
        case RECIPE_ORDEN:
            let n = 0;
            const ordenV = (action.payload === 'a')
                ?
                (state.recipes.sort((a, b) => { return ((a.name > b.name) ? 1 : ((a.name < b.name) ? -1 : 0)) }))
                :
                (state.recipes.sort((a, b) => { return ((a.name < b.name) ? 1 : ((a.name > b.name) ? -1 : 0)) }))
            //es necesario realizar un cambio, para que me muestre la lista ordenada al renderizar la página, agrego una nueva propiedad idd 
            const ordenVCid = ordenV.map((e) => { return ({ ...e, idd: n++ }) })
            return {
                ...state,
                recipes: ordenVCid,
                orden: action.payload,
            }
        case RECIPE_ORDEN_SCORE:
            let c = 0;
            const ordenVR = (action.payload === 'p')
                ?
                (state.recipes.sort((a, b) => { return ((a.healthScore > b.healthScore) ? 1 : ((a.healthScore < b.healthScore) ? -1 : 0)) }))
                :
                (state.recipes.sort((a, b) => { return ((a.healthScore < b.healthScore) ? 1 : ((a.healthScore > b.healthScore) ? -1 : 0)) }))
            //es necesario realizar un cambio, para que me muestre la lista ordenada al renderizar la página, agrego una nueva propiedad idd 
            const ordenVRCid = ordenVR.map((e) => { return ({ ...e, idd: c++ }) })
            return {
                ...state,
                recipes: ordenVRCid,
                orden: action.payload,
            }
        case COPY_RECIPES:
            return {
                ...state,
                recipes: state.alldataMemory,
            }
        case VIEW_404:
            return {
                ...state,
                recipes: [{
                    id: 4000000004,
                    name: 'PAGE NOT FOUND',
                    image: action.payload,
                    diets: ['404'],
                    healthScore: 0,
                }],
                recipe: [{
                    id: 4000000004,
                    name: 'PAGE NOT FOUND',
                    image: action.payload,
                    diets: ['404'],
                    healthScore: 0,
                    // released: Date(),
                    // platform: [{ id: '404', name: 'PAGE NOT FOUND' }],
                    // description: [<div>'Page not found'</div>]
                }],
            }
        case GET_RECIPES_ID:
            return {
                ...state,
                recipe: [action.payload],
            }
        default:
            return state;
    }
}
export default rootReducer;