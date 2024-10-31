
const Login = () => {
  return<>
    <div className="bg-slate-800/90">
      <div className="max-w-7xl m-auto">
        <h1 className="text-3xl text-white text-center my-4">
          Login
        </h1>
        <div className="flex justify-center items-center gap-3">
          <form className="flex flex-col gap-2">
            <label htmlFor="email" className="text-gray-400">
              Email
            </label>
              <input type="email" name="email" id="email" className="bg-slate-400 text-black" placeholder="Email...." />
            
          </form>
        </div>
      </div>
    </div>
  </>
}

export default Login