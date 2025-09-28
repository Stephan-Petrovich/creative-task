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
}

interface UsersProviderProps {
    children: ReactNode;
}

const UsersContext = createContext<IUsersContext>({
    users: [],
    usersMap: null,
});

const UsersProvider = ({ children }: UsersProviderProps): ReactElement => {
    const [users, setUsers] = useState<IUser[]>([]);

    const usersMap = users
        ? new Map(users.map((user) => [user.id, user.username]))
        : new Map<number, string>();

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const fetchedUsers = await fetchUsers();

                setUsers(fetchedUsers);
            } catch (error) {
                console.error("Ошибка загрузки пользователей:", error);
            }
        };

        loadUsers();
    }, []);

    return (
        <UsersContext.Provider value={{ users, usersMap }}>
            {children}
        </UsersContext.Provider>
    );
};

const useUsersContext = () => {
    const context = useContext(UsersContext);

    if (context === null) {
        throw new Error("useUsersContext must be used within a UsersProvider");
    }

    return context;
};

export { UsersProvider, useUsersContext };
