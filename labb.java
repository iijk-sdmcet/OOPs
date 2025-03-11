class Account {
    private double balance;

    public Account(double balance) {
        this.balance = balance;
    }

    public void deposit(double amount) {
        balance += amount;
    }

    public void withdraw(double amount) {
        if (balance >= amount) {
            balance -= amount;
        } else {
            System.out.println("Insufficient funds.");
        }
    }

    public double getBalance() {
        return balance;
    }
}

public class Main {
    public static void main(String[] args) {
        Account account = new Account(1000);
        System.out.println("Initial Balance: " + account.getBalance());
        account.deposit(500);
        System.out.println("Balance after deposit: " + account.getBalance());
        account.withdraw(300);
        System.out.println("Balance after withdrawal: " + account.getBalance());
    }
}
