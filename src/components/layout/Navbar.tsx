"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import assets from "@/assets";

const LOGO_SRC = assets.images.logo;
const INK = "#1A0A08";

const links = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const reserveSx = {
  bgcolor: "primary.main",
  color: "#fff",
  border: `3px solid ${INK}`,
  boxShadow: `4px 4px 0 ${INK}`,
  transition: "all .15s",
  "&:hover": {
    bgcolor: "primary.dark",
    transform: "translate(-2px,-2px)",
    boxShadow: `6px 6px 0 ${INK}`,
  },
};

function Logo({ size }: { size: number }) {
  return (
    <Box
      sx={{
        position: "relative",
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        border: `3px solid ${INK}`,
        boxShadow: `3px 3px 0 ${INK}`,
        bgcolor: "#fff",
        flexShrink: 0,
      }}
    >
      <Image
        src={LOGO_SRC}
        alt="The Hot Chicks"
        fill
        priority
        sizes="80px"
        style={{ objectFit: "cover" }}
      />
    </Box>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: "secondary.main",
          color: INK,
          borderBottom: `4px solid ${INK}`,
        }}
      >
        <Toolbar
          sx={{
            minHeight: { xs: 72, md: 96 },
            justifyContent: { xs: "space-between", md: "center" },
            gap: { md: 5 },
          }}
        >
          <Link href="/" style={{ display: "flex" }}>
            <Logo size={64} />
          </Link>

          {/* Desktop */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 2,
            }}
          >
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <Button
                  key={l.href}
                  component={Link}
                  href={l.href}
                  disableRipple
                  sx={{
                    color: active ? "secondary.main" : INK,
                    bgcolor: active ? INK : "transparent",
                    borderRadius: 999,
                    fontSize: "0.8rem",
                    letterSpacing: "0.18em",
                    "&:hover": { bgcolor: INK, color: "secondary.main" },
                  }}
                >
                  {l.label}
                </Button>
              );
            })}
            <Button
              component={Link}
              href="/reservation"
              variant="contained"
              sx={{ ml: 1, ...reserveSx }}
            >
              Reserve
            </Button>
          </Box>

          {/* Mobile */}
          <IconButton
            aria-label="open menu"
            onClick={() => setOpen(true)}
            sx={{
              display: { xs: "inline-flex", md: "none" },
              color: INK,
              border: `3px solid ${INK}`,
              boxShadow: `3px 3px 0 ${INK}`,
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: "80vw",
              maxWidth: 360,
              bgcolor: "secondary.main",
              color: INK,
              borderLeft: `4px solid ${INK}`,
              display: "flex",
              flexDirection: "column",
            },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            py: 1.5,
          }}
        >
          <Link
            href="/"
            onClick={() => setOpen(false)}
            style={{ display: "flex" }}
          >
            <Logo size={52} />
          </Link>
          <IconButton
            aria-label="close menu"
            onClick={() => setOpen(false)}
            sx={{
              color: INK,
              border: `3px solid ${INK}`,
              boxShadow: `3px 3px 0 ${INK}`,
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ borderColor: INK, borderBottomWidth: 3 }} />

        <List sx={{ px: 2, py: 0 }}>
          {links.map((l) => (
            <Box key={l.href}>
              <ListItemButton
                component={Link}
                href={l.href}
                onClick={() => setOpen(false)}
                sx={{ px: 0, py: 2 }}
              >
                <ListItemText
                  primary={l.label}
                  slotProps={{
                    primary: {
                      sx: {
                        fontWeight: 800,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        fontSize: "0.9rem",
                        color: pathname === l.href ? "primary.main" : INK,
                      },
                    },
                  }}
                />
              </ListItemButton>
              <Divider sx={{ borderColor: "rgba(26,10,8,0.25)" }} />
            </Box>
          ))}
        </List>

        <Box sx={{ px: 2, mt: 3 }}>
          <Button
            component={Link}
            href="/reservation"
            variant="contained"
            fullWidth
            size="large"
            onClick={() => setOpen(false)}
            sx={reserveSx}
          >
            Reserve a table
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
