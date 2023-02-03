import React, { useState } from 'react';

const Home = () => {
    const [inputs, setInputs] = useState('');

    const onSubmit = e => {
        e.preventDefault();
    };

    const onChange = e => {
        const { value } = e.target;
        setInputs(value);
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" value={inputs} placeholder="작성해주세요" maxLength={120} onChange={onChange} />
                <input type="submit" value="트윗" />
            </form>
        </div>
    );
};

export default Home;
