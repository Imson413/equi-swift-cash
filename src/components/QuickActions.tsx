import { Send, Download, Upload, CreditCard, Smartphone, MapPin, Receipt, ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface QuickAction {
  id: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

interface QuickActionsProps {
  onSendMoney: () => void;
  onWithdraw: () => void;
  onDeposit: () => void;
  onBuyAirtime: () => void;
  onPayBills: () => void;
  onTransfer: () => void;
  onStatement: () => void;
  onFindAgent: () => void;
}

export const QuickActions = ({ 
  onSendMoney, 
  onWithdraw, 
  onDeposit, 
  onBuyAirtime, 
  onPayBills, 
  onTransfer, 
  onStatement, 
  onFindAgent 
}: QuickActionsProps) => {
  const actions: QuickAction[] = [
    { id: "send", icon: <Send className="h-6 w-6" />, label: "Send Money", onClick: onSendMoney },
    { id: "withdraw", icon: <Download className="h-6 w-6" />, label: "Withdraw", onClick: onWithdraw },
    { id: "deposit", icon: <Upload className="h-6 w-6" />, label: "Deposit", onClick: onDeposit },
    { id: "transfer", icon: <ArrowLeftRight className="h-6 w-6" />, label: "Transfer", onClick: onTransfer },
    { id: "airtime", icon: <Smartphone className="h-6 w-6" />, label: "Buy Airtime", onClick: onBuyAirtime },
    { id: "bills", icon: <CreditCard className="h-6 w-6" />, label: "Pay Bills", onClick: onPayBills },
    { id: "statement", icon: <Receipt className="h-6 w-6" />, label: "Statement", onClick: onStatement },
    { id: "agent", icon: <MapPin className="h-6 w-6" />, label: "Find Agent", onClick: onFindAgent },
  ];

  return (
    <Card className="mx-4 mt-6">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Quick Actions</h3>
        <div className="grid grid-cols-4 gap-4">
          {actions.map((action) => (
            <Button
              key={action.id}
              variant="ghost"
              className="h-20 flex-col gap-2 hover:bg-primary/10 hover:text-primary"
              onClick={action.onClick}
            >
              <div className="text-primary">
                {action.icon}
              </div>
              <span className="text-xs text-center leading-tight">
                {action.label}
              </span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};