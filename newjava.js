// Accounts.java

package com.fis.accountmanagement.beans;

import java.util.List;

public class Accounts {
	private long accNo;
	private String custName;
	private long mobile;
	private String accType;
	private String branch;
	private double balance;
//	private List<Transactions> transaction;
	@Override
	public String toString() {
		return "[Account Number=" + accNo + ", Customer Name=" + custName + ", Mobile=" + mobile + ", Account Type=" + accType
				+ ", Branch=" + branch + ", Balance=" + balance + "]";
	}
	public Accounts(long accNo, String custName, long mobile, String accType, String branch, double balance) {
		super();
		this.accNo = accNo;
		this.custName = custName;
		this.mobile = mobile;
		this.accType = accType;
		this.branch = branch;
		this.balance = balance;
	}
	public Accounts() {
	}
	/**
	 * @return the accNo
	 */
	public long getAccNo() {
		return accNo;
	}
	/**
	 * @param accNo the accNo to set
	 */
	public void setAccNo(long accNo) {
		this.accNo = accNo;
	}
	/**
	 * @return the custName
	 */
	public String getCustName() {
		return custName;
	}
	/**
	 * @param custName the custName to set
	 */
	public void setCustName(String custName) {
		this.custName = custName;
	}
	/**
	 * @return the mobile
	 */
	public long getMobile() {
		return mobile;
	}
	/**
	 * @param mobile the mobile to set
	 */
	public void setMobile(long mobile) {
		this.mobile = mobile;
	}
	/**
	 * @return the accType
	 */
	public String getAccType() {
		return accType;
	}
	/**
	 * @param accType the accType to set
	 */
	public void setAccType(String accType) {
		this.accType = accType;
	}
	/**
	 * @return the branch
	 */
	public String getBranch() {
		return branch;
	}
	/**
	 * @param branch the branch to set
	 */
	public void setBranch(String branch) {
		this.branch = branch;
	}
	/**
	 * @return the balance
	 */
	public double getBalance() {
		return balance;
	}
	/**
	 * @param balance the balance to set
	 */
	public void setBalance(double balance) {
		this.balance = balance;
	}
	
	
}


// Transactions.java

package com.fis.accountmanagement.beans;

import java.util.Date;

public class Transactions {
	private int transId;
	private long accNoFrom;
	private long accNoTo;
	private double amount;
	private Date dateOfTrans;
	String transType;
	double balance;
	
	public Transactions(int transId, long accNoFrom, long accNoTo, double amount, Date dateOfTrans, String transType,
			double balance) {
		super();
		this.transId = transId;
		this.accNoFrom = accNoFrom;
		this.accNoTo = accNoTo;
		this.amount = amount;
		this.dateOfTrans = dateOfTrans;
		this.transType = transType;
		this.balance = balance;
	}

	public Transactions() {
	}

	@Override
	public String toString() {
		return "[Transaction ID = " + transId + ", Account Number From = " + accNoFrom + ", Account Number To = " + accNoTo + ", Amount = "
				+ amount + ", Date Of Transaction = " + dateOfTrans + ", Transaction Type = " + transType + ", Balance = " + balance + "]";
	}
	
	/**
	 * @return the transId
	 */
	public int getTransId() {
		return transId;
	}
	/**
	 * @param transId the transId to set
	 */
	public void setTransId(int transId) {
		this.transId = transId;
	}
	/**
	 * @return the accNoFrom
	 */
	public long getAccNoFrom() {
		return accNoFrom;
	}
	/**
	 * @param accNoFrom the accNoFrom to set
	 */
	public void setAccNoFrom(long accNoFrom) {
		this.accNoFrom = accNoFrom;
	}
	/**
	 * @return the accNoTo
	 */
	public long getAccNoTo() {
		return accNoTo;
	}
	/**
	 * @param accNoTo the accNoTo to set
	 */
	public void setAccNoTo(long accNoTo) {
		this.accNoTo = accNoTo;
	}
	/**
	 * @return the amount
	 */
	public double getAmount() {
		return amount;
	}
	/**
	 * @param amount the amount to set
	 */
	public void setAmount(double amount) {
		this.amount = amount;
	}
	/**
	 * @return the dateOfTrans
	 */
	public Date getDateOfTrans() {
		return dateOfTrans;
	}
	/**
	 * @param dateOfTrans the dateOfTrans to set
	 */
	public void setDateOfTrans(Date dateOfTrans) {
		this.dateOfTrans = dateOfTrans;
	}
	/**
	 * @return the transType
	 */
	public String getTransType() {
		return transType;
	}
	/**
	 * @param transType the transType to set
	 */
	public void setTransType(String transType) {
		this.transType = transType;
	}
	/**
	 * @return the balance
	 */
	public double getBalance() {
		return balance;
	}
	/**
	 * @param balance the balance to set
	 */
	public void setBalance(double balance) {
		this.balance = balance;
	}
}


// AccountNotFound.java
package com.fis.accountmanagement.exceptions;

public class AccountNotFound extends Exception{
	public AccountNotFound(String message) {
		super(message);
	}
}


// NotEnoughBalance.java
package com.fis.accountmanagement.exceptions;

public class NotEnoughBalance extends Exception {
	public NotEnoughBalance(String message) {
		super(message);
	}
}



// AccountClientRepo.java
package com.fis.accountmanagement.repo;

import com.fis.accountmanagement.beans.Accounts;
import com.fis.accountmanagement.exceptions.AccountNotFound;
import com.fis.accountmanagement.exceptions.NotEnoughBalance;

public interface AccountClientRepo {
	public abstract String addAccount(Accounts account);

	public abstract Accounts getAccount(long getAcc) throws AccountNotFound;
	
	public abstract void withdrawFromBalance(long getAcc, double withdrawAmount) throws NotEnoughBalance;

	public abstract void depositIntoBalance(long getAcc, double depositAmount);
}



// AccountClientRepoImpl.java

package com.fis.accountmanagement.repo;

import java.util.HashMap;

import com.fis.accountmanagement.beans.Accounts;
import com.fis.accountmanagement.exceptions.AccountNotFound;
import com.fis.accountmanagement.exceptions.NotEnoughBalance;

public class AccountClientRepoImpl implements AccountClientRepo {

	HashMap<Long, Accounts> clientAccounts = new HashMap<Long, Accounts>();

	@Override
	public String addAccount(Accounts accounts) {
		// TODO Auto-generated method stub

		clientAccounts.put(accounts.getAccNo(), accounts);

		return "Account Added Successfully!";
	}

	@Override
	public Accounts getAccount(long getAcc) throws AccountNotFound {
		// TODO Auto-generated method stub
		if (clientAccounts.containsKey(getAcc)) {
			return clientAccounts.get(getAcc);
		} else {
			throw new AccountNotFound("Invalid Account Number");
		}
	}

	@Override
	public void withdrawFromBalance(long getAcc, double withdrawAmount) throws NotEnoughBalance{

		if (clientAccounts.containsKey(getAcc) && (clientAccounts.get(getAcc).getBalance() - withdrawAmount) > -1) {
			clientAccounts.get(getAcc).setBalance(clientAccounts.get(getAcc).getBalance() - withdrawAmount);
		}
		else {
			throw new NotEnoughBalance("Not enough Balance");
		}
	}
	
	@Override
	public void depositIntoBalance(long getAcc, double depositAmount) {

		if (clientAccounts.containsKey(getAcc)) {
			clientAccounts.get(getAcc).setBalance(clientAccounts.get(getAcc).getBalance() + depositAmount);
		}
	}

}



// TransServiceRepo.java
package com.fis.accountmanagement.repo;

import java.util.ArrayList;

import com.fis.accountmanagement.beans.Transactions;

public interface TransServiceRepo {
	
	public abstract String addTransactionNEFT(long transFromAcc, long neftAccNo, Transactions transaction);
	
	public abstract ArrayList<String> getTransForAccNo(Transactions transaction, long showTransAccNo);

}



// TransServiceRepoImpl.java

package com.fis.accountmanagement.repo;

import java.util.ArrayList;
import java.util.HashMap;

import com.fis.accountmanagement.beans.Transactions;

public class TransServiceRepoImpl implements TransServiceRepo{

	HashMap<Long, Transactions> clientAccTransactions = new HashMap<Long, Transactions>();
	ArrayList<String> allTrans = new ArrayList<String>();
	
	@Override
	public String addTransactionNEFT(long transFromAcc, long neftAccNo, Transactions transaction) {
		
		clientAccTransactions.put(transFromAcc, transaction);
		clientAccTransactions.put(neftAccNo, transaction);
		
		System.out.println("Successfully transferred from " + transFromAcc + " to " + neftAccNo 
				+ " with TransactionID " + transaction.getTransId());
		
		return "Transaction Added to Account Transaction History";
	}

	@Override
	public ArrayList<String> getTransForAccNo(Transactions transaction, long showTransAccNo) {
		
		while(true) {
			if (transaction.getAccNoFrom() == showTransAccNo) {
				allTrans.add(transaction.toString());
			}
			if (transaction.getAccNoTo() == showTransAccNo) {
				allTrans.add(transaction.toString());
			}
			return allTrans;
		}
	}

}

// AccountClientService.java

package com.fis.accountmanagement.service;

import com.fis.accountmanagement.beans.Accounts;
import com.fis.accountmanagement.exceptions.AccountNotFound;
//import com.fis.accountmanagement.exceptions.NotEnoughBalance;
import com.fis.accountmanagement.exceptions.NotEnoughBalance;

public interface AccountClientService {
	public abstract String addAccount(Accounts account);

	public abstract Accounts getAccount(long getAcc) throws AccountNotFound;
	
	public abstract void withdrawFromBalance(long getAcc, double withdrawAmount) throws NotEnoughBalance;

	public abstract void depositIntoBalance(long getAcc, double depositAmount);
	
//	public abstract Accounts getBalance(double getAccBalance) throws NotEnoughBalance;
}


// AccountClientServiceImpl

package com.fis.accountmanagement.service;

import com.fis.accountmanagement.beans.Accounts;
import com.fis.accountmanagement.exceptions.AccountNotFound;
import com.fis.accountmanagement.exceptions.NotEnoughBalance;
//import com.fis.accountmanagement.exceptions.NotEnoughBalance;
import com.fis.accountmanagement.repo.AccountClientRepo;
import com.fis.accountmanagement.repo.AccountClientRepoImpl;

public class AccountClientServiceImpl implements AccountClientService {
	AccountClientRepo dao = new AccountClientRepoImpl();

	@Override
	public String addAccount(Accounts account) {
		return dao.addAccount(account);

	}

	@Override
	public Accounts getAccount(long getAcc) throws AccountNotFound {
		return dao.getAccount(getAcc);

	}

	@Override
	public void withdrawFromBalance(long getAcc, double withdrawAmount) throws NotEnoughBalance {
		
		dao.withdrawFromBalance(getAcc, withdrawAmount);
	}
	
	@Override
	public void depositIntoBalance(long getAcc, double depositAmount) {
		
		dao.depositIntoBalance(getAcc, depositAmount);
	}
//	@Override
//	public Accounts getBalance(double getAccBalance) throws NotEnoughBalance {
//		// TODO Auto-generated method stub
//		return null;
//	}

}


// TransService.java

package com.fis.accountmanagement.service;

import java.util.ArrayList;

import com.fis.accountmanagement.beans.Transactions;

public interface TransService {
	public abstract String addTransactionNEFT(long transFromAcc, long neftAccNo, Transactions transaction);
	
	public abstract ArrayList<String> getTransForAccNo(Transactions transaction, long showTransAccNo);
}

// TransServiceImpl.java

package com.fis.accountmanagement.service;

import java.util.ArrayList;

import com.fis.accountmanagement.beans.Transactions;
import com.fis.accountmanagement.repo.TransServiceRepo;
import com.fis.accountmanagement.repo.TransServiceRepoImpl;

public class TransServiceImpl implements TransService {
	TransServiceRepo dao = new TransServiceRepoImpl();

	@Override
	public String addTransactionNEFT(long transFromAcc, long neftAccNo, Transactions transaction) {
		return dao.addTransactionNEFT(transFromAcc, neftAccNo, transaction);
	}

	@Override
	public ArrayList<String> getTransForAccNo(Transactions transaction, long showTransAccNo) {
		return dao.getTransForAccNo(transaction, showTransAccNo);
	}

}



// AccountClient.java

package com.fis.accountmanagement.ui;

import java.util.Date;
import java.util.Scanner;

import com.fis.accountmanagement.beans.Accounts;
import com.fis.accountmanagement.beans.Transactions;
import com.fis.accountmanagement.exceptions.AccountNotFound;
import com.fis.accountmanagement.exceptions.NotEnoughBalance;
import com.fis.accountmanagement.service.AccountClientService;
import com.fis.accountmanagement.service.AccountClientServiceImpl;
import com.fis.accountmanagement.service.TransService;
import com.fis.accountmanagement.service.TransServiceImpl;

public class AccountClient {

	public static void main(String[] args) {

		Scanner sc = new Scanner(System.in);
		long accNo = 1000;
		String custName;
		long mobile;
		String accType;
		String branch;
		double balance;
		int transId = 100;
		long accNoFrom;
		long accNoTo;
		double amount;
		Date dateOfTrans;
		String transType;

		Accounts account = null;
		Transactions transaction = null;
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
				custName = sc.next();
				System.out.println("Enter mobile number: ");
				mobile = sc.nextLong();
				System.out.println("Enter account type (saving or checking): ");
				accType = sc.next();
				System.out.println("Enter branch: ");
				branch = sc.next();
				balance = 100;
				account = new Accounts(accNo, custName, mobile, accType, branch, balance);
				System.out.println(service.addAccount(account) + " with Account Number " + accNo);
				accNo++;
				break;

			case 2:
				System.out.println("----WITHDRAW FROM ACCOUNT----");
				System.out.println("Enter account number from which you wish to withdraw: ");
				long wdAccNo = sc.nextLong();
				try {
					System.out.println(service.getAccount(wdAccNo));
					System.out.println("Enter amount you wish to withdraw: ");
					double wdAmount = sc.nextDouble();
					if (wdAmount <= (service.getAccount(wdAccNo).getBalance())) {
						System.out.println("Old Balance : " + service.getAccount(wdAccNo).getBalance());
						service.withdrawFromBalance(wdAccNo, wdAmount);
						System.out.println("New Balance : " + service.getAccount(wdAccNo).getBalance());
					} else {
						throw new NotEnoughBalance("Not enough Balance");
					}
				} catch (AccountNotFound anf) {
					System.out.println("Invalid Account Number...");
				} catch (NotEnoughBalance neb) {
					System.out.println("Not enough Balance");
				}
				break;

			case 3:
				System.out.println("----DEPOSIT INTO ACCOUNT----");
				System.out.println("Enter account number into which you wish to deposit: ");
				long dpAccNo = sc.nextLong();
				try {
					System.out.println(service.getAccount(dpAccNo));
					System.out.println("Enter amount you wish to deposit: ");
					double dpAmount = sc.nextDouble();
					System.out.println("Old Balance : " + service.getAccount(dpAccNo).getBalance());
					service.depositIntoBalance(dpAccNo, dpAmount);
					System.out.println("New Balance : " + service.getAccount(dpAccNo).getBalance());
				} catch (AccountNotFound anf) {
					System.out.println("Invalid Account Number...");
				}
				break;

			case 4:
				System.out.println("----SHOW DETAILS----");
				System.out.println("Enter account number to show details: ");
				long accNoQuery = sc.nextLong();
				try {
					System.out.println(service.getAccount(accNoQuery));
				} catch (AccountNotFound anf) {
					System.out.println("Enter valid account number....");
				}
				break;

			case 5:
				System.out.println("----FUND TRANSFER----");
				System.out.println("Enter your account number to start transaction: ");
				long transFromAcc = sc.nextLong();
				try {
					System.out.println(service.getAccount(transFromAcc));
					System.out.println("Enter which service you wish to use:\n1. NEFT\n2. RTGS\n3. IMPS");
					int transServiceRequested = sc.nextInt();
					switch (transServiceRequested) {
					case 1:
						System.out.println("NEFT selected...");
						System.out.println("Enter beneficiary account number: ");
						long neftAccNo = sc.nextLong();
						try {
							service.getAccount(neftAccNo);
						} catch (AccountNotFound anf) {
							System.out.println("Wrong Account Number of beneficiary... Transaction Cancelled...");
						}
						System.out.println("Enter Amount to transfer: ");
						double neftAmount = sc.nextDouble();
						
						
						try {
							double transWithdrawAmount = neftAmount;
							if (transWithdrawAmount <= (service.getAccount(transFromAcc).getBalance())) {
								System.out.println("Old Balance of " + transFromAcc + " is " + service.getAccount(transFromAcc).getBalance());
								service.withdrawFromBalance(transFromAcc, transWithdrawAmount);
								System.out.println("New Balance of " + transFromAcc + " is " + service.getAccount(transFromAcc).getBalance());
							} else {
								throw new NotEnoughBalance("Not enough Balance");
							}
						} catch (NotEnoughBalance neb) {
							System.out.println("Not enough Balance");
							break;
						}
						
						try {
							double transDepositAmount = neftAmount;
							System.out.println("Old Balance of " + neftAccNo + " is " + service.getAccount(neftAccNo).getBalance());
							service.depositIntoBalance(neftAccNo, transDepositAmount);
							System.out.println("New Balance of " + neftAccNo + " is " + service.getAccount(neftAccNo).getBalance());
						} finally {
							System.out.println("Transaction Successful via NEFT.");
							accNoFrom = transFromAcc;
							accNoTo = neftAccNo;
							amount = neftAmount;
							dateOfTrans = new Date();
							transType = "NEFT";
							balance = service.getAccount(transFromAcc).getBalance();
							transaction = new Transactions(transId, accNoFrom, accNoTo, amount, dateOfTrans, transType, balance);
							transId++;
							transService.addTransactionNEFT(transFromAcc, neftAccNo, transaction);
							System.out.println(service.getAccount(transFromAcc));
						}
						
						break;
						
					case 2:
						System.out.println("RTGS selected...");
						System.out.println("Enter beneficiary account number: ");
						long rtgsAccNo = sc.nextLong();
						try {
							service.getAccount(rtgsAccNo);
						} catch (AccountNotFound anf) {
							System.out.println("Wrong Account Number of beneficiary... Transaction Cancelled...");
						}
						System.out.println("Enter Amount to transfer: ");
						double rtgsAmount = sc.nextDouble();
						
						
						try {
							double transWithdrawAmount = rtgsAmount;
							if (transWithdrawAmount <= (service.getAccount(transFromAcc).getBalance())) {
								System.out.println("Old Balance of " + transFromAcc + " is " + service.getAccount(transFromAcc).getBalance());
								service.withdrawFromBalance(transFromAcc, transWithdrawAmount);
								System.out.println("New Balance of " + transFromAcc + " is " + service.getAccount(transFromAcc).getBalance());
							} else {
								throw new NotEnoughBalance("Not enough Balance");
							}
						} catch (NotEnoughBalance neb) {
							System.out.println("Not enough Balance");
							break;
						}
						
						try {
							double transDepositAmount = rtgsAmount;
							System.out.println("Old Balance of " + rtgsAccNo + " is " + service.getAccount(rtgsAccNo).getBalance());
							service.depositIntoBalance(rtgsAccNo, transDepositAmount);
							System.out.println("New Balance of " + rtgsAccNo + " is " + service.getAccount(rtgsAccNo).getBalance());
						} finally {
							System.out.println("Transaction Successful via RTGS.");
							accNoFrom = transFromAcc;
							accNoTo = rtgsAccNo;
							amount = rtgsAmount;
							dateOfTrans = new Date();
							transType = "RTGS";
							balance = service.getAccount(transFromAcc).getBalance();
							transaction = new Transactions(transId, accNoFrom, accNoTo, amount, dateOfTrans, transType, balance);
							transId++;
							transService.addTransactionNEFT(transFromAcc, rtgsAccNo, transaction);
							System.out.println(service.getAccount(transFromAcc));
						}
						break;
					case 3:
						System.out.println("IMPS selected...");
						System.out.println("Enter beneficiary account number: ");
						long impsAccNo = sc.nextLong();
						try {
							service.getAccount(impsAccNo);
						} catch (AccountNotFound anf) {
							System.out.println("Wrong Account Number of beneficiary... Transaction Cancelled...");
						}
						System.out.println("Enter Amount to transfer: ");
						double impsAmount = sc.nextDouble();
						
						
						try {
							double transWithdrawAmount = impsAmount;
							if (transWithdrawAmount <= (service.getAccount(transFromAcc).getBalance())) {
								System.out.println("Old Balance of " + transFromAcc + " is " + service.getAccount(transFromAcc).getBalance());
								service.withdrawFromBalance(transFromAcc, transWithdrawAmount);
								System.out.println("New Balance of " + transFromAcc + " is " + service.getAccount(transFromAcc).getBalance());
							} else {
								throw new NotEnoughBalance("Not enough Balance");
							}
						} catch (NotEnoughBalance neb) {
							System.out.println("Not enough Balance");
							break;
						}
						
						try {
							double transDepositAmount = impsAmount;
							System.out.println("Old Balance of " + impsAccNo + " is " + service.getAccount(impsAccNo).getBalance());
							service.depositIntoBalance(impsAccNo, transDepositAmount);
							System.out.println("New Balance of " + impsAccNo + " is " + service.getAccount(impsAccNo).getBalance());
						} finally {
							System.out.println("Transaction Successful via RTGS.");
							accNoFrom = transFromAcc;
							accNoTo = impsAccNo;
							amount = impsAmount;
							dateOfTrans = new Date();
							transType = "IMPS";
							balance = service.getAccount(transFromAcc).getBalance();
							transaction = new Transactions(transId, accNoFrom, accNoTo, amount, dateOfTrans, transType, balance);
							transId++;
							transService.addTransactionNEFT(transFromAcc, impsAccNo, transaction);
							System.out.println(service.getAccount(transFromAcc));
						}
						break;
					default:
						System.out.println("Wrong Input... Transaction Cancelled...");
						break;
					}
				} catch (AccountNotFound anf) {
					System.out.println("Enter valid account number...");
				}
				break;

			case 6:
				System.out.println("----SHOW ACCOUNT TRANSACTIONS----");
				System.out.println("Enter account number to show transactions: ");
				long showTransAccNo = sc.nextLong();
				try {
					service.getAccount(showTransAccNo);
					System.out.println(transService.getTransForAccNo(transaction, showTransAccNo)); 
				} catch (AccountNotFound anf) {
					System.out.println("Enter valid account number....");
				}
				break;

			case 7:
				System.out.println("Goodbye!");
				sc.close();
				System.exit(0);
				break;
			default:
				System.out.println("Wrong Input. Try again!");
			}
		}
	}
}



// module-info.java

module BankManagemenetApplication {
}




