import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: "idle",
    error: "",
    data: {
        totalCount: 0,
        items: [],
    },
};

export const fetchRoutes = createAsyncThunk(
    "routes/fetchRoutes",
    async (options) => {
        const {
            fromCity: {_id: fromCityId},
            toCity: {_id: toCityId},
            startDate,
            endDate,
            limit = 5,
            offset,
            sort = "date",
            filters: {
                have_first_class = false,
                have_second_class = false,
                have_third_class = false,
                have_fourth_class = false,
                have_wifi = false,
                have_air_conditioning = false,
                have_express = false,
                price_from,
                price_to,
                start_departure_hour_from = 0,
                start_departure_hour_to = 0,
                start_arrival_hour_from = 0,
                start_arrival_hour_to = 0,
                end_departure_hour_from = 0,
                end_departure_hour_to = 0,
                end_arrival_hour_from = 0,
                end_arrival_hour_to = 0,
            },
        } = options;

        console.log(options);

        // const departureTrainOpt = {
        //     fromCity: {_id: fromCityId},
        //     toCity: {_id: toCityId},
        //     startDate,
        //     limit: 5,
        //     offset,
        //     sort: "date",
        // };

        // const arrivalTrainOpt = {
        //     fromCity: {_id: fromCityId},
        //     toCity: {_id: toCityId},
        //     endDate,
        //     limit: 5,
        //     offset,
        //     sort: "date",
        // };

        let url = `${process.env.REACT_APP_SERVER_URL}routes?from_city_id=${fromCityId}&to_city_id=${toCityId}`;

        // let url = new URL(`${process.env.REACT_APP_SERVER_URL}routes`);
        // Object.entries(options).forEach((item) => url.searchParams.append(item[0], item[1]));
        // console.log(url);

        // let response;

        // response = await fetch(url);
        // if (!response.ok) {
        //     throw new Error(response.statusText);
        // }
        // console.log(response);
        // return response.json();

        //changing url depending on the filters
        // dates
        if(startDate) {
            url += `&date_start=${startDate}`;
            if (start_departure_hour_from) {
                url += `&start_departure_hour_from=${start_departure_hour_from}`;
            }
            if (start_departure_hour_to) {
                url += `&start_departure_hour_to=${start_departure_hour_to}`;
            }
            if (start_arrival_hour_from) {
                url += `&start_arrival_hour_from=${start_arrival_hour_from}`;
            }
            if (start_arrival_hour_to) {
                url += `&start_arrival_hour_to=${start_arrival_hour_to}`;
            }
            if (endDate) {
                url += `&date_end=${startDate}`;
                if (end_departure_hour_from) {
                    url += `&end_departure_hour_from=${end_departure_hour_from}`;
                }
                if (end_departure_hour_to) {
                    url += `&end_departure_hour_to=${end_departure_hour_to}`;
                }
                if (end_arrival_hour_from) {
                    url += `&end_arrival_hour_from=${end_arrival_hour_from}`;
                }
                if (start_arrival_hour_to) {
                    url += `&end_arrival_hour_to=${end_arrival_hour_to}`;
                }
            }
        }

        //view
        if (offset) {
            url += `&offset=${offset}`;
        }
        
        if(sort) {
            url += `&sort=${sort}`;
        }

        //train filters
        if (have_first_class) {
            url += `&have_first_class=${have_first_class}`
        }

        if (have_second_class) {
            url += `&have_second_class=${have_second_class}`
        }

        if (have_third_class) {
            url += `&have_third_class=${have_third_class}`
        }

        if (have_fourth_class) {
            url += `&have_fourth_class=${have_fourth_class}`
        }

        if (have_wifi) {
            url += `&have_wifi=${have_wifi}`
        }

        if (have_air_conditioning) {
            url += `&have_air_conditioning=${have_air_conditioning}`
        }
        
        if (have_express) {
            url += `&have_express=${have_express}`
        }
        
        if (price_from) {
            url += `&price_from=${price_from}`
        }

        if (price_to) {
            url += `&price_from=${price_to}`
        }

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        console.log(url);
        return response.json();
    }
);

const routesSlice = createSlice({
    name: "routes",
    initialState,
    reducers: {
        getRoutes: (state, action) => {
            state.data.items = action.payload;
            console.log(state.data.items);
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchRoutes.pending, (state) => {
            state.status = "pending";
          })
          .addCase(fetchRoutes.fulfilled, (state, action) => {
            state.status = "success";
            state.data.totalCount = action.payload.total_count;
            console.log('success');
          })
          .addCase(fetchRoutes.rejected, (state, action) => {
            state.status = "error";
            state.error = String(action.error.message);
          });
      },
});

export const { getRoutes } = routesSlice.actions;
export default routesSlice.reducer;