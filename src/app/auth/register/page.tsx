// The register page. URL: /auth/register
// Contains a form with username and password fields.
// Uses a server action (registerAction) to create a new user in DarkBay backend.

import { registerAction } from "@/lib/authActions";

export default function RegisterPage() {
  return (
    <form action={registerAction}>
      <input name="username" placeholder="Username" />
      <input name="password" type="password" placeholder="Password" />
      <button type="submit">Register</button>
    </form>
  );
}
