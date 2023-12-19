'use client'

import { useTheme } from "@mui/material/styles";
import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography, Link as MuiLink } from "@mui/material";
import NextLink from "next/link";
import { useState } from "react";
import builder from "@builder.io/react"
import { useQuery } from "@tanstack/react-query";

export interface NavData {
  data: LinkProps
}

interface LinkProps {
    url: string;
    label: string;
}

builder.init(process.env.NEXT_PUBLIC_BUILDERIO_API_KEY || '')

const getLinks = async () => {
	const links = await builder.getAll("nav-link");
	return links as NavData[]
}

const Header: React.FC = () => {
	const theme = useTheme()
	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
	const { data } = useQuery({
        queryKey: ["links"],
        queryFn: () => getLinks(),
    })

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};
    return (
        <AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
							>
							<MenuItem />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}
						>
							{ data && data?.length > 0 ? data?.map((link, index) => (
								<MenuItem key={index} onClick={handleCloseNavMenu}>
									<MuiLink component={NextLink} href={link.data.url}>
										<Typography textAlign='center' color={theme.palette.primary.contrastText}>{link.data.label}</Typography>
									</MuiLink>
								</MenuItem>
							)): null}
						</Menu>
					</Box>
					<Typography
						variant="h5"
						noWrap
						component="a"
						href="#app-bar-with-responsive-menu"
						sx={{
							mr: 2,
							display: { xs: 'flex', md: 'none' },
							flexGrow: 1,
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						LOGO
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{data?.map((link, index) => (
							<Button
								key={index}
								onClick={handleCloseNavMenu}
								sx={{ my: 2, color: 'white', display: 'block' }}
							>
								<MuiLink component={NextLink} href={link.data.url}>
									<Typography textAlign='center' color={theme.palette.primary.contrastText}>{link.data.label}</Typography>
								</MuiLink>
							</Button>
						))}
					</Box>
				</Toolbar>
			</Container>
        </AppBar>
    );
}

export default Header