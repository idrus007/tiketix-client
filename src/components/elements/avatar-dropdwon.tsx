import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useLogout } from "@/hooks/use-logout";
import { useUser } from "@/hooks/use-user";
import { LogOut, UserRound, UserRoundCog } from "lucide-react";

export function AvatarDropdown() {
  const { dataUser, loading, error } = useUser();
  const { logout } = useLogout();

  return (
    <Popover>
      <PopoverTrigger asChild>
        {loading ? (
          <div className="h-9 w-24 rounded-md bg-gray-200 animate-pulse" />
        ) : (
          <Button variant="outline">
            <UserRound /> {error ? "Error" : dataUser?.name}
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-40">
        <div className="flex flex-col gap-2">
          <Button variant="outline" className="w-full flex items-center gap-2">
            <UserRoundCog />
            Profile
          </Button>
          <Button
            variant="outline"
            className="w-full flex items-center gap-2"
            onClick={logout}
          >
            <LogOut />
            Logout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
