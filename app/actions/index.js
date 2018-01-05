import * as types from './types';

export function getProdResp(addr, apt, zipcde) {
    return (dispatch) => {
        const jsonData = {'GUID': 'ee980a9b-dc86-4626-99a1-f3353af8142a', 'streetName': addr, 'city': 'SC', 'state': 'CO', 'zip': zipcde, 'line2': ''};
        const url = 'https://micro-dev003.east.aws.allconnect.com/MoversRestService/ws/movers/getMoversProducts?referrerId=33153&inputAddr=' + JSON.stringify(jsonData);
        fetch(url, {
            method: 'GET'
        }).then((res)=>{
            res.json().then((data) => {
                dispatch({type: types.FILTER, payload: data});
            });
        }).catch((data)=>{
            dispatch({type: types.FILTER, payload: data});
        });
    };
}
