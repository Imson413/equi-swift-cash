import { useState, useEffect } from "react";
import { EquiCashHeader } from "@/components/EquiCashHeader";
import { BalanceCard } from "@/components/BalanceCard";
import { QuickActions } from "@/components/QuickActions";
import { RecentTransactions } from "@/components/RecentTransactions";
import { BottomNavigation } from "@/components/BottomNavigation";
import { SendMoneyDialog } from "@/components/SendMoneyDialog";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { useTransactions } from "@/hooks/useTransactions";
import { Loader2 } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [sendMoneyOpen, setSendMoneyOpen] = useState(false);
  const { toast } = useToast();
  const { user, loading: authLoading, signOut } = useAuth();
  const { profile, loading: profileLoading } = useProfile();
  const { transactions, loading: transactionsLoading } = useTransactions();

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      window.location.href = "/auth";
    }
  }, [user, authLoading]);

  // Show loading screen while auth is loading
  if (authLoading || profileLoading || !user || !profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading EquiCash...</p>
        </div>
      </div>
    );
  }

  // Transform transactions for the RecentTransactions component
  const formattedTransactions = transactions.map(transaction => ({
    id: transaction.id,
    type: transaction.transaction_type as 'sent' | 'received' | 'withdraw' | 'deposit' | 'bills' | 'airtime',
    amount: transaction.amount,
    description: transaction.description,
    recipient: transaction.recipient_name,
    date: new Date(transaction.created_at).toLocaleDateString('en-KE', {
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit'
    })
  }));

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
        userName={profile.full_name}
        onNotificationsClick={() => toast({
          title: "Notifications",
          description: "You have 3 new notifications",
        })}
        onMenuClick={() => toast({
          title: "Menu",
          description: "Opening navigation menu...",
        })}
        onProfileClick={() => signOut()}
      />
      
      <div className="pt-4">
        <BalanceCard 
          balance={profile.balance}
          accountNumber={profile.account_number}
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
          transactions={formattedTransactions}
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
