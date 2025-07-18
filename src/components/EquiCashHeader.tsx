import { Bell, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EquiCashHeaderProps {
  userName: string;
  onNotificationsClick: () => void;
  onMenuClick: () => void;
  onProfileClick: () => void;
}

export const EquiCashHeader = ({ 
  userName, 
  onNotificationsClick, 
  onMenuClick, 
  onProfileClick 
}: EquiCashHeaderProps) => {
  return (
    <header className="bg-primary text-primary-foreground px-4 py-3 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-3">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onMenuClick}
          className="text-primary-foreground hover:bg-primary-hover"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex flex-col">
          <h1 className="text-xl font-bold">EquiCash</h1>
          <p className="text-xs opacity-90">Welcome, {userName}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onNotificationsClick}
          className="text-primary-foreground hover:bg-primary-hover relative"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 bg-success text-success-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
            3
          </span>
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onProfileClick}
          className="text-primary-foreground hover:bg-primary-hover"
        >
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};