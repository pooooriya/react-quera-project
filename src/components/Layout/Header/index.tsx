import { AppBar, Button, Container, Stack } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationModal from "../../Authentication";

export const Header: React.FC = (): JSX.Element => {
  const navigation = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <AppBar color="transparent" elevation={0} position="static">
      <Container maxWidth="lg">
        <AuthenticationModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          py={3}
        >
          <Stack>
            <img
              alt="gelato logo"
              height={60}
              width={60}
              src="https://order.gelatohouse.ir/2.15.5/img/9dcd0541179a7fde025e88026901a4be.png"
            />
          </Stack>
          <Stack flexDirection="row" gap={2}>
            <Stack flexDirection="row">
              <Button onClick={() => navigation("/")}>سفارش اینترنتی</Button>
              <Button onClick={() => navigation("/terms")}>قوانین سایت</Button>
            </Stack>
            <Stack>
              <Button
                onClick={() => setIsOpen(true)}
                color="primary"
                variant="contained"
              >
                ورود / عضویت
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </AppBar>
  );
};
