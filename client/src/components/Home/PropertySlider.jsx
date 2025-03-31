import React from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, FormControl, MenuItem, Paper, Select, Stack, Typography } from "@mui/material";

// Component cho phần dropdown
const DropdownSelect = ({ label, options, value, onChange, sx }) => {
    return (
        <Box sx={sx}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", marginBottom: 1.5, marginLeft: 1.5 }}>
                {label}
            </Typography>
            <FormControl fullWidth>
                <Select
                    value={value}
                    displayEmpty
                    sx={{
                        height: "50px",
                        backgroundColor: "neutral.100",
                        borderRadius: "6px",
                    }}
                    IconComponent={KeyboardArrowDownIcon}
                    onChange={onChange}
                >
                    {options.map((option, index) => (
                        <MenuItem key={index} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

const PropertySlider = ({ roomTypes, locations, priceRanges, onSearch }) => {
    const [roomType, setRoomType] = React.useState(roomTypes[0]?.value || "");
    const [location, setLocation] = React.useState(locations[0]?.value || "");
    const [priceRange, setPriceRange] = React.useState(priceRanges[0]?.value || "");

    const handleRoomTypeChange = (event) => setRoomType(event.target.value);
    const handleLocationChange = (event) => setLocation(event.target.value);
    const handlePriceRangeChange = (event) => setPriceRange(event.target.value);

    return (
        <Box sx={{ position: "relative", width: "100%", height: "820px" }}>
            <Box
                sx={{
                    width: "100%",
                    height: "820px",
                    backgroundImage: "url(https://c.animaapp.com/m8mtc6xrHmsOL1/img/rectangle-1.png)",
                    backgroundSize: "cover",
                    backgroundPosition: "50% 50%",
                    position: "relative",
                }}
            >
                {/* Lớp màu phủ */}
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#0B1348",
                        opacity: 0.35,
                    }}
                />
                <Typography
                    variant="h1"
                    sx={{
                        position: "absolute",
                        top: "418px", // Vị trí dọc
                        left: "50%", // Đặt vào giữa theo chiều ngang
                        transform: "translateX(-50%)", // Căn chỉnh lại phần tử theo chiều ngang
                        fontWeight: 900,
                        color: "white",
                        fontSize: "52px",
                        fontFamily: "roboto",
                        lineHeight: "60px",
                        whiteSpace: "nowrap",
                    }}
                >
                    TÌM KIẾM PHÒNG TRỌ GIÁ RẺ
                </Typography>


                <Paper
                    elevation={3}
                    sx={{
                        position: "absolute",
                        top: "534px",
                        left: "50%", // Đặt vào giữa theo chiều ngang
                        transform: "translateX(-50%)", // Căn chỉnh lại phần tử theo chiều ngang
                        width: "960px",
                        padding: 5,
                        borderRadius: 3,
                        backgroundColor: "white",
                        boxShadow: "0px 4px 32px rgba(0, 0, 0, 0.15)",
                    }}
                >
                    <Stack direction="row" spacing={1.5} alignItems="center">
                        <Stack direction="row" spacing={1.5} width="680px">
                            <DropdownSelect
                                label="LOẠI PHÒNG"
                                options={roomTypes}
                                value={roomType}
                                onChange={handleRoomTypeChange}
                                sx={{ width: "209px" }}
                            />
                            <DropdownSelect
                                label="KHU VỰC"
                                options={locations}
                                value={location}
                                onChange={handleLocationChange}
                                sx={{ width: "230px" }}
                            />
                            <DropdownSelect
                                label="MỨC GIÁ"
                                options={priceRanges}
                                value={priceRange}
                                onChange={handlePriceRangeChange}
                                sx={{ width: "235px" }}
                            />
                        </Stack>

                        {/* <FilterAltIcon sx={{ color: "text.primary" }} /> */}

                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<SearchIcon />}
                            sx={{
                                width: "160px",
                                height: "50px",
                                borderRadius: "6px",
                                fontWeight: "bold",
                            }}
                            onClick={() => onSearch({ roomType, location, priceRange })}
                        >
                            TÌM KIẾM
                        </Button>
                    </Stack>
                </Paper>

            </Box>
        </Box>
    );
};

export default PropertySlider;
