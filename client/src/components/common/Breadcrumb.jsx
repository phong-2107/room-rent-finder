import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import React from "react";

const Breadcrumb = ({ homeText = "Trang chủ", currentText = "Tin tức" }) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: 2.5,
                padding: "0 20px",
            }}
        >
            <Box sx={{ pt: 2.5, pb: 1.375, px: 2.5 }}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/"
                        sx={{ fontWeight: "bold", fontSize: 15 }}
                    >
                        {homeText}  {/* Text động */}
                    </Link>
                    <Typography color="primary" sx={{ fontWeight: "bold", fontSize: 15 }}>
                        {currentText}  {/* Text động */}
                    </Typography>
                </Breadcrumbs>
            </Box>
        </Box>
    );
};

export default Breadcrumb;
