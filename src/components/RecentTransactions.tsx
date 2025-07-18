import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDownLeft, ArrowUpRight, ChevronRight } from "lucide-react";

interface Transaction {
  id: string;
  type: "sent" | "received" | "withdraw" | "deposit" | "airtime" | "bills";
  amount: number;
  description: string;
  date: string;
  recipient?: string;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
  onViewAll: () => void;
}

export const RecentTransactions = ({ transactions, onViewAll }: RecentTransactionsProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getTransactionIcon = (type: string) => {
    const isOutgoing = ["sent", "withdraw", "airtime", "bills"].includes(type);
    return isOutgoing ? (
      <ArrowUpRight className="h-4 w-4 text-destructive" />
    ) : (
      <ArrowDownLeft className="h-4 w-4 text-success" />
    );
  };

  const getTransactionColor = (type: string) => {
    const isOutgoing = ["sent", "withdraw", "airtime", "bills"].includes(type);
    return isOutgoing ? "text-destructive" : "text-success";
  };

  return (
    <Card className="mx-4 mt-6">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Recent Transactions</CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onViewAll}
            className="text-primary hover:text-primary-hover"
          >
            View All
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {transactions.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No recent transactions
          </p>
        ) : (
          transactions.slice(0, 5).map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-muted">
                  {getTransactionIcon(transaction.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">
                    {transaction.description}
                  </p>
                  {transaction.recipient && (
                    <p className="text-xs text-muted-foreground truncate">
                      To: {transaction.recipient}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    {transaction.date}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold text-sm ${getTransactionColor(transaction.type)}`}>
                  {transaction.type === "received" || transaction.type === "deposit" ? "+" : "-"}
                  {formatCurrency(transaction.amount)}
                </p>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};