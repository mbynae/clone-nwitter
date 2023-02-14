import React, { useEffect, useState } from 'react';
import { dbService } from 'fbase';
import { addDoc, collection, getDocs, onSnapshot, query, orderBy } from 'firebase/firestore';

const Home = ({ userObj }) => {
    const [inputs, setInputs] = useState('');
    const [nweets, setNweets] = useState([]);

    //구버전
    // const getNweets = async () => {
    //     const dbNweets = await getDocs(collection(dbService, 'nweets'));
    //     dbNweets.forEach((document) => {
    //         const nweetObject = {
    //             ...document.data(),
    //             id: document.id,
    //         };
    //         setNweets((prev) => [nweetObject, ...prev]);
    //     });
    // };

    useEffect(() => {
        //구버전
        // getNweets();

        //신버전
        const q = query(collection(dbService, 'nweets'), orderBy('createdAt', 'desc'));
        // onSnapshot은 파이어베이스의 데이터베이스 변화를 실시간으로 감지해주는 메서드
        onSnapshot(q, (snapshot) => {
            const nweetArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setNweets(nweetArray);
        });
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        await addDoc(collection(dbService, 'nweets'), {
            text: inputs,
            createdAt: Date.now(),
            creatorId: userObj.uid,
        });
        setInputs('');
    };

    const onChange = (e) => {
        const { value } = e.target;
        setInputs(value);
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" value={inputs} placeholder="작성해주세요" maxLength={120} onChange={onChange} />
                <input type="submit" value="트윗" style={{ cursor: 'pointer' }} />
            </form>
            <div>
                {nweets.map((nweet) => (
                    <div key={nweet.id}>
                        <p>{nweet.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
