import {
    createContext,
    ReactNode,
    useEffect,
    useState,
    useContext,
    ReactElement,
} from "react";
import { IUser } from "@src/domains/types";
import { fetchUsers } from "@src/api";

interface IUsersContext {
    users: IUser[];
    usersMap: Map<number, string> | null;
    isUsersLoading: boolean;
    errorLoadingUsers: string | null;
}

interface UsersProviderProps {
    children: ReactNode;
}

const UsersContext = createContext<IUsersContext>({
    users: [],
    usersMap: null,
    isUsersLoading: false,
    errorLoadingUsers: null,
});

const UsersProvider = ({ children }: UsersProviderProps): ReactElement => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const usersMap = users
        ? new Map(users.map((user) => [user.id, user.username]))
        : new Map<number, string>();

    useEffect(() => {
        const loadUsers = async () => {
            try {
                setIsLoading(true);

                const fetchedUsers = await fetchUsers();

                setUsers(fetchedUsers);
            } catch (error) {
                setError("Ошибка загрузки пользователей:");

                console.error("Ошибка загрузки пользователей:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadUsers();
    }, []);

    return (
        <UsersContext.Provider
            value={{
                users,
                usersMap,
                isUsersLoading: isLoading,
                errorLoadingUsers: error,
            }}
        >
            {children}
        </UsersContext.Provider>
    );
};

const useUsersContext = () => {
    const context = useContext(UsersContext);

    if (context === undefined) {
        throw new Error("useUsersContext must be used within a UsersProvider");
    }

    return context;
};

export { UsersProvider, useUsersContext };
