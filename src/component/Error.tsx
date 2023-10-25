import { useRouteError } from "react-router-dom"

export const Error = () => {
 const error = useRouteError()
 console.log(error)
  return (
  
      <div className="flex flex-col justify-center items-center text-center w-screen h-screen bg-primary">
        <h1 className="text-2xl font-bold  text-white">Oops!</h1>
        <p className="text-lg font-semibold text-white/50">Sorry, an unexpected error has occurred.</p>
        <p className="text-base font-medium text-white flex flex-col" >
          <i>Something went wrong</i>
          <code>{JSON.stringify(error)}</code>
        </p>
      </div>
  )
}