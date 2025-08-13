import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut, updateProfile } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useAuth } from "../../contexts/AuthProvider";

const UserProfile = () => {
    const navigate = useNavigate();
    const { user, loading } = useAuth();
    const [nameInput, setNameInput] = useState(user?.displayName ?? "");

    if (loading) return <div>Loading...</div>;
    if (!user) return <div>No user. <button onClick={() => navigate("/")}>Go to login</button></div>;

    const handleUpdateName = async () => {
        await updateProfile(user, { displayName: nameInput.trim() });
        await auth.currentUser?.reload(); // opcional para refletir na hora
        alert("Name updated.");
    };

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/");
    };

    console.log(user, 'user');

    return (
        <div style={{ maxWidth: 480, margin: "40px auto", display: "grid", gap: 12 }}>
            <h1>Profile</h1>
            <div><strong>Name:</strong> {user.displayName ?? "(not set)"}</div>
            <div><strong>Email:</strong> {user.email}</div>
            <div><strong>Phone:</strong> {user.phoneNumber}</div>
            <div><strong>UID:</strong> {user.uid}</div>

            <div style={{ display: "grid", gap: 8, marginTop: 12 }}>
                <input
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="Display name"
                />
                <button onClick={handleUpdateName}>Update name</button>
            </div>

            <button onClick={handleLogout} style={{ marginTop: 16 }}>
                Sign out
            </button>
        </div>
    );
};

export default UserProfile;
