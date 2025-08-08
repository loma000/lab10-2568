import { UserCard } from "../components/UserCard";
 
import axios from "axios";
import { useState,useEffect } from "react";
import { cleanUser } from "../libs/CleanUser";
import type { CardUserProps } from "../libs/CardUserType";
export default function RandomUserPage() {
  const [users, setUsers] = useState<CardUserProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [genAmount, setGenAmount] = useState(1);
  const [isfirstload,setfirstload] = useState(true);
  const generateBtnOnClick = async () => {
    setIsLoading(true);
    const resp = await axios.get(
      `https://randomuser.me/api/?results=${genAmount}`
    );
    setIsLoading(false);
    const users = resp.data.results;
    const cleanUsers= users.map((user:any)=> cleanUser(user) );
    setUsers( cleanUsers);
  };
 useEffect(()=>{
  if (isfirstload) {
      setfirstload(false);
      return;
    }
    const saveNum = JSON.stringify(genAmount);
    localStorage.setItem("amount", saveNum);
    const saveUsers = JSON.stringify(users);
    localStorage.setItem("user", saveUsers);
 },[users]);
 useEffect(()=>{
  
    const loadUser = localStorage.getItem("user");
    const loadNum = localStorage.getItem("amount");
    if (loadUser === null || loadNum === null) return;
    setUsers(JSON.parse(loadUser));
    setGenAmount(JSON.parse(loadNum));

 },[]);
  return (
    <div style={{ maxWidth: "700px" }} className="mx-auto">
      <p className="display-4 text-center fst-italic m-4">Users Generator</p>
      <div className="d-flex justify-content-center align-items-center fs-5 gap-2">
        Number of User(s)
        <input
          className="form-control text-center"
          style={{ maxWidth: "100px" }}
          type="number"
          onChange={(event: any) => setGenAmount(event.target.value)}
          value={genAmount}
        />
        <button className="btn btn-dark" onClick={generateBtnOnClick}>
          Generate
        </button>
      </div>
      {isLoading && (
        <p className="display-6 text-center fst-italic my-4">Loading ...</p>
      )}
      {users && !isLoading && users.map((user:any) =>   
  <UserCard
    key={user.email}
    name={user.name}
    imgUrl={user.imgUrl}
    address={user.address}
    email={user.email}
  />
)}
    </div>
  );
}
