"use client";

import Image from "next/image";
import {
  Box,
  Grid,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
} from "@mui/joy";
import styles from "../../page.module.css";
import Content from "@/components/Content.js";
import DehazeIcon from "@mui/icons-material/Dehaze";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import BookIcon from "@mui/icons-material/Book";
import ArticleIcon from "@mui/icons-material/Article";
import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";

const getDate = () => {
  let date_time = new Date();

  // get current date
  // adjust 0 before single digit date
  let date = ("0" + date_time.getDate()).slice(-2);

  // get current month
  let month = ("0" + (date_time.getMonth() + 1)).slice(-2);

  // get current year
  let year = date_time.getFullYear();

  date_time = year + "-" + month + "-" + date;

  return date_time;
};

const getDataDate = (data_date) => {
  const newCreatedAt = data_date.split("T")[0];

  //console.log("Mongodb", newCreatedAt);

  return newCreatedAt;
};

// Navigation items
const navItems = [
  { text: "Home", icon: <HomeIcon />, path: "/" },
  { text: "Sunday School Archives", icon: <BookIcon />, path: "/sundayschools" },
  { text: "Word For Today Archives", icon: <ArticleIcon />, path: "/wordfortodays" },
];

export default function Home() {
  const [count, setCount] = useState(1);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const fetchRan = useRef(false);
  const router = useRouter();
  const pathname = usePathname();

  // Media queries for responsive behavior
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const isTablet =
    typeof window !== "undefined" &&
    window.innerWidth >= 768 &&
    window.innerWidth < 1024;
  const isDesktop = typeof window !== "undefined" && window.innerWidth >= 1024;

  let currentDate = getDate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleNavigation = (path) => {
    router.push(path);
    handleDrawerClose();
  };

  useEffect(() => {
    const fetchCount = async () => {
      if (fetchRan.current) return;
      fetchRan.current = true;

      try {
        const res = await fetch("/api/updateCount", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ date: currentDate }),
        });
        const data = await res.json();
        // console.log(data)
        setCount(data.counter.count);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError(true);
      }
    };

    fetchCount();
  }, []);

  // Render different drawer based on screen size
  const renderDrawer = () => {
    // Mobile: Drawer from top, menu button becomes close button
    if (isMobile) {
      return (
        <Drawer
          open={open}
          onClose={handleDrawerClose}
          anchor="top"
          size="lg"
          sx={{
            "--Drawer-horizontalSize": "100vw",
            "--Drawer-verticalSize": "100vh",
            "& .MuiDrawer-content": {
              transform: open ? "translateY(0)" : "translateY(-100%)",
              transition: "transform 0.3s ease-in-out",
            },
          }}
        >
          {/* Navigation List - No close button, we'll use the menu button */}
          <List
            size="lg"
            sx={{
              "--ListItemDecorator-size": "56px",
              "--ListItem-minHeight": "56px",
              "--List-nestedInsetStart": "15px",
              mt: 8, // Add margin to account for the transformed button
            }}
          >
            {navItems.map((item) => (
              <ListItem key={item.text}>
                <ListItemButton
                  onClick={() => handleNavigation(item.path)}
                  selected={pathname === item.path}
                  variant={pathname === item.path ? "soft" : "plain"}
                >
                  <ListItemDecorator>{item.icon}</ListItemDecorator>
                  <ListItemContent>{item.text}</ListItemContent>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      );
    }

    // Tablet/Desktop: Drawer from left with X button
    return (
      <Drawer
        open={open}
        onClose={handleDrawerClose}
        anchor="left"
        size="md"
        sx={{
          "--Drawer-horizontalSize": "320px",
          "--Drawer-verticalSize": "100vh",
        }}
      >
        {/* Close button for tablet/desktop */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
          <IconButton onClick={handleDrawerClose} size="sm" variant="outlined">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Navigation List */}
        <List
          size="lg"
          sx={{
            "--ListItemDecorator-size": "56px",
            "--ListItem-minHeight": "56px",
            "--List-nestedInsetStart": "15px",
          }}
        >
          {navItems.map((item) => (
            <ListItem key={item.text}>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                selected={pathname === item.path}
                variant={pathname === item.path ? "soft" : "plain"}
              >
                <ListItemDecorator>{item.icon}</ListItemDecorator>
                <ListItemContent>{item.text}</ListItemContent>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    );
  };

  return (
    <main className={styles.main}>
      {renderDrawer()}

      <nav style={{ width: "100vw" }}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          padding={1}
          position="relative"
        >
          <Image
            src={"/CacGalwaylogo.jpg"}
            alt="Cac Galway Logo"
            className="{styles.vercelLogo}"
            width={75}
            height={75}
            priority
          />
          <Typography
            level="title-md"
            fontSize={24}
            sx={{
              color: "black",
              fontFamily: "'Roboto,sans -serif",
            }}
            marginTop={1}
            alignSelf={"center"}
            justifySelf={"center"}
          >
            CAC Study Material
          </Typography>

          {/* Menu/Close button - positioned absolutely */}
          <Box>
            {/* For mobile: button changes to close icon when drawer is open */}
            {isMobile ? (
              <IconButton
                onClick={open ? handleDrawerClose : handleDrawerOpen}
                size="lg"
                sx={{
                  transform: open ? "rotate(90deg)" : "rotate(0deg)",
                  transition: "transform 0.3s ease",
                }}
              >
                {open ? (
                  <CloseIcon fontSize="large" />
                ) : (
                  <DehazeIcon fontSize="large" />
                )}
              </IconButton>
            ) : (
              // For tablet/desktop: always show menu button
              <IconButton
                onClick={handleDrawerOpen}
                size="lg"
                sx={open && { display: "none" }}
              >
                <DehazeIcon fontSize="large" />
              </IconButton>
            )}
          </Box>
        </Box>
      </nav>

      <Grid justifyItems={"center"}>
        <Content count={count} />
      </Grid>
    </main>
  );
}

