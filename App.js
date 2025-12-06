import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from './src/components/Header';
import TabNavigation from './src/components/TabNavigation';
import TransactionsTab from './src/screens/TransactionsTab';
import DebtsTab from './src/screens/DebtsTab';
import ReportsTab from './src/screens/ReportsTab';
import AIAdvisorTab from './src/screens/AIAdvisorTab';
import FloatingButton from './src/components/FloatingButton';
import TransactionModal from './src/components/TransactionModal';
import DebtModal from './src/components/DebtModal';

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [debts, setDebts] = useState([]);
  const [activeTab, setActiveTab] = useState('transactions');
  const [showModal, setShowModal] = useState(false);
  const [showDebtModal, setShowDebtModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingDebtId, setEditingDebtId] = useState(null);

  // Load data from AsyncStorage
  useEffect(() => {
    loadData();
  }, []);

  // Save data whenever it changes
  useEffect(() => {
    saveData();
  }, [transactions, debts]);

  const loadData = async () => {
    try {
      const transactionsData = await AsyncStorage.getItem('transactions');
      const debtsData = await AsyncStorage.getItem('debts');
      if (transactionsData) setTransactions(JSON.parse(transactionsData));
      if (debtsData) setDebts(JSON.parse(debtsData));
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('transactions', JSON.stringify(transactions));
      await AsyncStorage.setItem('debts', JSON.stringify(debts));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const addTransaction = (transaction) => {
    setTransactions([...transactions, { ...transaction, id: Date.now() }]);
  };

  const updateTransaction = (id, transaction) => {
    setTransactions(transactions.map(t => t.id === id ? { ...transaction, id } : t));
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const addDebt = (debt) => {
    setDebts([...debts, { ...debt, id: Date.now() }]);
  };

  const updateDebt = (id, debt) => {
    setDebts(debts.map(d => d.id === id ? { ...debt, id } : d));
  };

  const deleteDebt = (id) => {
    setDebts(debts.filter(d => d.id !== id));
  };

  const payDebt = (id) => {
    setDebts(debts.map(d => d.id === id ? { ...d, status: 'paid' } : d));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6366f1" />
      
      <Header />
      
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <View style={styles.content}>
        {activeTab === 'transactions' && (
          <TransactionsTab
            transactions={transactions}
            onDelete={deleteTransaction}
            onEdit={(transaction) => {
              setEditingId(transaction.id);
              setShowModal(true);
            }}
          />
        )}

        {activeTab === 'debts' && (
          <DebtsTab
            debts={debts}
            onDelete={deleteDebt}
            onEdit={(debt) => {
              setEditingDebtId(debt.id);
              setShowDebtModal(true);
            }}
            onPay={payDebt}
          />
        )}

        {activeTab === 'reports' && (
          <ReportsTab transactions={transactions} />
        )}

        {activeTab === 'ai' && (
          <AIAdvisorTab transactions={transactions} debts={debts} />
        )}
      </View>

      {(activeTab === 'transactions' || activeTab === 'debts') && (
        <FloatingButton
          onPress={() => activeTab === 'transactions' ? setShowModal(true) : setShowDebtModal(true)}
        />
      )}

      <TransactionModal
        visible={showModal}
        editingId={editingId}
        transactions={transactions}
        onClose={() => {
          setShowModal(false);
          setEditingId(null);
        }}
        onSave={(transaction) => {
          if (editingId) {
            updateTransaction(editingId, transaction);
          } else {
            addTransaction(transaction);
          }
          setShowModal(false);
          setEditingId(null);
        }}
      />

      <DebtModal
        visible={showDebtModal}
        editingId={editingDebtId}
        debts={debts}
        onClose={() => {
          setShowDebtModal(false);
          setEditingDebtId(null);
        }}
        onSave={(debt) => {
          if (editingDebtId) {
            updateDebt(editingDebtId, debt);
          } else {
            addDebt(debt);
          }
          setShowDebtModal(false);
          setEditingDebtId(null);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
  },
});