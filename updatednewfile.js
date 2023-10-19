// Accounts.java

package com.fis.accountmanagement.beans;

import java.util.List;

public class Account {
    private long accountNumber;
    private String customerName;
    private long mobileNumber;
    private String accountType;
    private String branch;
    private double accountBalance;

    @Override
    public String toString() {
        return "[Account Number=" + accountNumber + ", Customer Name=" + customerName + ", Mobile=" + mobileNumber + ", Account Type=" + accountType
                + ", Branch=" + branch + ", Balance=" + accountBalance + "]";
    }

    public Account(long accountNumber, String customerName, long mobileNumber, String accountType, String branch, double accountBalance) {
        super();
        this.accountNumber = accountNumber;
        this.customerName = customerName;
        this.mobileNumber = mobileNumber;
        this.accountType = accountType;
        this.branch = branch;
        this.accountBalance = accountBalance;
    }

    public Account() {
    }

    public long getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(long accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public long getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(long mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getAccountType() {
        return accountType;
    }

    public void setAccountType(String accountType) {
        this.accountType = accountType;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    public double getAccountBalance() {
        return accountBalance;
    }

    public void setAccountBalance(double accountBalance) {
        this.accountBalance = accountBalance;
    }
}




// Transactions.java

package com.fis.accountmanagement.beans;

import java.util.Date;

public class Transaction {
    private int transactionId;
    private long fromAccountNumber;
    private long toAccountNumber;
    private double transactionAmount;
    private Date transactionDate;
    String transactionType;
    double currentBalance;

    public Transaction(int transactionId, long fromAccountNumber, long toAccountNumber, double transactionAmount, Date transactionDate, String transactionType, double currentBalance) {
        super();
        this.transactionId = transactionId;
        this.fromAccountNumber = fromAccountNumber;
        this.toAccountNumber = toAccountNumber;
        this.transactionAmount = transactionAmount;
        this.transactionDate = transactionDate;
        this.transactionType = transactionType;
        this.currentBalance = currentBalance;
    }

    public Transaction() {
    }

    @Override
    public String toString() {
        return "[Transaction ID = " + transactionId + ", From Account Number = " + fromAccountNumber + ", To Account Number = " + toAccountNumber + ", Amount = "
                + transactionAmount + ", Date of Transaction = " + transactionDate + ", Transaction Type = " + transactionType + ", Current Balance = " + currentBalance + "]";
    }

    public int getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(int transactionId) {
        this.transactionId = transactionId;
    }

    public long getFromAccountNumber() {
        return fromAccountNumber;
    }

    public void setFromAccountNumber(long fromAccountNumber) {
        this.fromAccountNumber = fromAccountNumber;
    }

    public long getToAccountNumber() {
        return toAccountNumber;
    }

    public void setToAccountNumber(long toAccountNumber) {
        this.toAccountNumber = toAccountNumber;
    }

    public double getTransactionAmount() {
        return transactionAmount;
    }

    public void setTransactionAmount(double transactionAmount) {
        this.transactionAmount = transactionAmount;
    }

    public Date getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(Date transactionDate) {
        this.transactionDate = transactionDate;
    }

    public String getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(String transactionType) {
        this.transactionType = transactionType;
    }

    public double getCurrentBalance() {
        return currentBalance;
    }

    public void setCurrentBalance(double currentBalance) {
        this.currentBalance = currentBalance;
    }
}






// AccountClientRepo.java

package com.fis.accountmanagement.repo;

import com.fis.accountmanagement.beans.Accounts;
import com.fis.accountmanagement.exceptions.AccountNotFoundException;
import com.fis.accountmanagement.exceptions.InsufficientBalanceException;

public interface AccountClientRepository {
    String addAccount(Accounts account);

    Accounts getAccount(long accountNumber) throws AccountNotFoundException;

    void withdrawFromBalance(long accountNumber, double withdrawAmount) throws InsufficientBalanceException;

    void depositIntoBalance(long accountNumber, double depositAmount);
}




// AccountClientRepoImpl.java

package com.fis.accountmanagement.repo;

import java.util.HashMap;
import com.fis.accountmanagement.beans.Accounts;
import com.fis.accountmanagement.exceptions.AccountNotFoundException;
import com.fis.accountmanagement.exceptions.InsufficientBalanceException;

public class AccountClientRepositoryImpl implements AccountClientRepository {

    HashMap<Long, Accounts> clientAccounts = new HashMap<>();

    @Override
    public String addAccount(Accounts account) {
        clientAccounts.put(account.getAccountNumber(), account);
        return "Account Added Successfully!";
    }

    @Override
    public Accounts getAccount(long accountNumber) throws AccountNotFoundException {
        if (clientAccounts.containsKey(accountNumber)) {
            return clientAccounts.get(accountNumber);
        } else {
            throw new AccountNotFoundException("Invalid Account Number");
        }
    }

    @Override
    public void withdrawFromBalance(long accountNumber, double withdrawAmount) throws InsufficientBalanceException {
        if (clientAccounts.containsKey(accountNumber) && (clientAccounts.get(accountNumber).getAccountBalance() - withdrawAmount) >= 0) {
            clientAccounts.get(accountNumber).setAccountBalance(clientAccounts.get(accountNumber).getAccountBalance() - withdrawAmount);
        } else {
            throw new InsufficientBalanceException("Insufficient Balance");
        }
    }

    @Override
    public void depositIntoBalance(long accountNumber, double depositAmount) {
        if (clientAccounts.containsKey(accountNumber)) {
            clientAccounts.get(accountNumber).setAccountBalance(clientAccounts.get(accountNumber).getAccountBalance() + depositAmount);
        }
    }
}





// TransServiceRepo.java

package com.fis.accountmanagement.repo;

import java.util.ArrayList;
import com.fis.accountmanagement.beans.Transaction;

public interface TransServiceRepository {
    String addTransactionNEFT(long fromAccountNumber, long toAccountNumber, Transaction transaction);
    ArrayList<String> getTransactionsForAccountNumber(Transaction transaction, long showTransactionAccountNumber);
}





// AccountClientService.java

package com.fis.accountmanagement.service;

import com.fis.accountmanagement.beans.Accounts;
import com.fis.accountmanagement.exceptions.AccountNotFoundException;
import com.fis.accountmanagement.exceptions.InsufficientBalanceException;

public interface AccountClientService {
    String addAccount(Accounts account);
    Accounts getAccount(long accountNumber) throws AccountNotFoundException;
    void withdrawFromBalance(long accountNumber, double withdrawalAmount) throws InsufficientBalanceException;
    void depositIntoBalance(long accountNumber, double depositAmount);
}







// AccountClientServiceImpl.java

package com.fis.accountmanagement.service;

import com.fis.accountmanagement.beans.Accounts;
import com.fis.accountmanagement.exceptions.AccountNotFoundException;
import com.fis.accountmanagement.exceptions.InsufficientBalanceException;
import com.fis.accountmanagement.repo.AccountClientRepository;
import com.fis.accountmanagement.repo.AccountClientRepositoryImpl;

public class AccountClientServiceImpl implements AccountClientService {
    AccountClientRepository dao = new AccountClientRepositoryImpl();

    @Override
    public String addAccount(Accounts account) {
        return dao.addAccount(account);
    }

    @Override
    public Accounts getAccount(long accountNumber) throws AccountNotFoundException {
        return dao.getAccount(accountNumber);
    }

    @Override
    public void withdrawFromBalance(long accountNumber, double withdrawalAmount) throws InsufficientBalanceException {
        dao.withdrawFromBalance(accountNumber, withdrawalAmount);
    }

    @Override
    public void depositIntoBalance(long accountNumber, double depositAmount) {
        dao.depositIntoBalance(accountNumber, depositAmount);
    }
}






// TransService.java

package com.fis.accountmanagement.service;

import java.util.ArrayList;
import com.fis.accountmanagement.beans.Transaction;

public interface TransService {
    String addTransactionNEFT(long fromAccountNumber, long toAccountNumber, Transaction transaction);
    ArrayList<String> getTransactionsForAccountNumber(Transaction transaction, long showTransactionAccountNumber);
}






// TransServiceImpl.java

package com.fis.accountmanagement.service;

import java.util.ArrayList;
import com.fis.accountmanagement.beans.Transaction;
import com.fis.accountmanagement.repo.TransServiceRepository;
import com.fis.accountmanagement.repo.TransServiceRepositoryImpl;

public class TransServiceImpl implements TransService {
    TransServiceRepository dao = new TransServiceRepositoryImpl();

    @Override
    public String addTransactionNEFT(long fromAccountNumber, long toAccountNumber, Transaction transaction) {
        return dao.addTransactionNEFT(fromAccountNumber, toAccountNumber, transaction);
    }

    @Override
    public ArrayList<String> getTransactionsForAccountNumber(Transaction transaction, long showTransactionAccountNumber) {
        return dao.getTransactionsForAccountNumber(transaction, showTransactionAccountNumber);
    }
}







// AccountClient.java

package com.fis.accountmanagement.ui;

import java.util.Date;
import java.util.Scanner;
import com.fis.accountmanagement.beans.Accounts;
import com.fis.accountmanagement.beans.Transaction;
import com.fis.accountmanagement.exceptions.AccountNotFoundException;
import com.fis.accountmanagement.exceptions.InsufficientBalanceException;
import com.fis.accountmanagement.service.AccountClientService;
import com.fis.accountmanagement.service.AccountClientServiceImpl;
import com.fis.accountmanagement.service.TransService;
import com.fis.accountmanagement.service.TransServiceImpl;

public class AccountClient {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);
        long accountNumber = 1000;
        String customerName;
        long mobile;
        String accountType;
        String branch;
        double balance;
        int transactionId = 100;
        long fromAccountNumber;
        long toAccountNumber;
        double amount;
        Date transactionDate;
        String transactionType;

        Accounts account = null;
        Transaction transaction = null;
        AccountClientService service = new AccountClientServiceImpl();
        TransService transService = new TransServiceImpl();

        while (true) {
            System.out.println("--------BANK ACCOUNT MANAGEMENT SYSTEM--------");
            System.out.println("1. Create new account");
            System.out.println("2. Withdraw");
            System.out.println("3. Deposit");
            System.out.println("4. Show customer details");
            System.out.println("5. Fund transfer");
            System.out.println("6. Show Transaction Details");
            System.out.println("7. Exit application");
            int choice = sc.nextInt();

            switch (choice) {

                case 1:
                    System.out.println("----CREATE NEW ACCOUNT----");
                    System.out.println("Enter name: ");
                    customerName = sc.next();
                    System.out.println("Enter mobile number: ");
                    mobile = sc.nextLong();
                    System.out.println("Enter account type (saving or checking): ");
                    accountType = sc.next();
                    System.out.println("Enter branch: ");
                    branch = sc.next();
                    balance = 100;
                    account = new Accounts(accountNumber, customerName, mobile, accountType, branch, balance);
                    System.out.println(service.addAccount(account) + " with Account Number " + accountNumber);
                    accountNumber++;
                    break;

                case 2:
                    System.out.println("----WITHDRAW FROM ACCOUNT----");
                    System.out.println("Enter account number from which you wish to withdraw: ");
                    long withdrawalAccountNumber = sc.nextLong();
                    try {
                        System.out.println(service.getAccount(withdrawalAccountNumber));
                        System.out.println("Enter amount you wish to withdraw: ");
                        double withdrawalAmount = sc.nextDouble();
                        if (withdrawalAmount <= (service.getAccount(withdrawalAccountNumber).getAccountBalance())) {
                            System.out.println("Old Balance : " + service.getAccount(withdrawalAccountNumber).getAccountBalance());
                            service.withdrawFromBalance(withdrawalAccountNumber, withdrawalAmount);
                            System.out.println("New Balance : " + service.getAccount(withdrawalAccountNumber).getAccountBalance());
                        } else {
                            throw new InsufficientBalanceException("Insufficient Balance");
                        }
                    } catch (AccountNotFoundException anf) {
                        System.out.println("Invalid Account Number...");
                    } catch (InsufficientBalanceException ibe) {
                        System.out.println("Insufficient Balance");
                    }
                    break;

                case 3:
                    System.out.println("----DEPOSIT INTO ACCOUNT----");
                    System.out.println("Enter account number into which you wish to deposit: ");
                    long depositAccountNumber = sc.nextLong();
                    try {
                        System.out.println(service.getAccount(depositAccountNumber));
                        System.out.println("Enter amount you wish to deposit: ");
                        double depositAmount = sc.nextDouble();
                        System.out.println("Old Balance : " + service.getAccount(depositAccountNumber).getAccountBalance());
                        service.depositIntoBalance(depositAccountNumber, depositAmount);
                        System.out.println("New Balance : " + service.getAccount(depositAccountNumber).getAccountBalance());
                    } catch (AccountNotFoundException anf) {
                        System.out.println("Invalid Account Number...");
                    }
                    break;

                case 4:
                    System.out.println("----SHOW CUSTOMER DETAILS----");
                    System.out.println("Enter account number to show details: ");
                    long showAccountNumber = sc.nextLong();
                    try {
                        System.out.println(service.getAccount(showAccountNumber));
                    } catch (AccountNotFoundException anf) {
                        System.out.println("Invalid Account Number...");
                    }
                    break;

                case 5:
                    System.out.println("----FUND TRANSFER----");
                    System.out.println("Enter account number from which you wish to transfer: ");
                    fromAccountNumber = sc.nextLong();
                    System.out.println("Enter account number to which you wish to transfer: ");
                    toAccountNumber = sc.nextLong();
                    System.out.println("Enter amount you wish to transfer: ");
                    amount = sc.nextDouble();
                    try {
                        if (amount <= service.getAccount(fromAccountNumber).getAccountBalance()) {
                            transactionType = "NEFT";
                            transactionDate = new Date();
                            transaction = new Transaction(transactionId, fromAccountNumber, toAccountNumber, amount, transactionDate, transactionType);
                            System.out.println(transService.addTransactionNEFT(fromAccountNumber, toAccountNumber, transaction));
                            transactionId++;
                            System.out.println("Old Balance : " + service.getAccount(fromAccountNumber).getAccountBalance());
                            service.withdrawFromBalance(fromAccountNumber, amount);
                            System.out.println("New Balance : " + service.getAccount(fromAccountNumber).getAccountBalance());
                        } else {
                            throw new InsufficientBalanceException("Insufficient Balance");
                        }
                    } catch (AccountNotFoundException anf) {
                        System.out.println("Invalid Account Number...");
                    } catch (InsufficientBalanceException ibe) {
                        System.out.println("Insufficient Balance");
                    }
                    break;

                case 6:
                    System.out.println("----SHOW TRANSACTION DETAILS----");
                    System.out.println("Enter account number to show transactions: ");
                    long showTransactionAccountNumber = sc.nextLong();
                    transaction = new Transaction(0, 0, 0, 0, null, null);
                    System.out.println("Transactions for account number: " + showTransactionAccountNumber);
                    System.out.println(transService.getTransactionsForAccountNumber(transaction, showTransactionAccountNumber));
                    break;

                case 7:
                    System.out.println("Exiting application. Have a nice day!");
                    sc.close();
                    System.exit(0);
                    break;

                default:
                    System.out.println("Invalid choice. Please try again.");
            }
        }
    }
}






// TransServiceRepoImpl.java

package com.fis.accountmanagement.repo;

import java.util.ArrayList;
import java.util.Date;
import com.fis.accountmanagement.beans.Transaction;

public class TransServiceRepoImpl implements TransServiceRepository {

    private static ArrayList<Transaction> transactions = new ArrayList<>();

    @Override
    public String addTransactionNEFT(long fromAccountNumber, long toAccountNumber, Transaction transaction) {
        transaction.setTransactionId(transactions.size() + 100);
        transaction.setTransactionDate(new Date());
        transactions.add(transaction);
        return "NEFT Transaction successful. Transaction ID: " + transaction.getTransactionId();
    }

    @Override
    public ArrayList<String> getTransactionsForAccountNumber(Transaction transaction, long showTransactionAccountNumber) {
        ArrayList<String> accountTransactions = new ArrayList<>();
        for (Transaction trans : transactions) {
            if (trans.getFromAccountNumber() == showTransactionAccountNumber || trans.getToAccountNumber() == showTransactionAccountNumber) {
                accountTransactions.add(trans.toString());
            }
        }
        return accountTransactions;
    }
}






package com.fis.accountmanagement.exceptions;

public class AccountNotFoundException extends Exception {
    public AccountNotFoundException(String message) {
        super(message);
    }
}






package com.fis.accountmanagement.exceptions;

public class InsufficientBalanceException extends Exception {
    public InsufficientBalanceException(String message) {
        super(message);
    }
}




