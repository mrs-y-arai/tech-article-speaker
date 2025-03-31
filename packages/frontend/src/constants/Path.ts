export const AUTH_PATHS = {
  Login: "/login",
  Signup: "/sign-up",
  SignupSent: "/sign-up/sent",
  SignupVerify: "/sign-up/verify",
};

export const checkAuthPath = (path: string) => {
  const authPaths: string[] = Object.values(AUTH_PATHS);
  return authPaths.includes(path);
};
