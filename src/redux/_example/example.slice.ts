import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

interface ExampleState {
    value: number;
    loading: boolean;
    text: string;
    textLoading: boolean;
}

const initialState: ExampleState = {
    value: 0,
    loading: false,
    text: '',
    textLoading: false,
};

const exampleSlice = createSlice({
    name: 'example',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        setValue: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchValue.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchValue.fulfilled, (state, action) => {
                state.value = action.payload;
                state.loading = false;
            })
            .addCase(fetchValue.rejected, (state) => {
                state.loading = false;
            })
            .addCase(fetchText.pending, (state) => {
                state.textLoading = true;
            })
            .addCase(fetchText.fulfilled, (state, action) => {
                state.text = action.payload;
                state.textLoading = false;
            })
            .addCase(fetchText.rejected, (state) => {
                state.textLoading = false;
            })
            .addCase(exampleSlice2.actions.double, (state) => {
                state.value *= 2;
            });
    },
});

export const fetchValue = createAsyncThunk<number>('example/fetchValue', async () => {
    // Simulate async API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return Math.floor(Math.random() * 100);
});

export const fetchText = createAsyncThunk<string, { text: string }>('example/fetchText', async (payload) => {
    // Simulate async API call
    await new Promise((resolve) => setTimeout(resolve, 1200));
    return `${payload.text} from async thunk!`;
});

const exampleSlice2 = createSlice({
    name: 'example2',
    initialState: { value: 0 },
    reducers: {
        double: () => {},
    },
});

export const { increment, decrement, setValue } = exampleSlice.actions;
export const { double } = exampleSlice2.actions;
export default exampleSlice.reducer;
