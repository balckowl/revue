import { FormEvent, useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, storage } from "../libs/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

const Settings = () => {

    const [file, setFile] = useState<File | null>(null)
    const [userName, setUserName] = useState<string>("");
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        setUserName(user?.displayName as string)
    }, [user]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        if (file && userName) {
            const storageRef = ref(storage, `images/${file?.name}`);

            uploadBytes(storageRef, file).then((snapshot) => {
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
                                <h3 className="setting-title"><FontAwesomeIcon icon={faGear} className="pe-2"/>Settings</h3>
                                <form onSubmit={handleSubmit}>
                                    <div className="input-username-box">
                                        <input type="text" onChange={(e) => setUserName(e.target.value)} value={userName} />
                                    </div>
                                    <div className="input-files-box">
                                        <input type="file" onChange={(e) => setFile(e.target.files![0])} />
                                    </div>
                                    <div className="user-img-preview-box">
                                        {user?.photoURL && (
                                            <img src={user?.photoURL} alt="" />
                                        )}
                                    </div>
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