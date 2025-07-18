import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Send, User, Building, Smartphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SendMoneyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SendMoneyDialog = ({ open, onOpenChange }: SendMoneyDialogProps) => {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSend = async (type: string) => {
    if (!amount || !recipient) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Money Sent Successfully",
        description: `KES ${amount} sent to ${recipient}`,
        variant: "default",
      });
      setLoading(false);
      onOpenChange(false);
      setAmount("");
      setRecipient("");
      setMessage("");
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Send className="h-5 w-5 text-primary" />
            Send Money
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="phone" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="phone" className="flex items-center gap-1">
              <Smartphone className="h-4 w-4" />
              Phone
            </TabsTrigger>
            <TabsTrigger value="equicash" className="flex items-center gap-1">
              <User className="h-4 w-4" />
              EquiCash
            </TabsTrigger>
            <TabsTrigger value="bank" className="flex items-center gap-1">
              <Building className="h-4 w-4" />
              Bank
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="phone" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                placeholder="07XXXXXXXX"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (KES)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message (Optional)</Label>
              <Input
                id="message"
                placeholder="Payment for..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <Button 
              onClick={() => handleSend("phone")} 
              className="w-full" 
              disabled={loading}
              variant="financial"
            >
              {loading ? "Sending..." : "Send Money"}
            </Button>
          </TabsContent>
          
          <TabsContent value="equicash" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="equicash-id">EquiCash ID or Phone</Label>
              <Input
                id="equicash-id"
                placeholder="Enter ID or phone number"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount2">Amount (KES)</Label>
              <Input
                id="amount2"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message2">Message (Optional)</Label>
              <Input
                id="message2"
                placeholder="Payment for..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <Button 
              onClick={() => handleSend("equicash")} 
              className="w-full" 
              disabled={loading}
              variant="financial"
            >
              {loading ? "Sending..." : "Send to EquiCash"}
            </Button>
          </TabsContent>
          
          <TabsContent value="bank" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="account">Account Number</Label>
              <Input
                id="account"
                placeholder="Enter account number"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount3">Amount (KES)</Label>
              <Input
                id="amount3"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message3">Message (Optional)</Label>
              <Input
                id="message3"
                placeholder="Payment for..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <Button 
              onClick={() => handleSend("bank")} 
              className="w-full" 
              disabled={loading}
              variant="financial"
            >
              {loading ? "Sending..." : "Send to Bank"}
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};