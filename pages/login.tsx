import { getProviders, getCsrfToken, signIn } from "next-auth/react";

export default function SignIn({ providers }) {
  // console.log("providers", providers);

  const SignInhandler = async (provider) => {
    const s = await signIn(provider.id, { callbackUrl: `/dashboard` })
    console.log(s, "s");
  }

  return (
    <>
      <form
        method="post"
        onSubmit={(e) => { e.preventDefault(); signIn("credentials", { username: "test@test.com", password: "test", callbackUrl: "/" }) }}
      >
        {/* <input name="csrfToken" type="hidden" defaultValue={csrfToken} /> */}
        <label>
          Email
          <input type="email" id="email" name="email" />
        </label>
        <label>
          Password
          <input type="password" id="password" name="password" />
        </label>
        <button type="submit">Sign in with Creds</button>
      </form>
      <form method="post" action="/api/auth/signin/email">
        {/* <input name="csrfToken" type="hidden" defaultValue={csrfToken} /> */}
        <label>
          Email address
          <input type="email" id="email" name="email" />
        </label>
        <button type="submit">Sign in with Email</button>
      </form>
      {Object.values(providers).map((provider: any) => {
        if (provider.id === "email" || provider.id === "credentials") return null;
        return (
          <div key={provider.name}>
            <button onClick={SignInhandler}>
              Sign in with {provider.name}
            </button>
          </div>
        );
      })}
    </>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  // const csrfToken = await getCsrfToken(context);

  return {
    props: { providers },
  };
}
