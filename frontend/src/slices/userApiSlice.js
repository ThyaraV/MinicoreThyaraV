import { USERS_URL } from "../constants.js";
import { apiSlice } from "./apiSlice.js";

export const usersApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getUsers:builder.query({
            query:()=>({
                url: USERS_URL
            }),
            providesTags:['User'],
            KeepUnusedDataFor:5
        }),
        getUserDetails:builder.query({
            query:(userId)=>({
                url:`${USERS_URL}/${userId}`,
            }),
            KeepUnusedDataFor:5,
        }),
    }),
});

export const {useGetUsersQuery,useGetUserDetailsQuery}=usersApiSlice;