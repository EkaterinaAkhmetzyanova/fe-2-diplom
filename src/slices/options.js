import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    fromCity: {_id: 0, value: ""},
    toCity: {_id: 0, value: ""},
    startDate: null,
    endDate: null,
    limit: 5,
    offset: 0,
    sort: "date",
    filters: {
        have_first_class: false,
        have_second_class: false,
        have_third_class: false,
        have_fourth_class: false,
        have_wifi: false,
        have_air_conditioning: false,
        have_express: false,
        price_from: 0,
        price_to: 7000,
        start_departure_hour_from: 0,
        start_departure_hour_to: 0,
        start_arrival_hour_from: 0,
        start_arrival_hour_to: 0,
        end_departure_hour_from: 0,
        end_departure_hour_to: 0,
        end_arrival_hour_from: 0,
        end_arrival_hour_to: 0,
    }
};

export const searchRoutesSlice = createSlice({
    name: 'options',
    initialState,
    reducers: {
        getFromCity: (state, action) => ( {
            ...state, fromCity: action.payload
        })
        ,
        getToCity: (state, action) => ({...state, toCity: action.payload}),
    }
});

export const { getFromCity, getToCity } = searchRoutesSlice.actions;
export default searchRoutesSlice.reducer;



// //changing url depending on the filters
//         // dates
//         if(startDate) {
//             url += `&date_start=${startDate}`;
//             if (start_departure_hour_from) {
//                 url += `&start_departure_hour_from=${start_departure_hour_from}`;
//             }
//             if (start_departure_hour_to) {
//                 url += `&start_departure_hour_to=${start_departure_hour_to}`;
//             }
//             if (start_arrival_hour_from) {
//                 url += `&start_arrival_hour_from=${start_arrival_hour_from}`;
//             }
//             if (start_arrival_hour_to) {
//                 url += `&start_arrival_hour_to=${start_arrival_hour_to}`;
//             }
//             if (endDate) {
//                 url += `&date_end=${startDate}`;
//                 if (end_departure_hour_from) {
//                     url += `&end_departure_hour_from=${end_departure_hour_from}`;
//                 }
//                 if (end_departure_hour_to) {
//                     url += `&end_departure_hour_to=${end_departure_hour_to}`;
//                 }
//                 if (end_arrival_hour_from) {
//                     url += `&end_arrival_hour_from=${end_arrival_hour_from}`;
//                 }
//                 if (start_arrival_hour_to) {
//                     url += `&end_arrival_hour_to=${end_arrival_hour_to}`;
//                 }
//             }
//         }

//         //view
//         if (offset) {
//             url += `&offset=${offset}`;
//         }
        
//         if(sort) {
//             url += `&sort=${sort}`;
//         }

//         //train filters
//         if (have_first_class) {
//             url += `&have_first_class=${have_first_class}`
//         }

//         if (have_second_class) {
//             url += `&have_second_class=${have_second_class}`
//         }

//         if (have_third_class) {
//             url += `&have_third_class=${have_third_class}`
//         }

//         if (have_fourth_class) {
//             url += `&have_fourth_class=${have_fourth_class}`
//         }

//         if (have_wifi) {
//             url += `&have_wifi=${have_wifi}`
//         }

//         if (have_air_conditioning) {
//             url += `&have_air_conditioning=${have_air_conditioning}`
//         }
        
//         if (have_express) {
//             url += `&have_express=${have_express}`
//         }
        
//         if (price_from) {
//             url += `&price_from=${price_from}`
//         }

//         if (price_to) {
//             url += `&price_from=${price_to}`
//         }

//         const response = await fetch(url);
//         if (!response.ok) {
//             throw new Error(response.statusText);
//         }
//         console.log(url);
//         return response.json();