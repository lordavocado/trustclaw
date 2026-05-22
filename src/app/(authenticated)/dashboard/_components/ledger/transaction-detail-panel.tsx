"use client";

import { useState } from "react";
import {
  X,
  Calendar,
  Building2,
  CreditCard,
  Tag,
  FileText,
  Receipt,
  Upload,
  Trash2,
  Save,
  AlertCircle,
  Check,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import type { Transaction, TransactionCategory, TransactionStatus } from "./types";
import { CATEGORY_LABELS, STATUS_CONFIG } from "./types";

interface TransactionDetailPanelProps {
  transaction: Transaction | null;
  onClose: () => void;
  onSave?: (transaction: Transaction) => void;
}

export function TransactionDetailPanel({
  transaction,
  onClose,
  onSave,
}: TransactionDetailPanelProps) {
  const [editedTransaction, setEditedTransaction] = useState<Transaction | null>(
    transaction
  );
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Update local state when transaction prop changes
  if (transaction?.id !== editedTransaction?.id) {
    setEditedTransaction(transaction);
    setIsEditing(false);
  }

  if (!transaction || !editedTransaction) {
    return null;
  }

  const statusConfig = STATUS_CONFIG[editedTransaction.status];
  const needsAction =
    editedTransaction.status === "needs_review" ||
    editedTransaction.status === "needs_receipt";

  const handleSave = async () => {
    if (!editedTransaction) return;
    setIsSaving(true);
    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 500));
    onSave?.(editedTransaction);
    setIsSaving(false);
    setIsEditing(false);
  };

  const updateField = <K extends keyof Transaction>(
    field: K,
    value: Transaction[K]
  ) => {
    setEditedTransaction((prev) =>
      prev ? { ...prev, [field]: value, updatedAt: new Date().toISOString() } : null
    );
    setIsEditing(true);
  };

  return (
    <div className="flex h-full w-[420px] flex-col border-l border-border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-semibold text-foreground">
            Transaction Details
          </h2>
          {needsAction && (
            <span className="flex items-center gap-1 rounded-full bg-[#a83900]/10 px-2 py-0.5 text-xs font-medium text-[#a83900]">
              <AlertCircle className="h-3 w-3" />
              Action Required
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted"
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Amount & Status Section */}
        <div className="border-b border-border px-6 py-5">
          <div className="mb-4">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              Amount
            </span>
            <p
              className={`mt-1 font-mono text-3xl font-semibold ${
                editedTransaction.amount >= 0
                  ? "text-[#44b48b]"
                  : "text-foreground"
              }`}
            >
              {editedTransaction.amount >= 0 ? "+" : ""}
              {editedTransaction.amount.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${statusConfig.bgColor} ${statusConfig.color}`}
            >
              {editedTransaction.status === "completed" ||
              editedTransaction.status === "reconciled" ? (
                <Check className="h-3 w-3" />
              ) : (
                <AlertCircle className="h-3 w-3" />
              )}
              {statusConfig.label}
            </span>

            {isEditing && (
              <span className="text-xs text-muted-foreground italic">
                Unsaved changes
              </span>
            )}
          </div>
        </div>

        {/* Details Section */}
        <div className="border-b border-border px-6 py-5 space-y-4">
          {/* Description */}
          <div>
            <label className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider mb-2">
              <FileText className="h-3.5 w-3.5" />
              Description
            </label>
            <input
              type="text"
              value={editedTransaction.description}
              onChange={(e) => updateField("description", e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>

          {/* Date */}
          <div>
            <label className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider mb-2">
              <Calendar className="h-3.5 w-3.5" />
              Date
            </label>
            <input
              type="date"
              value={editedTransaction.date}
              onChange={(e) => updateField("date", e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>

          {/* Vendor */}
          <div>
            <label className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider mb-2">
              <Building2 className="h-3.5 w-3.5" />
              Vendor
            </label>
            <input
              type="text"
              value={editedTransaction.vendor ?? ""}
              onChange={(e) => updateField("vendor", e.target.value)}
              placeholder="Enter vendor name..."
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>

          {/* Category */}
          <div>
            <label className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider mb-2">
              <Tag className="h-3.5 w-3.5" />
              Category
            </label>
            <select
              value={editedTransaction.category}
              onChange={(e) =>
                updateField("category", e.target.value as TransactionCategory)
              }
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
            >
              {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Account */}
          <div>
            <label className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider mb-2">
              <CreditCard className="h-3.5 w-3.5" />
              Account
            </label>
            <input
              type="text"
              value={editedTransaction.account ?? ""}
              onChange={(e) => updateField("account", e.target.value)}
              placeholder="Enter account..."
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>

          {/* Status */}
          <div>
            <label className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider mb-2">
              Status
            </label>
            <select
              value={editedTransaction.status}
              onChange={(e) =>
                updateField("status", e.target.value as TransactionStatus)
              }
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="needs_review">Needs Review</option>
              <option value="needs_receipt">Missing Receipt</option>
              <option value="reconciled">Reconciled</option>
            </select>
          </div>
        </div>

        {/* Receipt Section */}
        <div className="border-b border-border px-6 py-5">
          <label className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider mb-3">
            <Receipt className="h-3.5 w-3.5" />
            Receipt
          </label>

          {editedTransaction.receiptUrl ? (
            <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#44b48b]/10">
                <Receipt className="h-5 w-5 text-[#44b48b]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  Receipt attached
                </p>
                <p className="text-xs text-muted-foreground">
                  {editedTransaction.receiptUrl.split("/").pop()}
                </p>
              </div>
              <button className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted">
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </button>
              <button
                onClick={() => updateField("receiptUrl", undefined)}
                className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </button>
            </div>
          ) : (
            <div className="rounded-lg border-2 border-dashed border-border p-6 text-center">
              <Upload className="mx-auto h-8 w-8 text-muted-foreground/50" />
              <p className="mt-2 text-sm font-medium text-foreground">
                No receipt attached
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Drag and drop or click to upload
              </p>
              <button className="mt-3 rounded-md bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90">
                Upload Receipt
              </button>
            </div>
          )}
        </div>

        {/* Notes Section */}
        <div className="border-b border-border px-6 py-5">
          <label className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider mb-2">
            Notes
          </label>
          <textarea
            value={editedTransaction.notes ?? ""}
            onChange={(e) => updateField("notes", e.target.value)}
            placeholder="Add notes about this transaction..."
            rows={3}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring resize-none"
          />
        </div>

        {/* AI Suggestion */}
        {needsAction && (
          <div className="px-6 py-5">
            <div className="rounded-lg border border-[#7ea7e9]/30 bg-[#7ea7e9]/5 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7ea7e9]/20">
                  <Sparkles className="h-4 w-4 text-[#7ea7e9]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    Benny&apos;s Suggestion
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {editedTransaction.status === "needs_receipt"
                      ? "I found a potential matching receipt in your Gmail from this date. Would you like me to attach it?"
                      : "This expense seems unusual for this vendor. The typical amount is around $350. Should I flag this for review?"}
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button className="rounded-md bg-[#7ea7e9] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#7ea7e9]/90">
                      {editedTransaction.status === "needs_receipt"
                        ? "Attach Receipt"
                        : "Review Details"}
                    </button>
                    <button className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted">
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Metadata */}
        <div className="px-6 py-5">
          <div className="space-y-2 text-xs text-muted-foreground">
            {editedTransaction.reference && (
              <div className="flex justify-between">
                <span>Reference</span>
                <span className="font-mono">{editedTransaction.reference}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Created</span>
              <span>
                {new Date(editedTransaction.createdAt).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Last Updated</span>
              <span>
                {new Date(editedTransaction.updatedAt).toLocaleString()}
              </span>
            </div>
            {editedTransaction.tags && editedTransaction.tags.length > 0 && (
              <div className="flex justify-between items-start pt-2">
                <span>Tags</span>
                <div className="flex flex-wrap gap-1 justify-end">
                  {editedTransaction.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-muted px-2 py-0.5 text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="border-t border-border px-6 py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={!isEditing || isSaving}
            className="flex flex-1 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:pointer-events-none"
          >
            {isSaving ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Changes
              </>
            )}
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-md border border-border hover:bg-destructive/10 hover:border-destructive/30">
            <Trash2 className="h-4 w-4 text-destructive" />
          </button>
        </div>
      </div>
    </div>
  );
}
