import { FormEventHandler, useState } from "react"
// import pb from "../Pocketbase/Pocketbase";
import Toast from "../component/Toast";
import { usePocketBase } from "../context/PocketbaseProvider";

const Login = () => {
  const  {login} =usePocketBase();

  const [message, setMessage] = useState("");
  const [state, setState] = useState(4);

  const logInHandler: FormEventHandler = async (e) => {
      setState(0)
    e.preventDefault()
    const email = (e.target as any).email.value;
    const cred = (e.target as any).cred.value;
    console.log(email, cred);
    try {
    await login(email,cred);

      setMessage("Login sucessfull.")
      setState(1)
        // nav('/home',{replace :true})
    } catch (error) {
      setMessage("Failed to login try again.")
      setState(2)
      console.log(JSON.stringify(error, null, 2))
    }
    setTimeout(() => {
      setMessage("")
      setState(4)
    }, 2000);
  }


  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen max-h-screen bg-primary ">
      <Toast message={message} state={state}></Toast>
      <p className="text-white/50 text-center text-lg">Login to </p>
      <h1 className="text-white text-center text-2xl">Whatsapp Bulk Pro</h1>
      <form onSubmit={logInHandler} action="" className="mt-6 w-full max-w-xs  md:max-w-md ">
        <div className="mb-4">
          <label className="block text-sm font-semibold text-white">Email</label>
          <input
            type="email"
            name="email"
            className="block w-full px-4 py-2 mt-2 rounded-md"
            required
            autoSave="email"
            autoComplete="email"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-semibold text-white">
            Password
          </label>
          <input
            type="password"
            name="cred"
            className="block w-full px-4 py-2 mt-2 rounded-md"
            required
            autoSave="password"
            autoComplete="password"
          />
        </div>

        <button
          type="submit"

          className="mt-6 w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-active rounded-md hover:bg-active/80 focus:outline-none focus:bg-active"
        >
          Login
        </button>
      </form>

    </div>
  )
}
export default Login