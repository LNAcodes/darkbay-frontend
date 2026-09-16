// The login page. URL: /auth/login
// Contains a form with username and password fields.
// Uses a server action (loginAction) to send credentials to DarkBay backend.

import { loginAction } from "@/lib/authActions";

export default function LoginPage() {
  return (
    <form action={loginAction}>
      <input name="username" placeholder="Username" />
      <input name="password" type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}
