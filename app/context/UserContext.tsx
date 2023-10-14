'use client'

import { getUser } from "@/firebase/auth";
import { auth } from "@/firebase/init";
import User from "@/types/user";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

type UserContextType = {
    user: User | null,
    loading: boolean,
    error: Error | undefined
};
const UserContext = createContext<UserContextType>({
    user: null,
    loading: true,
    error: undefined
});

function UserContextProvider({ children }: { children: React.ReactNode }) {
    const [user, loading, error] = useAuthState(auth);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (u) => {
            if (u) {
                setCurrentUser(await getUser(u.uid));
            } else {
                setCurrentUser(null);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <UserContext.Provider value={{ user: currentUser, loading: loading, error: error }}>
            {children}
        </UserContext.Provider>
    );
}

function useAuthSession() {
    const { user, loading, error } = useContext(UserContext);
    return { user, loading, error } as UserContextType;
}

export { UserContext, UserContextProvider, useAuthSession };