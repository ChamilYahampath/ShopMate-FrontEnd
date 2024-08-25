import React from "react";
import "./ItemCard.css";

const ItemCard = ( ) => {
    return (
        <div className="itemCard w-[15rem] m-3 transition-all cursor-pointer">
            <div className="h-[20rem]">
                <img className="h-full w-full object-cover object-left-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQpESbZCjzubQWrlLcoIYBm7B3cIg-mWrINQ&s" alt=""/>
            </div>

            <div className="textPart bg-white p-3">
                <div>
                    <p className="text-black font-bold">Title</p>
                    <p className="text-black font-semibold opacity-60">Description</p>
                </div>
                <div className="flex items-center space-x-2">
                    <p className="text-black font-semibold">Rs.199</p>
                    <p className="text-black line-through opacity-50">Rs.1999</p>
                    <p className="text-green-600 font-semibold">20% off</p>
                </div>
            </div>

        </div>
    )
}

export default ItemCard;