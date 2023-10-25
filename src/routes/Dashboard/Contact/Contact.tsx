import { useState } from "react";
import { NavLink, useRouteLoaderData } from "react-router-dom"




const Contact = () => {

  const data: any = useRouteLoaderData("root");
  const [contacts, setContact] = useState(data.contacts);

  const filter = (text: string) => {
    if (text === "") {
      setContact(data.contacts);
      return;
    }
    const filtCon = contacts.filter((e) => e.name.toLowerCase().match(text) || e.num.toLowerCase().match(text))
    setContact([...filtCon])
    return;
  }


  return (
    <div className="w-full h-full p-2">
      <div className="p-4 w-full ">
        <input type="text" name="search" onChange={(e: any) => filter(e.target.value)} id="" placeholder="फोन नंबर किंवा नाव टाइप करा" className="relative text-white bg-secondary rounded-lg w-full p-3" />

      </div>
      <ul className="w-full h-full my-2">
        {contacts.map((e, i) => (
          // <NavLink key={i} to={`/contact/${data.contacts.indexOf(e)}`}>
            <li key={i} className="my-1 p-4 flex justify-between items-center text-white border-b border-secondary hover:bg-active/80 ">
              <h1 className="text-white font-bold ">{e.name}</h1>
              <h1 className="text-white font-bold ">{e.num}</h1>
            </li>
          // </NavLink>
        ))}
      </ul>
    </div>
  )
}

export default Contact;