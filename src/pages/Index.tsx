import { useState } from "react";
import { EquiCashHeader } from "@/components/EquiCashHeader";
import { BalanceCard } from "@/components/BalanceCard";
import { QuickActions } from "@/components/QuickActions";
import { RecentTransactions } from "@/components/RecentTransactions";
import { BottomNavigation } from "@/components/BottomNavigation";
import { SendMoneyDialog } from "@/components/SendMoneyDialog";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [sendMoneyOpen, setSendMoneyOpen] = useState(false);
  const { toast } = useToast();

  // Mock data
  const userData = {
    name: "John Doe",
    balance: 15750.00,
    accountNumber: "0170123456789"
  };

  const mockTransactions = [
    {
      id: "1",
      type: "received" as const,
      amount: 2500.00,
      description: "Money received from Mary Wanjiku",
      recipient: "Mary Wanjiku",
      date: "Today, 2:30 PM"
    },
    {
      id: "2", 
      type: "sent" as const,
      amount: 500.00,
      description: "Airtime purchase",
      date: "Today, 11:15 AM"
    },
    {
      id: "3",
      type: "bills" as const,
      amount: 1200.00,
      description: "KPLC Bill Payment",
      date: "Yesterday, 4:45 PM"
    },
    {
      id: "4",
      type: "withdraw" as const,
      amount: 3000.00,
      description: "Cash withdrawal - Agent 001",
      date: "Yesterday, 2:20 PM"
    }
  ];

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "send":
        setSendMoneyOpen(true);
        break;
      case "withdraw":
        toast({
          title: "Withdraw Cash",
          description: "Opening withdrawal options...",
        });
        break;
      case "deposit":
        toast({
          title: "Deposit Cash",
          description: "Find the nearest agent to deposit cash",
        });
        break;
      case "transfer":
        toast({
          title: "Bank Transfer",
          description: "Transfer between EquiCash and Equity Bank",
        });
        break;
      case "airtime":
        toast({
          title: "Buy Airtime",
          description: "Opening airtime purchase...",
        });
        break;
      case "bills":
        toast({
          title: "Pay Bills",
          description: "Opening bill payment options...",
        });
        break;
      case "statement":
        toast({
          title: "Mini Statement",
          description: "Loading transaction history...",
        });
        break;
      case "agent":
        toast({
          title: "Find Agent",
          description: "Locating nearest EquiCash agents...",
        });
        break;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <EquiCashHeader
        userName={userData.name}
        onNotificationsClick={() => toast({
          title: "Notifications",
          description: "You have 3 new notifications",
        })}
        onMenuClick={() => toast({
          title: "Menu",
          description: "Opening navigation menu...",
        })}
        onProfileClick={() => setActiveTab("profile")}
      />
      
      <div className="pt-4">
        <BalanceCard 
          balance={userData.balance}
          accountNumber={userData.accountNumber}
        />
        
        <QuickActions
          onSendMoney={() => handleQuickAction("send")}
          onWithdraw={() => handleQuickAction("withdraw")}
          onDeposit={() => handleQuickAction("deposit")}
          onTransfer={() => handleQuickAction("transfer")}
          onBuyAirtime={() => handleQuickAction("airtime")}
          onPayBills={() => handleQuickAction("bills")}
          onStatement={() => handleQuickAction("statement")}
          onFindAgent={() => handleQuickAction("agent")}
        />
        
        <RecentTransactions
          transactions={mockTransactions}
          onViewAll={() => setActiveTab("history")}
        />
      </div>
      
      <BottomNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      <SendMoneyDialog
        open={sendMoneyOpen}
        onOpenChange={setSendMoneyOpen}
      />
    </div>
  );
};

export default Index;
