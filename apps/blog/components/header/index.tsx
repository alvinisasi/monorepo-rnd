import { useTheme } from '@mui/material/styles'
import {
    AppBar,
    Box,
    Button,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
    Link as MuiLink,
    Divider,
} from '@mui/material'
import NextLink from 'next/link'
import { useState } from 'react'
import { HeaderProps } from '@/utils/types'
import { useRouter } from 'next/router'

const Header = ({ menus }: { menus: HeaderProps[] }) => {
    const theme = useTheme()
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
    // const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const router = useRouter()

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget)
    }
    // const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    // 	setAnchorElUser(event.currentTarget);
    // };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    // const handleCloseUserMenu = () => {
    // 	setAnchorElUser(null);
    // };
    return (
        <AppBar component='nav' position='fixed' sx={{ width: '100%' }}>
            <Container maxWidth='xl' sx={{ width: '100%' }}>
                <Toolbar disableGutters sx={{ width: '100%' }}>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' },
                        }}
                    >
                        <IconButton
                            size='large'
                            aria-label='account of current user'
                            aria-controls='menu-appbar'
                            aria-haspopup='true'
                            onClick={handleOpenNavMenu}
                            color='primary'
                        >
                            <MenuItem />
                        </IconButton>
                        <Menu
                            id='menu-appbar'
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
                            {menus && menus?.length > 0
                                ? menus?.map((link) => (
                                      <MenuItem
                                          key={link.label}
                                          onClick={handleCloseNavMenu}
                                      >
                                          <MuiLink
                                              component={NextLink}
                                              href={link.url}
                                          >
                                              <Typography
                                                  textAlign='center'
                                                  variant='body1'
                                                  color={
                                                      theme.palette.primary
                                                          .contrastText
                                                  }
                                                  fontWeight='bold'
                                                  fontFamily='Open Sans'
                                              >
                                                  {link.label}
                                              </Typography>
                                          </MuiLink>
                                      </MenuItem>
                                  ))
                                : null}
                        </Menu>
                    </Box>
                    <Typography
                        variant='h5'
                        noWrap
                        component='a'
                        href='/'
                        sx={{
                            mr: 2,
                            display: { xs: 'flex' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'white',
                            textDecoration: 'none',
                        }}
                    >
                        DanuPusingan
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                            justifyContent: 'end',
                        }}
                    >
                        {menus?.map((link) => (
                            <Button
                                key={link.label}
                                onClick={handleCloseNavMenu}
                                sx={{
                                    my: 2,
                                    ml: 3,
                                    color: 'white',
                                    display: 'block',
                                    borderBottom:
                                        router.pathname === link.url
                                            ? `3px ${theme.palette.primary.contrastText} solid`
                                            : 'none',
                                }}
                            >
                                <MuiLink component={NextLink} href={link.url}>
                                    <Typography
                                        textAlign='center'
                                        variant='body1'
                                        color={
                                            theme.palette.primary.contrastText
                                        }
                                        fontWeight={'bold'}
                                        fontFamily='Open Sans'
                                    >
                                        {link.label}
                                    </Typography>
                                </MuiLink>
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header
