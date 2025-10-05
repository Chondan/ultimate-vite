
# Redux Usage Guide

## 1. How to Create a Slice

- Create your slice file inside the `/slices` folder (e.g., `src/redux/slices/counterSlice.ts`).
- Example:

```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
	value: number;
}

const initialState: CounterState = { value: 0 };

const counterSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		increment: (state) => { state.value += 1; },
		decrement: (state) => { state.value -= 1; },
		setValue: (state, action: PayloadAction<number>) => { state.value = action.payload; },
	},
});

export const { increment, decrement, setValue } = counterSlice.actions;
export default counterSlice.reducer;
```

## 2. How to Create an API (RTK Query)

- Create your API file inside the `/api` folder (e.g., `src/redux/api/todoApi.ts`).
- Example:

```typescript
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const todoApi = createApi({
	reducerPath: 'todoApi',
	baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
	endpoints: (builder) => ({
		getTodo: builder.query<any, number>({
			query: (id) => `/todos/${id}`,
		}),
	}),
});

export const { useGetTodoQuery } = todoApi;
```

## 3. How to Connect to the Store

- Import your slice reducer and API into the store (e.g., `src/redux/store/index.ts`).
- Example:

```typescript
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../slices/counterSlice';
import { todoApi } from '../api/todoApi';

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		[todoApi.reducerPath]: todoApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(todoApi.middleware),
});
```

---


---

## Official Redux Documentation

- [Configure Store](https://redux-toolkit.js.org/api/configureStore)
- [Create a Slice](https://redux-toolkit.js.org/api/createSlice)
- [Create an API (RTK Query)](https://redux-toolkit.js.org/rtk-query/api/createApi)
- [Create an Async Thunk](https://redux-toolkit.js.org/api/createAsyncThunk)

**Best Practice:**
- Always create slice files inside the `/slices` folder.
- Always create API files inside the `/api` folder.
