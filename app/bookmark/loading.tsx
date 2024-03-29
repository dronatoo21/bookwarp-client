"use client"
import Lottie from "lottie-react";
import Loading from  "@/public/Loading.json"
const loadingPage = () => {
 
    return (
        <section className="flex items-center justify-center h-[50vh]">
            <Lottie className="w-8/12 lg:w-1/3 mx-auto" animationData={Loading}/>
        </section>

    );
};

export default loadingPage;    