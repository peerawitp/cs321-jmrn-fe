"use client";
import Image from "next/image";
import MyProduct from "./MyProduct/page";
import Table from "./table/page";
import UpdateForm from "./table/UpdateForm";
import { useEffect, useState, useContext } from "react";
import TableContext, { Context } from "./TableContext";
import CreateForm from "./table/CreateForm"


export default function Home() {
  const [showCreatePopUp, setShowCreatePopUp] = useState(false);
  const [showUpdatePopUp, setShowPopUp] = useState(false);
  const [id, setID] = useState<string | null>(null);
  // const { id } = useContext(Context)

  useEffect(() => {
    console.log("Current ID:", id);
  }, []);
  

  const handleUpdateOpenPopUp = () => {
    if (id === null) {
      alert("Select product first");
    }
    else {
      setShowPopUp(true); // Show pop-up
    }
    // setShowPopUp(true);
    
  };
  const handleUpdateClosePopUp = () => {
    setShowPopUp(false); // Show pop-up
  };

  const handleCreateOpenPopUp = () => {
    setShowCreatePopUp(true)
  }

  const handleCreateClosePopUp = () => {
    setShowCreatePopUp(false)
  }

  return (
    <Context.Provider value={{id, setID}} >
      <div>
        {/* button */}
        <div className="mt-[50px] mb-[10px] ">
          <button className="mx-3 btn bg-[#387ADF] hover:bg-[#2558a5] text-white" onClick={handleCreateOpenPopUp}>
            Create
          </button>
          <button className="mr-3 btn btn-ghost bg-white" onClick={handleUpdateOpenPopUp}>
            Update
          </button>
          <button className="mr-3 btn bg-[#EC5A5A] hover:bg-[#ff4a4a] text-white">
            Delete
          </button>
        </div>

        <Table/>

        {/* <UpdateForm/> */}
        {showCreatePopUp && (
          <div className="fixed inset-0 flex justify-center items-start bg-black bg-opacity-50 z-50">
            <div className="mt-20">
              <CreateForm closePopUp={handleCreateClosePopUp} />
            </div>
          </div>
        )}

        {showUpdatePopUp && (
          <div className="fixed inset-0 flex justify-center items-start bg-black bg-opacity-50 z-50">
            <div className="mt-20">
              <UpdateForm closePopUp={handleUpdateClosePopUp} />
            </div>
          </div>
        )}
      </div>
    </Context.Provider>
  );
}
