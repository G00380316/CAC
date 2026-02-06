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
import WFTContent from "@/components/list/wftContent.js";
import DehazeIcon from "@mui/icons-material/Dehaze";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import BookIcon from "@mui/icons-material/Book";
import ArticleIcon from "@mui/icons-material/Article";
import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";


// Navigation items
const navItems = [
    { text: "Home", icon: <HomeIcon />, path: "/" },
    {
        text: "Sunday School Archives",
        icon: <BookIcon />,
        path: "/sundayschools",
    },
    {
        text: "Word For Today Archives",
        icon: <ArticleIcon />,
        path: "/wordfortodays",
    },
];

export default function Home() {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    // Media queries for responsive behavior
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const isTablet =
        typeof window !== "undefined" &&
        window.innerWidth >= 768 &&
        window.innerWidth < 1024;
    const isDesktop = typeof window !== "undefined" && window.innerWidth >= 1024;


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

    const renderDrawer = () => {
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
                    <List
                        size="lg"
                        sx={{
                            "--ListItemDecorator-size": "56px",
                            "--ListItem-minHeight": "56px",
                            "--List-nestedInsetStart": "15px",
                            mt: 8,
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
                <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
                    <IconButton onClick={handleDrawerClose} size="sm" variant="outlined">
                        <CloseIcon />
                    </IconButton>
                </Box>

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
                    <Link href={'/'}>
                        <Image
                            src={"/CacGalwaylogo.jpg"}
                            alt="Cac Galway Logo"
                            className="{styles.vercelLogo}"
                            width={75}
                            height={75}
                            priority
                        />
                    </Link>
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
                        Christ Apostlic Church Galway
                    </Typography>

                    <Box>
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
                            <IconButton
                                onClick={handleDrawerOpen}
                                size="lg"
                            >
                                <DehazeIcon fontSize="large" />
                            </IconButton>
                        )}
                    </Box>
                </Box>
            </nav>

            <Grid justifyItems={"center"}>
                <WFTContent />
            </Grid>
        </main>
    );
}
