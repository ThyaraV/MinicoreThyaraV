import { GRADES_URL,PROGRESO_URL } from "../constants.js";
import { apiSlice } from "./apiSlice.js";
//lógica de interacción con APIs
export const gradesApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getGrades: builder.query({
            query: () =>({
                url: GRADES_URL,
            }),
            providesTags: ['Grade'],
            keepUnusedDataFor: 5
        }),
    }),
});

export const {useGetGradesQuery}=gradesApiSlice;