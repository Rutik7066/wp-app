import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import Pocketbase, { AuthModel } from 'pocketbase'
import { RecordModel } from "pocketbase";
import { RecordAuthResponse } from "pocketbase";
interface DataType {
    pb: Pocketbase | null,
    user: AuthModel,
    isValid: boolean,
    login: (email: string, cred: string) => Promise<RecordAuthResponse<RecordModel> | void>,
    logout: () => void,
}


const PocketbaseContext = createContext<DataType>({
    pb: null,
    user: null,
    isValid: false,
    login: async () => { },
    logout: () => { },
})


export const PocketbaseProvider = ({ children }: any) => {
    const pb = useMemo(() => new Pocketbase(import.meta.env.VITE_POCKETBASE_URL), [])

    const [user, setUser] = useState(pb.authStore.model)
    const [isValid, setIsValidity] = useState(pb.authStore.isValid)

    useEffect(() => {
        return pb.authStore.onChange((_, model) => {
            console.log("Auth Changed!");
            console.log(_, model);
            console.log(pb.authStore.isValid);
            setUser(model);
            setIsValidity(pb.authStore.isValid)

        })
    }, [])


    const login = useCallback(async (email: string, cred: string) => {
        return await pb.collection("users").authWithPassword(email, cred);
    }, [])

    const logout = useCallback(() => pb.authStore.clear(), [])

    return (

        <PocketbaseContext.Provider value={{ pb, user, isValid, login, logout }} >
            {children}
        </PocketbaseContext.Provider>
    )
}


export const usePocketBase = () => useContext(PocketbaseContext);