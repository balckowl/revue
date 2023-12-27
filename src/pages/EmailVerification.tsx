import { auth } from "../libs/firebase"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth";

const EmailVerification = () => {

    const navigate = useNavigate();
    const [user] = useAuthState(auth)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            if (currentUser?.emailVerified) {
                navigate('/home');
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    console.log(user?.emailVerified)


    return (
        <div className="container">
            <div className="row justify-content-center mt-5 g-0">
                <div className="col-lg-9">
                    <div className="shadow">
                        <div className="row justify-content-center g-0 py-4">
                            <div className="col-lg-8">
                                <div>
                                    <h3>メールアドレス受信確認用のメールを送信しました。</h3>
                                    <p>{user?.email}へ受信確認用のメールを送信しました。</p>
                                    <p>メールをご確認いただき、メールに記載されたURLをクリックして、Revueへの登録を完了して下さい。</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmailVerification