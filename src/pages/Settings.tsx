import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, storage } from "../libs/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast"
// import { CardElement, Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
// import { loadStripe } from "@stripe/stripe-js";

const Settings = () => {

    const [file, setFile] = useState<File | null>(null)
    const [userName, setUserName] = useState<string>("");
    const [previewUrl, setPreviewUrl] = useState('');
    const [isUploading, setIsUpLoading] = useState<boolean>(false)
    const [judge, setJudge] = useState<number>(0)
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        setUserName(user?.displayName || "")
        setPreviewUrl(user?.photoURL || "")
    }, [user]);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        // ユーザーがファイルを選択したかを確認
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];

            // ファイルから画像のURLを生成
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);

            // URLをクリーンアップ
            return () => URL.revokeObjectURL(url);
        }
    };

    const handleImagePreviewClick = () => {
        fileInputRef.current?.click();
    };

    const handleSubmitAvater = (e: FormEvent) => {
        e.preventDefault()

        if (file) {
            setIsUpLoading(true);
            const storageRef = ref(storage, `images/${file?.name}`);
            const loadingToast = toast.loading('アップロード中...');

            uploadBytes(storageRef, file).then(() => {
                console.log('Uploaded a blob or file!');
            }).then(() => {
                getDownloadURL(ref(storage, `images/${file?.name}`)).then((url) => {
                    if (user) {
                        updateProfile(user, {
                            photoURL: url,
                        }).then(() => {
                            toast.dismiss(loadingToast); // ローディングトーストを削除
                            toast.success('アップロード完了！');
                            return new Promise(resolve => setTimeout(resolve, 1000));
                        }).then(() => {
                            navigate("/home", { replace: true })
                        }).catch((error) => {
                            console.log('Error updating user:', error);
                        }).finally(() => {
                            setIsUpLoading(false); // アップロードが終了（成功または失敗）した時に状態を更新
                        });
                    }
                })
            });
        } else {
            toast.error('画像が変更されていません。')
        }
    }

    const handleSubmitDisplayName = (e: FormEvent) => {
        e.preventDefault()

        if (user && userName != user?.displayName) {
            setIsUpLoading(true);
            const loadingToast = toast.loading('名前を更新中...');

            updateProfile(user, {
                displayName: userName
            }).then(() => {
                toast.dismiss(loadingToast); // ローディングトーストを削除
                toast.success('アップロード完了！');
                return new Promise(resolve => setTimeout(resolve, 1000));
            }).then(() => {
                navigate("/home", { replace: true })
            }).catch((error) => {
                console.log('Error updating user:', error);
            }).finally(() => {
                setIsUpLoading(false);
            });

        } else {
            toast.error('名前が変更されていません。')
        }
    }

    // const handleCharge = async (e: FormEvent) => {

    //     const stripe = useStripe()
    //     const elements = useElements()

    //     e.preventDefault()
    //     // Stripe.jsの読み込みを待つ
    //     if (!stripe || !elements) return

    //     // カード情報の要素を取得
    //     const cardElement = elements.getElement(CardElement)
    //     if (!cardElement) return

    //     // カード情報をToken化
    //     const { error, token } = await stripe.createToken(cardElement, { name: userName })
    //     if (error) {
    //         window.alert(error.message)
    //         return
    //     }

    //     // Token化したカード情報を使って、決済を処理
    //     await fetch('/api/charge', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             token: token.id,
    //             amount: 500,
    //             currency: 'jpy',
    //         })
    //     }).then(data => data.json())
    //         .then((result) => {
    //             window.alert(`注文完了 (order_id: ${result.order_id})`)
    //         })
    // }

    return (
        <div className="container">
            <div className="row justify-content-center g-0">
                <div className="col-11">
                    <div className="shadow setting-page">
                        <div className="row justify-content-center">
                            <div className="col-11 py-4">
                                <h3 className="setting-title"><FontAwesomeIcon icon={faGear} className="pe-2" />Settings</h3>
                                <div className="row g-0">
                                    <div className="col-lg-3">
                                        <div>
                                            <ul className="setting-list">
                                                <li onClick={() => setJudge(0)} className={`${judge == 0 && 'is-setting-active'}`}>General</li>
                                                <li onClick={() => setJudge(1)} className={`${judge == 1 && 'is-setting-active'}`}>Billing</li>
                                                <li>Theme</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-lg-9">
                                        <div>
                                            {judge == 0 &&
                                                <div>
                                                    <Toaster />
                                                    <div className="border rounded mb-2">
                                                        <form onSubmit={handleSubmitAvater}>
                                                            <div className="d-flex align-items-center justify-content-between general-avatar-box">
                                                                <div>
                                                                    <h3>Avater</h3>
                                                                    <p>
                                                                        This is your avatar.<br />
                                                                        Click on the avatar to upload a custom one from your files.
                                                                    </p>
                                                                    <button disabled={isUploading}>Save</button>
                                                                </div>
                                                                <div className="input-files-box">
                                                                    <input
                                                                        type="file"
                                                                        ref={fileInputRef}
                                                                        onChange={(e) => { handleImageChange(e); setFile(e.target.files![0]) }}
                                                                        className="d-none"
                                                                    />
                                                                </div>
                                                                <motion.div className="user-img-preview-box" onClick={handleImagePreviewClick} whileTap={{ scale: 1.3 }}>
                                                                    {previewUrl && <img src={previewUrl} alt="Preview" />}
                                                                </motion.div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <div className="border rounded mb-2">
                                                        <form onSubmit={handleSubmitDisplayName}>
                                                            <div className="general-displayname-box">
                                                                <div>
                                                                    <h3>Display Name</h3>
                                                                    <p>Please enter your full name, or a display name you are comfortable with.</p>
                                                                </div>
                                                                <div className="input-username-box">
                                                                    <input type="text" onChange={(e) => setUserName(e.target.value)} value={userName} />
                                                                </div>
                                                                <button>save</button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            }
                                            {judge == 1 &&
                                                <div>
                                                    {/* <div>
                                                        <Elements stripe={stripePromise}>
                                                            <form onSubmit={handleCharge}>
                                                                <div>
                                                                    <h3>名前</h3>
                                                                    <input type="text" value={userName} />
                                                                </div>
                                                                <div>
                                                                    <h3>カード番号</h3>
                                                                    <CardElement />
                                                                </div>
                                                                <button type="submit">注文する</button>
                                                            </form>
                                                        </Elements>
                                                    </div> */}
                                                </div>
                                            }
                                        </div>
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

export default Settings