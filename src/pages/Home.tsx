import { auth, db } from "../libs/firebase";
import { useAuthState } from "react-firebase-hooks/auth"
import { FormEvent, useEffect, useRef, useState } from "react";
import { addDoc, collection, limit, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { marked } from "marked";
import { Link } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Prism from "prismjs";
import "prism-themes/themes/prism-one-light.min.css"
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion"

const Home = () => {
    // const emailRef = useRef<HTMLInputElement | null>(null)
    const [messages, setMessages] = useState<any>(null);
    const screenRef = useRef<HTMLDivElement>(null);
    const messageRef = useRef<HTMLTextAreaElement>(null);
    const [active, setActive] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [user] = useAuthState(auth);
    const { displayName, photoURL } = user || {};

    marked.setOptions({
        gfm: true,
        breaks: true,
    });

    const genAI = new GoogleGenerativeAI(import.meta.env.GEMINI_API_KEY);

    const generate = async (prompt: any) => {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        setIsLoading(true)
        const result = await model.generateContent(prompt)
        const response = result.response
        const text = response.text()
        setIsLoading(false)
        return text
    }

    // const handlepasswordRestEmail = (e: FormEvent) => {
    //     e.preventDefault()

    //     const email = emailRef.current?.value;

    //     if (email) {
    //         sendPasswordResetEmail(auth, email)
    //             .then((resp) => {
    //                 // メール送信成功
    //             })
    //             .catch((error) => {
    //                 // メール送信失敗
    //                 console.log(error)
    //             })
    //     }
    // }

    const scrollToBottom = () => {
        if (screenRef.current) {
            const chatBox = screenRef.current;
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    }

    useEffect(() => {
        Prism.highlightAll();
    }, [messages]);

    useEffect(() => {
        scrollToBottom();
    }, [messages])


    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db, "messages"), orderBy("createdAt"), limit(10)), (snapshot) => {
            const messageList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setMessages(messageList);
        });

        return () => unsubscribe();

    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if (messageRef.current?.value !== undefined && messageRef.current?.value.trim().length > 0) {
            addDoc(collection(db, "messages"), {
                text: messageRef.current?.value,
                photoURL,
                displayName,
                createdAt: serverTimestamp(),
            });

            if (active) {
                addDoc(collection(db, "messages"), {
                    text: await generate(messageRef.current?.value),
                    photoURL,
                    displayName: "Gemini AI",
                    createdAt: serverTimestamp(),
                });
            }

            messageRef.current.value = "";
            messageRef.current.style.height = '30px'
        }
    }

    const adjustTextareaHeight = () => {
        if (messageRef.current) {
            const { scrollHeight } = messageRef.current;
            messageRef.current.style.height = 'auto';
            messageRef.current.style.height = `${scrollHeight}px`;
        }
    };

    return (
        <div className="container">
            {/* <h2>passward Reset</h2>
            <form onSubmit={handlepasswordRestEmail}>
                <div>
                    <input type="text" ref={emailRef} placeholder="email" />
                </div>
                <button>送信</button>
            </form> */}
            <div className="row g-3">
                <div className="col-lg-8">
                    <div className="shadow">
                        <div className="row d-flex justify-content-center g-0">
                            <div className="col-11 py-4">
                                <div className="screen mb-4" ref={screenRef}>
                                    {messages && messages.map((message: any, index: number) => (
                                        <div className="py-3 post" key={index}>
                                            <div className="d-flex align-items-center gap-2 mb-3">
                                                <div className="post-user-img-box">
                                                    {message.displayName != "Gemini AI" ? (<img src={message.photoURL || ''} alt="" />) : (<img src={'images/google-bard-icon.png'} alt="" />)}
                                                </div>
                                                <p>{message.displayName}</p>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-end">
                                                <div dangerouslySetInnerHTML={{ __html: marked.parse(message.text) }} className='post-text-box line-numbers language-javascript' />
                                                <div className="createdat-box"><time>{message.createdAt && message.createdAt.toDate() && message.createdAt.toDate().toLocaleString()}</time></div>
                                            </div>
                                        </div>
                                    ))}
                                    {isLoading && <p>生成中...</p>}
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="row g-0  message-area">
                                        <div className="col-11">
                                            <div className="textarea-box">
                                                <textarea className="w-100" ref={messageRef} onChange={adjustTextareaHeight} style={{ resize: 'none', overflowY: 'hidden' }} placeholder="write a message in this field..." />
                                            </div>
                                        </div>
                                        <div className="col-1">
                                            <div className="text-center send-message-btn-box">
                                                <button type="submit"><FontAwesomeIcon icon={faPaperPlane} className="paper" /></button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="shadow">
                        <div className="row justify-content-center g-0">
                            <div className="col-11 py-4">
                                <div className="d-flex align-items-center gap-3">
                                    <motion.div className={`ai-toggle-btn ${active && 'active'}`} onClick={() => setActive(!active)} whileTap={{ scale: 1.1 }}>Ask ai👂</motion.div>
                                    <div className="setting-btn-box">
                                        <Link to="/settings"><FontAwesomeIcon icon={faGear} className="pe-1" />settings</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home