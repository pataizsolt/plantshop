import useAuth from "./useAuth";

const useLoginStatus = () => {
    const { auth } = useAuth();

    return Object.keys(auth).length === 0 ? false : true;
}

export default useLoginStatus;