"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft } from "lucide-react";
import type { Transaction } from "./types";
import { TransactionsLedger } from "./transactions-ledger";
import { TransactionDetailPanel } from "./transaction-detail-panel";

interface LedgerViewProps {
  onClose: () => void;
}

export function LedgerView({ onClose }: LedgerViewProps) {
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const handleTransactionSelect = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleCloseDetail = () => {
    setSelectedTransaction(null);
  };

  const handleSaveTransaction = (transaction: Transaction) => {
    // In a real app, this would call the API to save
    console.log("[v0] Saving transaction:", transaction);
    // For now, just close the panel
    setSelectedTransaction(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col bg-background"
    >
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border bg-card px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </button>
          <div className="h-5 w-px bg-border" />
          <div>
            <h1 className="text-lg font-semibold text-foreground">
              Transactions Ledger
            </h1>
            <p className="text-xs text-muted-foreground">
              All your financial transactions in one place
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-muted"
        >
          <X className="h-5 w-5 text-muted-foreground" />
        </button>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Transactions Table */}
        <div className="flex-1 overflow-hidden bg-card">
          <TransactionsLedger
            onTransactionSelect={handleTransactionSelect}
            selectedTransactionId={selectedTransaction?.id}
          />
        </div>

        {/* Detail Panel - Slides in from right */}
        <AnimatePresence>
          {selectedTransaction && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 420, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="overflow-hidden"
            >
              <TransactionDetailPanel
                transaction={selectedTransaction}
                onClose={handleCloseDetail}
                onSave={handleSaveTransaction}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
