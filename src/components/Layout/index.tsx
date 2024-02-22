import { Container } from "@mui/material";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Outlet } from "react-router-dom";

interface LayoutProps {}
const Layout: React.FC<LayoutProps> = (): JSX.Element => {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Outlet />
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
