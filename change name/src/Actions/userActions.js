import $ from 'jquery';

//turned to constant since it will be used in the reducer
//'users: ___' scopes our action type, avoids collisions with actions in other components
export const UPDATE_USER = 'users:updateUser';
export const SHOW_ERROR = 'users:showError';

export function updateUser(newUser) {
    return {
        type: UPDATE_USER,
        payload: {
            user: newUser
        }
    }

}

export function showError(){
    return {
        type: SHOW_ERROR,
        payload: {
            user:'ERRORR'
        }
    }
}

export function apiRequest() {
    return dispatch => {
        $.ajax({
            url: 'http://google.com',
            success(){
                console.log('SUCCESS');
            },
            error(){
                console.log('ERROR');
                dispatch(showError());
            }
        })
    }
}