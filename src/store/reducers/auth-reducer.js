import actionsEnum from "./../actions/action-types";


const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirect: '/'
};


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsEnum.SET_AUTH_REDIRECT_PATH:
            return {
                ...state,
                authRedirect: action.path
            };
        case actionsEnum.LOG_OUT:
            return {
                ...state,
                token: null,
                userId: null,
            };
        case actionsEnum.AUTH_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false
            };
        case actionsEnum.AUTH_START:
            return {
                ...state,
                error: null,
                loading: true
            };
        case actionsEnum.AUTH_SUCCESS:
            console.log(action);
            return {
                ...state,
                token: action.idToken,
                userId: action.localId,
                error: null,
                loading: false
            };
        default:
            return state;
    }
};


export default authReducer;
