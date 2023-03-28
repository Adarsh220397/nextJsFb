import { createSlice , createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'

export const fetchUsers = createAsyncThunk('users/getAllUsers',async(thunkApi) => {
    const resp = await fetch('https://jsonplaceholder.typicode.com/users?_limit=5');
    const data = await resp.json();

    return data;
})

const initialState = {
    entities:[],
loading :false,
value:12

} as any

const userSlice = createSlice({
    name:'Adarsh',
    initialState,
    reducers:{
        increment:(state) => {
            state.value++;
        },
        decrement:(state) => {
            state.value--;
        },
        incrementByAmount(state, action: PayloadAction<number>) {
            state.value += action.payload
          },
    },
    extraReducers:(builder) => {
        builder.addCase(fetchUsers.fulfilled,(state,action) => {
            state.loading = false;
            state.entities.push(...action.payload)
        })

        builder.addCase(fetchUsers.pending,(state,action) => {
            state.loading = true;
        })
    }
})
export const {increment,decrement,incrementByAmount} = userSlice.actions;

export default userSlice.reducer;