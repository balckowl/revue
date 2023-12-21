import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../libs/firebase";
import { FormEvent, useRef } from "react";

const SignUpEmail = () => {

    const emailRef = useRef<HTMLInputElement | null>(null)
    const passwordRef = useRef<HTMLInputElement | null>(null)

    const handleSignUp = (e: FormEvent) => {
        e.preventDefault();

        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        if (email && password) {
            createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    
                })
                .catch((err) => {
                    console.log(err)
                });
        }
    }

    return (
        <div className="signup-page d-flex align-items-center justify-content-center flex-column">
            <h2 className="signin-title">sign up</h2>
            <div className="signup-img-box">
                <img src="/images/signup-image.svg" alt="" />
            </div>
            <form onClick={handleSignUp}>
                <div className="input-email-box">
                    <input type="text" ref={emailRef} placeholder="email" />
                </div>
                <div className="input-password-box">
                    <input type="text" ref={passwordRef} placeholder="passward" />
                </div>
                <button className="signin-submit" type="submit">送信</button>
            </form>
        </div>
    )
}

export default SignUpEmail