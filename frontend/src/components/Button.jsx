const Button = ({label, onClick}) => {
    return ( 
        <button onClick={onClick} type="button" className="w-full text-white bg-black rounded-lg px-3 py-2 mb-2 focus:outline-none focus:ring-4 font-medium text-sm">
            {label}
        </button>   
     );
}
 
export default Button;