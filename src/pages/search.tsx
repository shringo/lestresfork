import { useState } from "react";

export default function searchPage() {

    const [ price, setPrice ] = useState("");
    
    return (
        <>
            <div className="bg-slate-800 w-screen h-screen absolute flex items-center justify-center">
                <div className="bg-slate-100 w-11/12 h-5/6 rounded-3xl shadow-md shadow-red-500 p-5">
                    <div className="text-center text-xl">Heal thy Care</div>
                    <div className="text-lg">Maximum affordable price</div>
                    
                    <input id="price" type="range" className="mr-4" step={10} min={0} max={1000} onInput={e => e.target instanceof HTMLInputElement && setPrice(e.target.value)}/>
                    <label htmlFor="price">{!price.length ? "$500" : price === "0" ? "Free" : price === "1000" ? ">$1000" : ('$' + price)}</label>


                </div>
            </div>
        </>
    );
}