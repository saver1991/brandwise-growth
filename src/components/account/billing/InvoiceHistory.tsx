
import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Download } from "lucide-react";
import { InvoiceData } from "@/hooks/useSubscription";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

interface InvoiceHistoryProps {
  invoices: InvoiceData[];
  isLoading: boolean;
}

const InvoiceHistory = ({ invoices, isLoading }: InvoiceHistoryProps) => {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleDownload = (invoice: InvoiceData) => {
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Invoice ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>{formatDate(invoice.date)}</TableCell>
              <TableCell className="font-mono text-xs">{invoice.id}</TableCell>
              <TableCell>
                <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium
                  ${invoice.status === 'paid' ? 'bg-green-50 text-green-700' : 
                    invoice.status === 'open' ? 'bg-blue-50 text-blue-700' : 
                    'bg-amber-50 text-amber-700'}`}>
                  {invoice.status}
                </span>
              </TableCell>
              <TableCell>{invoice.amount}</TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleDownload(invoice)}
                  disabled={!invoice.pdf}
                >
                  <Download className="h-4 w-4 mr-1" />
                  PDF
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default InvoiceHistory;
