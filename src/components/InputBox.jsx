import { useState } from "react"

const InputBox = ({name, type, id, value, placeholder, icon}) => {
    const [passwordVisible, setpasswordVisible] = useState(false)
  return (
    <div className="relative w-[100%] mb-4">
        <input
            name={name}
            type={type == "password" ? passwordVisible? "text" : "password" : type}
            id={id}
            defaultValue={value}
            placeholder={placeholder}
            className= "w-[100%] rounded-md p-4 bg-grey pl-12 border border-grey focus:bg-transparent placeholder:text-black"
        />
        <i className={"fi "+ icon + " absolute left-4 top-1/2 -translate-y-1/2"}></i>
        {
            type == "password"? <i className={"fi fi-rr-eye" + (passwordVisible? "-crossed": "") + "input-icon left-[auto] right-4 cursor-pointer"}
            onClick={() => setpasswordVisible(currentVal => !currentVal)}
            ></i> : ""
        }
    </div>
  )
}

export default InputBox
