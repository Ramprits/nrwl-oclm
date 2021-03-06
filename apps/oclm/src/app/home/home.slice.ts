import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import { User } from '@my-workspace/utils-interfaces';
export const HOME_FEATURE_KEY = 'home';

export interface HomeEntity {
  users: { [userId: string]: User };
}

export interface HomeState extends EntityState<HomeEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string;
  users: null;
}

export const homeAdapter = createEntityAdapter<HomeEntity>();

export const fetchHome = createAsyncThunk(
  'home/fetchStatus',
  async (_, thunkAPI) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = response.json();
    return users;
  }
);

export const initialHomeState: HomeState = homeAdapter.getInitialState({
  loadingStatus: 'not loaded',
  error: null,
  users: null,
});

export const homeSlice = createSlice({
  name: HOME_FEATURE_KEY,
  initialState: initialHomeState,
  reducers: {
    add: homeAdapter.addOne,
    remove: homeAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHome.pending, (state: HomeState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchHome.fulfilled,
        (state: HomeState, action: PayloadAction<HomeEntity[]>) => {
          homeAdapter.setAll(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(fetchHome.rejected, (state: HomeState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      });
  },
});

export const homeReducer = homeSlice.reducer;

export const homeActions = homeSlice.actions;

const { selectAll, selectEntities } = homeAdapter.getSelectors();

export const getHomeState = (rootState: unknown): HomeState =>
  rootState[HOME_FEATURE_KEY];

export const selectAllHome = createSelector(getHomeState, selectAll);

export const selectHomeEntities = createSelector(getHomeState, selectEntities);
