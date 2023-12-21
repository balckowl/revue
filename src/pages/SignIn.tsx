import { signInWithPopup } from "firebase/auth";
import { auth } from "../libs/firebase";
import { Link, useNavigate } from "react-router-dom";
import { GoogleAuthProvider } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth/cordova";


const SignIn = () => {

    const navigate = useNavigate();

    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const signInWithGoogle = () => {
        signInWithPopup(auth, googleProvider).then(() => {
            navigate("/home", { replace: true })
        }).catch((err) => {

        })
    }

    const signInWithGithub = () => {
        signInWithPopup(auth, githubProvider).then(() => {
            navigate("/home", { replace: true })
        }).catch((err) => {

        })
    }

    return (
        <div className="signin-page d-flex align-items-center justify-content-center flex-column">
            <h2 className="signin-title">sign In</h2>
            <div className="signup-img-box">
                <img src="/images/signup-image.svg" alt="" />
            </div>
            <div className="signin-box">
                <div className="d-flex align-items-center gap-2 google-signin-box" onClick={signInWithGoogle}>
                    <div>
                        <img src="/images/google-icon.svg" alt="" className="google-icon" />
                    </div>
                    <p>Sing In With Google</p>
                </div>
                <div className="d-flex align-items-center gap-2 github-signin-box" onClick={signInWithGithub}>
                    <div>
                        <img src="/images/github-icon.svg" alt="" className="github-icon" />
                    </div>
                    <p>Sign In With Github</p>
                </div>
            </div>
            <div className="email-signin-box">
                <Link to="/signin/email">Sign in with email →</Link>
            </div>
        </div>
    )
}

export default SignIn