
import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Download } from "lucide-react";

interface Invoice {
  id: string;
  date: string;
  amount: string;
  pdf?: string;
}

interface InvoiceHistoryProps {
  invoices: Invoice[];
  isLoading: boolean;
}

const InvoiceHistory = ({ invoices, isLoading }: InvoiceHistoryProps) => {
  const formatDate = (dateString: string) => {
    // Try to parse the date if it's a timestamp
    try {
      if (dateString.match(/^\d+$/)) {
        return new Date(parseInt(dateString) * 1000).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
      }
    } catch (e) {
      // If parsing fails, return the original string
    }
    return dateString;
  };

  const handleDownload = (invoice: Invoice) => {
    if (invoice.pdf) {
      window.open(invoice.pdf, '_blank');
    }
  };

  if (invoices.length === 0 && !isLoading) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        No invoices found. They will appear here after your first payment.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {invoices.map((invoice, index) => (
        <div key={invoice.id}>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium">Invoice #{invoice.id}</p>
              <p className="text-sm text-muted-foreground">{formatDate(invoice.date)}</p>
            </div>
            <div className="flex items-center gap-4">
              <p className="font-medium">{invoice.amount}</p>
              <Button 
                variant="outline" 
                size="sm" 
                disabled={isLoading || !invoice.pdf}
                onClick={() => handleDownload(invoice)}
              >
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
            </div>
          </div>
          {index < invoices.length - 1 && <Separator />}
        </div>
      ))}
    </div>
  );
};

export default InvoiceHistory;
