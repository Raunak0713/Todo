import { signInRedirect } from "@/actions/signin";

const customSignIn = async () => {
  await signInRedirect()
}

export default customSignIn;
