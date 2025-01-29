import { getServerSession } from "next-auth/next";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { AuthService } from "@/domain/services/AuthService";
import { UserService } from "@/domain/services/UserService";
import { client } from "@/infrastructure/graphql/apollo-client";
import { parseCookies } from "nookies";

const userService = new UserService(client);
const authService = new AuthService(userService);

export function withAuth(gssp: GetServerSideProps) {
  return async (context: GetServerSidePropsContext) => {
    const cookies = parseCookies(context);
    const token = cookies.token;

    if (!token) {
      return {
        redirect: {
          destination: "/signin",
          permanent: false,
        },
      };
    }

    const session = await getServerSession(
      context.req,
      context.res,
      authOptions
    );

    if (!session) {
      return {
        redirect: {
          destination: "/signin",
          permanent: false,
        },
      };
    }

    const user = await authService.validateSession(session);
    if (!user) {
      return {
        redirect: {
          destination: "/signin",
          permanent: false,
        },
      };
    }

    const gsspData = await gssp(context);

    if ("props" in gsspData) {
      return {
        props: {
          ...gsspData.props,
          user,
        },
      };
    }

    return gsspData;
  };
}
