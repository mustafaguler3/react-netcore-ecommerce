import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../app/models/product";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";

const productsAdapter = createEntityAdapter<Product>();

export const fetchProductsAsync = createAsyncThunk<Product[]>(
    "catalog/fetchProductsAsync",
    async(_,thunkAPI)=>{
        try {
            return await agent.Catalog.list();
        }catch(err:any){
            return thunkAPI.rejectWithValue({error:err.data})
        }

    }
)

export const fetchFilters = createAsyncThunk(
  "catalog/fetchFilters",
  async(_,thunkAPI)=>{
    try {
        return agent.Catalog.fetchFilters();
    }catch(error:any){
        return thunkAPI.rejectWithValue({error:error.data})
    }
}
)

export const fetchProductAsync = createAsyncThunk<Product,number>(
    "catalog/fetchProductAsync",
    async(productId,thunkAPI)=>{
        try {
            return await agent.Catalog.details(productId)
        }catch(error:any){
            return thunkAPI.rejectWithValue({error: error.data})
        }

    }
)

export const catalogSlice = createSlice({
    name:"catalog",
    initialState: productsAdapter.getInitialState({
        productsLoaded:false,
        filtersLoaded:false,
        status:"idle",
        brands:[],
        types:[]
    }),
    reducers: {},
    extraReducers: (builder => {
        builder.addCase(fetchProductsAsync.pending,(state) => {
            state.status = "pendingFetchProducts"
        });
        builder.addCase(fetchProductsAsync.fulfilled,(state,action) => {
            productsAdapter.setAll(state, action.payload);
            state.status = "idle";
            state.productsLoaded = true;
        });
        builder.addCase(fetchProductsAsync.rejected,(state,action) => {
            state.status = "idle";
        });
        builder.addCase(fetchProductAsync.pending,(state) => {
            state.status = "pendingFetchProduct"
        });
        builder.addCase(fetchProductAsync.fulfilled,(state,action) => {
            productsAdapter.upsertOne(state,action.payload);
            state.status="idle"
        });
        builder.addCase(fetchProductAsync.rejected,(state,action) => {
            state.status = "idle"
        });
        builder.addCase(fetchFilters.pending,(state) => {
            state.status = "pendingFetchFilters"
        });
        builder.addCase(fetchFilters.fulfilled,(state,action) => {
            state.status = "idle"
            state.brands = action.payload.brands;
            state.types = action.payload.types;
            state.filtersLoaded = true;
        });
        builder.addCase(fetchFilters.rejected,(state,action) => {
            state.status = "idle";
            console.log(action.payload)
        });
    })
});


export const productSelectors = productsAdapter.getSelectors((state:RootState) => state.catalog);