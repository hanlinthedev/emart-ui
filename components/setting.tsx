import { logOut } from "@/app/action";
import { settings } from "@/constants";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { useRouter } from "next/navigation";
import React from "react";
const Settings = () => {
	const router = useRouter();
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
		null
	);

	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<Box sx={{ flexGrow: 0 }}>
			<Tooltip title="Open settings">
				<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
					<Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
				</IconButton>
			</Tooltip>
			<Menu
				sx={{ mt: "45px" }}
				id="menu-appbar"
				anchorEl={anchorElUser}
				anchorOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				keepMounted
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				open={Boolean(anchorElUser)}
				onClose={handleCloseUserMenu}
			>
				{settings.map((setting) => (
					<MenuItem
						key={setting.path}
						onClick={() => {
							handleCloseUserMenu();
							setting.path === "/logout" ? logOut() : router.push(setting.path);
						}}
					>
						<Typography textAlign="center">{setting.title}</Typography>
					</MenuItem>
				))}
			</Menu>
		</Box>
	);
};

export default Settings;
