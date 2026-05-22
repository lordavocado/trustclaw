export type TransactionStatus = 
  | "completed"
  | "pending"
  | "needs_review"
  | "needs_receipt"
  | "reconciled";

export type TransactionType = "income" | "expense" | "transfer";

export type TransactionCategory =
  | "revenue"
  | "payroll"
  | "software"
  | "office"
  | "marketing"
  | "utilities"
  | "professional_services"
  | "travel"
  | "meals"
  | "equipment"
  | "taxes"
  | "insurance"
  | "bank_fees"
  | "other";

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  status: TransactionStatus;
  vendor?: string;
  account?: string;
  reference?: string;
  notes?: string;
  receiptUrl?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export const CATEGORY_LABELS: Record<TransactionCategory, string> = {
  revenue: "Revenue",
  payroll: "Payroll",
  software: "Software & SaaS",
  office: "Office & Rent",
  marketing: "Marketing",
  utilities: "Utilities",
  professional_services: "Professional Services",
  travel: "Travel",
  meals: "Meals & Entertainment",
  equipment: "Equipment",
  taxes: "Taxes",
  insurance: "Insurance",
  bank_fees: "Bank Fees",
  other: "Other",
};

export const STATUS_CONFIG: Record<
  TransactionStatus,
  { label: string; color: string; bgColor: string }
> = {
  completed: {
    label: "Completed",
    color: "text-[#44b48b]",
    bgColor: "bg-[#44b48b]/10",
  },
  pending: {
    label: "Pending",
    color: "text-[#7ea7e9]",
    bgColor: "bg-[#7ea7e9]/10",
  },
  needs_review: {
    label: "Needs Review",
    color: "text-[#a83900]",
    bgColor: "bg-[#a83900]/10",
  },
  needs_receipt: {
    label: "Missing Receipt",
    color: "text-[#a83900]",
    bgColor: "bg-[#a83900]/10",
  },
  reconciled: {
    label: "Reconciled",
    color: "text-muted-foreground",
    bgColor: "bg-muted",
  },
};
