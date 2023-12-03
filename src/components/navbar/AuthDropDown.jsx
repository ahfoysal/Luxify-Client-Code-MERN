/* eslint-disable react/prop-types */
import {
  Avatar,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "../ui/button";

// eslint-disable-next-line react/prop-types
const AuthDropDown = ({ user, logout }) => {
  const { toast } = useToast();

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="secondary"
          name="Jason Hughes"
          size="sm"
          src={
            user?.photoURL
              ? user.photoURL
              : "https://i.pravatar.cc/150?u=a042581f4e29026704d"
          }
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">
            {user?.displayName ||
              user?.email ||
              user?.reloadUserInfo?.screenName}
          </p>
        </DropdownItem>
        <DropdownItem key="settings">My Order</DropdownItem>
        <DropdownItem key="team_settings">My Profile</DropdownItem>
        <DropdownItem key="system">My Wishlist</DropdownItem>
        <DropdownItem key="analytics">Reset Password</DropdownItem>

        <DropdownItem key="logout" className="flex" color="danger">
          <Button
            size="sm"
            className="w-full h-full justify-start hover:bg-transparent"
            onClick={() =>
              logout().then(() =>
                toast({
                  title: "Successfully logged out",

                  duration: 3000,
                })
              )
            }
            variant="ghost"
          >
            Log Out
          </Button>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default AuthDropDown;
