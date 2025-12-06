import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../lib/authConfig";

export const SignInButton = () => {
    const { instance } = useMsal();
    
    const handleLogin = (loginType: 'popup' | 'redirect') => {
        if (loginType === "popup") {
            instance.loginPopup({
                ...loginRequest,
                redirectUri: import.meta.env.VITE_REACT_APP_POPUP_REDIRECT_URI || window.location.origin,
            }).catch(e => {
                console.error("Login failed:", e);
            });
        } else if (loginType === "redirect") {
            instance.loginRedirect(loginRequest);
        }
    }

    return (
        <div>
            <img 
                src="/signinButton.svg" 
                alt="Sign in with Microsoft"
                onClick={() => handleLogin("popup")}
                style={{ cursor: 'pointer' }}
            />
        </div>
    )
};