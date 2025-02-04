import { Tabs } from "@/components/ui/tabs";
import { TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";

import Login from "./Login";
import SignUp from "./SignUp";

import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

const Auth = () => {
  return (
    <BackgroundBeamsWithCollision className="">
      <div className="h-[100vh] w-[100vw] flex justify-center items-center text-white">
        <div className="p-10  border-2 border-slate-800 text-opacity-10 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl xl:grid-cols-2 ">
          <div className="flex flex-col gap-10 items-center justify-center">
            <div className="flex items-center justify-center flex-col gap-y-2">
              <div className="flex items-center justify-center">
                <h1 className="text-5xl  font-bold lg:text-6xl">Welcome</h1>
              </div>
              <p className="font-medium text-center">
                Fill in the details to get started!
              </p>
            </div>
            <div className=" flex  items-center justify-center w-full">
              <Tabs className="w-3/4">
                <TabsList className="bg-transparent rounded-none w-full">
                  <TabsTrigger
                    value="login"
                    className="data-[state=active]:bg-transparent text-white text-opacity-90 border-b-2 rounded-none w-1/2 data-[state=active]:text-purple-500 data-[state=active]:font-semibold data-[state=active]:border-b-slate-600 p-3 transition-all duration-300"
                  >
                    Login
                  </TabsTrigger>
                  <TabsTrigger
                    value="signup"
                    className="data-[state=active]:bg-transparent text-white text-opacity-90 border-b-2 rounded-none w-1/2 data-[state=active]:text-purple-500 data-[state=active]:font-semibold data-[state=active]:border-b-slate-600 p-3 transition-all duration-300"
                  >
                    SignUp
                  </TabsTrigger>
                </TabsList>
                <TabsContent className="mt-12" value="login">
                  <Login />
                </TabsContent>
                <TabsContent className="" value="signup">
                  <SignUp />
                </TabsContent>
              </Tabs>
            </div>
          </div>
          <div className="flex justify-center items-center">
            {/* {/* <img src={Background} alt="background login" className="" />  */}
          </div>
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  );
};

export default Auth;
