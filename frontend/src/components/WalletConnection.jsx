// src/components/WalletConnection.jsx
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@radix-ui/react-button';
import { useWalletConnect } from '@/providers/WalletConnectProvider';

const WalletConnection = () => {
  const { user, walletLogin, logout } = useAuth();
  const { account } = useWalletConnect();

  return (
    <div className="flex items-center gap-4 p-4 bg-card rounded-lg shadow">
      {account ? (
        <>
          <span className="text-sm text-muted-foreground truncate max-w-[150px]">
            Connected: {account.slice(0, 6)}...{account.slice(-4)}
          </span>
          <Button
            variant="outline"
            className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
            onClick={logout}
          >
            Disconnect
          </Button>
        </>
      ) : (
        <Button
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={walletLogin}
        >
          Connect Wallet
        </Button>
      )}
    </div>
  );
};

export default WalletConnection;