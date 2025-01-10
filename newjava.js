import os
import sys
from datetime import datetime

# Function to send an email using sendmail
def send_email(subject, body, recipient="nandeeshwaran.v@fisglobal.com"):
    """
    Sends an email using the `sendmail` command.
    
    Args:
        subject (str): Subject of the email.
        body (str): Body of the email.
        recipient (str): Email recipient.
    """
    sender_email = "no-reply@example.com"  # Replace with a dummy sender email
    message = f"Subject: {subject}\nFrom: {sender_email}\nTo: {recipient}\n\n{body}"
    
    try:
        # Write the message to sendmail
        process = os.popen(f"/usr/sbin/sendmail -t", "w")
        process.write(message)
        process.close()
        print(f"Email sent successfully to {recipient} with subject: '{subject}'")
    except Exception as e:
        print(f"Failed to send email. Error: {e}")

# Function for 90-day reminder
def ninety_day_reminder(expiry_date):
    """
    Sends a 90-day password expiry reminder.
    
    Args:
        expiry_date (str): Expiry date in YYYY-MM-DD format.
    """
    subject = "Reminder: 90-Day Password Expiry"
    body = f"""
    Hello,

    This is a reminder that the password for DB User XNGAPP, XNGADM in the SIT environment will expire in 90 days.

    Expiry Date: {expiry_date}

    Please take the necessary steps to renew the password before the expiry date.

    Thank you.
    """
    send_email(subject, body)

# Function for 30-day reminder
def thirty_day_reminder(expiry_date):
    """
    Sends a 30-day password expiry reminder.
    
    Args:
        expiry_date (str): Expiry date in YYYY-MM-DD format.
    """
    subject = "Reminder: 30-Day Password Expiry"
    body = f"""
    Hello,

    This is a reminder that the password for DB User XNGAPP, XNGADM in the UAT environment will expire in 30 days.

    Expiry Date: {expiry_date}

    Please take the necessary steps to renew the password before the expiry date.

    Thank you.
    """
    send_email(subject, body)

# Main logic
if __name__ == "__main__":
    # Ensure correct arguments
    if len(sys.argv) != 3:
        print("Usage: python script_name.py <reminder_type> <expiry_date>")
        print("reminder_type: '90-day' or '30-day'")
        print("expiry_date: Expiry date in YYYY-MM-DD format")
        sys.exit(1)

    reminder_type = sys.argv[1]
    expiry_date = sys.argv[2]

    # Validate expiry date
    try:
        expiry_date_obj = datetime.strptime(expiry_date, "%Y-%m-%d")
    except ValueError:
        print("Invalid expiry_date format. Please use YYYY-MM-DD.")
        sys.exit(1)

    # Determine the reminder type
    if reminder_type == "90-day":
        ninety_day_reminder(expiry_date)
    elif reminder_type == "30-day":
        thirty_day_reminder(expiry_date)
    else:
        print("Invalid reminder_type. Use '90-day' or '30-day'.")
