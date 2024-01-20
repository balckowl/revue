import { ReactNode, createContext } from "react";
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from "../libs/firebase";


// ユーザー情報の型定義、もしくはFirebaseライブラリからのインポート

const AuthContext = createContext({});

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user] = useAuthState(auth)

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }