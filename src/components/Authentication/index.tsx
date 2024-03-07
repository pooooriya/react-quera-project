import {
  Dialog,
  Stack,
  DialogTitle,
  Typography,
  Tab,
  Tabs,
  DialogContent
} from "@mui/material";
import { useState } from "react";
import { AuthenticationLevel } from "./type";
import { LoginSection } from "./Sections/Login";
import { RegisterSection } from "./Sections/Register";

interface AuthenticationModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}
const AuthenticationModal: React.FC<AuthenticationModalProps> = ({
  isOpen = false,
  onClose = () => {}
}): JSX.Element => {
  const [Level, setLevel] = useState<AuthenticationLevel>(
    AuthenticationLevel.Login
  );
  const handleLevelChange = (_: React.SyntheticEvent, newValue: number) => {
    setLevel(newValue);
  };
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
      <Stack px={3} py={1}>
        <DialogTitle>
          <Typography variant="h6" fontWeight={700} textAlign="center">
            ورود یا ثبت نام
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={1}>
            <Stack>
              <Tabs value={Level} onChange={handleLevelChange}>
                <Tab value={AuthenticationLevel.Register} label="ثبت نام" />
                <Tab value={AuthenticationLevel.Login} label="ورود" />
              </Tabs>
            </Stack>
            <Stack>
              {(() => {
                switch (Level) {
                  case AuthenticationLevel.Login:
                    return <LoginSection onClose={onClose} />;
                  case AuthenticationLevel.Register:
                    return <RegisterSection onClose={onClose} />;
                  default:
                    return <LoginSection onClose={onClose} />;
                }
              })()}
            </Stack>
          </Stack>
        </DialogContent>
      </Stack>
    </Dialog>
  );
};

export default AuthenticationModal;
