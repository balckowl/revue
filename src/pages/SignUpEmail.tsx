import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { auth } from "../libs/firebase";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import PasswordMeter from "../components/PasswordMeter";
type Schema = z.infer<typeof schema>

const schema = z.object({
    name: z.string().max(8, '名前は8文字以下にして下さい。'),
    email: z.string().email('正しいメールアドレスを入力して下さい。'),
    password: z.string().min(6, 'パスワードは6文字以上にして下さい。'),
    confirmPassword: z.string(),
}).refine(data => data.password == data.confirmPassword, {
    message: "パスワードが一致していません。",
    path: ["confirmPassword"],
})

const SignUpEmail = () => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
        mode: "onChange",
        resolver: zodResolver(schema)
    })

    const navigate = useNavigate()
    const password = watch('password')

    // const handleSignUp = (e: FormEvent) => {
    //     e.preventDefault();

    //     const email = emailRef.current?.value;
    //     const password = passwordRef.current?.value;

    //     if (email && password) {
    //         createUserWithEmailAndPassword(auth, email, password)
    //             .then((userCredential) => {
    //                 const user = userCredential.user;

    //                 sendEmailVerification(user)
    //                     .then(() => {
    //                         // メール認証のリンクを送信
    //                         navigate('/signup/email/verify')
    //                         console.log("Verification email sent.");
    //                     })
    //                     .catch((error) => {
    //                         // エラー処理
    //                         console.error("Error sending verification email: ", error);
    //                     });
    //             })
    //             .catch((err) => {
    //                 console.log(err)
    //             });
    //     }
    // }

    const onSubmit: SubmitHandler<Schema> = async(data) => {

        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                const user = userCredential.user;

                updateProfile(user, {
                    displayName: data.name,
                    photoURL: 'https://firebasestorage.googleapis.com/v0/b/revue-f8bbd.appspot.com/o/images%2Fdefault.png?alt=media&token=da485990-5e62-4105-9904-494e9d41208c',
                })

                sendEmailVerification(user)
                    .then(() => {
                        // メール認証のリンクを送信
                        navigate('/signup/email/verify')
                        console.log("Verification email sent.");
                    })
                    .catch((error) => {
                        // エラー処理
                        console.error("Error sending verification email: ", error);
                    });
            })
            .catch((err) => {
                console.log(err)
            });
    }

    return (
        <div className="signup-page d-flex align-items-center justify-content-center flex-column">
            <h2 className="signin-title">sign up</h2>
            <div className="signup-img-box">
                <img src="/images/signup-image.svg" alt="" />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-name-box">
                    <input type="text" placeholder="name" {...register('name')} />
                    <p className="error-name-message">{errors.name?.message}</p>
                </div>
                <div className="input-email-box">
                    <input type="email" placeholder="email" {...register('email')} />
                    <p className="error-email-message">{errors.email?.message}</p>
                </div>
                <div className="input-password-box">
                    <input type="password" placeholder="passward" {...register('password')} />
                    <p className="error-password-message">{errors.password?.message}</p>
                    {password ? <PasswordMeter password={password} /> : <></>}
                </div>
                <div className="input-conform-password-box">
                    <input type="password" placeholder="conform_password" {...register("confirmPassword")} />
                    <p className="error-confirm-password-message">{errors.confirmPassword?.message}</p>
                </div>
                <button className="signin-submit" type="submit">送信</button>
            </form>
        </div>
    )
}

export default SignUpEmail