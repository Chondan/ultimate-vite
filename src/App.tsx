import reactLogo from '@src/assets/react.svg';
import viteLogo from '/vite.svg';
import '@src/App.scss';
import { clsx } from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type RootState } from './redux/store';
import { useGetTodoQuery } from './redux/_example/example.api';
import { decrement, double, fetchText, fetchValue, increment } from './redux/_example/example.slice';

function App() {
    const value = useSelector((state: RootState) => state.example.value);
    const loading = useSelector((state: RootState) => state.example.loading);
    const text = useSelector((state: RootState) => state.example.text);
    const textLoading = useSelector((state: RootState) => state.example.textLoading);
    const dispatch = useDispatch<AppDispatch>();
    const { data: todo, isLoading: isTodoLoading } = useGetTodoQuery(1);

    return (
        <>
            <div className='flex justify-center'>
                <a href='https://vite.dev' target='_blank' rel='noreferrer'>
                    <img src={viteLogo} className='logo' alt='Vite logo' />
                </a>
                <a href='https://react.dev' target='_blank' rel='noreferrer'>
                    <img src={reactLogo} className='logo react' alt='React logo' />
                </a>
            </div>
            <h1 className={clsx('header', 'header-italic')}>{import.meta.env.VITE_APP_NAME} + React</h1>
            <h1 className='text-3xl font-bold underline'>Hello World!</h1>
            <div style={{ marginTop: 20 }}>
                <h3>Redux Example Value: {value}</h3>
                <button onClick={() => dispatch(increment())}>Increment</button>
                <button onClick={() => dispatch(double())} style={{ marginLeft: 8 }}>
                    Double
                </button>
                <button onClick={() => dispatch(decrement())} style={{ marginLeft: 8 }}>
                    Decrement
                </button>
                <button onClick={() => dispatch(fetchValue())} style={{ marginLeft: 8 }} disabled={loading}>
                    {loading ? 'Loading...' : 'Fetch Random Value'}
                </button>
            </div>
            <div style={{ marginTop: 20 }}>
                <h3>Redux Example Text: {text}</h3>
                <button onClick={() => dispatch(fetchText({ text: 'Hi' }))} disabled={textLoading}>
                    {textLoading ? 'Loading...' : 'Fetch Text'}
                </button>
            </div>
            {isTodoLoading ? <div>Loading todo...</div> : <div>{todo?.title}</div>}
        </>
    );
}

export default App;
