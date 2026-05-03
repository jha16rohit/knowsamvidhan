import { cookies } from "next/headers";

const isProduction = process.env.NODE_ENV === "production";

export const setCookie = async ({
  name,
  value,
  maxAge,
}: {
  name: string;
  value: string;
  maxAge: number;
}) => {
  const cookieStore = await cookies();

  cookieStore.set(name, value, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict",
    path: "/",
    maxAge,
  });
};


export const deleteCookie = async (name: string) => {
  const cookieStore = await cookies();
  cookieStore.delete({ name, path: "/" });
};

export const getCookie = async (name: string) => {
  const cookieStore = await cookies();

  return cookieStore.get(name)?.value;
};