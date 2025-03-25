"use client";
import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import Link from "next/link";
import PostContext from "@/context/postContext";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";

function TablePaginationActions(props) {
   

  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};



export default function CustomPaginationActionsTable() {
    const [token, setToken] = useState("")
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const router = useRouter();
    const API_URL=process.env.NEXT_PUBLIC_API_URL;

    useEffect(()=>{
      const token = Cookies.get("token");
      
      if(!token){
        router.push("/login");
      } else{
        setToken(token)
        const fetchData = async () => {
          try {
            const response = await axios.get(
              `${API_URL}/api/posts/allpost/`
            );
            const data = response.data.data;
            setPosts(data);
          } catch (error) {
            console.error(error.message);
          }
        };
        fetchData();
      }
    },[])

    const handleDeleteClick = async (id) =>{
      try {
        const response = axios.delete(`${API_URL}/deletePost/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true, 
        })
        if(response.status == 200){
          console.log("post deleted successfully")
        }
      } catch (error) {
        
      }
    }
    const handleUpdateClick = async (id) =>{
      try {
        const response = axios.post(`${API_URL}`)
      } catch (error) {
        
      }
    }

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - posts.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <div className=" w-full p-2 mt-10">
        <Link
          href={`http://localhost:5000/?token=${token}`}
          className="bg-blue-500 py-2 px-10 rounded-xl text-white font-bold"
        >
          Create New Post
        </Link>
      </div>
    <TableContainer component={Paper} style={{ marginTop: "30px" }}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableBody>
          {(rowsPerPage > 0
            ? posts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : posts
          ).map((post) => (
            <TableRow key={post.postHeading}>
              <TableCell component="th" scope="row">
                <img src={post.imagePost} alt="postImage" className="min-h-[60px] max-h-[60px] min-w-[70px] mx-w-[60px]"/>
              </TableCell>
              <TableCell component="th" scope="row" className="min-w-80">
                {post.postHeading}
              </TableCell>
              <TableCell style={{ width: 150 }} align="right">
                {post.createdAt.split("T")[0]}
              </TableCell>
              <TableCell style={{ width: 110 }} align="right">
                <button className="text-yellow-500" onClick={()=>{handleUpdateClick(post._id)}}>Edit</button>
              </TableCell>
              <TableCell style={{ width: 110 }} align="right">
               <button className="text-red-500" onClick={()=>{handleDeleteClick(post._id)}}>Delete</button>
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              //   rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={posts.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    </>
  );
}
