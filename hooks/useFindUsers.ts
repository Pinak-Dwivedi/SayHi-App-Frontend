import { useQuery } from "@tanstack/react-query";
import { findUsers } from "@/utils/apiCalls/user";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function useFindUsers(search: string) {
  const { token } = useSelector((state: RootState) => state.auth);

  const findUsersQuery = useQuery({
    queryKey: ["users", { search: search }],

    queryFn: async () =>
      await findUsers({
        search,
        token,
      }),
  });

  return findUsersQuery;
}
