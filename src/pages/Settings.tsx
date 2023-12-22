import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, storage } from "../libs/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const Settings = () => {

    const [file, setFile] = useState<File | null>(null)
    const [userName, setUserName] = useState<string>("");
    const [previewUrl, setPreviewUrl] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null); 
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        setUserName(user?.displayName as string)
        setPreviewUrl(user?.photoURL as string)
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

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        if (file && userName) {
            const storageRef = ref(storage, `images/${file?.name}`);

            uploadBytes(storageRef, file).then(() => {
                console.log('Uploaded a blob or file!');
            }).then(() => {
                getDownloadURL(ref(storage, `images/${file?.name}`)).then((url) => {
                    if (user) {
                        updateProfile(user, {
                            displayName: userName,
                            photoURL: url,
                        }).then(() => {
                            // See the UserRecord reference doc for the contents of userRecord.
                            console.log('Successfully updated user');
                            navigate("/home", { replace: true })
                        }).catch((error) => {
                            console.log('Error updating user:', error);
                        });
                    }
                })
            });
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center g-0">
                <div className="col-11">
                    <div className="shadow">
                        <div className="row justify-content-center">
                            <div className="col-11 py-4">
                                <h3 className="setting-title"><FontAwesomeIcon icon={faGear} className="pe-2" />Settings</h3>
                                <form onSubmit={handleSubmit}>
                                    <div className="input-username-box">
                                        <input type="text" onChange={(e) => setUserName(e.target.value)} value={userName} />
                                    </div>
                                    <div className="input-files-box">
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleImageChange}
                                            className="d-none"
                                        />
                                    </div>
                                    <motion.div className="user-img-preview-box" onClick={handleImagePreviewClick} whileTap={{ scale: 1.3 }}>
                                        {previewUrl && <img src={previewUrl} alt="Preview" />}
                                    </motion.div>
                                    <button className="setting-submit">決定</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings