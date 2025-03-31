
import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface Invoice {
  id: string;
  date: string;
  amount: string;
}

interface InvoiceHistoryProps {
  invoices: Invoice[];
  isLoading: boolean;
}

const InvoiceHistory = ({ invoices, isLoading }: InvoiceHistoryProps) => {
  return (
    <div className="space-y-4">
      {invoices.map((invoice, index) => (
        <div key={invoice.id}>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium">Invoice #{invoice.id}</p>
              <p className="text-sm text-muted-foreground">{invoice.date}</p>
            </div>
            <div className="flex items-center gap-4">
              <p className="font-medium">{invoice.amount}</p>
              <Button variant="outline" size="sm" disabled={isLoading}>Download</Button>
            </div>
          </div>
          {index < invoices.length - 1 && <Separator />}
        </div>
      ))}
    </div>
  );
};

export default InvoiceHistory;
