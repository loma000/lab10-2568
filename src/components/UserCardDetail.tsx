import { BsMailbox2, BsFillPinMapFill } from "react-icons/bs";
import type { CardUserProps } from "../libs/CardUserType";

export const UserCardDetail = (user:CardUserProps) => {
  return (
    <div className="text-center">
      <p>
        <BsMailbox2 /> {user.email}
      </p>
      <p>
        <BsFillPinMapFill /> {user.address}
      </p>
    </div>
  );
};
