import { FC, InputHTMLAttributes } from "react";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

const TextField: FC<TextFieldProps> = ({label,...props }) => {
    return (  
        <div className="flex flex-col items-center gap-0 justify-start ">
            <label className="text-black bold text-left text-sm w-full">{label}</label>
            <input
                className="outline-none bg-white p-2 w-full rounded-sm border-b-2 border-gray-800"
                placeholder={label}
                type="text"
                {...props}
            />
        </div>

    );
}
 
export default TextField;