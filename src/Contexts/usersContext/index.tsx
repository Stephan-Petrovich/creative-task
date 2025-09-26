import {
    createContext,
    ReactNode,
    useEffect,
    useState,
    useMemo,
    useContext,
} from "react";
import { fetchUsers } from "@src/api";
import { IUser } from "@src/domains/types";

interface IUsersContext {
    users: IUser[];
    usersMap: Map<number, string> | null;
}

const UsersContext = createContext<IUsersContext>({
    users: [],
    usersMap: null,
});

const UsersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [users, setUsers] = useState<IUser[]>([]);

    const usersMap = useMemo(() => {
        if (!users) return new Map<number, string>();
        return new Map(users.map((user) => [user.id, user.username]));
    }, [users]);

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
