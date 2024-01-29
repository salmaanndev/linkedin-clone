import React, { useEffect, useState } from 'react'
import './Feed.css'
import CreateIcon from '@mui/icons-material/Create'
import InputOptions from './InputOptions'
import ImageIcon from '@mui/icons-material/Image'
import SubscriptionsIcon from '@mui/icons-material/Subscriptions'
import EventNoteIcon from '@mui/icons-material/EventNote'
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay'
import Post from './Post'
import { onSnapshot, Timestamp, addDoc, orderBy, query } from 'firebase/firestore'
import { db } from './Firebase'
import { collection } from 'firebase/firestore';
import { useSelector } from 'react-redux'
import { selectUser } from './features/userSlice'
import FlipMove from 'react-flip-move'
function Feed() {

    const user = useSelector(selectUser);

    const [input, setInput] = useState('');
    const [posts, setPosts] = useState([]);

    const myCollectionRef = collection(db, 'posts');
    const orderedQuery = query(myCollectionRef, orderBy('timestamp', 'desc'));

    useEffect(() => {
        const unsubscribe = onSnapshot(orderedQuery, (snapshot) => {
            setPosts(snapshot.docs.map((doc) => (
                {
                    id: doc.id,
                    data: doc.data(),
                }
            )))
        });

        // This will unsubscribe the snapshot listener when the component unmounts
        return () => unsubscribe();
    }, [orderedQuery]);

    const sendPost = (e) => {
        e.preventDefault(); // For preventing the page to load again while submitting the form
        addDoc(myCollectionRef,
            {
                name: user?.displayName || user.email[0],
                description: user.email,
                message: input,
                photoUrl: user.photoUrl || '',
                timestamp: Timestamp.fromDate(new Date()),
            }

        )

        setInput('');
    }

    return (
        <div className='feed'>
            <div className='feed_inputContainer'>
                <div className='feed_input'>
                    <CreateIcon />
                    <form onSubmit={sendPost}>
                        <input value={input} onChange={(e) => setInput(e.target.value)} type="text" />
                        <button type='submit'>Create</button>
                    </form>
                </div>
                <div className='feed_inputOptions'>
                    <InputOptions Icon={ImageIcon} title="Photo" color="#70B5F9" />
                    <InputOptions Icon={SubscriptionsIcon} title="Video" color="#E7A33E" />
                    <InputOptions Icon={EventNoteIcon} title="Event" color="#C0CBCD" />
                    <InputOptions Icon={CalendarViewDayIcon} title="Write Article" color="#7FC15E" />
                </div>
            </div>
            {/*Posts */}
            <FlipMove>
                {posts.map(({ id, data: { name, description, message, photoUrl } }) => {
                    return <Post key={id} name={name} message={message} description={description} photoUrl={photoUrl} />
                })}
            </FlipMove>

        </div>
    )
}

export default Feed
