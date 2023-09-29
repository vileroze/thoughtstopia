import Link from "next/link";
import { useRouter } from "next/navigation";

const AnonSingup = () => {
  const [submitting, setSubmitting] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      const response = await fetch("api/auth/anon/", {
        method: "POST",
        body: JSON.stringify({
          email: "anonuser@thoughtstopia.guava",
          username: username,
          password: password,
        }),
      });

      
      console.log("response:", response);

    
      // if (response.ok) {
      //   router.push("/");
      // }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setSubmitting(false);
    }
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  return (
    <div class="max-w-[280px] mx-auto">
      <div class="flex flex-col items-center mt-[10vh]">
        <h2 class="mb-5 text-gray-900 font-mono font-bold text-xl">Sign up</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            class="w-full px-6 py-3 mb-2 border border-slate-600 rounded-lg font-medium "
            name="username"
            placeholder={"username"}
            onChange={handleUsernameChange}
            value={username}
            required
          />
          <input
            type="password"
            class="w-full px-6 py-3 mb-2 border border-slate-600 rounded-lg font-medium "
            name="password"
            placeholder={"password"}
            onChange={handlePasswordChange}
            value={password}
            required
          />
          <button class="black_btn w-full" disabled={submitting}>{submitting ? `Signing up...` : 'Singnup'}</button>
        </form>
        <p class="text-center mt-3 text-[14px]">
          By clicking continue, you agree to our{" "}
          <Link href={"/terms-and-condition"} class="text-gray-600">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href={"/privacy-policy"} class="text-gray-600">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default AnonSingup;
