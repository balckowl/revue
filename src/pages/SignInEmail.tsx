import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../libs/firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import toast, { Toaster } from "react-hot-toast";
import PasswordMeter from "../components/PasswordMeter";
type Schema = z.infer<typeof schema>

const schema = z.object({
  email: z.string().email('正しいメールアドレスを入力して下さい。'),
  password: z.string().min(6, 'パスワードは6文字以上にして下さい。'),
})
const SignIn = () => {

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { email: '', password: ''},
    mode: "onChange",
    resolver: zodResolver(schema)
  })

  const password = watch('password')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const navigate = useNavigate();

  // const handleSignIn = (e: FormEvent) => {
  //   e.preventDefault();

  //   const email = emailRef.current?.value;
  //   const password = passwordRef.current?.value;

  //   if (email && password) {
  //     signInWithEmailAndPassword(auth, email, password)
  //       .then(() => {
  //         // Signed in 
  //         navigate("/home", { replace: true });
  //       })
  //       .catch((err) => {
  //         console.log(err)
  //       });
  //   }
  // }

  const onSubmit: SubmitHandler<Schema> = async (data) => {

    setIsLoading(true)
    const loadingToast = toast.loading('ログイン中・・');

    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        navigate("/home", { replace: true });
        toast.dismiss(loadingToast);
      })
      .catch((err) => {
        console.log(err)
        toast.dismiss(loadingToast);
        toast.error('登録に失敗しました。')
      }).finally(() => {
        setIsLoading(false)
        reset()
      });

  }

  return (
    <div className="signin-page d-flex align-items-center justify-content-center flex-column">
      <h2 className="siginin-title">Log In</h2>
      <div className="signup-img-box">
        <img src="/images/signup-image.svg" alt="" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Toaster />
        <div className="input-email-box">
          <input type="email" placeholder="email" {...register("email", { required: true })} />
          <p className="error-email-message">{errors.email?.message}</p>
        </div>
        <div className="input-password-box">
          <input type="password" placeholder="passward" {...register("password", { required: true })} />
          <p className="error-password-message">{errors.password?.message}</p>
          {password ? <PasswordMeter password={password} /> : <></>}
        </div>
        <button className="signin-submit" disabled={isLoading}>送信</button>
      </form>
    </div>
  )
}

export default SignIn