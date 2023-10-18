import { AuthPage } from "@refinedev/chakra-ui";
import Link from "next/link";

export default function Login() {
  return (
    <AuthPage
      type="login"
      formProps={{
        defaultValues: { email: "", password: "" },
      }}
      registerLink={
        <div>
          <Link href="/register">Register</Link>
        </div>
      }
    />
  );
}

Login.noLayout = true;
