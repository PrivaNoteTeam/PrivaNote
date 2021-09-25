import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './styles.css';

function App() {
    return (
        <div className='text-red-500'>Hello, world!</div>
    );
}

ReactDOM.render(<App />, document.getElementById('app'));