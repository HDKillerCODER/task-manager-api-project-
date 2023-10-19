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
