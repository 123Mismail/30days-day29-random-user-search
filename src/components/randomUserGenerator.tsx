"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Loader from "react-loader-spinner"
import { FiUser, FiMapPin, FiInfo, FiMail, FiLoader } from "react-icons/fi";

const RandomUser = () => {
  const [appreciate, setAppreciationVisible] = useState<boolean>(false);
  const [user , setUser]=useState(null);
  const [errors ,setErrors] =useState<string | undefined>("");
  const [loading , setLoading] =useState<boolean>(false)

//   fetching info
  const fetcheData=async()=>{
    setLoading(true)
      try {
        const response=await fetch("https://randomuser.me/api/");
        const data= await response.json();
        setUser(data);
      
      } catch (error) {
        setErrors(error)
      }finally{
        setLoading(false)
      }
       
  }

//   handel usEffect 
useEffect(()=>{
    fetcheData()
},[])

  //   handel appreciation
  const handleAppreciate = () => {
    setAppreciationVisible(true);
    setTimeout(() => setAppreciationVisible(false), 2000);
  };



  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="text-center ">
        <h1 className="mb-2 text-3xl font-semibold text-center p-1">
          Random User Generator
        </h1>
        <p className="text-center my-2 ">
          {" "}
          Click the button below to fetch a random user profile.
        </p>
        <Button className="text-base font-medium rounded-xl my-4 bg-gray-900 text-white hover:bg-gray-800"
         onClick={fetcheData}
        >
          Fetch new user
        </Button>

  
        <Card className="max-w-[350px] mx-auto w-full rounded-2xl relative">
        <CardHeader className="bg-cyan-500 h-[120px] rounded-t-xl relative  mx-auto"></CardHeader>
        <span className=" absolute text-center h-20 w-20 rounded-full     transform -translate-x-1/2 -translate-y-1/2 border-spacing-2 border-pink-500">
     {user &&
      <Image src={user?  user.results.length !==0 && user.results[0].picture.medium : ""} alt="profile picture" height={350} width={350} className="rounded-full"></Image> 
     }
       
    
        </span>
  
        <CardContent className="mt-12">
          <div className="grid w-full items-center gap-2 text-base">
            <h2 className="flex justify-center">
              {" "}
              <FiUser className="mr-1 text-xl" /> 
              {`${user && user.results.length !==0 && user.results[0].name.first} ${ user && user.results.length !==0 && user.results[0].name.last}` }
            </h2>
            <p className="flex justify-center">
              <FiMail className="mr-1 text-xl" />
              {user && user.results.length !==0 && user.results[0].email}
            </p>
            <p className="flex justify-center">
              <FiMapPin className="mr-1 text-xl" />
             {` ${user && user.results.length !==0 && user.results[0].location.country}, ${ user && user.results.length !==0 && user.results[0].location.city} ${user && user.results.length !==0 &&  user.results[0].location.state}`}
            </p>
            <p className="flex justify-center">
              <FiInfo className="mr-1 text-xl" />
            { user!==null && user.info.seed}
            </p>
          </div>
        </CardContent>
          
        <CardFooter className="flex justify-center ">
          <Button
            className="bg-gray-900 text-white hover:bg-gray-800 rounded-xl text-base"
            onClick={handleAppreciate}
          >
            Apreciate
          </Button>
        </CardFooter>
        {appreciate && (
          <div className="  top-0 text-center absolute bg-white/80 h-full max-w-[350px] w-full p-14">
            <h3 className="text-3xl font-semibold  my-[50%]">
              {" "}
              ❤️Thank You✨
            </h3>
          </div>
        )}
      </Card>
     
        
      </div>
    </div>
  );
};

export default RandomUser;
