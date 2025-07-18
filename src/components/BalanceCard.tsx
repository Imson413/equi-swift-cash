import { Eye, EyeOff, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

interface BalanceCardProps {
  balance: number;
  accountNumber: string;
}

export const BalanceCard = ({ balance, accountNumber }: BalanceCardProps) => {
  const [showBalance, setShowBalance] = useState(true);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <Card className="bg-gradient-to-r from-primary to-primary-hover text-primary-foreground mx-4 -mt-6 shadow-xl">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            <span className="text-sm opacity-90">EquiCash Balance</span>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setShowBalance(!showBalance)}
            className="text-primary-foreground hover:bg-primary-hover h-8 w-8"
          >
            {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
        
        <div className="space-y-2">
          <p className="text-3xl font-bold">
            {showBalance ? formatCurrency(balance) : "••••••"}
          </p>
          <p className="text-sm opacity-90">
            Account: {accountNumber}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};