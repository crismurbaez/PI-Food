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
    GET_DIETS,
    FILTER_DIETS,
    RESULT_DIET_RESET,
} from '../actions/index'
import image404 from '../../images/404.png'

const initialState = {
    alldataMemory: [],
    recipes: [],
    recipe: [],
    diets: [],
    name: '',
    resultName: [],
    resultDiets: [],
    orden: '',
    currentPage: 1,
    recipes404: [
        {
            id: 4000000004,
            name: 'PAGE NOT FOUND',
            image: image404,
            diets: ['404'],
            healthScore: 0,
        }
    ],
    recipe404: [{
        id: 4000000004,
        name: 'PAGE NOT FOUND',
        image: image404,
        diets: ['404'],
        healthScore: 0,
        stepByStep: [],
        summary: '---------------------------------------------------PAGE NOT FOUND--------------------------------------------------------------'
        // released: Date(),
        // platform: [{ id: '404', name: 'PAGE NOT FOUND' }],
        // description: [<div>'Page not found'</div>]
    }

    ],
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RECIPES:
            return {
                ...state,
                recipes: action.payload[0],
                alldataMemory: action.payload[0],

            }

        case GET_DIETS:

            return {
                ...state,
                diets: action.payload,
            }


        case FILTER_DIETS:
            let diet = action.payload;
            let filterDiets = state.recipes.filter((e) => {
                return (e.diets.includes(diet))
            })
            console.log('filterDiets', filterDiets)
            filterDiets = (filterDiets.length) ? [filterDiets, []] : [state.recipes404, state.recipe404]
            return {
                ...state,
                recipes: filterDiets[0],
                recipe: filterDiets[1],
                resultDiets: [...state.resultDiets, diet],
            }
        case RESULT_DIET_RESET:
            return {
                ...state,
                resultDiets: [],
            }

        case RECIPE_NAME:
            //filtro que funciona haciendo el pedido al back
            //en payload puedo traer un array con los resultados que obtenía acá en el front
            //En payload me trae los datos con esta estructura:
            //guardo el name de búsqueda en name. 
            //en resultName[0] guardo el texto que muestra el front del resultado de la búsqueda
            // en resultName[1] guardo el éxito (e) o fracaso (f) de la búsqueda
            // en recipes guardo el array filtrado por name
            return {
                ...state,
                recipes: action.payload[0].recipes,
                name: action.payload[0].name,
                resultName: action.payload[0].resultName,
            }




        //filtro que funciona en el front sin hacer el pedido al back
        // const filterNames = state.recipes.filter((e) => {
        //     return (e.name.toUpperCase().includes(action.payload.toUpperCase()))
        // });
        // const result = (filterNames.length) ? [filterNames, `${filterNames.length} result by: ${action.payload}`, 'e'] : [state.recipes, `No results found for ${action.payload}`, 'f'];
        // //guardo el name de búsqueda en name. En resultName[1] el éxito o fracaso, y en resultName[0] el array filtrado.
        // return {
        //     ...state,
        //     name: action.payload,
        //     resultName: [result[1], result[2]],
        //     recipes: result[0],
        // }
        case NAME_RESET:

            return {
                ...state,
                name: [],
                resultName: [],
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
                recipes: state.recipes404,
                recipe: state.recipe404,
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